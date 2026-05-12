import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface HScrollProps {
  children: ReactNode;
  /** Tailwind grid classes applied from md+ when scrolling is disabled. */
  mdGridClassName?: string;
  /** Gap class, applied both in flex (mobile) and grid (desktop). */
  gapClassName?: string;
  /** Optional className appended to the inner track. */
  className?: string;
  /** Show the "Arraste para o lado" hint below on mobile. */
  showHint?: boolean;
}

/**
 * Horizontal snap-scrolling track on mobile, grid layout on md+.
 * Adds left/right edge fades and a drag hint that disappears once the user scrolls.
 */
export function HScroll({
  children,
  mdGridClassName = "md:grid-cols-3",
  gapClassName = "gap-4 md:gap-6",
  className = "",
  showHint = true,
}: HScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft >= max - 4);
      if (el.scrollLeft > 24) setHasScrolled(true);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative md:contents">
      {/* edge fades — mobile only */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 md:hidden ${
          atStart ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 md:hidden ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        ref={ref}
        className={`-mx-6 flex snap-x snap-mandatory overflow-x-auto px-6 pb-3 [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${gapClassName} ${mdGridClassName} ${className}`}
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>

      {showHint && (
        <p
          className={`mt-3 flex items-center justify-center gap-1 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground/70 transition-opacity duration-500 md:hidden ${
            hasScrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          Arraste
          <ChevronRight className="h-3 w-3 animate-pulse" />
        </p>
      )}
    </div>
  );
}

/** Child wrapper that sizes correctly inside HScroll on mobile and resets on md+. */
export function HScrollItem({
  children,
  basis = "min-w-[80%] sm:min-w-[58%]",
  className = "",
}: {
  children: ReactNode;
  basis?: string;
  className?: string;
}) {
  return (
    <div className={`${basis} shrink-0 snap-start md:min-w-0 md:shrink ${className}`}>
      {children}
    </div>
  );
}
