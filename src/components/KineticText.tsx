import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type KineticTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  /** Per-word delay in ms */
  stagger?: number;
  /** Initial delay before the first word in ms */
  delay?: number;
  /** Animation style */
  variant?: "rise" | "blur" | "drop" | "wave";
  /** Highlight specific words by exact match (case-sensitive) */
  highlight?: string[];
  highlightClassName?: string;
};

/**
 * KineticText — splits a string into words and animates each on view enter
 * with a cinematic, staggered reveal (blur, rise, scale, rotate).
 */
export function KineticText({
  children,
  as,
  className,
  stagger = 60,
  delay = 0,
  variant = "blur",
  highlight = [],
  highlightClassName,
}: KineticTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "p") as ElementType;

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      node?.classList.add("kinetic-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("kinetic-visible");
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = children.split(/(\s+)/);
  let wordIndex = 0;

  return (
    <Tag
      ref={ref as never}
      className={cn(`kinetic kinetic-${variant}`, className)}
      style={{ ["--kinetic-base" as string]: `${delay}ms` }}
    >
      {words.map((token, i) => {
        if (/^\s+$/.test(token)) return token;
        const idx = wordIndex++;
        const isHighlight = highlight.includes(token.replace(/[.,!?"]/g, ""));
        return (
          <span
            key={i}
            className={cn("kinetic-word", isHighlight && highlightClassName)}
            style={{
              ["--kinetic-i" as string]: idx,
              transitionDelay: `calc(var(--kinetic-base) + ${idx * stagger}ms)`,
            }}
          >
            {token}
          </span>
        );
      })}
    </Tag>
  );
}
