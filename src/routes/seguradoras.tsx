import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/gpxbr-logo.png";
import autoImg from "@/assets/partners-auto.jpg";
import saudeImg from "@/assets/partners-saude.jpg";
import empresarialImg from "@/assets/partners-empresarial.jpg";
import vidaImg from "@/assets/partners-vida.jpg";
import celularImg from "@/assets/partners-celular.jpg";

export const Route = createFileRoute("/seguradoras")({
  component: SeguradorasPage,
  head: () => ({
    meta: [
      { title: "Seguradoras Parceiras | GpxBr Corretora" },
      {
        name: "description",
        content:
          "Conheça as seguradoras parceiras da GpxBr Corretora — Porto, Bradesco, SulAmérica, Allianz, Tokio Marine, Itaú e muitas outras.",
      },
    ],
  }),
});

type Category = {
  id: string;
  title: string;
  image: string;
  insurers: string[];
};

const CATEGORIES: Category[] = [
  {
    id: "auto",
    title: "Auto",
    image: autoImg,
    insurers: [
      "Porto Seguro",
      "Azul",
      "Mitsui",
      "Itaú",
      "Bradesco",
      "Allianz",
      "Tokio Marine",
      "HDI",
      "Justos",
      "Yelum",
      "Aliro",
    ],
  },
  {
    id: "saude",
    title: "Saúde",
    image: saudeImg,
    insurers: [
      "Porto",
      "SulAmérica",
      "Bradesco",
      "Amil",
      "Assim",
      "MedSenior",
      "Prevent",
      "Hapvida",
    ],
  },
  {
    id: "empresarial",
    title: "Empresarial",
    image: empresarialImg,
    insurers: ["Porto Seguro", "Bradesco", "Allianz", "Sompo Seguros", "Tokio Marine"],
  },
  {
    id: "vida",
    title: "Vida",
    image: vidaImg,
    insurers: ["Porto", "SulAmérica", "Bradesco", "Allianz", "Tokio Marine"],
  },
  {
    id: "celular",
    title: "Celular",
    image: celularImg,
    insurers: ["Porto Seguro"],
  },
];

function SeguradorasPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="GpxBr Corretora de Seguros" className="h-11 w-11 rounded-full shadow-soft" />
            <div className="leading-tight">
              <div className="text-base font-extrabold text-navy">GpxBr</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Corretora de Seguros
              </div>
            </div>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar
            </Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-32 right-[-100px] h-[480px] w-[480px] rounded-full bg-navy/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-navy shadow-soft backdrop-blur">
              <Shield className="h-3.5 w-3.5 text-primary" /> Parceiros oficiais
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
              Seguradoras Parceiras
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Trabalhamos com as principais seguradoras do país para oferecer a você as melhores condições
              em cada categoria.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="space-y-10">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <div className="overflow-hidden rounded-3xl border border-border bg-gradient-card shadow-card">
                <div className="grid gap-0 md:grid-cols-[1fr_1.4fr]">
                  <div className="relative h-48 w-full overflow-hidden md:h-full md:min-h-[260px]">
                    <img
                      src={cat.image}
                      alt={`Seguro ${cat.title}`}
                      loading="lazy"
                      width={1024}
                      height={640}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-4 left-4 text-white drop-shadow md:bottom-6 md:left-6">
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                        Categoria
                      </span>
                      <h2 className="text-2xl font-extrabold sm:text-3xl">{cat.title}</h2>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Seguradoras
                    </h3>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                      {cat.insurers.map((name) => (
                        <li
                          key={name}
                          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-navy transition-colors hover:border-primary/40 hover:bg-accent"
                        >
                          <Shield className="h-3.5 w-3.5 text-primary" />
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">Voltar para o site</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
