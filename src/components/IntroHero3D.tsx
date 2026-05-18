import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Cinematic intro with realistic 3D volleyball on warm sand backdrop.
 * Keeps brand identity (sand + gold tones) and adds depth via layered
 * shadows, specular highlights and subtle parallax.
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
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
      style={{
        perspective: "1600px",
        background:
          "radial-gradient(ellipse at 50% 30%, #fff5e2 0%, #f5e6c8 35%, #e8d3a6 65%, #d4b87f 100%)",
      }}
    >
      {/* Soft warm glow from above */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,235,190,0.7) 0%, transparent 55%)",
        }}
      />

      {/* Subtle sand grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(120,80,30,0.6) 1px, transparent 1px), radial-gradient(rgba(140,100,50,0.4) 1px, transparent 1px)",
          backgroundSize: "4px 4px, 7px 7px",
          backgroundPosition: "0 0, 2px 3px",
        }}
      />

      {/* Floor / horizon */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(180,140,80,0.15) 50%, rgba(140,100,55,0.35) 100%)",
        }}
      />

      {/* 3D Volleyball stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`relative transition-all duration-[1500ms] ease-out ${
            mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-6"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(8deg) rotateZ(-6deg)",
          }}
        >
          {/* Contact shadow (ellipse on sand) */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full h-12 w-[85%] -translate-x-1/2 translate-y-8 rounded-[50%] blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(80,55,20,0.55) 0%, rgba(80,55,20,0.25) 50%, transparent 80%)",
            }}
          />
          {/* Ambient glow under ball */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full h-20 w-full -translate-x-1/2 translate-y-4 rounded-full opacity-60 blur-3xl"
            style={{ background: "rgba(255,210,140,0.5)" }}
          />

          {/* The ball */}
          <div
            className="relative h-60 w-60 animate-spin-slow rounded-full sm:h-72 sm:w-72 md:h-[26rem] md:w-[26rem]"
            style={{
              background:
                "radial-gradient(circle at 32% 26%, #ffffff 0%, #fdf6e6 12%, #f5e3b8 32%, #e6c886 55%, #b8945a 78%, #6e4d22 95%, #3a2710 100%)",
              boxShadow: [
                "inset -28px -36px 80px rgba(40,25,5,0.55)",
                "inset 22px 26px 70px rgba(255,250,225,0.75)",
                "inset 0 0 40px rgba(255,235,180,0.25)",
                "0 40px 90px rgba(80,55,20,0.45)",
                "0 15px 40px rgba(120,80,30,0.35)",
                "0 0 120px rgba(232,200,122,0.4)",
              ].join(", "),
            }}
          >
            {/* Volleyball panel seams — realistic curves */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="seam-fade-light" cx="50%" cy="50%" r="50%">
                  <stop offset="55%" stopColor="rgba(60,38,12,0.85)" />
                  <stop offset="92%" stopColor="rgba(60,38,12,0.15)" />
                  <stop offset="100%" stopColor="rgba(60,38,12,0)" />
                </radialGradient>
                <radialGradient id="panel-shade" cx="35%" cy="28%" r="80%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>

              {/* Panel subtle shading overlay */}
              <circle cx="100" cy="100" r="98" fill="url(#panel-shade)" />

              {/* Three sweeping seams that wrap the sphere */}
              <g
                fill="none"
                stroke="url(#seam-fade-light)"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M100 4 C 58 55, 58 145, 100 196" />
                <path d="M100 4 C 142 55, 142 145, 100 196" />
                <path d="M4 100 C 55 58, 145 58, 196 100" />
                <path d="M4 100 C 55 142, 145 142, 196 100" />
                <ellipse cx="100" cy="100" rx="96" ry="32" />
                <ellipse cx="100" cy="100" rx="32" ry="96" />
              </g>

              {/* Tiny stitch marks along seams */}
              <g fill="rgba(45,28,8,0.55)">
                {Array.from({ length: 18 }).map((_, i) => {
                  const t = (i / 17) * Math.PI;
                  const x = 100 + Math.cos(t) * 96;
                  const y = 100 + Math.sin(t - Math.PI / 2) * 32;
                  return <circle key={i} cx={x} cy={y} r="0.7" />;
                })}
              </g>
            </svg>

            {/* Bright specular highlight */}
            <div
              aria-hidden="true"
              className="absolute left-[14%] top-[10%] h-[38%] w-[38%] rounded-full opacity-80 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0) 75%)",
              }}
            />
            {/* Rim light on the bottom-right */}
            <div
              aria-hidden="true"
              className="absolute bottom-[8%] right-[10%] h-[30%] w-[30%] rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,220,160,0.7) 0%, rgba(255,220,160,0) 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating sand particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute h-1 w-1 animate-float rounded-full"
          style={{
            left: `${(i * 67) % 100}%`,
            top: `${(i * 41) % 100}%`,
            background: "#c9a55a",
            opacity: 0.25 + ((i * 11) % 40) / 100,
            animationDelay: `${(i % 6) * 0.5}s`,
            boxShadow: "0 0 6px rgba(201,165,90,0.6)",
          }}
        />
      ))}

      {/* Headline */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 text-center sm:pb-20">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.6em] text-[#8a6a2c] transition-all duration-700 sm:text-xs ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          Beach volleyball
        </p>
        <h2
          className={`mt-3 font-display text-3xl font-bold tracking-tight text-[#3a2a10] drop-shadow-[0_2px_10px_rgba(255,235,190,0.5)] sm:text-5xl md:text-6xl transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          A areia <span className="text-[#b8893d]">chama</span>.
        </h2>

        <a
          href="#top"
          aria-label="Rolar para o conteúdo"
          className={`mt-8 inline-flex flex-col items-center gap-2 text-[#6b4a1c]/80 transition-all duration-700 hover:text-[#3a2a10] ${
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
