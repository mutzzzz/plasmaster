import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers, Shield, Package } from "lucide-react";
import flexibleImage from "@/assets/flexible-plastics.jpg";
import protectionImage from "@/assets/protection-logistics.jpg";
import rigidImage from "@/assets/rigid-packaging.jpg";

const lines = [
  {
    id: "flexiveis",
    title: "Plásticos Flexíveis",
    icon: Layers,
    description:
      "Desenvolvidos com alta tecnologia para garantir resistência e versatilidade.",
    items: [
      "Bobinas industriais e comerciais",
      "Sacarias de alta densidade",
      "Filmes lisos e impressos",
      "Materiais reciclados sustentáveis",
      "Envelopes de segurança com fita permanente",
    ],
    image: flexibleImage,
    alt: "Bobinas de plástico flexível, sacarias e materiais reciclados",
  },
  {
    id: "protecao",
    title: "Proteção e Logística",
    icon: Shield,
    description: "A segurança que a sua cadeia de suprimentos exige.",
    items: [
      "Filme Stretch, Shrink e PVC",
      "Plástico Bolha e Papelão Ondulado para absorção de impacto",
      "Fitas Adesivas de alta fixação para fechamento seguro",
    ],
    image: protectionImage,
    alt: "Materiais de proteção e logística: stretch, plástico bolha e fitas adesivas",
  },
  {
    id: "rigidas",
    title: "Embalagens Rígidas",
    icon: Package,
    description: "Robustez e segurança físico-química para produtos de alta exigência.",
    items: [
      "Galões Plásticos com design ergonômico e resistente",
      "Embalagens Fluoretadas (proteção de barreira avançada para produtos químicos e garantia de segurança ambiental)",
    ],
    image: rigidImage,
    alt: "Galões plásticos e embalagens rígidas industriais",
  },
];

export function Lines() {
  return (
    <section id="linhas" className="bg-background section-padding">
      <div className="container-landing">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-steel">
            Portfólio completo
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nossas Linhas de Atuação
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Atuamos como um fornecedor completo (One-Stop-Shop), unindo diversidade de produtos e
            garantia de entrega para atender todas as suas demandas de embalagem.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {lines.map((line) => (
            <article
              key={line.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/70 backdrop-blur-md shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={line.image}
                  alt={line.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <line.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{line.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{line.description}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {line.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-steel" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://wa.me/5511996411512?text=Olá,%20gostaria%20de%20solicitar%20uma%20cotação."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Solicitar cotação
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
