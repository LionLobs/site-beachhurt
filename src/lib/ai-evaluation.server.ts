import "@tanstack/react-start/server-only";

import { getRequestIP, setResponseHeader, setResponseStatus } from "@tanstack/react-start/server";

type EvaluationInput = {
  level: "iniciante" | "intermediario" | "avancado" | "competitivo";
  experience: string;
  goal: string;
  weakness: string;
  frequency: string;
};

type GatewayResult = {
  error: string | null;
  arguments: unknown | null;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit() {
  const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
  const now = Date.now();
  const current = rateLimitBuckets.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    setResponseStatus(429);
    setResponseHeader("Retry-After", Math.ceil((current.resetAt - now) / 1000).toString());
    return false;
  }

  current.count += 1;
  return true;
}

export async function requestTechnicalEvaluation(data: EvaluationInput): Promise<GatewayResult> {
  if (!checkRateLimit()) {
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
          content: `Aluno potencial:\n- Nível: ${data.level}\n- Tempo jogando: ${data.experience}\n- Objetivo: ${data.goal}\n- Maior dificuldade: ${data.weakness}\n- Frequência disponível: ${data.frequency}\n\nFaça a avaliação técnica e retorne usando a função analise_tecnica.`,
        },
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
                pitch_final: { type: "string" },
              },
              required: ["diagnostico", "prioridades", "pacote_recomendado", "pacote_motivo", "tempo_estimado", "pitch_final"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "analise_tecnica" } },
    }),
  });

  if (response.status === 429) return { error: "Muitas avaliações agora. Tente novamente em alguns instantes.", arguments: null };
  if (!response.ok) return { error: "Falha na avaliação. Tente novamente.", arguments: null };

  const payload = await response.json();
  const rawArguments = payload.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  return { error: null, arguments: rawArguments ? JSON.parse(rawArguments) : null };
}