import accentBall from "@/assets/accent-ball.png";
import accentPlayer from "@/assets/accent-player.png";
import accentWhistle from "@/assets/accent-whistle.png";
import { cn } from "@/lib/utils";

type FloatingAccentProps = {
  variant: "ball" | "player" | "whistle";
  className?: string;
  /** Tailwind size class for width, e.g. "w-40 md:w-56" */
  size?: string;
  rotate?: number;
  opacity?: number;
  flip?: boolean;
  blur?: boolean;
  glow?: boolean;
};

const SOURCES = {
  ball: accentBall,
  player: accentPlayer,
  whistle: accentWhistle,
};

export function FloatingAccent({
  variant,
  className,
  size = "w-40 md:w-56",
  rotate = 0,
  opacity = 0.85,
  flip = false,
  blur = false,
  glow = true,
}: FloatingAccentProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none",
        "animate-[float_9s_ease-in-out_infinite]",
        size,
        className,
      )}
      style={{
        opacity,
        transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
        filter: blur ? "blur(1px)" : undefined,
      }}
    >
      {glow && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-primary/25 blur-3xl"
        />
      )}
      <img
        src={SOURCES[variant]}
        alt=""
        loading="lazy"
        className="h-full w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
      />
    </div>
  );
}
