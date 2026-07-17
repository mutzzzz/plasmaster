import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-packaging.jpg";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-background">
      <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
        <div className="container-landing flex flex-col justify-center py-16 lg:py-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Soluções integradas de embalagens
            </span>

            <h1 className="mt-6 font-display text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Excelência e Solidez em Soluções Integradas de Embalagens
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Atendendo às mais altas exigências da indústria e do comércio com um portfólio
              completo de plásticos flexíveis, materiais de proteção e embalagens rígidas.
              Estrutura, tecnologia e compromisso com o seu negócio.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/#contato"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com um Consultor
              </Link>
              <Link
                to="/#linhas"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Conhecer Nossas Linhas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[24rem] lg:min-h-full">
          <img
            src={heroImage}
            alt="Linha de produção industrial de embalagens plásticas flexíveis"
            width={1920}
            height={1080}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:from-background/60 lg:via-transparent lg:to-transparent" />
        </div>
      </div>
    </section>
  );
}
