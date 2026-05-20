import { cn } from "@/lib/utils";
import volleyballPlayer from "@/assets/volleyball-player-logo.png";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className, showWordmark = true }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={volleyballPlayer}
        alt="Beach Hurt"
        className="h-10 w-auto object-contain sm:h-12 md:h-14"
        width={512}
        height={512}
      />
      {showWordmark && (
        <span
          className="text-[22px] font-light tracking-[6px] sm:text-[24px] md:text-[26px]"
          style={{
            fontFamily: "var(--font-display), Sora, ui-sans-serif, system-ui, sans-serif",
            background: "linear-gradient(135deg, #e8c87a, #c9a55a, #8a6a2c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BEACH HURT
        </span>
      )}
    </div>
  );
}
