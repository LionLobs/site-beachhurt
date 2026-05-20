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
        className="h-8 w-auto object-contain sm:h-10 md:h-11"
        width={512}
        height={512}
      />
      {showWordmark && (
        <span
          className="text-[18px] font-light tracking-[4px] sm:text-[20px] sm:tracking-[5px] md:text-[22px] md:tracking-[6px]"
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
