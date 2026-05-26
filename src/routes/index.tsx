import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Car, Heart, HeartPulse, Home, MessageCircle, Phone, Shield, Sparkles, Headphones, ExternalLink, Menu, X, Briefcase, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteModal, type InsuranceCategory } from "@/components/QuoteModal";

import { Reveal } from "@/components/Reveal";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import logo from "@/assets/gpxbr-logo.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const WHATSAPP_DIRECT = "https://wa.me/5521964223571?text=" + encodeURIComponent("Olá, vim pelo site da GpxBr Corretora! Gostaria de falar com um consultor.");
const COTACAO_URL = "https://gpxseguros.aggilizador.com.br";

const SERVICES: { id: InsuranceCategory; icon: typeof Car; title: string; desc: string }[] = [
  { id: "auto", icon: Car, title: "Seguro Auto", desc: "Proteja seu veículo contra roubo, acidentes e muito mais." },
  { id: "residencial", icon: Home, title: "Seguro Residencial", desc: "Sua casa segura em qualquer situação." },
  { id: "saude", icon: HeartPulse, title: "Plano de Saúde", desc: "Cobertura completa para você e sua família." },
  { id: "vida", icon: Heart, title: "Seguro de Vida", desc: "Garanta o futuro de quem você ama." },
  { id: "empresarial", icon: Briefcase, title: "Seguro Empresarial", desc: "Proteção completa para o seu negócio." },
  { id: "celulares", icon: Smartphone, title: "Seguro de Celular", desc: "Cobertura contra roubo, furto e danos." },
];

function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<InsuranceCategory | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const openQuote = (cat: InsuranceCategory | null = null) => {
    setCategory(cat);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="GpxBr Corretora de Seguros" className="h-11 w-11 rounded-full shadow-soft" />
            <div className="leading-tight">
              <div className="text-base font-extrabold text-navy">GpxBr</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Corretora de Seguros</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#servicos" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">Serviços</a>
            <a href="#como-funciona" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">Como Funciona</a>
            <a href="#contato" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">Contato</a>
          </nav>
          <div className="hidden md:block">
            <Button onClick={() => openQuote()} className="bg-gold text-gold-foreground hover:bg-gold/90">
              Fazer cotação
            </Button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? <X className="h-6 w-6 text-navy" /> : <Menu className="h-6 w-6 text-navy" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-border/60 bg-background md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              <a href="#servicos" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">Serviços</a>
              <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">Como Funciona</a>
              <a href="#contato" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">Contato</a>
              <Button onClick={() => { setMenuOpen(false); openQuote(); }} className="mt-2 bg-gold text-gold-foreground hover:bg-gold/90">Fazer cotação</Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[460px] w-[460px] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-navy/10 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-navy shadow-soft backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Plataforma completa de seguros
            </span>
            <AnimatedHeadline />
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Seguros de automóvel, saúde, vida e residencial com as melhores condições do mercado. Cotação rápida pelo WhatsApp.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => openQuote()}
                className="group h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                Fazer minha cotação
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-full border-border bg-card px-6 text-navy hover:bg-accent"
              >
                <a href={WHATSAPP_DIRECT} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5 text-whatsapp" /> Falar no WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> +15 seguradoras parceiras</div>
              <div className="flex items-center gap-2"><Headphones className="h-4 w-4 text-primary" /> Suporte humano</div>
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Cotação em minutos</div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {SERVICES.map(({ id, icon: Icon, title }) => (
                <button
                  key={id}
                  onClick={() => openQuote(id)}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-navy">{title.replace("Seguro ", "").replace("Plano de ", "")}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Nossos seguros</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Soluções completas para cada momento da sua vida</h2>
            <p className="mt-3 text-muted-foreground">Escolha a categoria, responda algumas perguntas e receba sua cotação pelo WhatsApp.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ id, icon: Icon, title, desc }, i) => (
            <Reveal key={id} delay={i * 90}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
                <Button
                  onClick={() => openQuote(id)}
                  variant="outline"
                  className="mt-5 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Quero cotar
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section id="como-funciona" className="bg-accent/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Por que a GpxBr?</span>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Atendimento que faz a diferença</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Headphones, title: "Atendimento personalizado", desc: "Um consultor dedicado entende sua necessidade e busca o melhor plano para você." },
              { icon: Shield, title: "Melhores seguradoras", desc: "Trabalhamos com as principais seguradoras do país para garantir a melhor cobertura." },
              { icon: Sparkles, title: "Suporte rápido e eficiente", desc: "Cotação ágil, sem burocracia e suporte direto pelo WhatsApp quando você precisar." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cta text-primary-foreground shadow-soft">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Online quote */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-card p-8 shadow-card sm:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Cotação online</span>
                <h3 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">Compare preços agora mesmo</h3>
                <p className="mt-3 text-muted-foreground">
                  Acesse nossa plataforma de cotação online e veja em segundos as melhores ofertas para o seu perfil.
                </p>
              </div>
              <Button asChild size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={COTACAO_URL} target="_blank" rel="noopener noreferrer">
                  Acessar plataforma <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section id="contato" className="px-4 py-20 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-gradient-cta px-6 py-16 text-center text-white shadow-soft sm:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-40" style={{
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(250,200,80,0.35), transparent 50%), radial-gradient(circle at 10% 90%, rgba(255,255,255,0.15), transparent 50%)",
          }} />
          <Reveal>
            <h2 className="relative text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Pronto para garantir sua proteção?
            </h2>
            <p className="relative mt-4 text-white/85">Resposta rápida no WhatsApp. Sem compromisso.</p>
            <Button
              asChild
              size="lg"
              className="relative mt-8 h-14 rounded-full bg-whatsapp px-8 text-base text-whatsapp-foreground shadow-soft hover:bg-whatsapp/90"
            >
              <a href={WHATSAPP_DIRECT} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-6 w-6" /> Falar no WhatsApp agora
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-navy text-white/85">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="GpxBr" className="h-12 w-12 rounded-full" />
              <div>
                <div className="font-extrabold text-white">GpxBr Corretora</div>
                <div className="text-xs text-white/60">de Seguros</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70">Proteção e tranquilidade para você e sua família.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Contato</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Consultor: <span className="font-medium text-white">Gleydston da Silva Rohr</span></li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a href={WHATSAPP_DIRECT} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  (21) 96422-3571
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Cotação online</h4>
            <a href={COTACAO_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-white hover:text-gold">
              gpxseguros.aggilizador.com.br <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} GpxBr Corretora de Seguros. Todos os direitos reservados.
        </div>
      </footer>

      <WhatsappFloat />
      <QuoteModal open={modalOpen} onOpenChange={setModalOpen} initialCategory={category} />
    </div>
  );
}
