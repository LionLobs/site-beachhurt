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
  Star,
  Quote,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

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
import logoVH from "@/assets/logo-vh.png";

const WHATSAPP_NUMBER = "5548988146267";

export const Route = createFileRoute("/")({
  component: Index,
});

const TIME_SLOTS = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

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

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const isValidDay = (value: string) => {
    if (!value) return true;
    const day = new Date(`${value}T12:00:00`).getDay();
    return day === 1 || day === 2; // segunda ou terça
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !date || !time) {
      toast.error("Preencha nome, telefone, data e horário.");
      return;
    }
    if (!isValidDay(date)) {
      toast.error("As aulas acontecem apenas às segundas e terças à tarde.");
      return;
    }

    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });

    const message =
      `Olá! Quero agendar uma aula particular de vôlei na quadra de areia.%0A%0A` +
      `*Nome:* ${name}%0A` +
      `*Telefone:* ${phone}%0A` +
      (email ? `*E-mail:* ${email}%0A` : "") +
      `*Data:* ${formattedDate}%0A` +
      `*Horário:* ${time}%0A` +
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
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
            <img
              src={logoVH}
              alt="Logo Vinicius Hurt"
              width={56}
              height={56}
              className="h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(59,130,246,0.5)]"
            />
            <span className="text-lg">
              Vinicius<span className="text-primary"> Hurt</span>
            </span>
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#beneficios" className="transition-colors hover:text-foreground">
              Benefícios
            </a>
            <a href="#horarios" className="transition-colors hover:text-foreground">
              Horários
            </a>
            <a href="#coach" className="transition-colors hover:text-foreground">
              Coach
            </a>
            <a href="#agendar" className="transition-colors hover:text-foreground">
              Agendar
            </a>
          </nav>
          <Button asChild size="sm" className="shadow-md">
            <a href="#agendar">
              Agendar aula <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
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
          <div className="text-primary-foreground">
            <Badge className="mb-6 bg-white/15 text-primary-foreground backdrop-blur-sm hover:bg-white/20">
              <Sparkles className="mr-1 h-3 w-3" /> Aulas particulares
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Domine a <span className="text-primary-glow">areia</span>. Aulas individuais de vôlei na quadra.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
              Atendimento exclusivo às <strong>segundas e terças pelas tardes</strong>, em
              <strong> quadra de areia</strong>. Treine com um coach com{" "}
              <strong>5 anos de experiência</strong>, focado 100% em você.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-glow">
                <a href="#agendar">
                  Reservar meu horário <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-primary-foreground backdrop-blur-sm hover:bg-white/20 hover:text-primary-foreground"
              >
                <a href="#beneficios">Ver benefícios</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-glow" /> 5 anos de experiência
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-glow" /> Quadra de areia
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-glow" /> Todos os níveis
              </span>
            </div>
          </div>

          {/* Floating schedule card */}
          <div className="relative md:justify-self-end">
            <div className="absolute -inset-4 rounded-3xl bg-primary/30 blur-3xl" aria-hidden="true" />
            <Card className="relative w-full max-w-sm overflow-hidden border-white/20 bg-card/95 shadow-elevated backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Agenda da semana
                </CardTitle>
                <CardDescription>Vagas limitadas por turno</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { day: "Segunda-feira", slots: "13h às 18h" },
                  { day: "Terça-feira", slots: "13h às 18h" },
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
                  Quartas a domingos: indisponível.
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
      <section id="beneficios" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }, idx) => (
            <Reveal key={title} delay={idx * 90}>
              <Card className="group relative h-full overflow-hidden border-border/60 hover-lift">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="p-6">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
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
                Segundas e terças, pelas tardes.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Mantemos uma agenda enxuta para garantir energia, atenção e qualidade em cada
                aula. Os turnos abrem às <strong>13h</strong> e a última aula começa às{" "}
                <strong>18h</strong>.
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
              <div className="relative h-56 overflow-hidden">
                <img
                  src={sandCourtImage}
                  alt="Quadra de areia ao pôr do sol"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-secondary-foreground">
                  <p className="text-xs uppercase tracking-[0.25em] opacity-80">Esta semana</p>
                  <p className="mt-1 text-3xl font-bold">12 vagas abertas</p>
                  <p className="mt-1 text-sm opacity-90">Reserve antes que esgote</p>
                </div>
              </div>
              <CardContent className="grid grid-cols-3 gap-3 p-6">
                {TIME_SLOTS.map((slot) => (
                  <div
                    key={slot}
                    className="rounded-xl border border-border bg-sand/50 p-3 text-center text-sm font-semibold text-sand-foreground shadow-sm hover-lift"
                  >
                    {slot}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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

      {/* Testimonials */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden="true"
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Star className="mr-1 h-3 w-3" /> Alunos
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Histórias que <span className="text-gradient-primary">saltam</span> da quadra
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Marina S.",
                role: "Líbero amadora",
                text: "Em 6 semanas meu saque viagem virou arma. As correções pontuais fizeram toda a diferença.",
              },
              {
                name: "Rafael T.",
                role: "Ponteiro",
                text: "Atenção 100% individual. Saio de cada aula sabendo exatamente o que treinar até a próxima.",
              },
              {
                name: "Carol M.",
                role: "Iniciante",
                text: "Comecei do zero e em pouco tempo já estava jogando com confiança. Didática incrível.",
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <Card className="h-full border-border/60 bg-card/80 backdrop-blur hover-lift">
                  <CardContent className="p-6">
                    <Quote className="h-7 w-7 text-primary" />
                    <p className="mt-4 text-base leading-relaxed text-foreground/90">"{t.text}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground shadow-md">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About the coach */}
      <section id="coach" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
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
              <strong className="text-foreground">5 anos de experiência</strong> em quadra de
              areia. Cada aula é desenhada para destravar o seu próximo nível: leitura de jogo,
              fundamento limpo e condicionamento específico — no seu ritmo, com foco total em
              você.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "5+", label: "Anos de experiência" },
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

      {/* Booking */}
      <section id="agendar" className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge className="mb-4 bg-gradient-primary text-primary-foreground shadow-md">
            Agendamento
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Reserve seu treino
          </h2>
          <p className="mt-4 text-muted-foreground">
            Escolha o dia (segunda ou terça) e o horário. Confirmamos sua aula em até 24h.
          </p>
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
                <Label htmlFor="date">Data (seg ou ter)</Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {date && !isValidDay(date) ? (
                  <p className="text-xs font-medium text-destructive">
                    Selecione uma segunda ou terça-feira.
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
            <img
              src={logoVH}
              alt="Logo Vinicius Hurt"
              width={40}
              height={40}
              className="h-10 w-10 object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)]"
            />
            Vinicius Hurt
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
