/**
 * SurrealCanvas — decorative, non-interactive layer of drifting/orbiting shapes.
 * Designed to give a dreamlike, premium feel without hurting performance.
 */
export function SurrealCanvas({
  variant = "default",
}: {
  variant?: "default" | "dense" | "soft";
}) {
  const intensity = variant === "dense" ? 1 : variant === "soft" ? 0.5 : 0.8;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: intensity }}
    >
      {/* Morphing blob top-left */}
      <div
        className="absolute -left-24 -top-20 h-72 w-72 animate-morph bg-gradient-primary opacity-30 blur-3xl"
      />
      {/* Morphing blob bottom-right */}
      <div
        className="absolute -bottom-32 -right-20 h-96 w-96 animate-morph bg-gradient-ocean opacity-25 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />

      {/* Soft glowing dot (replaces emoji) */}
      <div className="absolute left-[8%] top-[20%] animate-drift-slow">
        <div className="h-3 w-3 rounded-full bg-primary-glow shadow-glow" />
      </div>

      {/* Drifting volleyball — outline ring */}
      <div className="absolute right-[12%] top-[35%] animate-drift-reverse">
        <div className="h-16 w-16 rounded-full border-2 border-primary-glow/40 backdrop-blur-sm" />
      </div>

      {/* Orbiting micro-dot cluster */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-2 w-2 animate-orbit rounded-full bg-primary-glow shadow-glow" />
        <div
          className="absolute h-1.5 w-1.5 animate-orbit-reverse rounded-full bg-primary"
          style={{ animationDuration: "36s" }}
        />
      </div>

      {/* Floating geometric square — tilted */}
      <div
        className="absolute bottom-[18%] left-[14%] h-14 w-14 rotate-12 animate-tilt rounded-2xl border border-primary/30 bg-card/40 backdrop-blur-sm"
      />

      {/* Pulse dot */}
      <div className="absolute right-[8%] bottom-[22%] h-3 w-3 animate-pulse-glow rounded-full bg-primary-glow" />

      {/* Diagonal light streak */}
      <div
        className="absolute left-[-10%] top-1/3 h-px w-[60%] rotate-[8deg] bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent opacity-50 animate-drift-slow"
        style={{ animationDuration: "28s" }}
      />
    </div>
  );
}
