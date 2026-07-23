import { CheckCircle } from "lucide-react";

const pillars = [
  "Amplo portfólio de produtos",
  "Garantia de qualidade homologada",
  "Atendimento técnico consultivo",
];

export function About() {
  return (
    <section id="quem-somos" className="bg-navy text-background section-padding">
      <div className="container-landing">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-background/60">
              Quem Somos
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              A Autoridade no Mercado de Embalagens
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-background/85">
              Com sólida presença no mercado de embalagens, atuamos como o elo estratégico entre
              as melhores indústrias. Nosso modelo de negócios é fundamentado em três pilares: amplo
              portfólio, garantia de qualidade e atendimento técnico consultivo.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-background/85">
              Entendemos as complexidades do setor produtivo e logístico, e por isso entregamos não
              apenas produtos, mas confiabilidade operacional para clientes de diversos portes e
              segmentos.
            </p>
          </div>

          <div className="rounded-3xl border border-background/10 bg-background/5 p-8 backdrop-blur-sm">
            <h3 className="font-display text-xl font-bold">Três pilares que nos sustentam</h3>
            <ul className="mt-6 space-y-4">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-steel" />
                  <span className="text-base text-background/90">{pillar}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-background/10 pt-8">
              <div>
                <p className="font-display text-3xl font-bold text-steel">+15</p>
                <p className="mt-1 text-xs text-background/60">anos de mercado</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-steel">+500</p>
                <p className="mt-1 text-xs text-background/60">clientes atendidos</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-steel">3</p>
                <p className="mt-1 text-xs text-background/60">linhas de atuação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
