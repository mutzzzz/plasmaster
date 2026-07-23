import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-packaging.jpg";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-background pt-20 pb-8 lg:pt-16 lg:pb-0">
      <div className="w-[92%] max-w-6xl mx-auto">
        <div className="grid h-auto lg:min-h-[calc(100vh-6.5rem)] lg:grid-cols-2 lg:items-center gap-6 lg:gap-12">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-start pt-2 pb-2 lg:justify-start lg:h-full lg:py-12">
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
                <a
                  href="https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar com um Consultor
                </a>
                <Link
                  to="/#linhas"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Conhecer Nossas Linhas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative min-h-0 lg:min-h-full lg:self-stretch lg:py-12 lg:px-0 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[220px] sm:min-h-[300px] lg:min-h-0 overflow-hidden rounded-3xl shadow-lg border border-border/40">
              <img
                src={heroImage}
                alt="Linha de produção industrial de embalagens plásticas flexíveis"
                width={1920}
                height={1080}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
