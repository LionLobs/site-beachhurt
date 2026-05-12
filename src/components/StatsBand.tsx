import { useEffect, useRef, useState } from "react";
import { Trophy, Timer, Users, Flame } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const STATS = [
  { icon: Trophy, value: 12, suffix: "+", label: "Anos em quadra" },
  { icon: Users, value: 180, suffix: "+", label: "Atletas treinados" },
  { icon: Timer, value: 2400, suffix: "h", label: "Horas de areia" },
  { icon: Flame, value: 100, suffix: "%", label: "Treino individual" },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

function StatItem({ stat, start, delay }: { stat: typeof STATS[number]; start: boolean; delay: number }) {
  const v = useCountUp(stat.value, start);
  const Icon = stat.icon;
  return (
    <Reveal delay={delay} className="group relative">
      <div className="relative flex flex-col items-center text-center">
        <div className="mb-3 grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-primary/5 text-primary transition-all duration-500 group-hover:border-primary/60 group-hover:bg-primary/10">
          <Icon className="h-5 w-5" />
        </div>
        <div className="font-display text-3xl font-bold tracking-tight tabular-nums md:text-4xl">
          {v.toLocaleString("pt-BR")}
          <span className="text-primary">{stat.suffix}</span>
        </div>
        <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {stat.label}
        </p>
      </div>
    </Reveal>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStart(true)),
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-border/40 bg-gradient-soft py-14 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary-glow/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:gap-y-0">
        {STATS.map((s, i) => (
          <StatItem key={s.label} stat={s} start={start} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}
