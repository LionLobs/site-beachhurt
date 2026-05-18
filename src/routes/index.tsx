import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Trophy,
  Target,
  HeartPulse,
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  Brain,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SurrealCanvas } from "@/components/SurrealCanvas";
import { KineticText } from "@/components/KineticText";
import { AIEvaluation } from "@/components/AIEvaluation";
import { Packages } from "@/components/Packages";
import { SiteHeader } from "@/components/SiteHeader";

import { Fundamentals } from "@/components/Fundamentals";
import { FloatingAccent } from "@/components/FloatingAccent";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import heroImage from "@/assets/hero-volei.jpg";
import sandCourtImage from "@/assets/sand-court.jpg";
import ballSandImage from "@/assets/ball-sand.jpg";
import coachImage from "@/assets/coach-vinicius.jpeg";
import { BrandLogo } from "@/components/BrandLogo";
import actionSpike from "@/assets/action-spike.jpg";
import actionBlock from "@/assets/action-block.jpg";
import actionSet from "@/assets/action-set.jpg";

const WHATSAPP_NUMBER = "5548988146267";

export const Route = createFileRoute("/")({
  component: Index,
});

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const BENEFITS = [
  {
    icon: Target,
    title: "Treino 100% individual",
    description:
      "Foco total no seu jogo: cada movimento ajustado, cada fundamento refinado no seu ritmo.",
  },
  {
    icon: Trophy,
    title: "Técnica de alto nível",
    description:
      "Saque, manchete, levantamento, ataque e bloqueio com metodologia profissional.",
  },
  {
    icon: HeartPulse,
    title: "Condicionamento real",
    description:
      "Explosão, agilidade e resistência específica para a quadra — não academia genérica.",
  },
  {
    icon: Sparkles,
    title: "Evolução visível",
    description: "Plano semanal, vídeo-análise opcional e metas claras a cada mês.",
  },
];

