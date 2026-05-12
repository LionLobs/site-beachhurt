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
  /** Show the "Arraste" hint below on mobile. */
  showHint?: boolean;
}

/**
 * Horizontal snap-scrolling track on mobile, grid layout on md+.
 * - Bleeds beyond the parent's px-6 padding so cards reach the screen edge.
 * - Forces equal heights via align-stretch + h-full chain.
 * - Edge fades fade in/out depending on scroll position.
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
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollable(max > 4);
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft >= max - 4);
      if (el.scrollLeft > 24) setHasScrolled(true);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* edge fades — mobile only, only when scrollable */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background via-background/80 to-transparent transition-opacity duration-300 md:hidden ${
          scrollable && !atStart ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background via-background/80 to-transparent transition-opacity duration-300 md:hidden ${
          scrollable && !atEnd ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={ref}
        className={`-mx-6 flex snap-x snap-mandatory items-stretch overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${gapClassName} ${mdGridClassName} ${className}`}
      >
        {children}
      </div>

      {showHint && (
        <p
          className={`mt-3 flex items-center justify-center gap-1 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground/70 transition-opacity duration-500 md:hidden ${
            hasScrolled || !scrollable ? "opacity-0" : "opacity-100"
          }`}
        >
          Arraste
          <ChevronRight className="h-3 w-3 animate-pulse" />
        </p>
      )}
    </div>
  );
}

/**
 * Child wrapper for HScroll. Sizes correctly on mobile and resets on md+.
 * Forces the inner content chain (Reveal → Card) to fill the full height so
 * mobile cards align cleanly when their text lengths differ.
 */
export function HScrollItem({
  children,
  basis = "min-w-[85%] xs:min-w-[78%] sm:min-w-[60%]",
  className = "",
}: {
  children: ReactNode;
  basis?: string;
  className?: string;
}) {
  return (
    <div
      className={`${basis} flex shrink-0 snap-start flex-col [&>*]:h-full [&>*]:w-full md:min-w-0 md:shrink ${className}`}
    >
      {children}
    </div>
  );
}
