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
      className={cn("h-10 w-auto text-primary", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Volleyball mark */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
        <circle cx="40" cy="40" r="28" />
        <path d="M14 32 C 30 38, 50 38, 66 32" />
        <path d="M22 60 C 30 46, 38 36, 40 12" />
        <path d="M58 60 C 50 46, 42 36, 40 12" />
      </g>

      {showWordmark && (
        <text
          x="86"
          y="50"
          fill="currentColor"
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
