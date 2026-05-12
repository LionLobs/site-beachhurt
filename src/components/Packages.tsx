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

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-4" style={{ scrollbarWidth: "none" }}>
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="min-w-[80%] shrink-0 snap-start sm:min-w-[55%] md:min-w-0 md:shrink">
              <Card
                className={`relative h-full overflow-hidden border-border/60 transition-all duration-500 hover:-translate-y-1 ${
                  p.featured
                    ? "border-primary/50 bg-gradient-to-br from-primary/8 to-card shadow-glow"
                    : "bg-card hover:shadow-elevated"
                }`}
              >
                {p.featured && (
                  <div className="absolute -right-10 top-4 rotate-45 bg-gradient-primary px-10 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                    Mais escolhido
                  </div>
                )}
                <CardContent className="flex h-full flex-col p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-1.5">
                    {p.featured && <Flame className="h-4 w-4 text-primary" />}
                    <h3 className="font-display text-lg font-bold sm:text-xl">{p.name}</h3>
                  </div>
                  <div className="mb-0.5">
                    <span className="font-display text-2xl font-bold text-primary sm:text-3xl">{p.price}</span>
                  </div>
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {p.unit}
                  </p>
                  <p className="mb-4 text-xs text-foreground/80 sm:text-sm">{p.description}</p>

                  <ul className="mb-5 flex-1 space-y-2">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-xs sm:text-[13px]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
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
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Parcelamento em até 3x sem juros · Pagamento via PIX, cartão ou transferência
        </p>
      </div>
    </section>
  );
}