function Index() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedPack, setSelectedPack] = useState<string>("");

  const handlePackSelect = (pack: string) => {
    setSelectedPack(pack);
    setNotes((prev) =>
      prev.includes("Pacote de interesse")
        ? prev.replace(/Pacote de interesse:.*?(\n|$)/, `Pacote de interesse: ${pack}\n`)
        : (prev ? prev + "\n" : "") + `Pacote de interesse: ${pack}`,
    );
    document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" });
    toast.success(`Pacote ${pack} selecionado`, {
      description: "Preencha seus dados para reservar a aula experimental.",
    });
  };

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const isValidDay = (value: string) => {
    if (!value) return true;
    const day = new Date(`${value}T12:00:00`).getDay();
    return day >= 1 && day <= 6; // segunda a sábado
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !date || !time) {
      toast.error("Preencha nome, telefone, data e horário.");
      return;
    }
    if (!isValidDay(date)) {
      toast.error("As aulas acontecem de segunda a sábado.");
      return;
    }

    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });

    const message =
      `Olá! Quero agendar uma aula experimental de vôlei na quadra de areia.%0A%0A` +
      `*Nome:* ${name}%0A` +
      `*Telefone:* ${phone}%0A` +
      (email ? `*E-mail:* ${email}%0A` : "") +
      `*Data:* ${formattedDate}%0A` +
      `*Horário:* ${time}%0A` +
      (selectedPack ? `*Pacote de interesse:* ${selectedPack}%0A` : "") +
      (notes ? `*Objetivo:* ${notes}%0A` : "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast.success("Redirecionando para o WhatsApp...", {
      description: `Finalize sua reserva na conversa com o coach.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <FloatingAccent
          variant="player"
          size="w-48 md:w-72 lg:w-96"
          className="-right-10 top-10 z-10 md:right-4 lg:right-12"
          opacity={0.55}
          rotate={-6}
        />
        <FloatingAccent
          variant="ball"
          size="w-20 md:w-28"
          className="left-[8%] top-[18%] z-10 hidden md:block"
          opacity={0.7}
          rotate={-12}
        />
        <div
          className="absolute inset-0 bg-gradient-hero"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" aria-hidden="true" />
        <SurrealCanvas variant="dense" />
        {/* Floating decorative volleyball */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[12%] hidden md:block"
        >
          <div className="animate-float">
            <div className="grid h-20 w-20 animate-spin-slow place-items-center rounded-full bg-white text-4xl shadow-glow">
              🏐
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[18%] left-[6%] hidden h-3 w-3 animate-pulse-glow rounded-full bg-primary md:block"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div className="text-foreground">
            <Badge className="mb-6 bg-foreground/10 text-foreground hover:bg-foreground/15">
              <Sparkles className="mr-1 h-3 w-3" /> Aulas particulares
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Domine a <span className="text-primary">areia</span>. Aulas individuais de vôlei na quadra.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/80">
              Atendimento de <strong>segunda a sábado, das 8h às 17h</strong>, em
              <strong> quadra de areia</strong>. Treine com um coach com{" "}
              <strong>12 anos de experiência</strong>, focado 100% em você.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-glow">
                <a href="#agendar">
                  Reservar aula experimental <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/20 bg-background/40 text-foreground hover:bg-background/60"
              >
                <a href="#avaliacao-ia">
                  <Brain className="mr-2 h-4 w-4" /> Avaliação técnica com IA
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-foreground/75">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> 12 anos de experiência
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Quadra de areia
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Todos os níveis
              </span>
            </div>
          </div>

          {/* Floating schedule card */}
          <div className="relative md:justify-self-end">
            <div className="absolute -inset-4 rounded-3xl bg-primary/30 blur-3xl" aria-hidden="true" />
            <Card className="relative w-full max-w-sm overflow-hidden border-white/20 bg-card/95 shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Agenda da semana
                </CardTitle>
                <CardDescription>Vagas limitadas por turno</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { day: "Segunda-feira", slots: "8h às 17h" },
                  { day: "Terça-feira", slots: "8h às 17h" },
                  { day: "Quarta-feira", slots: "8h às 17h" },
                  { day: "Quinta-feira", slots: "8h às 17h" },
                  { day: "Sexta-feira", slots: "8h às 17h" },
                  { day: "Sábado", slots: "8h às 17h" },
                ].map((d) => (
                  <div
                    key={d.day}
                    className="flex items-center justify-between rounded-xl border border-border bg-sand/40 p-4"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{d.day}</p>
                      <p className="text-sm text-muted-foreground">{d.slots}</p>
                    </div>
                    <Badge className="bg-gradient-primary text-primary-foreground shadow-md">
                      Aberto
                    </Badge>
                  </div>
                ))}
                <div className="rounded-xl bg-secondary/5 p-4 text-sm text-muted-foreground">
                  Domingo: indisponível.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Marquee — rolling keywords */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden border-y border-border bg-secondary py-5 text-secondary-foreground"
      >
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap pr-12 text-sm font-semibold uppercase tracking-[0.25em] opacity-90">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex gap-12">
              {[
                "🏐 Saque viagem",
                "Manchete",
                "Levantamento",
                "Ataque",
                "Bloqueio",
                "Defesa de líbero",
                "Leitura de jogo",
                "Explosão",
                "Ritmo",
                "Foco",
              ].map((label, i) => (
                <span key={`${group}-${i}`} className="flex items-center gap-3">
                  <span className="text-primary-glow">●</span>
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section id="beneficios" className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FloatingAccent
          variant="ball"
          size="w-32 md:w-44"
          className="-right-6 top-10 z-0"
          opacity={0.45}
          rotate={18}
        />
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Por que treinar comigo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Um treino feito sob medida para a sua evolução
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada aluno tem um corpo, uma história e um objetivo. Eu desenho cada sessão para
            destravar o seu próximo nível.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }, idx) => (
            <Reveal key={title} delay={idx * 90}>
              <Card className="group relative h-full overflow-hidden border-border/60 hover-lift">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="flex h-full flex-col p-4 sm:p-6">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:mb-4 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">{description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      {/* Schedule highlight */}
      <section id="horarios" className="bg-gradient-soft py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">
                Horários
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Segunda a sábado, das 8h às 17h.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Agenda flexível para encaixar no seu ritmo. Os turnos começam às{" "}
                <strong>8h</strong> e a última aula começa às <strong>17h</strong>.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Aula individual — 60 minutos</p>
                    <p className="text-sm text-muted-foreground">
                      Aquecimento, fundamentos, situações de jogo e feedback final.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Quadra de areia</p>
                    <p className="text-sm text-muted-foreground">
                      Areia fina, rede oficial e ambiente premium. Endereço enviado após confirmação no WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-border/60 shadow-elevated">
              <div className="bg-secondary">
                <div className="h-[460px] overflow-hidden bg-secondary/20 sm:h-[500px]">
                  <img
                    src={sandCourtImage}
                    alt="Quadra de areia ao pôr do sol"
                    loading="lazy"
                    className="h-full w-full object-cover object-[center_30%]"
                  />
                </div>
                <div className="bg-secondary p-6 text-secondary-foreground">
                  <p className="text-xs uppercase tracking-[0.25em] opacity-80">Esta semana</p>
                  <p className="mt-1 text-3xl font-bold">30 vagas abertas</p>
                  <p className="mt-1 text-sm opacity-90">Reserve antes que esgote</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Fundamentals */}
      <Fundamentals />

      {/* Sand strip with quote */}
      <section className="relative h-80 overflow-hidden md:h-96">
        <img
          src={ballSandImage}
          alt="Bola de vôlei na areia"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/55 to-primary/45"
        />
        <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center px-6 text-center text-secondary-foreground">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] opacity-80">Beach volleyball</p>
            <p className="mt-3 text-xl font-bold leading-tight sm:text-2xl md:text-4xl">
              "A areia exige técnica, leitura e coração. <br className="hidden md:block" />
              Eu te entrego os três."
            </p>
          </div>
        </div>
      </section>

      {/* Cinematic Parallax Strip */}
      <section
        aria-hidden="true"
        className="relative h-64 overflow-hidden md:h-80"
      >
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover scale-110"
          style={{ backgroundImage: `url(${actionBlock})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/60 to-secondary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="relative mx-auto flex h-full max-w-5xl items-center px-6">
          <div className="max-w-md text-secondary-foreground">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-glow">
              Salto vertical
            </p>
            <p className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl">
              Bloqueio é leitura, não força.
            </p>
          </div>
        </div>
      </section>

      {/* Cinematic Gallery — compact */}
      <section id="galeria" className="relative overflow-hidden py-16 md:py-20">
        <div
          aria-hidden="true"
          className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="mx-auto mb-10 max-w-xl text-center">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" /> Bastidores
            </Badge>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Momentos que <span className="text-gradient-primary">contam histórias</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {[
              { src: actionSpike, label: "Ataque", alt: "Ataque na areia" },
              { src: actionBlock, label: "Bloqueio", alt: "Bloqueio no pôr do sol" },
              { src: actionSet, label: "Toque", alt: "Levantamento" },
            ].map((it, i) => (
              <Reveal key={it.label} delay={i * 90}>
                <div className="group relative">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-0.5 rounded-2xl bg-gradient-primary opacity-30 blur-xl transition duration-500 group-hover:opacity-60"
                  />
                  <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-card">
                    <img
                      src={it.src}
                      alt={it.alt}
                      loading="lazy"
                      className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-glow">
                        {it.label}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials removed */}

      {/* About the coach */}
      <section id="coach" className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FloatingAccent
          variant="whistle"
          size="w-28 md:w-36"
          className="-left-4 top-12 z-0 md:left-2"
          opacity={0.4}
          rotate={-15}
        />
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-30 blur-3xl"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/60 shadow-elevated">
                <img
                  src={coachImage}
                  alt="Vinicius Hurt — coach de vôlei na areia"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent p-6 text-secondary-foreground">
                  <p className="text-xs uppercase tracking-[0.3em] opacity-80">Seu coach</p>
                  <p className="mt-1 font-display text-2xl font-bold">Vinicius Hurt</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" /> Sobre mim
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Areia, ritmo e <span className="text-gradient-primary">técnica</span>.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Sou Vinicius Hurt, atleta e coach de vôlei de praia com{" "}
              <strong className="text-foreground">12 anos de experiência</strong> em quadra de
              areia. Cada aula é desenhada para destravar o seu próximo nível: leitura de jogo,
              fundamento limpo e condicionamento específico — no seu ritmo, com foco total em
              você.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "12+", label: "Anos de experiência" },
                { value: "100%", label: "Atenção individual" },
                { value: "60min", label: "Por sessão" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-card p-5 text-center shadow-card hover-lift"
                >
                  <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-glow">
                <a href="#agendar">
                  Quero treinar com o Vini <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Technical Evaluation */}
      <AIEvaluation onBook={handlePackSelect} />

      {/* Surreal Desire section */}
      <section className="relative overflow-hidden border-y border-border/40 bg-secondary py-24 text-secondary-foreground md:py-32">
        <SurrealCanvas variant="dense" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.85_0.04_78/0.5)_70%)]"
        />

        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary-glow">
              <Sparkles className="mr-1 h-3 w-3" /> O salto começa antes do salto
            </Badge>

            <KineticText
              as="h2"
              variant="blur"
              stagger={75}
              className="mt-6 font-display text-4xl font-bold leading-[1.15] tracking-tight md:mt-10 md:text-6xl md:leading-[1.05]"
              highlight={["areia", "ninguém"]}
              highlightClassName="text-gradient-primary"
            >
              {"Imagine o som da bola tocando a areia — e ninguém alcançando."}
            </KineticText>

            <KineticText
              as="p"
              variant="wave"
              stagger={28}
              delay={1400}
              className="mx-auto mt-8 block max-w-2xl text-lg leading-relaxed text-secondary-foreground/85"
            >
              {"Existe um lugar onde o tempo se dobra. A bola desacelera, o vento conversa com você e cada movimento parece um sonho que você já viveu mil vezes. Esse lugar não é a quadra — é o seu próximo nível."}
            </KineticText>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                kicker: "Antes",
                title: "Você sente que pode mais",
                text: "A bola escapa, o saque trai, o jogo passa rápido demais. Falta o detalhe — aquele que ninguém te mostrou.",
              },
              {
                kicker: "Durante",
                title: "Tudo desacelera",
                text: "Cada aula é um mergulho. Técnica refinada, leitura afiada, corpo que responde antes do pensamento.",
              },
              {
                kicker: "Depois",
                title: "Você joga outro jogo",
                text: "Confiança que se vê no primeiro ponto. Adversários sentindo que algo mudou. E mudou — em você.",
              },
            ].map((step, i) => (
              <Reveal key={step.kicker} delay={i * 140}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow md:p-7">
                  <div className="absolute -right-8 -top-8 h-24 w-24 animate-morph bg-gradient-primary opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
                  <p className="relative font-display text-xs uppercase tracking-[0.4em] text-primary-glow">
                    {step.kicker}
                  </p>
                  <h3 className="relative mt-3 font-display text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-16 text-center">
            <KineticText
              as="p"
              variant="drop"
              stagger={70}
              className="mx-auto block max-w-2xl font-display text-2xl italic text-secondary-foreground/90 md:text-3xl"
              highlight={["domina"]}
              highlightClassName="text-gradient-primary not-italic font-bold"
            >
              {"\"A diferença entre quem joga e quem domina cabe em uma decisão.\""}
            </KineticText>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="shadow-glow animate-pulse-glow">
                <a href="#agendar">
                  Reservar minha primeira aula <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/30 bg-card/40 text-foreground hover:bg-card/70"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Quero%20saber%20mais.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tirar dúvidas no WhatsApp
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Vagas limitadas · Segunda a sábado · Quadra de areia
            </p>
          </Reveal>
        </div>
      </section>

      {/* Packages */}
      <Packages onSelect={handlePackSelect} />

      {/* Booking */}
      <section id="agendar" className="relative mx-auto max-w-4xl overflow-hidden px-6 py-20 md:py-28">
        <FloatingAccent
          variant="ball"
          size="w-24 md:w-32"
          className="-left-6 top-16 z-0 hidden md:block"
          opacity={0.4}
          rotate={-22}
        />
        <FloatingAccent
          variant="ball"
          size="w-16 md:w-20"
          className="bottom-20 right-2 z-0 hidden md:block"
          opacity={0.35}
          rotate={28}
        />
        <SurrealCanvas variant="soft" />
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge className="mb-4 bg-gradient-primary text-primary-foreground shadow-md">
            Agendamento
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Reserve sua aula experimental
          </h2>
          <p className="mt-4 text-muted-foreground">
            Escolha o dia (segunda a sábado) e o horário. Confirmamos em até 24h pelo WhatsApp.
          </p>
          {selectedPack && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Pacote selecionado: {selectedPack}
            </div>
          )}
        </div>

        <Card className="overflow-hidden border-border/60 shadow-elevated">
          <div className="h-2 bg-gradient-primary" aria-hidden="true" />
          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  maxLength={80}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  inputMode="tel"
                  maxLength={20}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">E-mail (opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  maxLength={120}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data (seg a sáb)</Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {date && !isValidDay(date) ? (
                  <p className="text-xs font-medium text-destructive">
                    Selecione um dia de segunda a sábado.
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Escolha um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Objetivo do treino (opcional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex.: melhorar saque viagem, defesa de líbero, preparar para campeonato..."
                  rows={4}
                  maxLength={500}
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full shadow-glow md:w-auto"
                >
                  Enviar pelo WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp direto</p>
              <p className="font-semibold">(48) 98814-6267</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20as%20aulas%20de%20v%C3%B4lei%20na%20areia.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Tirar dúvidas</p>
              <p className="font-semibold">Falar com o coach</p>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <BrandLogo className="h-10 w-auto text-secondary-foreground opacity-90" />
          </div>
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Vinicius Hurt — Aulas particulares de vôlei. Criado por{" "}
            <a
              href="https://dev.lionlobs.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-glow underline-offset-4 hover:underline"
            >
              LionLobs
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
