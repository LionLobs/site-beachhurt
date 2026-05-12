import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoVH from "@/assets/logo-beachhurt.png";

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
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-background/70 backdrop-blur-xl shadow-elevated"
            : "border-b border-transparent bg-background/30 backdrop-blur-md",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">
          <button
            onClick={() => handleClick("#top")}
            className="group flex items-center gap-2"
            aria-label="Ir ao topo"
          >
            <img
              src={logoVH}
              alt="Beach Hurt"
              width={200}
              height={72}
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 sm:h-16 md:h-20"
            />
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full bg-gradient-primary opacity-0 blur-md transition-opacity duration-300",
                      isActive && "opacity-30",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-300 group-hover:scale-x-100",
                      isActive && "scale-x-100",
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
              className="hidden shadow-md sm:inline-flex"
              onClick={(e) => {
                e.preventDefault();
                handleClick("#agendar");
              }}
            >
              <a href="#agendar">
                <Sparkles className="mr-1 h-4 w-4" />
                Aula experimental
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground backdrop-blur-md transition-all hover:bg-primary/10 hover:border-primary/40 lg:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 mt-[64px] origin-top px-4 pb-8 transition-transform duration-500",
            open ? "translate-y-0" : "-translate-y-4",
          )}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/95 p-6 shadow-elevated backdrop-blur-2xl">
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
            <nav className="relative flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3.5 text-left text-base font-medium text-foreground/90 transition-all duration-500 hover:border-primary/30 hover:bg-primary/5",
                    open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              ))}
              <Button
                size="lg"
                className="mt-4 w-full shadow-md"
                onClick={() => handleClick("#agendar")}
              >
                <Sparkles className="mr-1 h-4 w-4" />
                Aula experimental
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
