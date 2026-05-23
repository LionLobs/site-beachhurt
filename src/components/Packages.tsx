import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HScroll, HScrollItem } from "@/components/HScroll";
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
    price: "R$ 160",
    unit: "4 aulas / mês",
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
    price: "R$ 300",
    unit: "8 aulas / mês",
    description: "O pacote que mais transforma: dobro de repetições, evolução visível em poucas semanas.",
    perks: [
      "2 treinos individuais por semana",
      "Vídeo-análise mensal inclusa",
      "Plano técnico + condicionamento",
      "Reposição em caso de imprevisto",
    ],
    cta: "Quero evoluir",
    featured: true,
  },
  {
    name: "Performance 3x semana",
    price: "R$ 450",
    unit: "12 aulas / mês",
    description: "Para quem joga torneios e quer chegar no próximo patamar de jogo.",
    perks: [
      "3 treinos individuais por semana",
      "Vídeo-análise quinzenal",
      "Ataque, bloqueio e sistemas",
      "Acompanhamento próximo por WhatsApp",
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
            Escolha sua <span className="text-blue-600 font-extrabold">jornada</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Treinos individuais, sob medida. Comece com uma aula experimental e veja a diferença
            no primeiro saque.
          </p>
        </Reveal>

        <HScroll mdGridClassName="md:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p, i) => (
            <HScrollItem key={p.name} basis="min-w-[78%] xs:min-w-[70%] sm:min-w-[46%] max-w-[78%] xs:max-w-[70%] sm:max-w-[46%]">
              <Reveal delay={i * 100}>
                <Card
                  className={`relative h-full overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 ${
                    p.featured
                      ? "border-primary/70 bg-gradient-to-br from-primary/10 via-card to-card shadow-glow md:scale-[1.03]"
                      : "border-border/60 bg-card hover:border-primary/40 hover:shadow-elevated"
                  }`}
                >
                  {p.featured && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg bg-gradient-primary px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-md">
                      Mais escolhido
                    </div>
                  )}
                  <CardContent className={`flex h-full flex-col p-5 sm:p-6 ${p.featured ? "pt-8" : ""}`}>
                    <div className="mb-3 flex items-center gap-2">
                      {p.featured && <Flame className="h-4 w-4 text-primary" />}
                      <h3 className="font-display text-lg font-bold sm:text-xl">{p.name}</h3>
                    </div>

                    <div className="mb-1 flex items-baseline gap-1">
                      <span className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                        {p.price}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">/mês</span>
                    </div>
                    <p className="mb-4 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {p.unit}
                    </p>

                    <p className="mb-5 text-xs leading-relaxed text-foreground/80 sm:text-sm">
                      {p.description}
                    </p>

                    <ul className="mb-6 flex-1 space-y-2.5">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2 text-xs sm:text-[13px]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-foreground/85">{perk}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => onSelect(p.name)}
                      size="sm"
                      variant={p.featured ? "default" : "outline"}
                      className={p.featured ? "w-full shadow-glow" : "w-full"}
                    >
                      {p.cta}
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            </HScrollItem>
          ))}
        </HScroll>

      </div>
    </section>
  );
}
