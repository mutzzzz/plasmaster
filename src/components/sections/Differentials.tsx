import { PackageCheck, Award, Users } from "lucide-react";

const differentials = [
  {
    icon: PackageCheck,
    title: "Portfólio Integrado",
    description:
      "Todas as soluções de embalagem, fechamento e transporte centralizadas em um único parceiro de negócios.",
  },
  {
    icon: Award,
    title: "Qualidade Homologada",
    description:
      "Trabalhamos apenas com fabricantes de ponta, garantindo padrões rigorosos de resistência e conformidade.",
  },
  {
    icon: Users,
    title: "Atendimento Consultivo",
    description:
      "Uma equipe preparada para entender a demanda técnica da sua empresa e indicar o material com o melhor custo-benefício.",
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="bg-background section-padding">
      <div className="container-landing">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-steel">
            Por que nos escolher
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nossos Diferenciais
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sem gatilhos de urgência. Apenas fatos que comprovam a superioridade do nosso trabalho.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {differentials.map((diff) => (
            <div
              key={diff.title}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <diff.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-foreground">{diff.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
