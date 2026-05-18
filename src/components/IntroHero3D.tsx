import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import volleyball3D from "@/assets/volleyball-3d.png";

/**
 * Cinematic intro with an ultra-realistic 3D volleyball photo
 * on a warm sand backdrop. Adds depth via contact shadow,
 * ambient glow, sand particles and gentle float animation.
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
        background:
          "radial-gradient(ellipse at 50% 30%, #fff5e2 0%, #f5e6c8 35%, #e8d3a6 65%, #d4b87f 100%)",
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

      {/* Sand grain texture */}
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

      {/* Floor / horizon shading */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(180,140,80,0.15) 50%, rgba(140,100,55,0.4) 100%)",
        }}
      />

      {/* 3D Volleyball */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`relative transition-all duration-[1500ms] ease-out ${
            mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-6"
          }`}
        >
          {/* Contact shadow on the sand */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full h-14 w-[90%] -translate-x-1/2 translate-y-6 rounded-[50%] blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(70,45,15,0.55) 0%, rgba(70,45,15,0.25) 50%, transparent 80%)",
            }}
          />
          {/* Warm ambient glow under the ball */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full h-24 w-full -translate-x-1/2 translate-y-2 rounded-full opacity-70 blur-3xl"
            style={{ background: "rgba(255,210,140,0.55)" }}
          />

          {/* Realistic ball image with gentle float + slow spin */}
          <div className="animate-float">
            <img
              src={volleyball3D}
              alt="Bola de vôlei profissional"
              width={1024}
              height={1024}
              className="relative h-60 w-60 animate-spin-slow object-contain drop-shadow-[0_30px_60px_rgba(80,55,20,0.45)] sm:h-72 sm:w-72 md:h-[26rem] md:w-[26rem]"
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
