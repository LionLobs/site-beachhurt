import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Crosshair, Hand, ArrowUpCircle, Zap, Shield, MoveDiagonal } from "lucide-react";

const PILLARS = [
  { icon: Crosshair, name: "Saque", tag: "Pressão", desc: "Saque viagem, jornada e flutuante com leitura de vento." },
  { icon: Hand, name: "Manchete", tag: "Recepção", desc: "Plataforma estável e ângulo correto sob qualquer pressão." },
  { icon: ArrowUpCircle, name: "Levantamento", tag: "Conexão", desc: "Toque limpo, segundo ajuste e bola jogável sempre." },
  { icon: Zap, name: "Ataque", tag: "Finalização", desc: "Aproximação, salto e variação — largada, paralela, diagonal." },
  { icon: Shield, name: "Bloqueio", tag: "Leitura", desc: "Timing, mãos fortes e leitura do levantador adversário." },
  { icon: MoveDiagonal, name: "Defesa", tag: "Coração", desc: "Posicionamento, antecipação e bola viva até o último instante." },
];

export function Fundamentals() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-primary-glow/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3">
            Fundamentos do jogo
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Os <span className="text-gradient-primary">seis pilares</span> que treinamos juntos
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Metodologia profissional aplicada a cada gesto. Do primeiro saque ao bloqueio decisivo.
          </p>
        </Reveal>

      </div>

      <div className="relative mt-14">
        {/* edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-24"
        />

        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-12 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {PILLARS.map(({ icon: Icon, name, tag, desc }, i) => (
            <Reveal
              key={name}
              delay={i * 80}
              className="snap-start shrink-0 basis-[78%] sm:basis-[44%] md:basis-[34%] lg:basis-[28%]"
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/90 hover:shadow-elevated">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20"
                />
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:border-primary/60">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <div className="mt-5 h-px w-10 bg-gradient-to-r from-primary/60 to-transparent transition-all duration-500 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground/70">
          Arraste para o lado para ver todos os pilares →
        </p>
      </div>
    </section>
  );
}
