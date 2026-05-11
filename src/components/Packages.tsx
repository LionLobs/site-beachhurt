import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles, ArrowRight, Flame } from "lucide-react";

const PACKAGES = [
  {
    name: "Experimental",
    price: "R$ 35",
    unit: "1 aula avulsa · 60 min",
    description: "Conheça a metodologia e teste a química com o coach antes de fechar um plano.",
    perks: [
      "Diagnóstico técnico ao vivo",
      "Vídeo curto com seus pontos fortes",
      "Plano de evolução personalizado",
    ],
    cta: "Reservar experimental",
    featured: false,
  },
  {
    name: "Foco 1x semana",
    price: "R$ 140",
    unit: "4 aulas / mês · R$ 35 por aula",
    description: "Ritmo ideal para quem está começando ou quer manter constância sem peso na rotina.",
    perks: [
      "1 treino individual por semana",
      "Plano técnico mensal",
      "Acompanhamento por WhatsApp",
      "Reposição em caso de imprevisto",
    ],
    cta: "Começar com 1x",
    featured: false,
  },
  {
    name: "Evolução 2x semana",
    price: "R$ 280",
    unit: "8 aulas / mês · R$ 35 por aula",
    description: "O pacote que mais transforma: dobro de repetições, evolução visível em poucas semanas.",
    perks: [
      "2 treinos individuais por semana",
      "Vídeo-análise mensal inclusa",
      "Plano técnico + condicionamento",
      "Acompanhamento próximo por WhatsApp",
    ],
    cta: "Quero evoluir",
    featured: true,
  },
  {
    name: "Performance 3x semana",
    price: "R$ 420",
    unit: "12 aulas / mês · R$ 35 por aula",
    description: "Para quem joga torneios e quer chegar no próximo patamar de jogo.",
    perks: [
      "3 treinos individuais por semana",
      "Vídeo-análise quinzenal",
      "Ataque, bloqueio e sistemas",
      "Suporte tático pré-torneio",
    ],
    cta: "Performance total",
    featured: false,
  },
];

export function Packages({ onSelect }: { onSelect: (pack: string) => void }) {
  return (
    <section id="pacotes" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" /> Pacotes
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Escolha sua <span className="text-gradient-primary">jornada</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Treinos individuais, sob medida. Comece com uma aula experimental e veja a diferença
            no primeiro saque.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <Card
                className={`relative h-full overflow-hidden border-border/60 transition-all duration-500 hover:-translate-y-2 ${
                  p.featured
                    ? "border-primary/50 bg-gradient-to-br from-primary/8 to-card shadow-glow"
                    : "bg-card hover:shadow-elevated"
                }`}
              >
                {p.featured && (
                  <div className="absolute -right-12 top-6 rotate-45 bg-gradient-primary px-12 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                    Mais escolhido
                  </div>
                )}
                <CardContent className="flex h-full flex-col p-7">
                  <div className="mb-4 flex items-center gap-2">
                    {p.featured && <Flame className="h-5 w-5 text-primary" />}
                    <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  </div>
                  <div className="mb-1">
                    <span className="font-display text-4xl font-bold text-primary">{p.price}</span>
                  </div>
                  <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                    {p.unit}
                  </p>
                  <p className="mb-6 text-sm text-foreground/80">{p.description}</p>

                  <ul className="mb-8 flex-1 space-y-3">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-foreground/85">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => onSelect(p.name)}
                    size="lg"
                    variant={p.featured ? "default" : "outline"}
                    className={p.featured ? "w-full shadow-glow" : "w-full"}
                  >
                    {p.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Parcelamento em até 3x sem juros · Pagamento via PIX, cartão ou transferência
        </p>
      </div>
    </section>
  );
}
