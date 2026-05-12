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
    .enum(["Experimental", "Foco 1x semana", "Evolução 2x semana", "Performance 3x semana"])
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
    try {
      const { requestTechnicalEvaluation } = await import("./ai-evaluation.server");
      const result = await requestTechnicalEvaluation(data);
      if (result.error || !result.arguments) {
        return { error: result.error || "Falha na avaliação. Tente novamente.", analysis: null };
      }

      const analysis = AnalysisSchema.parse(result.arguments);
      return { error: null, analysis };
    } catch (err) {
      console.error("Evaluation failed:", err);
      return { error: "Erro inesperado. Tente novamente.", analysis: null };
    }
  });
