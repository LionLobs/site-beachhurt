import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className, showWordmark = true }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 320 80"
      role="img"
      aria-label="Beach Hurt"
      className={cn("h-10 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bh-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c87a" />
          <stop offset="45%" stopColor="#c9a55a" />
          <stop offset="100%" stopColor="#8a6a2c" />
        </linearGradient>
      </defs>

      {/* Volleyball mark */}
      <g stroke="url(#bh-gold)" strokeWidth="2" strokeLinecap="round" fill="none">
        <circle cx="40" cy="40" r="28" />
        <path d="M14 32 C 30 38, 50 38, 66 32" />
        <path d="M22 60 C 30 46, 38 36, 40 12" />
        <path d="M58 60 C 50 46, 42 36, 40 12" />
      </g>

      {showWordmark && (
        <text
          x="86"
          y="50"
          fill="url(#bh-gold)"
          fontFamily="var(--font-display), Sora, ui-sans-serif, system-ui, sans-serif"
          fontSize="26"
          fontWeight={300}
          letterSpacing="6"
        >
          BEACH HURT
        </text>
      )}
    </svg>
  );
}
