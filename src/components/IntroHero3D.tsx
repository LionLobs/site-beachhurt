import { useEffect, useRef } from "react";
import volleyball3D from "@/assets/volleyball-3d.webp";

/**
 * Scroll-driven cinematic intro:
 *  - A volleyball approaches the camera as the user scrolls.
 *  - Two warm "sand curtains" split open, revealing the site below.
 *  - The whole section fades into the next at the end.
 */
export function IntroHero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const ballExit = Math.max(0, (progress - 0.72) / 0.22);
      const layerExit = Math.max(0, (progress - 0.82) / 0.16);

      el.style.setProperty("--intro-ball-scale", String(0.42 + eased * 5.15));
      el.style.setProperty("--intro-ball-y", `${(1 - eased) * 18 - eased * 18}px`);
      el.style.setProperty("--intro-ball-rotate", `${progress * 300}deg`);
      el.style.setProperty("--intro-ball-opacity", String(Math.max(0, 1 - ballExit)));
      el.style.setProperty("--intro-open", `${eased * 112}%`);
      el.style.setProperty("--intro-layer-opacity", String(Math.max(0, 1 - layerExit)));
      el.style.setProperty("--intro-copy-opacity", String(Math.max(0, 1 - progress * 3)));
      el.style.setProperty("--intro-copy-y", `${-progress * 18}px`);
    };
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Intro"
      className="pointer-events-none relative z-30 w-full"
      style={{
        height: "145svh",
        marginBottom: "-145svh",
        ["--intro-ball-scale" as string]: 0.5,
        ["--intro-ball-y" as string]: "18px",
        ["--intro-ball-rotate" as string]: "0deg",
        ["--intro-ball-opacity" as string]: 1,
        ["--intro-open" as string]: "0%",
        ["--intro-layer-opacity" as string]: 1,
        ["--intro-copy-opacity" as string]: 1,
        ["--intro-copy-y" as string]: "0px",
        contain: "layout paint style",
      }}
    >
      <div
        className="sticky top-0 h-svh w-full overflow-hidden"
        style={{
          isolation: "isolate",
          opacity: "var(--intro-layer-opacity)",
        }}
      >
        {/* Ball */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <img
            src={volleyball3D}
            alt="Bola de vôlei aproximando"
            width={1024}
            height={1024}
            className="select-none will-change-transform"
            style={{
              width: "clamp(150px, 34vw, 300px)",
              height: "auto",
              transform: "translate3d(0, var(--intro-ball-y), 0) scale(var(--intro-ball-scale)) rotate(var(--intro-ball-rotate))",
              opacity: "var(--intro-ball-opacity)",
              filter: "drop-shadow(0 26px 36px color-mix(in oklab, var(--foreground) 20%, transparent))",
              transformOrigin: "50% 50%",
            }}
            draggable={false}
          />
        </div>

        {/* Left curtain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[55%] will-change-transform"
          style={{
            transform: "translateX(calc(var(--intro-open) * -1))",
            background:
              "linear-gradient(to right, var(--sand) 0%, var(--secondary) 72%, transparent 100%)",
          }}
        />
        {/* Right curtain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[55%] will-change-transform"
          style={{
            transform: "translateX(var(--intro-open))",
            background:
              "linear-gradient(to left, var(--sand) 0%, var(--secondary) 72%, transparent 100%)",
          }}
        />

        {/* Headline */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 text-center"
          style={{
            opacity: "var(--intro-copy-opacity)",
            transform: "translateY(var(--intro-copy-y))",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-muted-foreground sm:text-xs">
            Beach volleyball
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl md:text-6xl">
            A areia <span className="text-primary">chama</span>.
          </h2>
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Role para entrar ↓
          </p>
        </div>

        {/* Bottom fade into next section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background/70"
        />
      </div>
    </section>
  );
}
