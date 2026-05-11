import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EvaluationInputSchema = z.object({
  level: z.enum(["iniciante", "intermediario", "avancado", "competitivo"]),
  experience: z.string().min(1).max(60),
  goal: z.string().min(3).max(300),
  weakness: z.string().min(3).max(300),
  frequency: z.string().min(1).max(60),
});

const AnalysisSchema = z.object({
  diagnostico: z
    .string()
    .describe("Diagnóstico técnico curto (2-3 frases) do nível atual e gargalos."),
  prioridades: z
    .array(z.string())
    .min(3)
    .max(4)
    .describe("3-4 prioridades técnicas/físicas específicas para destravar o próximo nível."),
  pacote_recomendado: z
    .enum(["Experimental", "Iniciante 4x", "Evolução 8x", "Performance 12x"])
    .describe("Pacote ideal baseado no nível e objetivo."),
  pacote_motivo: z.string().describe("Por que esse pacote (1-2 frases)."),
  tempo_estimado: z.string().describe("Tempo realista para alcançar o objetivo (ex: '6 a 8 semanas')."),
  pitch_final: z
    .string()
    .describe("Convite final personalizado e direto para agendar a aula experimental (1 frase)."),
});

export type EvaluationAnalysis = z.infer<typeof AnalysisSchema>;

export const runTechnicalEvaluation = createServerFn({ method: "POST" })
  .inputValidator((input) => EvaluationInputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        error: "Serviço de IA indisponível. Tente novamente em instantes.",
        analysis: null,
      };
    }

    const systemPrompt = `Você é Vinicius Hurt, coach de vôlei de praia com 12 anos de experiência em quadra de areia.
Sua tarefa: analisar tecnicamente um aluno potencial em PORTUGUÊS BRASILEIRO e devolver um diagnóstico curto, prioridades de treino e o pacote ideal.
Tom: direto, profissional, motivador, sem clichê. Fale como técnico de alta performance, não como vendedor.
Pacotes disponíveis:
- "Experimental" (1 aula avulsa, R$ 180): para conhecer a metodologia.
- "Iniciante 4x" (4 aulas, R$ 640): fundamentos do zero (saque, manchete, toque, posicionamento).
- "Evolução 8x" (8 aulas, R$ 1.200): refinamento técnico + leitura de jogo + condicionamento.
- "Performance 12x" (12 aulas, R$ 1.680): preparação para competição, ataque, bloqueio, vídeo-análise.
Regras:
- Se nível "iniciante" → recomende "Iniciante 4x" ou "Experimental".
- Se objetivo claro + nível intermediário → "Evolução 8x".
- Se competitivo/torneios → "Performance 12x".
- Diagnóstico deve mencionar pontos técnicos REAIS de vôlei (ex: base de saque, leitura do bloqueio, transição de defesa).`;

    const userPrompt = `Aluno potencial:
- Nível autodeclarado: ${data.level}
- Tempo jogando vôlei: ${data.experience}
- Objetivo principal: ${data.goal}
- Maior dificuldade hoje: ${data.weakness}
- Frequência disponível: ${data.frequency}

Faça a avaliação técnica e retorne usando a função analise_tecnica.`;

    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
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
                    prioridades: {
                      type: "array",
                      items: { type: "string" },
                      minItems: 3,
                      maxItems: 4,
                    },
                    pacote_recomendado: {
                      type: "string",
                      enum: ["Experimental", "Iniciante 4x", "Evolução 8x", "Performance 12x"],
                    },
                    pacote_motivo: { type: "string" },
                    tempo_estimado: { type: "string" },
                    pitch_final: { type: "string" },
                  },
                  required: [
                    "diagnostico",
                    "prioridades",
                    "pacote_recomendado",
                    "pacote_motivo",
                    "tempo_estimado",
                    "pitch_final",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "analise_tecnica" } },
        }),
      });

      if (response.status === 429) {
        return { error: "Muitas avaliações agora. Tente em alguns segundos.", analysis: null };
      }
      if (response.status === 402) {
        return { error: "Créditos de IA esgotados. Avise o coach!", analysis: null };
      }
      if (!response.ok) {
        const t = await response.text();
        console.error("AI gateway error:", response.status, t);
        return { error: "Falha na avaliação. Tente novamente.", analysis: null };
      }

      const payload = await response.json();
      const toolCall = payload.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall?.function?.arguments) {
        return { error: "Resposta inválida da IA.", analysis: null };
      }
      const args = JSON.parse(toolCall.function.arguments);
      const analysis = AnalysisSchema.parse(args);
      return { error: null, analysis };
    } catch (err) {
      console.error("Evaluation failed:", err);
      return { error: "Erro inesperado. Tente novamente.", analysis: null };
    }
  });
