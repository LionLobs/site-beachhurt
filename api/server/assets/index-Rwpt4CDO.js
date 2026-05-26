import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useRef, useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { ChevronDown, Check, ChevronUp, Brain, Loader2, Sparkles, Target, CheckCircle2, Trophy, Clock, ArrowRight, ChevronRight, Flame, X, Menu, Crosshair, Hand, ArrowUpCircle, Zap, Shield, MoveDiagonal, HeartPulse, MapPin } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "./server-BE1dcRm3.js";
import { z } from "zod";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      node?.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Reveal({ children, className, as, delay = 0 }) {
  const ref = useReveal();
  const Tag = as ?? "div";
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn("reveal-on-scroll", className),
      style: delay ? { transitionDelay: `${delay}ms` } : void 0,
      children
    }
  );
}
function SurrealCanvas({
  variant = "default"
}) {
  const intensity = variant === "dense" ? 1 : variant === "soft" ? 0.5 : 0.8;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-hidden": "true",
      className: "pointer-events-none absolute inset-0 overflow-hidden",
      style: { opacity: intensity },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute -left-24 -top-20 h-72 w-72 animate-morph bg-gradient-primary opacity-30 blur-3xl"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute -bottom-32 -right-20 h-96 w-96 animate-morph bg-gradient-ocean opacity-25 blur-3xl",
            style: { animationDelay: "-7s" }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute left-[8%] top-[20%] animate-drift-slow", children: /* @__PURE__ */ jsx("div", { className: "h-3 w-3 rounded-full bg-primary-glow shadow-glow" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-[12%] top-[35%] animate-drift-reverse", children: /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full border-2 border-primary-glow/40" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute h-2 w-2 animate-orbit rounded-full bg-primary-glow shadow-glow" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute h-1.5 w-1.5 animate-orbit-reverse rounded-full bg-primary",
              style: { animationDuration: "36s" }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute bottom-[18%] left-[14%] h-14 w-14 rotate-12 animate-tilt rounded-2xl border border-primary/30 bg-card/40"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute right-[8%] bottom-[22%] h-3 w-3 animate-pulse-glow rounded-full bg-primary-glow" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute left-[-10%] top-1/3 h-px w-[60%] rotate-[8deg] bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent opacity-50 animate-drift-slow",
            style: { animationDuration: "28s" }
          }
        )
      ]
    }
  );
}
function KineticText({
  children,
  as,
  className,
  stagger = 60,
  delay = 0,
  variant = "blur",
  highlight = [],
  highlightClassName
}) {
  const ref = useRef(null);
  const Tag = as ?? "p";
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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const words = children.split(/(\s+)/);
  let wordIndex = 0;
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn(`kinetic kinetic-${variant}`, className),
      style: { ["--kinetic-base"]: `${delay}ms` },
      children: words.map((token, i) => {
        if (/^\s+$/.test(token)) return token;
        const idx = wordIndex++;
        const isHighlight = highlight.includes(token.replace(/[.,!?"]/g, ""));
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: cn("kinetic-word", isHighlight && highlightClassName),
            style: {
              ["--kinetic-i"]: idx,
              transitionDelay: `calc(var(--kinetic-base) + ${idx * stagger}ms)`
            },
            children: token
          },
          i
        );
      })
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const EvaluationInputSchema = z.object({
  level: z.enum(["iniciante", "intermediario", "avancado", "competitivo"]),
  experience: z.string().min(1).max(60),
  goal: z.string().min(3).max(300),
  weakness: z.string().min(3).max(300),
  frequency: z.string().min(1).max(60)
});
const runTechnicalEvaluation = createServerFn({
  method: "POST"
}).inputValidator((input) => EvaluationInputSchema.parse(input)).handler(createSsrRpc("a642f4768b456b43a015bb7210e0084c413d3581b30ebfa376a3f186d5339e99"));
const LEVELS = [
  { value: "iniciante", label: "Iniciante — nunca joguei sério" },
  { value: "intermediario", label: "Intermediário — jogo recreativo" },
  { value: "avancado", label: "Avançado — jogo regular" },
  { value: "competitivo", label: "Competitivo — disputo torneios" }
];
function AIEvaluation({ onBook }) {
  const evaluate = useServerFn(runTechnicalEvaluation);
  const [level, setLevel] = useState("");
  const [experience, setExperience] = useState("");
  const [goal, setGoal] = useState("");
  const [weakness, setWeakness] = useState("");
  const [frequency, setFrequency] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!level || !experience || goal.length < 3 || weakness.length < 3 || !frequency) {
      toast.error("Preencha todos os campos para a IA analisar seu jogo.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await evaluate({
        data: {
          level,
          experience,
          goal,
          weakness,
          frequency
        }
      });
      if (res.error || !res.analysis) {
        toast.error(res.error || "Falha na avaliação.");
        return;
      }
      setResult(res.analysis);
      toast.success("Avaliação pronta!", {
        description: "Confira o diagnóstico abaixo."
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado na avaliação.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "avaliacao-ia",
      className: "relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background py-20 md:py-28",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-secondary/25 blur-3xl"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-5xl px-6", children: [
          /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto mb-12 max-w-2xl text-center", children: [
            /* @__PURE__ */ jsxs(Badge, { className: "mb-4 border-primary/30 bg-primary/10 text-primary", children: [
              /* @__PURE__ */ jsx(Brain, { className: "mr-1 h-3 w-3" }),
              " Avaliação técnica com IA"
            ] }),
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold tracking-tight md:text-5xl", children: [
              "Descubra em ",
              /* @__PURE__ */ jsx("span", { className: "text-red-600 font-extrabold", children: "60 segundos" }),
              " o seu plano ideal"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground md:text-lg", children: "Responda 5 perguntas. A IA cruza seu perfil com a metodologia do coach e devolve um diagnóstico técnico + pacote recomendado para você evoluir mais rápido." })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden border-border/60 shadow-elevated", children: [
            /* @__PURE__ */ jsx("div", { className: "h-2 bg-gradient-primary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs(CardContent, { className: "p-6 md:p-10", children: [
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "grid gap-5 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "ia-level", children: "Seu nível atual" }),
                  /* @__PURE__ */ jsxs(Select, { value: level, onValueChange: setLevel, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { id: "ia-level", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Escolha seu nível" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: LEVELS.map((l) => /* @__PURE__ */ jsx(SelectItem, { value: l.value, children: l.label }, l.value)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "ia-exp", children: "Há quanto tempo joga?" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "ia-exp",
                      value: experience,
                      onChange: (e) => setExperience(e.target.value),
                      placeholder: "Ex: 2 anos, ou comecei agora",
                      maxLength: 60
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "ia-freq", children: "Frequência semanal disponível" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "ia-freq",
                      value: frequency,
                      onChange: (e) => setFrequency(e.target.value),
                      placeholder: "Ex: 1 aula por semana",
                      maxLength: 60
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "ia-goal", children: "Seu objetivo principal" }),
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      id: "ia-goal",
                      value: goal,
                      onChange: (e) => setGoal(e.target.value),
                      placeholder: "Ex: melhorar saque viagem para competir no circuito amador",
                      rows: 2,
                      maxLength: 300
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "ia-weak", children: "Sua maior dificuldade hoje" }),
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      id: "ia-weak",
                      value: weakness,
                      onChange: (e) => setWeakness(e.target.value),
                      placeholder: "Ex: defesa contra ataques fortes, leitura do bloqueio, condicionamento",
                      rows: 2,
                      maxLength: 300
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    disabled: loading,
                    className: "w-full shadow-glow md:w-auto",
                    children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                      "Analisando seu jogo..."
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "mr-2 h-4 w-4" }),
                      "Gerar minha avaliação"
                    ] })
                  }
                ) })
              ] }),
              result && /* @__PURE__ */ jsxs("div", { className: "mt-10 animate-fade-in space-y-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsx(Brain, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-primary", children: "Diagnóstico técnico" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 text-base leading-relaxed text-foreground/90", children: result.diagnostico })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground", children: [
                    /* @__PURE__ */ jsx(Target, { className: "h-4 w-4 text-primary" }),
                    " Prioridades de treino"
                  ] }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: result.prioridades.map((p, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-foreground/85", children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
                    /* @__PURE__ */ jsx("span", { children: p })
                  ] }, i)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
                    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(Trophy, { className: "h-3.5 w-3.5 text-primary" }),
                      " Pacote recomendado"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 font-display text-xl font-bold text-primary", children: result.pacote_recomendado }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: result.pacote_motivo })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
                    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5 text-primary" }),
                      " Tempo estimado"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 font-display text-xl font-bold", children: result.tempo_estimado })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "rounded-xl bg-secondary/10 p-4 text-sm italic text-foreground/90", children: [
                  '"',
                  result.pitch_final,
                  '"'
                ] }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "w-full shadow-glow md:w-auto",
                    onClick: () => onBook(result.pacote_recomendado),
                    children: [
                      "Quero a aula experimental",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function HScroll({
  children,
  mdGridClassName = "md:grid-cols-3",
  gapClassName = "gap-4 md:gap-6",
  className = "",
  showHint = true,
  fadeFromClassName = "from-background"
}) {
  const ref = useRef(null);
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
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: `pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r ${fadeFromClassName} to-transparent transition-opacity duration-300 md:hidden ${scrollable && !atStart ? "opacity-100" : "opacity-0"}`
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: `pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l ${fadeFromClassName} to-transparent transition-opacity duration-300 md:hidden ${scrollable && !atEnd ? "opacity-100" : "opacity-0"}`
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: `-mx-6 flex snap-x snap-mandatory items-stretch overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${gapClassName} ${mdGridClassName} ${className}`,
        children
      }
    ),
    showHint && /* @__PURE__ */ jsxs(
      "p",
      {
        className: `mt-3 flex items-center justify-center gap-1 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground/70 transition-opacity duration-500 md:hidden ${hasScrolled || !scrollable ? "opacity-0" : "opacity-100"}`,
        children: [
          "Arraste",
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 animate-pulse" })
        ]
      }
    )
  ] });
}
function HScrollItem({
  children,
  basis = "min-w-[85%] xs:min-w-[78%] sm:min-w-[60%]",
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${basis} flex shrink-0 snap-start flex-col [&>*]:h-full [&>*]:w-full md:min-w-0 md:shrink ${className}`,
      children
    }
  );
}
const PACKAGES = [
  {
    name: "Experimental",
    price: "R$ 35",
    unit: "1 aula avulsa · 60 min",
    description: "Conheça a metodologia e teste a química com o coach antes de fechar um plano.",
    perks: [
      "Diagnóstico técnico ao vivo",
      "Vídeo curto com seus pontos fortes",
      "Plano de evolução personalizado"
    ],
    cta: "Reservar experimental",
    featured: false
  },
  {
    name: "Foco 1x semana",
    price: "R$ 160",
    unit: "4 aulas / mês",
    description: "Ritmo ideal para quem está começando ou quer manter constância sem peso na rotina.",
    perks: [
      "1 treino individual por semana",
      "Plano técnico mensal",
      "Acompanhamento por WhatsApp",
      "Reposição em caso de imprevisto"
    ],
    cta: "Começar com 1x",
    featured: false
  },
  {
    name: "Evolução 2x semana",
    price: "R$ 300",
    unit: "8 aulas / mês",
    description: "O pacote que mais transforma: dobro de repetições, evolução visível em poucas semanas.",
    perks: [
      "2 treinos individuais por semana",
      "Análise técnica profissional mensal",
      "Plano técnico + condicionamento",
      "Reposição em caso de imprevisto"
    ],
    cta: "Quero evoluir",
    featured: true
  },
  {
    name: "Performance 3x semana",
    price: "R$ 450",
    unit: "12 aulas / mês",
    description: "Para quem joga torneios e quer chegar no próximo patamar de jogo.",
    perks: [
      "3 treinos individuais por semana",
      "Análise técnica profissional quinzenal",
      "Ataque, bloqueio e sistemas",
      "Acompanhamento próximo por WhatsApp",
      "Suporte tático pré-torneio"
    ],
    cta: "Performance total",
    featured: false
  }
];
function Packages({ onSelect }) {
  return /* @__PURE__ */ jsx("section", { id: "pacotes", className: "relative overflow-hidden py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
    /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto mb-14 max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "mb-4", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "mr-1 h-3 w-3" }),
        " Pacotes"
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold tracking-tight md:text-5xl", children: [
        "Escolha sua ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-600 font-extrabold", children: "jornada" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground md:text-lg", children: "Treinos individuais, sob medida. Comece com uma aula experimental e veja a diferença no primeiro saque." })
    ] }),
    /* @__PURE__ */ jsx(HScroll, { mdGridClassName: "md:grid-cols-2 lg:grid-cols-4", fadeFromClassName: "from-transparent", children: PACKAGES.map((p, i) => /* @__PURE__ */ jsx(HScrollItem, { basis: "min-w-[78%] xs:min-w-[70%] sm:min-w-[46%] max-w-[78%] xs:max-w-[70%] sm:max-w-[46%]", children: /* @__PURE__ */ jsx(Reveal, { delay: i * 100, children: /* @__PURE__ */ jsxs(
      Card,
      {
        className: `relative h-full overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 ${p.featured ? "border-primary/70 bg-gradient-to-br from-primary/10 via-card to-card shadow-glow md:scale-[1.03]" : "border-border/60 bg-card hover:border-primary/40 hover:shadow-elevated"}`,
        children: [
          p.featured && /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg bg-gradient-primary px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-md", children: "Mais escolhido" }),
          /* @__PURE__ */ jsxs(CardContent, { className: `flex h-full flex-col p-5 sm:p-6 ${p.featured ? "pt-8" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
              p.featured && /* @__PURE__ */ jsx(Flame, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-bold sm:text-xl", children: p.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-display text-3xl font-extrabold text-primary sm:text-4xl", children: p.price }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "/mês" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-[10px] uppercase tracking-wider text-muted-foreground", children: p.unit }),
            /* @__PURE__ */ jsx("p", { className: "mb-5 text-xs leading-relaxed text-foreground/80 sm:text-sm", children: p.description }),
            /* @__PURE__ */ jsx("ul", { className: "mb-6 flex-1 space-y-2.5", children: p.perks.map((perk) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-xs sm:text-[13px]", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground/85", children: perk })
            ] }, perk)) }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => onSelect(p.name),
                size: "sm",
                variant: p.featured ? "default" : "outline",
                className: p.featured ? "w-full shadow-glow" : "w-full",
                children: [
                  p.cta,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-3.5 w-3.5" })
                ]
              }
            )
          ] })
        ]
      }
    ) }) }, p.name)) })
  ] }) });
}
const volleyballPlayer = "/assets/volleyball-player-male-logo-C2eZ7-kU.png";
function BrandLogo({ className, showWordmark = true }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: volleyballPlayer,
        alt: "Beach Hurt",
        className: "h-8 w-auto object-contain sm:h-10 md:h-11",
        width: 512,
        height: 512
      }
    ),
    showWordmark && /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-[18px] font-light tracking-[4px] sm:text-[20px] sm:tracking-[5px] md:text-[22px] md:tracking-[6px]",
        style: {
          fontFamily: "var(--font-display), Sora, ui-sans-serif, system-ui, sans-serif",
          background: "linear-gradient(135deg, #e8c87a, #c9a55a, #8a6a2c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        },
        children: "BEACH HURT"
      }
    )
  ] });
}
const LINKS = [
  { href: "#avaliacao-ia", label: "Avaliação IA" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#galeria", label: "Galeria" },
  { href: "#coach", label: "Coach" },
  { href: "#agendar", label: "Agendar" }
];
function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const rafRef = useRef(null);
  const scrolledRef = useRef(false);
  const activeRef = useRef("");
  useEffect(() => {
    const updateHeaderState = () => {
      const nextScrolled = window.scrollY > 24;
      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
      const ids = LINKS.map((l) => l.href.slice(1));
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
      if (activeRef.current !== current) {
        activeRef.current = current;
        setActive(current);
      }
    };
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateHeaderState();
      });
    };
    updateHeaderState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const handleClick = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: cn(
          "sticky top-0 z-50 transition-all duration-700",
          scrolled ? "border-b border-border/30 bg-background/95 shadow-sm" : "border-b border-transparent bg-background/40"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-8 sm:py-3.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleClick("#top"),
                className: "group flex items-center gap-2",
                "aria-label": "Ir ao topo",
                children: /* @__PURE__ */ jsx(BrandLogo, { className: "h-12 w-auto text-foreground transition-opacity duration-700 group-hover:opacity-80 sm:h-14 md:h-16" })
              }
            ),
            /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-0.5 lg:flex", children: LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleClick(link.href),
                  className: cn(
                    "group relative rounded-full px-3.5 py-1.5 text-[13px] font-normal tracking-wide transition-colors duration-500",
                    isActive ? "text-foreground" : "text-muted-foreground/80 hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10", children: link.label }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: cn(
                          "absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 translate-y-3 rounded-full bg-primary/70 transition-all duration-500",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        )
                      }
                    )
                  ]
                },
                link.href
              );
            }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  asChild: true,
                  size: "sm",
                  variant: "ghost",
                  className: "hidden h-8 rounded-full border border-border/40 px-4 text-[12px] font-normal tracking-wide text-foreground/90 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground sm:inline-flex",
                  onClick: (e) => {
                    e.preventDefault();
                    handleClick("#agendar");
                  },
                  children: /* @__PURE__ */ jsxs("a", { href: "#agendar", children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "mr-1.5 h-3.5 w-3.5 opacity-70" }),
                    "Aula experimental"
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setOpen((v) => !v),
                  className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/80 text-foreground/80 shadow-sm transition-all duration-500 hover:border-primary/40 hover:text-foreground lg:hidden",
                  "aria-label": open ? "Fechar menu" : "Abrir menu",
                  children: open ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "fixed inset-0 z-40 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        ),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-background/95",
              onClick: () => setOpen(false)
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-x-0 top-0 mt-[76px] origin-top px-4 pb-8 transition-transform duration-500",
                open ? "translate-y-0" : "-translate-y-4"
              ),
              children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border/30 bg-background p-5 shadow-elevated", children: [
                /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-24 -right-24 h-44 w-44 rounded-full bg-gradient-primary opacity-15 blur-3xl" }),
                /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-24 -left-24 h-44 w-44 rounded-full bg-primary/15 blur-3xl" }),
                /* @__PURE__ */ jsxs("nav", { className: "relative flex flex-col", children: [
                  LINKS.map((link, i) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => handleClick(link.href),
                      style: { transitionDelay: `${open ? i * 50 : 0}ms` },
                      className: cn(
                        "group flex items-center justify-between border-b border-border/20 px-2 py-3.5 text-left text-[15px] font-light tracking-wide text-foreground/85 transition-all duration-500 last:border-b-0 hover:text-foreground",
                        open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                      ),
                      children: [
                        /* @__PURE__ */ jsx("span", { children: link.label }),
                        /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5 -translate-x-1 text-primary/70 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" })
                      ]
                    },
                    link.href
                  )),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "mt-5 h-10 w-full rounded-full border border-border/40 text-[13px] font-normal tracking-wide hover:border-primary/50 hover:bg-primary/5",
                      onClick: () => handleClick("#agendar"),
                      children: [
                        /* @__PURE__ */ jsx(Sparkles, { className: "mr-1.5 h-3.5 w-3.5 opacity-70" }),
                        "Aula experimental"
                      ]
                    }
                  )
                ] })
              ] })
            }
          )
        ]
      }
    )
  ] });
}
const PILLARS = [
  { icon: Crosshair, name: "Saque", tag: "Pressão", desc: "Saque viagem, jornada e flutuante com leitura de vento." },
  { icon: Hand, name: "Manchete", tag: "Recepção", desc: "Plataforma estável e ângulo correto sob qualquer pressão." },
  { icon: ArrowUpCircle, name: "Levantamento", tag: "Conexão", desc: "Toque limpo, segundo ajuste e bola jogável sempre." },
  { icon: Zap, name: "Ataque", tag: "Finalização", desc: "Aproximação, salto e variação — largada, paralela, diagonal." },
  { icon: Shield, name: "Bloqueio", tag: "Leitura", desc: "Timing, mãos fortes e leitura do levantador adversário." },
  { icon: MoveDiagonal, name: "Defesa", tag: "Coração", desc: "Posicionamento, antecipação e bola viva até o último instante." }
];
function Fundamentals() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden py-20 md:py-28", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-primary-glow/10 blur-3xl"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-6xl px-6", children: /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mb-3", children: "Fundamentos do jogo" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-3xl font-bold tracking-tight md:text-4xl", children: [
        "Os ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "seis pilares" }),
        " que treinamos juntos"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground md:text-base", children: "Metodologia profissional aplicada a cada gesto. Do primeiro saque ao bloqueio decisivo." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative mt-14", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": "true",
          className: "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-24"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": "true",
          className: "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-24"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-12 [&::-webkit-scrollbar]:hidden",
          style: { scrollbarWidth: "none" },
          children: PILLARS.map(({ icon: Icon, name, tag, desc }, i) => /* @__PURE__ */ jsx(
            Reveal,
            {
              delay: i * 80,
              className: "snap-start shrink-0 basis-[78%] sm:basis-[44%] md:basis-[34%] lg:basis-[28%]",
              children: /* @__PURE__ */ jsxs("div", { className: "group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/90 hover:shadow-elevated", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:border-primary/60", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground", children: tag })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "mt-5 font-display text-xl font-bold tracking-tight", children: name }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: desc }),
                /* @__PURE__ */ jsx("div", { className: "mt-5 h-px w-10 bg-gradient-to-r from-primary/60 to-transparent transition-all duration-500 group-hover:w-20" })
              ] })
            },
            name
          ))
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground/70", children: "Arraste para o lado para ver todos os pilares →" })
    ] })
  ] });
}
const accentBall = "/assets/accent-ball-PjVPsixZ.png";
const accentPlayer = "/assets/accent-player-CqsaSMee.png";
const accentWhistle = "/assets/accent-whistle-gI5E8l_W.png";
const SOURCES = {
  ball: accentBall,
  player: accentPlayer,
  whistle: accentWhistle
};
function FloatingAccent({
  variant,
  className,
  size = "w-40 md:w-56",
  rotate = 0,
  opacity = 0.85,
  flip = false,
  blur = false,
  glow = true
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute select-none",
        "animate-[float_9s_ease-in-out_infinite]",
        size,
        className
      ),
      style: {
        opacity,
        transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
        filter: blur ? "blur(1px)" : void 0
      },
      children: [
        glow && /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 -z-10 rounded-full bg-primary/25 blur-3xl"
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: SOURCES[variant],
            alt: "",
            loading: "lazy",
            className: "h-full w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
          }
        )
      ]
    }
  );
}
const heroImage = "/assets/hero-volei-ByG_Q_xV.jpg";
const sandCourtImage = "/assets/sand-court-C4pR_eLP.jpg";
const ballSandImage = "/assets/ball-sand-DyUdAEZL.jpg";
const coachImage = "/assets/coach-vinicius-C49vFdtA.jpeg";
const coachPortrait = "/assets/coach-vinicius-DGiuZ4Qn.png";
const actionSpike = "/assets/action-spike-B3XXrzeZ.jpg";
const WHATSAPP_NUMBER = "5548988146267";
const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const BENEFITS = [{
  icon: Target,
  title: "Treino 100% individual",
  description: "Foco total no seu jogo: cada movimento ajustado, cada fundamento refinado no seu ritmo."
}, {
  icon: Trophy,
  title: "Técnica de alto nível",
  description: "Saque, manchete, levantamento, ataque e bloqueio com metodologia profissional."
}, {
  icon: HeartPulse,
  title: "Condicionamento real",
  description: "Explosão, agilidade e resistência específica para a quadra — não academia genérica."
}, {
  icon: Sparkles,
  title: "Evolução visível",
  description: "Plano semanal, vídeo-análise opcional e metas claras a cada mês."
}];
function Index() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedPack, setSelectedPack] = useState("");
  const handlePackSelect = (pack) => {
    setSelectedPack(pack);
    setNotes((prev) => prev.includes("Pacote de interesse") ? prev.replace(/Pacote de interesse:.*?(\n|$)/, `Pacote de interesse: ${pack}
`) : (prev ? prev + "\n" : "") + `Pacote de interesse: ${pack}`);
    document.getElementById("agendar")?.scrollIntoView({
      behavior: "smooth"
    });
    toast.success(`Pacote ${pack} selecionado`, {
      description: "Preencha seus dados para reservar a aula experimental."
    });
  };
  const minDate = useMemo(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0], []);
  const isValidDay = (value) => {
    if (!value) return true;
    const day = (/* @__PURE__ */ new Date(`${value}T12:00:00`)).getDay();
    return day >= 1 && day <= 6;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time) {
      toast.error("Preencha nome, telefone, data e horário.");
      return;
    }
    if (!isValidDay(date)) {
      toast.error("As aulas acontecem de segunda a sábado.");
      return;
    }
    const formattedDate = (/* @__PURE__ */ new Date(`${date}T12:00:00`)).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long"
    });
    const message = `Olá! Quero agendar uma aula experimental de vôlei na quadra de areia.%0A%0A*Nome:* ${name}%0A*Telefone:* ${phone}%0A` + (email ? `*E-mail:* ${email}%0A` : "") + `*Data:* ${formattedDate}%0A*Horário:* ${time}%0A` + (selectedPack ? `*Pacote de interesse:* ${selectedPack}%0A` : "") + (notes ? `*Objetivo:* ${notes}%0A` : "");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Redirecionando para o WhatsApp...", {
      description: `Finalize sua reserva na conversa com o coach.`
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxs("section", { id: "top", className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(FloatingAccent, { variant: "player", size: "w-48 md:w-72 lg:w-96", className: "-right-10 top-10 z-10 md:right-4 lg:right-12", opacity: 0.55, rotate: -6 }),
      /* @__PURE__ */ jsx(FloatingAccent, { variant: "ball", size: "w-20 md:w-28", className: "left-[8%] top-[18%] z-10 hidden md:block", opacity: 0.7, rotate: -12 }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-hero opacity-60", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-90", style: {
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }, "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-background/60", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx(SurrealCanvas, { variant: "dense" }),
      /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "pointer-events-none absolute right-[8%] top-[12%] hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "animate-float", children: /* @__PURE__ */ jsx("div", { className: "grid h-20 w-20 animate-spin-slow place-items-center rounded-full bg-white text-4xl shadow-glow", children: "🏐" }) }) }),
      /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "pointer-events-none absolute bottom-[18%] left-[6%] hidden h-3 w-3 animate-pulse-glow rounded-full bg-primary md:block" }),
      /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-3xl items-center gap-12 px-5 py-20 sm:px-6 sm:py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "text-foreground", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 shadow-sm backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-primary", children: "Aulas particulares" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-[2rem] font-extrabold leading-[1.1] tracking-tight text-foreground drop-shadow-sm sm:text-4xl md:text-6xl", children: [
          "Domine a",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "relative inline-block text-primary", children: [
            "areia",
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "absolute -bottom-1 left-0 -z-10 h-2 w-full rounded-full bg-primary/25" })
          ] }),
          ". Aulas individuais de vôlei na quadra."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg", children: [
          "Atendimento de ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "segunda a sábado, das 8h às 17h" }),
          ", em",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: " quadra de areia" }),
          ". Treine com um coach com",
          " ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "12 anos de experiência" }),
          ", focado 100% em você."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "group justify-between rounded-2xl bg-foreground px-6 py-6 font-bold text-background shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-[0_22px_48px_-12px_rgba(0,0,0,0.55)]", children: /* @__PURE__ */ jsxs("a", { href: "#agendar", children: [
            /* @__PURE__ */ jsx("span", { children: "Reservar aula experimental" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-2xl border-2 border-border/70 bg-background/70 px-6 py-6 font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-background/90 hover:shadow-md", children: /* @__PURE__ */ jsxs("a", { href: "#avaliacao-ia", children: [
            /* @__PURE__ */ jsx(Brain, { className: "mr-2 h-4 w-4 text-primary" }),
            " Avaliação técnica com IA"
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-foreground/75", children: ["12 anos de experiência", "Quadra de areia", "Todos os níveis"].map((item) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/25", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3 w-3 text-primary", strokeWidth: 3 }) }),
          item
        ] }, item)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "relative overflow-hidden border-y border-border bg-secondary py-5 text-secondary-foreground", children: /* @__PURE__ */ jsx("div", { className: "flex w-max animate-marquee gap-12 whitespace-nowrap pr-12 text-sm font-semibold uppercase tracking-[0.25em] opacity-90", children: Array.from({
      length: 2
    }).map((_, group) => /* @__PURE__ */ jsx("div", { className: "flex gap-12", children: ["🏐 Saque viagem", "Manchete", "Levantamento", "Ataque", "Bloqueio", "Defesa de líbero", "Leitura de jogo", "Explosão", "Ritmo", "Foco"].map((label, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary-glow", children: "●" }),
      label
    ] }, `${group}-${i}`)) }, group)) }) }),
    /* @__PURE__ */ jsxs("section", { id: "beneficios", className: "relative mx-auto max-w-6xl px-6 py-20 md:py-28", children: [
      /* @__PURE__ */ jsx(FloatingAccent, { variant: "ball", size: "w-32 md:w-44", className: "-right-6 top-10 z-0", opacity: 0.45, rotate: 18 }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mb-4", children: "Por que treinar comigo" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Um treino feito sob medida para a sua evolução" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Cada aluno tem um corpo, uma história e um objetivo. Eu desenho cada sessão para destravar o seu próximo nível." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-3 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4", children: BENEFITS.map(({
        icon: Icon,
        title,
        description
      }, idx) => /* @__PURE__ */ jsx(Reveal, { delay: idx * 90, children: /* @__PURE__ */ jsxs(Card, { className: "group relative h-full overflow-hidden border-border/60 hover-lift", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex h-full flex-col p-4 sm:p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:mb-4 sm:h-12 sm:w-12", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 sm:h-6 sm:w-6" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold leading-snug sm:text-lg", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[13px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm", children: description })
        ] })
      ] }) }, title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "horarios", className: "bg-gradient-soft py-20 md:py-28", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mb-4", children: "Horários" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Segunda a sábado, das 8h às 17h." }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-muted-foreground", children: [
          "Agenda flexível para encaixar no seu ritmo. Os turnos começam às",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "8h" }),
          " e a última aula começa às ",
          /* @__PURE__ */ jsx("strong", { children: "17h" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card", children: [
            /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Aula individual — 60 minutos" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Aquecimento, fundamentos, situações de jogo e feedback final." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card", children: [
            /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Quadra de areia" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Areia fina, rede oficial e ambiente premium. Endereço enviado após confirmação no WhatsApp." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "overflow-hidden border-border/60 shadow-elevated", children: /* @__PURE__ */ jsxs("div", { className: "bg-secondary", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[460px] overflow-hidden bg-secondary/20 sm:h-[500px]", children: /* @__PURE__ */ jsx("img", { src: sandCourtImage, alt: "Quadra de areia ao pôr do sol", loading: "lazy", className: "h-full w-full object-cover object-[center_30%]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-secondary p-6 text-secondary-foreground", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] opacity-80", children: "Esta semana" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-3xl font-bold", children: "30 vagas abertas" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm opacity-90", children: "Reserve antes que esgote" })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Fundamentals, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative h-80 overflow-hidden md:h-96", children: [
      /* @__PURE__ */ jsx("img", { src: ballSandImage, alt: "Bola de vôlei na areia", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover object-[center_70%]" }),
      /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/55 to-primary/45" }),
      /* @__PURE__ */ jsx("div", { className: "relative mx-auto flex h-full max-w-5xl items-center justify-center px-6 text-center text-secondary-foreground", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.4em] opacity-80", children: "Beach volleyball" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xl font-bold leading-tight sm:text-2xl md:text-4xl", children: [
          '"A areia exige técnica, leitura e coração. ',
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          'Eu te entrego os três."'
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "galeria", className: "relative overflow-hidden py-12 md:py-16", children: [
      /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-3xl px-6", children: [
        /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto mb-8 max-w-xl text-center", children: [
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "mb-3", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "mr-1 h-3 w-3" }),
            " Bastidores"
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-2xl font-bold tracking-tight md:text-3xl", children: [
            "Momentos que ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "contam histórias" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 md:gap-4", children: [{
          src: actionSpike,
          label: "Ataque",
          alt: "Ataque na areia"
        }, {
          src: coachImage,
          label: "Saque",
          alt: "Vinicius sacando na areia"
        }].map((it, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 90, children: /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
          /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "absolute -inset-0.5 rounded-2xl bg-gradient-primary opacity-30 blur-xl transition duration-500 group-hover:opacity-60" }),
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border/60 shadow-card", children: [
            /* @__PURE__ */ jsx("img", { src: it.src, alt: it.alt, loading: "lazy", className: "aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-secondary via-secondary/10 to-transparent" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 p-2.5 md:p-3", children: /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-[0.35em] text-primary-glow", children: it.label }) })
          ] })
        ] }) }, it.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "coach", className: "relative mx-auto max-w-6xl px-6 py-20 md:py-28", children: [
      /* @__PURE__ */ jsx(FloatingAccent, { variant: "whistle", size: "w-28 md:w-36", className: "-left-4 top-12 z-0 md:left-2", opacity: 0.4, rotate: -15 }),
      /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 md:grid-cols-2", children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-30 blur-3xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[2rem] border border-border/60 shadow-elevated", children: [
            /* @__PURE__ */ jsx("img", { src: coachPortrait, alt: "Vinicius Hurt — coach de vôlei na areia", loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent p-6 text-secondary-foreground", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] opacity-80", children: "Seu coach" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 font-display text-2xl font-bold", children: "Vinicius Hurt" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Reveal, { delay: 120, children: [
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "mb-4", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "mr-1 h-3 w-3" }),
            " Sobre mim"
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: [
            "Areia, ritmo e ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "técnica" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-5 text-muted-foreground", children: [
            "Sou Vinicius Hurt, atleta e coach de vôlei de praia com",
            " ",
            /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "12 anos de experiência" }),
            " em quadra de areia. Cada aula é desenhada para destravar o seu próximo nível: leitura de jogo, fundamento limpo e condicionamento específico — no seu ritmo, com foco total em você."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [{
            value: "12+",
            label: "Anos de experiência"
          }, {
            value: "100%",
            label: "Atenção individual"
          }, {
            value: "60min",
            label: "Por sessão"
          }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 text-center shadow-card hover-lift", children: [
            /* @__PURE__ */ jsx("p", { className: "font-display text-3xl font-bold text-primary", children: s.value }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground", children: s.label })
          ] }, s.label)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-3", children: /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "shadow-glow", children: /* @__PURE__ */ jsxs("a", { href: "#agendar", children: [
            "Quero treinar com o Vini ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AIEvaluation, { onBook: handlePackSelect }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden border-y border-border/40 bg-secondary py-20 text-secondary-foreground md:py-28", children: [
      /* @__PURE__ */ jsx(SurrealCanvas, { variant: "soft" }),
      /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.85_0.04_78/0.5)_70%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-3xl px-6 text-center", children: [
        /* @__PURE__ */ jsx(KineticText, { as: "p", variant: "drop", stagger: 70, className: "mx-auto block font-display text-2xl italic text-secondary-foreground/90 md:text-3xl", highlight: ["domina"], highlightClassName: "text-gradient-primary not-italic font-bold", children: '"A diferença entre quem joga e quem domina cabe em uma decisão."' }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "shadow-glow animate-pulse-glow", children: /* @__PURE__ */ jsxs("a", { href: "#agendar", children: [
            "Reservar minha primeira aula ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-primary/30 bg-card/40 text-foreground hover:bg-card/70", children: /* @__PURE__ */ jsx("a", { href: `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Quero%20saber%20mais.`, target: "_blank", rel: "noopener noreferrer", children: "Tirar dúvidas no WhatsApp" }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Vagas limitadas · Segunda a sábado · Quadra de areia" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Packages, { onSelect: handlePackSelect }),
    /* @__PURE__ */ jsxs("section", { id: "agendar", className: "relative mx-auto max-w-4xl overflow-hidden px-6 py-20 md:py-28", children: [
      /* @__PURE__ */ jsx(FloatingAccent, { variant: "ball", size: "w-24 md:w-32", className: "-left-6 top-16 z-0 hidden md:block", opacity: 0.4, rotate: -22 }),
      /* @__PURE__ */ jsx(FloatingAccent, { variant: "ball", size: "w-16 md:w-20", className: "bottom-20 right-2 z-0 hidden md:block", opacity: 0.35, rotate: 28 }),
      /* @__PURE__ */ jsx(SurrealCanvas, { variant: "soft" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto mb-10 max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx(Badge, { className: "mb-4 bg-gradient-primary text-primary-foreground shadow-md", children: "Agendamento" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight md:text-4xl", children: "Reserve sua aula experimental" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Escolha o dia (segunda a sábado) e o horário. Confirmamos em até 24h pelo WhatsApp." }),
        selectedPack && /* @__PURE__ */ jsxs("div", { className: "mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
          " Pacote selecionado: ",
          selectedPack
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden border-border/60 shadow-elevated", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-gradient-primary", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(CardContent, { className: "p-6 md:p-10", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nome completo" }),
            /* @__PURE__ */ jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), placeholder: "Seu nome", maxLength: 80 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Telefone / WhatsApp" }),
            /* @__PURE__ */ jsx(Input, { id: "phone", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "(11) 99999-9999", inputMode: "tel", maxLength: 20 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "E-mail (opcional)" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "voce@email.com", maxLength: 120 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "date", children: "Data (seg a sáb)" }),
            /* @__PURE__ */ jsx(Input, { id: "date", type: "date", min: minDate, value: date, onChange: (e) => setDate(e.target.value) }),
            date && !isValidDay(date) ? /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-destructive", children: "Selecione um dia de segunda a sábado." }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "time", children: "Horário" }),
            /* @__PURE__ */ jsxs(Select, { value: time, onValueChange: setTime, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { id: "time", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Escolha um horário" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: TIME_SLOTS.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: s }, s)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "notes", children: "Objetivo do treino (opcional)" }),
            /* @__PURE__ */ jsx(Textarea, { id: "notes", value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Ex.: melhorar saque viagem, defesa de líbero, preparar para campeonato...", rows: 4, maxLength: 500 })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs(Button, { type: "submit", size: "lg", className: "w-full shadow-glow md:w-auto", children: [
            "Enviar pelo WhatsApp",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 font-semibold", children: /* @__PURE__ */ jsx(BrandLogo, { className: "h-10 w-auto text-secondary-foreground opacity-90" }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm opacity-80", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Vinicius Hurt — Aulas particulares de vôlei. Criado por",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://dev.lionlobs.com.br", target: "_blank", rel: "noopener noreferrer", className: "font-medium text-primary-glow underline-offset-4 hover:underline", children: "LionLobs" })
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};
