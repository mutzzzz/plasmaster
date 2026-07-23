import { Link } from "@tanstack/react-router";
import { MessageCircle, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contato" className="bg-navy-light text-background section-padding">
      <div className="container-landing">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pronto para encontrar a embalagem ideal para o seu negócio?
          </h2>
          <p className="mt-4 text-lg text-background/85">
            Fale com um dos nossos consultores e descubra como podemos otimar o seu processo de
            embalagem, proteção e transporte com soluções sob medida.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-background/90"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com um Consultor
            </a>
            <Link
              to="/#linhas"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background/30 bg-transparent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-background/10"
            >
              Conhecer Nossas Linhas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-background/60">
            Responderemos em até 24 horas úteis.
          </p>
        </div>
      </div>
    </section>
  );
}
