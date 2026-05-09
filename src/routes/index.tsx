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
  Zap,
  Star,
  Quote,
} from "lucide-react";

import { useReveal } from "@/hooks/use-reveal";
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

    toast.success("Agendamento solicitado!", {
      description: `${name}, recebemos seu pedido para ${new Date(
        `${date}T12:00:00`,
      ).toLocaleDateString("pt-BR")} às ${time}. Entraremos em contato pelo telefone ${phone}.`,
    });

    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setDate("");
    setTime("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              🏐
            </span>
            <span className="text-lg">
              Ace<span className="text-primary">Volei</span>
            </span>
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#beneficios" className="transition-colors hover:text-foreground">
              Benefícios
            </a>
            <a href="#horarios" className="transition-colors hover:text-foreground">
              Horários
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

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div className="text-primary-foreground">
            <Badge className="mb-6 bg-white/15 text-primary-foreground backdrop-blur-sm hover:bg-white/20">
              <Sparkles className="mr-1 h-3 w-3" /> Aulas particulares
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Domine a quadra com aulas <span className="text-primary-glow">individuais</span> de vôlei.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
              Atendimento exclusivo às <strong>segundas e terças pelas tardes</strong>. Treine com
              um coach focado só em você — técnica, leitura de jogo e performance.
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
                <CheckCircle2 className="h-4 w-4 text-primary-glow" /> +10 anos de experiência
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-glow" /> Todos os níveis
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-glow" /> Quadra coberta
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
                    <p className="font-semibold">Local</p>
                    <p className="text-sm text-muted-foreground">
                      Quadra parceira na zona sul. Endereço enviado após confirmação.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-border/60 shadow-elevated">
              <div className="bg-gradient-primary p-6 text-primary-foreground">
                <p className="text-sm uppercase tracking-wider opacity-80">Esta semana</p>
                <p className="mt-1 text-3xl font-bold">12 vagas abertas</p>
                <p className="mt-1 text-sm opacity-90">Reserve antes que esgote</p>
              </div>
              <CardContent className="grid grid-cols-3 gap-3 p-6">
                {TIME_SLOTS.map((slot) => (
                  <div
                    key={slot}
                    className="rounded-xl border border-border bg-sand/40 p-3 text-center text-sm font-semibold text-sand-foreground shadow-sm"
                  >
                    {slot}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
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
                  Confirmar agendamento
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href="tel:+5511999999999"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Telefone</p>
              <p className="font-semibold">(11) 99999-9999</p>
            </div>
          </a>
          <a
            href="mailto:contato@acevolei.com"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</p>
              <p className="font-semibold">contato@acevolei.com</p>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
              🏐
            </span>
            AceVolei
          </div>
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} AceVolei — Aulas particulares de vôlei.
          </p>
        </div>
      </footer>
    </div>
  );
}
