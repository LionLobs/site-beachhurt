import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-BE1dcRm3.js";
import { z } from "zod";
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
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const EvaluationInputSchema = z.object({
  level: z.enum(["iniciante", "intermediario", "avancado", "competitivo"]),
  experience: z.string().min(1).max(60),
  goal: z.string().min(3).max(300),
  weakness: z.string().min(3).max(300),
  frequency: z.string().min(1).max(60)
});
const AnalysisSchema = z.object({
  diagnostico: z.string().describe("Diagnóstico técnico curto (2-3 frases) do nível atual e gargalos."),
  prioridades: z.array(z.string()).min(3).max(4).describe("3-4 prioridades técnicas/físicas específicas para destravar o próximo nível."),
  pacote_recomendado: z.enum(["Experimental", "Foco 1x semana", "Evolução 2x semana", "Performance 3x semana"]).describe("Pacote ideal baseado no nível e objetivo."),
  pacote_motivo: z.string().describe("Por que esse pacote (1-2 frases)."),
  tempo_estimado: z.string().describe("Tempo realista para alcançar o objetivo (ex: '6 a 8 semanas')."),
  pitch_final: z.string().describe("Convite final personalizado e direto para agendar a aula experimental (1 frase).")
});
const runTechnicalEvaluation_createServerFn_handler = createServerRpc({
  id: "a642f4768b456b43a015bb7210e0084c413d3581b30ebfa376a3f186d5339e99",
  name: "runTechnicalEvaluation",
  filename: "src/lib/ai-evaluation.functions.ts"
}, (opts) => runTechnicalEvaluation.__executeServer(opts));
const runTechnicalEvaluation = createServerFn({
  method: "POST"
}).inputValidator((input) => EvaluationInputSchema.parse(input)).handler(runTechnicalEvaluation_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      requestTechnicalEvaluation
    } = await import("./ai-evaluation.server-CJY1kbUX.js");
    const result = await requestTechnicalEvaluation(data);
    if (result.error || !result.arguments) {
      return {
        error: result.error || "Falha na avaliação. Tente novamente.",
        analysis: null
      };
    }
    const analysis = AnalysisSchema.parse(result.arguments);
    return {
      error: null,
      analysis
    };
  } catch (err) {
    console.error("Evaluation failed:", err);
    return {
      error: "Erro inesperado. Tente novamente.",
      analysis: null
    };
  }
});
export {
  runTechnicalEvaluation_createServerFn_handler
};
