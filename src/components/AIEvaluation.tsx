import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Brain,
  Sparkles,
  Loader2,
  CheckCircle2,
  Target,
  Clock,
  ArrowRight,
  Trophy,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  runTechnicalEvaluation,
  type EvaluationAnalysis,
} from "@/lib/ai-evaluation.functions";

const LEVELS = [
  { value: "iniciante", label: "Iniciante — nunca joguei sério" },
  { value: "intermediario", label: "Intermediário — jogo recreativo" },
  { value: "avancado", label: "Avançado — jogo regular" },
  { value: "competitivo", label: "Competitivo — disputo torneios" },
] as const;

export function AIEvaluation({ onBook }: { onBook: (pack: string) => void }) {
  const evaluate = useServerFn(runTechnicalEvaluation);
  const [level, setLevel] = useState<string>("");
  const [experience, setExperience] = useState("");
  const [goal, setGoal] = useState("");
  const [weakness, setWeakness] = useState("");
  const [frequency, setFrequency] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationAnalysis | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!level || !experience || goal.length < 3 || weakness.length < 3 || !frequency) {
      toast.error("Preencha todos os campos para a IA analisar seu jogo.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await evaluate({
        data: {
          level: level as "iniciante" | "intermediario" | "avancado" | "competitivo",
          experience,
          goal,
          weakness,
          frequency,
        },
      });
      if (res.error || !res.analysis) {
        toast.error(res.error || "Falha na avaliação.");
        return;
      }
      setResult(res.analysis);
      toast.success("Avaliação pronta!", {
        description: "Confira o diagnóstico abaixo.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado na avaliação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="avaliacao-ia"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-secondary/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary backdrop-blur-sm">
            <Brain className="mr-1 h-3 w-3" /> Avaliação técnica com IA
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Descubra em <span className="text-gradient-primary">60 segundos</span> o seu plano
            ideal
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Responda 5 perguntas. A IA cruza seu perfil com a metodologia do coach e devolve um
            diagnóstico técnico + pacote recomendado para você evoluir mais rápido.
          </p>
        </Reveal>

        <Card className="overflow-hidden border-border/60 shadow-elevated backdrop-blur-xl">
          <div className="h-2 bg-gradient-primary" aria-hidden="true" />
          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ia-level">Seu nível atual</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="ia-level">
                    <SelectValue placeholder="Escolha seu nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ia-exp">Há quanto tempo joga?</Label>
                <Input
                  id="ia-exp"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Ex: 2 anos, ou comecei agora"
                  maxLength={60}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ia-freq">Frequência semanal disponível</Label>
                <Input
                  id="ia-freq"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="Ex: 1 aula por semana"
                  maxLength={60}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ia-goal">Seu objetivo principal</Label>
                <Textarea
                  id="ia-goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Ex: melhorar saque viagem para competir no circuito amador"
                  rows={2}
                  maxLength={300}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ia-weak">Sua maior dificuldade hoje</Label>
                <Textarea
                  id="ia-weak"
                  value={weakness}
                  onChange={(e) => setWeakness(e.target.value)}
                  placeholder="Ex: defesa contra ataques fortes, leitura do bloqueio, condicionamento"
                  rows={2}
                  maxLength={300}
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full shadow-glow md:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analisando seu jogo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Gerar minha avaliação
                    </>
                  )}
                </Button>
              </div>
            </form>

            {result && (
              <div className="mt-10 animate-fade-in space-y-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary">
                      Diagnóstico técnico
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-foreground/90">
                      {result.diagnostico}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                    <Target className="h-4 w-4 text-primary" /> Prioridades de treino
                  </p>
                  <ul className="space-y-2">
                    {result.prioridades.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      <Trophy className="h-3.5 w-3.5 text-primary" /> Pacote recomendado
                    </p>
                    <p className="mt-2 font-display text-xl font-bold text-primary">
                      {result.pacote_recomendado}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{result.pacote_motivo}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-primary" /> Tempo estimado
                    </p>
                    <p className="mt-2 font-display text-xl font-bold">{result.tempo_estimado}</p>
                  </div>
                </div>

                <p className="rounded-xl bg-secondary/10 p-4 text-sm italic text-foreground/90">
                  "{result.pitch_final}"
                </p>

                <Button
                  size="lg"
                  className="w-full shadow-glow md:w-auto"
                  onClick={() => onBook(result.pacote_recomendado)}
                >
                  Quero a aula experimental
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
