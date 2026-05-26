import { createClient } from "@supabase/supabase-js";
import { a as getRequestIP$1, s as setResponseStatus, b as setResponseHeader } from "./server-BE1dcRm3.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const RATE_LIMIT_WINDOW_MS = 6e4;
const RATE_LIMIT_MAX_REQUESTS = 5;
async function checkRateLimit() {
  const ip = getRequestIP$1({ xForwardedFor: true }) || "unknown";
  const endpoint = "ai-evaluation";
  const now = /* @__PURE__ */ new Date();
  const windowStart = new Date(now.getTime() - now.getTime() % RATE_LIMIT_WINDOW_MS);
  try {
    const { data, error } = await supabaseAdmin.rpc("increment_rate_limit", {
      p_ip_address: ip,
      p_endpoint: endpoint,
      p_window_start: windowStart.toISOString(),
      p_max_requests: RATE_LIMIT_MAX_REQUESTS
    });
    if (error) {
      console.error("Rate limit RPC failed:", error);
      return false;
    }
    const row = Array.isArray(data) && data.length > 0 ? data[0] : null;
    const allowed = row?.allowed ?? false;
    if (!allowed) {
      setResponseStatus(429);
      setResponseHeader("Retry-After", Math.ceil(RATE_LIMIT_WINDOW_MS / 1e3).toString());
    }
    return allowed;
  } catch (err) {
    console.error("Rate limit check failed:", err);
    return false;
  }
}
async function requestTechnicalEvaluation(data) {
  if (!await checkRateLimit()) {
    return { error: "Muitas avaliações agora. Tente novamente em alguns instantes.", arguments: null };
  }
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) {
    return { error: "Serviço de IA indisponível. Tente novamente em instantes.", arguments: null };
  }
  const systemPrompt = `Você é Vinicius Hurt, coach de vôlei de praia com 12 anos de experiência em quadra de areia.
Sua tarefa: analisar tecnicamente um aluno potencial em PORTUGUÊS BRASILEIRO e devolver um diagnóstico curto, prioridades de treino e o pacote ideal.
Tom: direto, profissional, motivador, sem clichê. Fale como técnico de alta performance, não como vendedor.
Pacotes disponíveis:
- "Experimental" (1 aula avulsa, R$ 35): para conhecer a metodologia.
- "Foco 1x semana" (4 aulas/mês, R$ 140): fundamentos, constância e evolução gradual.
- "Evolução 2x semana" (8 aulas/mês, R$ 280): refinamento técnico, leitura de jogo e condicionamento.
- "Performance 3x semana" (12 aulas/mês, R$ 420): alto volume, competição, ataque, bloqueio e vídeo-análise.
Regras:
- Se nível "iniciante" → recomende "Foco 1x semana" ou "Experimental".
- Se objetivo claro + nível intermediário → "Evolução 2x semana".
- Se competitivo/torneios → "Performance 3x semana".
- Diagnóstico deve mencionar pontos técnicos REAIS de vôlei (ex: base de saque, leitura do bloqueio, transição de defesa).`;
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Aluno potencial:
- Nível: ${data.level}
- Tempo jogando: ${data.experience}
- Objetivo: ${data.goal}
- Maior dificuldade: ${data.weakness}
- Frequência disponível: ${data.frequency}

Faça a avaliação técnica e retorne usando a função analise_tecnica.`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "analise_tecnica",
            description: "Devolve a análise técnica estruturada do aluno.",
            parameters: {
              type: "object",
              properties: {
                diagnostico: { type: "string" },
                prioridades: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 4 },
                pacote_recomendado: { type: "string", enum: ["Experimental", "Foco 1x semana", "Evolução 2x semana", "Performance 3x semana"] },
                pacote_motivo: { type: "string" },
                tempo_estimado: { type: "string" },
                pitch_final: { type: "string" }
              },
              required: ["diagnostico", "prioridades", "pacote_recomendado", "pacote_motivo", "tempo_estimado", "pitch_final"],
              additionalProperties: false
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "analise_tecnica" } }
    })
  });
  if (response.status === 429) return { error: "Muitas avaliações agora. Tente novamente em alguns instantes.", arguments: null };
  if (!response.ok) return { error: "Falha na avaliação. Tente novamente.", arguments: null };
  const payload = await response.json();
  const rawArguments = payload.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  return { error: null, arguments: rawArguments ? JSON.parse(rawArguments) : null };
}
export {
  requestTechnicalEvaluation
};
