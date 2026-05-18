import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";

const LINKS = [
  { href: "#avaliacao-ia", label: "Avaliação IA" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#galeria", label: "Galeria" },
  { href: "#coach", label: "Coach" },
  { href: "#agendar", label: "Agendar" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = LINKS.map((l) => l.href.slice(1));
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-700",
          scrolled
            ? "border-b border-border/30 bg-background/95 shadow-sm"
            : "border-b border-transparent bg-background/40",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-8 sm:py-3.5">
          <button
            onClick={() => handleClick("#top")}
            className="group flex items-center gap-2"
            aria-label="Ir ao topo"
          >
            <BrandLogo className="h-12 w-auto text-foreground transition-opacity duration-700 group-hover:opacity-80 sm:h-14 md:h-16" />
          </button>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={cn(
                    "group relative rounded-full px-3.5 py-1.5 text-[13px] font-normal tracking-wide transition-colors duration-500",
                    isActive ? "text-foreground" : "text-muted-foreground/80 hover:text-foreground",
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 translate-y-3 rounded-full bg-primary/70 transition-all duration-500",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="hidden h-8 rounded-full border border-border/40 px-4 text-[12px] font-normal tracking-wide text-foreground/90 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground sm:inline-flex"
              onClick={(e) => {
                e.preventDefault();
                handleClick("#agendar");
              }}
            >
              <a href="#agendar">
                <Sparkles className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                Aula experimental
              </a>
            </Button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/80 text-foreground/80 shadow-sm transition-all duration-500 hover:border-primary/40 hover:text-foreground lg:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className="absolute inset-0 bg-background/95"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 mt-[76px] origin-top px-4 pb-8 transition-transform duration-500",
            open ? "translate-y-0" : "-translate-y-4",
          )}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-background p-5 shadow-elevated">
            <div className="pointer-events-none absolute -top-24 -right-24 h-44 w-44 rounded-full bg-gradient-primary opacity-15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
            <nav className="relative flex flex-col">
              {LINKS.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  style={{ transitionDelay: `${open ? i * 50 : 0}ms` }}
                  className={cn(
                    "group flex items-center justify-between border-b border-border/20 px-2 py-3.5 text-left text-[15px] font-light tracking-wide text-foreground/85 transition-all duration-500 last:border-b-0 hover:text-foreground",
                    open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-primary/70 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="mt-5 h-10 w-full rounded-full border border-border/40 text-[13px] font-normal tracking-wide hover:border-primary/50 hover:bg-primary/5"
                onClick={() => handleClick("#agendar")}
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                Aula experimental
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
