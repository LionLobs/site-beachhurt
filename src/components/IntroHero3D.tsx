import { useEffect, useRef, useState } from "react";
import volleyball3D from "@/assets/volleyball-3d.png";

/**
 * Scroll-driven cinematic intro: as the user scrolls, a volleyball
 * approaches the camera and two "curtains" of warm sand split apart,
 * "opening" the site to reveal the hero below.
 */
export function IntroHero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Easings
  const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic
  const p = ease(progress);

  // Ball: starts small/far, grows huge as it approaches
  const ballScale = 0.35 + p * 6;            // 0.35 → 6.35
  const ballRotate = progress * 540;          // smooth spin
  const ballOpacity = progress < 0.85 ? 1 : 1 - (progress - 0.85) / 0.15;

  // Curtains split open
  const curtainOffset = p * 110;              // 0% → 110% off-screen

  // Headline fades out as we go
  const textOpacity = Math.max(0, 1 - progress * 1.6);
  const textY = progress * -40;

  return (
    <section
      ref={ref}
      aria-label="Intro"
      className="relative h-[220vh] w-full"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
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
          className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
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
            className="will-change-transform drop-shadow-[0_30px_60px_rgba(80,55,20,0.45)]"
            style={{
              width: "min(60vw, 420px)",
              height: "auto",
              transform: `scale(${ballScale}) rotate(${ballRotate}deg)`,
              opacity: ballOpacity,
              transition: "opacity 200ms linear",
            }}
          />
        </div>

        {/* Curtains — two warm sand panels that split apart */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 will-change-transform"
          style={{
            transform: `translateX(-${curtainOffset}%)`,
            background:
              "linear-gradient(to right, #d4b87f 0%, #e8d3a6 60%, rgba(232,211,166,0) 100%)",
            boxShadow: "20px 0 60px rgba(120,80,30,0.25)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 will-change-transform"
          style={{
            transform: `translateX(${curtainOffset}%)`,
            background:
              "linear-gradient(to left, #d4b87f 0%, #e8d3a6 60%, rgba(232,211,166,0) 100%)",
            boxShadow: "-20px 0 60px rgba(120,80,30,0.25)",
          }}
        />

        {/* Headline */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 text-center"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-[#8a6a2c] sm:text-xs">
            Beach volleyball
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#3a2a10] sm:text-5xl md:text-6xl">
            A areia <span className="text-[#b8893d]">chama</span>.
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-[#6b4a1c]/70">
            Role para entrar ↓
          </p>
        </div>
      </div>
    </section>
  );
}
