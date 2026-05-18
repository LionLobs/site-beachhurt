import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Full-viewport cinematic intro: 3D spinning volleyball with dramatic
 * lighting, layered shadows and reveal text. Sits above the main hero.
 */
export function IntroHero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Intro"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#0a0806]"
      style={{ perspective: "1400px" }}
    >
      {/* Atmospheric layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(201,168,90,0.35) 0%, rgba(60,40,20,0.25) 35%, rgba(0,0,0,1) 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,220,160,0.18) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      {/* Light beams */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 50%, transparent 0deg, rgba(232,200,122,0.18) 40deg, transparent 90deg, transparent 270deg, rgba(232,200,122,0.12) 320deg, transparent 360deg)",
        }}
      />

      {/* 3D Volleyball */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className={`relative transition-all duration-[1400ms] ease-out ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(12deg) rotateZ(-8deg)",
          }}
        >
          {/* Ground shadow */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full h-10 w-[80%] -translate-x-1/2 translate-y-6 rounded-full bg-black/70 blur-2xl"
          />

          {/* Ball */}
          <div
            className="relative h-56 w-56 animate-spin-slow rounded-full sm:h-72 sm:w-72 md:h-96 md:w-96"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, #fff8ec 0%, #f1d9a5 25%, #c9a55a 55%, #6b4a1c 85%, #2a1a08 100%)",
              boxShadow:
                "inset -20px -30px 60px rgba(0,0,0,0.55), inset 18px 22px 50px rgba(255,240,210,0.55), 0 30px 80px rgba(0,0,0,0.7), 0 0 90px rgba(232,200,122,0.35)",
            }}
          >
            {/* Volleyball seams */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="seam-fade" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="rgba(60,40,15,0.85)" />
                  <stop offset="100%" stopColor="rgba(60,40,15,0)" />
                </radialGradient>
              </defs>
              <g
                fill="none"
                stroke="url(#seam-fade)"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M100 4 C 60 60, 60 140, 100 196" />
                <path d="M100 4 C 140 60, 140 140, 100 196" />
                <path d="M4 100 C 60 70, 140 70, 196 100" />
                <path d="M4 100 C 60 130, 140 130, 196 100" />
                <path d="M30 30 C 80 80, 120 120, 170 170" opacity="0.5" />
                <path d="M170 30 C 120 80, 80 120, 30 170" opacity="0.5" />
              </g>
            </svg>

            {/* Specular highlight */}
            <div
              aria-hidden="true"
              className="absolute left-[15%] top-[12%] h-1/3 w-1/3 rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute h-1 w-1 animate-float rounded-full bg-[#e8c87a]"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 47) % 100}%`,
            opacity: 0.35 + ((i * 13) % 50) / 100,
            animationDelay: `${(i % 5) * 0.4}s`,
            boxShadow: "0 0 8px rgba(232,200,122,0.8)",
          }}
        />
      ))}

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 text-center">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.6em] text-[#c9a55a] transition-all duration-700 sm:text-xs ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          Beach volleyball
        </p>
        <h2
          className={`mt-3 font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          A areia <span className="text-[#e8c87a]">chama</span>.
        </h2>

        <a
          href="#top"
          aria-label="Rolar para o conteúdo"
          className={`mt-10 inline-flex flex-col items-center gap-2 text-white/70 transition-all duration-700 hover:text-white ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Role</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>

      {/* Bottom fade into hero */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
