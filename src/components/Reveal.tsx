import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
};

export function Reveal({ children, className, as, delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      ref={ref}
      className={cn("reveal-on-scroll", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
