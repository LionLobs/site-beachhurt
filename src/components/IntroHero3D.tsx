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
      const p = 1 - Math.pow(1 - progress, 3);
      el.style.setProperty("--intro-ball-scale", String(0.5 + p * 3.25));
      el.style.setProperty("--intro-ball-rotate", `${progress * 360}deg`);
      el.style.setProperty("--intro-ball-opacity", String(progress < 0.76 ? 1 : Math.max(0, 1 - (progress - 0.76) / 0.2)));
      el.style.setProperty("--intro-open", `${p * 104}%`);
      el.style.setProperty("--intro-copy-opacity", String(Math.max(0, 1 - progress * 2.2)));
      el.style.setProperty("--intro-copy-y", `${-progress * 24}px`);
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
      className="relative w-full"
      style={{
        height: "122svh",
        marginBottom: "-22svh",
        ["--intro-ball-scale" as string]: 0.5,
        ["--intro-ball-rotate" as string]: "0deg",
        ["--intro-ball-opacity" as string]: 1,
        ["--intro-open" as string]: "0%",
        ["--intro-copy-opacity" as string]: 1,
        ["--intro-copy-y" as string]: "0px",
      }}
    >
      <div
        className="sticky top-0 h-svh w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #fff5e2 0%, #f5e6c8 35%, #e8d3a6 65%, #d4b87f 100%)",
        }}
      >
        {/* Warm sky glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,235,190,0.7) 0%, transparent 55%)",
          }}
        />

        {/* Sand grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(120,80,30,0.55) 1px, transparent 1px), radial-gradient(rgba(140,100,50,0.4) 1px, transparent 1px)",
            backgroundSize: "4px 4px, 7px 7px",
            backgroundPosition: "0 0, 2px 3px",
          }}
        />

        {/* Ball */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={volleyball3D}
            alt="Bola de vôlei aproximando"
            width={1024}
            height={1024}
            className="will-change-transform select-none drop-shadow-[0_30px_60px_rgba(80,55,20,0.4)]"
            style={{
              width: "min(58vw, 330px)",
              height: "auto",
              transform: "scale(var(--intro-ball-scale)) rotate(var(--intro-ball-rotate))",
              opacity: "var(--intro-ball-opacity)",
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
              "linear-gradient(to right, #d4b87f 0%, #e0c690 70%, rgba(232,211,166,0) 100%)",
          }}
        />
        {/* Right curtain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[55%] will-change-transform"
          style={{
            transform: "translateX(var(--intro-open))",
            background:
              "linear-gradient(to left, #d4b87f 0%, #e0c690 70%, rgba(232,211,166,0) 100%)",
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-[#8a6a2c] sm:text-xs">
            Beach volleyball
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#3a2a10] sm:text-5xl md:text-6xl">
            A areia <span className="text-[#b8893d]">chama</span>.
          </h2>
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#6b4a1c]/70">
            Role para entrar ↓
          </p>
        </div>

        {/* Bottom fade into next section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />
      </div>
    </section>
  );
}
