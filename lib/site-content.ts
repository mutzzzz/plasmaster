export type NavItem = {
  href: "#home" | "#sobre" | "#servicos" | "#contato";
  label: string;
};

export type HeroMetric = {
  label: string;
  value: string;
};

export type HeroBeat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  start: number;
  end: number;
  depth: number;
};

export type HeroAction = {
  label: string;
  href: string;
};

export type HeroField = {
  label: string;
  placeholder: string;
  helperText: string;
  name?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
};

export type HeroSequenceVariantManifest = {
  frameCount: number;
  fps: number;
  width: number;
  height: number;
  posterFrame: string;
  pathPattern: string;
  sourceVideo: string;
};

export type HeroSequenceManifest = {
  desktop: HeroSequenceVariantManifest;
  mobile: HeroSequenceVariantManifest;
};

export type SiteContent = {
  navItems: NavItem[];
  marqueeItems: string[];
  interestIntro: {
    eyebrow: string;
    titleLead: string;
    titleTrail: string;
    description: string;
  };
  manifestParagraph: string;
  proofStack: Array<{
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
  }>;
  proofCarousel: Array<{
    title: string;
    note: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
  }>;
  hero: {
    intro: {
      eyebrow: string;
      title: string;
      description: string;
      primaryAction: HeroAction;
      secondaryAction: HeroAction;
      metrics: HeroMetric[];
    };
    sequence: {
      badge: string;
      note: string;
      beats: HeroBeat[];
    };
    form: {
      title: string;
      subtitle: string;
      buttonLabel: string;
      fields: {
        name: HeroField;
        email: HeroField;
        message: HeroField;
      };
    };
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: HeroMetric[];
    capacity: {
      eyebrow: string;
      title: string;
      description: string;
      metrics: HeroMetric[];
      cta: HeroAction;
    };
    principles: {
      eyebrow: string;
      intro: string;
      mission: string;
      vision: string;
      values: string[];
    };
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      cta: HeroAction;
    }>;
  };
  differentials: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  actionCta: {
    eyebrow: string;
    titleLead: string;
    titleTrail: string;
    description: string;
    primaryAction: HeroAction;
    secondaryAction: HeroAction;
    signals: HeroMetric[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLines: string[];
    email: string;
    phone: string;
    form: {
      title: string;
      subtitle: string;
      buttonLabel: string;
      fields: {
        name: HeroField;
        email: HeroField;
        message: HeroField;
      };
    };
  };
  footer: {
    tagline: string;
    socialLinks: string[];
    copyright: string;
  };
};

export const siteContent: SiteContent = {
  navItems: [
    { href: "#home", label: "Home" },
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#contato", label: "Contato" },
  ],
  marqueeItems: [
    "Desde 2005",
    "Joinville, SC",
    "PVC rígido",
    "+2.800 h/mês",
    "6 injetoras",
    "3 moinhos",
  ],
  interestIntro: {
    eyebrow: "Qualidade, capacidade e continuidade",
    titleLead: "Precisão industrial para peças que exigem",
    titleTrail: "processo sob controle.",
    description:
      "A Plasmaster organiza tecnologia de produção, repetitividade de ciclo e escala operacional para atender operações que não podem depender de improviso quando o lote entra em linha.",
  },
  manifestParagraph:
    "Atender com responsabilidade, qualidade e pontualidade significa estruturar a produção para que prazo, repetitividade, leitura técnica e confiança industrial avancem juntos do conceito ao lote em escala.",
  proofStack: [
    {
      title: "Qualidade",
      description:
        "Processos rigorosos do início ao fim sustentam precisão dimensional, acabamento estável e conformidade com a especificação definida pelo cliente.",
      image: {
        src: "/site-images/proof-quality-molding-detail.png",
        alt: "Molde industrial com peças termoplásticas recém-injetadas em destaque.",
      },
    },
    {
      title: "Suporte",
      description:
        "Equipe dedicada, com leitura técnica próxima do projeto, para acompanhar demanda, ajuste de processo e continuidade operacional sem ruído de comunicação.",
      image: {
        src: "/site-images/proof-support-operator-line.png",
        alt: "Operador caminhando entre injetoras e bandejas de componentes em PVC rígido.",
      },
    },
    {
      title: "Tecnologia",
      description:
        "Equipamentos modernos e processos atualizados transformam exigência industrial em produto real com consistência de ciclo e previsibilidade de lote.",
      image: {
        src: "/site-images/proof-technology-workbench.png",
        alt: "Mesa técnica com molde, peças plásticas e desenho de engenharia em revisão.",
      },
    },
  ],
  proofCarousel: [
    {
      title: "Leitura técnica em linha",
      note: "Base industrial em Joinville",
      description:
        "A operação parte de uma base fabril preparada para decisões técnicas próximas do processo e da produção.",
      image: {
        src: "/site-images/carousel-technical-inspection.png",
        alt: "Técnico medindo componentes em PVC rígido ao lado de uma injetora industrial.",
      },
    },
    {
      title: "Controle de ciclo",
      note: "Repetitividade para cada lote",
      description:
        "A disciplina de processo acompanha material, molde e repetição para manter estabilidade entre o primeiro teste e a produção em escala.",
      image: {
        src: "/site-images/carousel-cycle-control.png",
        alt: "Molde industrial com peças termoplásticas recém-injetadas em destaque.",
      },
    },
    {
      title: "Projeto ao lote",
      note: "Full service com continuidade",
      description:
        "Desenvolvimento, prototipagem e fabricação avançam com apoio técnico e integração de parceiros quando o projeto exige correção ou manutenção de molde.",
      image: {
        src: "/site-images/carousel-project-to-lot.png",
        alt: "Mesa técnica com molde, peças plásticas e desenho de engenharia em revisão.",
      },
    },
  ],
  hero: {
    intro: {
      eyebrow: "Injeção de termoplásticos",
      title: "Referência nacional em injeção de termoplásticos",
      description:
        "Desde 2005, em Joinville — polo industrial do Brasil — a Plasmaster une precisão técnica, qualidade certificada e capacidade produtiva para entregar exatamente o que sua operação exige.",
      primaryAction: {
        label: "Conheça nossa estrutura",
        href: "#sobre",
      },
      secondaryAction: {
        label: "Solicite um orçamento",
        href: "#contato",
      },
      metrics: [
        { label: "Desde", value: "2005" },
        { label: "Capacidade", value: "+2.800 h/mês" },
        { label: "Máquinas", value: "6 injetoras" },
        { label: "Moinhos", value: "3 unidades" },
      ],
    },
    sequence: {
      badge: "Sequência industrial em scroll",
      note:
        "A animação acompanha a montagem industrial quadro a quadro, com scrub por scroll e textos em parallax sincronizados ao progresso da seção.",
      beats: [
        {
          id: "referencia",
          eyebrow: "Desde 2005",
          title: "Referência nacional em injeção de termoplásticos",
          body:
            "Joinville concentra a base industrial da operação e o primeiro bloco da narrativa posiciona a Plasmaster como parceira de execução técnica.",
          start: 0.04,
          end: 0.28,
          depth: 42,
        },
        {
          id: "qualidade",
          eyebrow: "Qualidade e dedicação",
          title: "Precisão em cada detalhe. Qualidade em cada peça.",
          body:
            "A segunda passagem reforça repetitividade dimensional, acabamento e conformidade total com as especificações do cliente.",
          start: 0.3,
          end: 0.6,
          depth: 54,
        },
        {
          id: "capacidade",
          eyebrow: "Capacidade técnica",
          title: "Estrutura preparada para volume, material e complexidade.",
          body:
            "O fechamento conecta equipamentos, equipe especializada e escala produtiva para levar o visitante ao contato comercial.",
          start: 0.62,
          end: 0.94,
          depth: 48,
        },
      ],
    },
    form: {
      title: "Solicite seu orçamento",
      subtitle: "Fale com nosso time agora mesmo.",
      buttonLabel: "Enviar solicitação",
      fields: {
        name: {
          label: "Seu nome",
          placeholder: "Seu nome",
          helperText: "Informe o responsável pelo contato.",
          autoComplete: "name",
        },
        email: {
          label: "Seu e-mail",
          placeholder: "voce@empresa.com",
          helperText: "Usaremos este endereço para retornar o atendimento.",
          autoComplete: "email",
          inputMode: "email",
        },
        message: {
          label: "Como podemos ajudar?",
          placeholder: "Descreva volume, material ou necessidade técnica.",
          helperText: "Inclua contexto suficiente para orientar o próximo passo.",
          name: "message",
        },
      },
    },
  },
  about: {
    eyebrow: "Processo industrial",
    title: "Quando a repetitividade importa, o processo precisa responder antes do acabamento.",
    description:
      "Combinamos tecnologia de produção de última geração com técnicas consolidadas de moldagem para entregar peças em termoplástico com alta consistência dimensional, acabamento estável e conformidade com a especificação definida pelo cliente.",
    highlights: [
      { label: "Base industrial", value: "Joinville, SC" },
      { label: "Especialidade", value: "PVC rígido" },
      { label: "Capacidade", value: "+2.800 h/mês" },
    ],
    capacity: {
      eyebrow: "Capacidade técnica",
      title: "Estrutura montada para volume, material e complexidade sem desviar do processo.",
      description:
        "Com equipamentos modernos e equipe especializada, a operação é dimensionada para acomodar diferentes demandas de projeto sem perder leitura técnica, continuidade de produção e previsibilidade de lote.",
      metrics: [
        { label: "Horas produtivas", value: "+2.800 h/mês" },
        { label: "Máquinas injetoras", value: "6" },
        { label: "Moinhos", value: "3" },
      ],
      cta: {
        label: "Saiba mais sobre nossa estrutura",
        href: "#contato",
      },
    },
    principles: {
      eyebrow: "Missão, visão e valores",
      intro:
        "Atuamos com responsabilidade, pontualidade e respeito às pessoas, ao prazo e ao meio ambiente.",
      mission:
        "Atender nossos clientes com responsabilidade, qualidade e pontualidade, entregando soluções que respeitem as pessoas, o prazo e o meio ambiente.",
      vision:
        "Ser referência nacional no segmento de injeção de termoplásticos, reconhecidos pela excelência técnica e pela confiança dos nossos parceiros.",
      values: [
        "Gratidão",
        "Comprometimento",
        "Responsabilidade",
        "Excelência",
        "Valorização humana",
      ],
    },
  },
  services: {
    eyebrow: "Serviços",
    title: "Duas frentes de atendimento, a mesma disciplina de processo.",
    description:
      "Terceirização e full service se organizam sob a mesma lógica: leitura técnica, repetitividade de ciclo e continuidade operacional do primeiro teste até a produção em escala.",
    items: [
      {
        id: "01",
        eyebrow: "Terceirização industrial",
        title: "Terceirização de injeção de termoplásticos",
        description:
          "Especializada na injeção de peças termoplásticas para diferentes segmentos industriais, a Plasmaster opera com sólida experiência em PVC rígido e processos rigorosos orientados à repetitividade de ciclos para que cada lote atenda com exatidão às especificações definidas pelo cliente.",
        cta: { label: "Entre em contato", href: "#contato" },
      },
      {
        id: "02",
        eyebrow: "Projeto ao lote",
        title: "Full service em injeção de termoplásticos",
        description:
          "A operação cobre conceito, desenvolvimento, prototipagem e fabricação sob um único parceiro, com apoio de ferramentarias para correções e manutenções de moldes que preservam continuidade e eficiência na sua linha de produção.",
        cta: { label: "Entre em contato", href: "#contato" },
      },
    ],
  },
  differentials: {
    eyebrow: "Por que a Plasmaster",
    title: "Qualidade não entra no fim. Ela aparece em cada decisão do processo.",
    description:
      "Da seleção criteriosa da matéria-prima ao acabamento final, cada decisão operacional é tomada para sustentar consistência técnica, previsibilidade de lote e confiança industrial.",
    items: [
      {
        title: "Qualidade",
        description:
          "Processos rigorosos do início ao fim para garantir peças com precisão e acabamento de excelência.",
      },
      {
        title: "Suporte",
        description:
          "Equipe dedicada, onde cada profissional sustenta leitura técnica e acompanhamento direto do projeto.",
      },
      {
        title: "Tecnologia",
        description:
          "Equipamentos modernos e processos atualizados para transformar demanda industrial em produto real com continuidade.",
      },
    ],
  },
  actionCta: {
    eyebrow: "Contato comercial",
    titleLead: "Quando o seu projeto pede",
    titleTrail: "continuidade real.",
    description:
      "O próximo passo começa com leitura técnica, prazo claro e um canal direto com a operação em Joinville para alinhar volume, material, ferramental e ritmo de produção.",
    primaryAction: {
      label: "Enviar briefing do projeto",
      href: "#contato-form",
    },
    secondaryAction: {
      label: "Falar com a Plasmaster",
      href: "mailto:adm@plasmaster.ind.br",
    },
    signals: [
      { label: "Base industrial", value: "Joinville, SC" },
      { label: "Canal direto", value: "(47) 3440-0683" },
      { label: "Especialidade", value: "PVC rígido" },
    ],
  },
  contact: {
    eyebrow: "Descreva sua demanda",
    title: "Abra a conversa com o contexto técnico certo.",
    subtitle:
      "Compartilhe volume, material, etapa do projeto e restrições de prazo para orientar o retorno comercial.",
    addressLines: [
      "Rodovia SC 108 nº 18201, Galpão 9",
      "CEP 89215-210 — Morro do Meio, Joinville/SC",
    ],
    email: "adm@plasmaster.ind.br",
    phone: "(47) 3440-0683",
    form: {
      title: "Envie os dados principais",
      subtitle:
        "Sem automação vazia: o objetivo aqui é dar contexto suficiente para o próximo passo comercial.",
      buttonLabel: "Enviar mensagem",
      fields: {
        name: {
          label: "Nome",
          placeholder: "Nome",
          helperText: "Campo obrigatório.",
          autoComplete: "name",
        },
        email: {
          label: "E-mail",
          placeholder: "voce@empresa.com",
          helperText: "Campo obrigatório.",
          autoComplete: "email",
          inputMode: "email",
        },
        message: {
          label: "Mensagem",
          placeholder: "Descreva sua necessidade.",
          helperText: "Inclua volume, material ou prazo quando possível.",
          name: "message",
        },
      },
    },
  },
  footer: {
    tagline:
      "Da matéria-prima ao produto final, cada etapa reflete nosso compromisso com qualidade e responsabilidade.",
    socialLinks: ["Facebook", "Twitter / X", "Instagram", "Google", "LinkedIn"],
    copyright:
      "Copyright © 2026 Plasmaster. Todos os direitos reservados. — Desenvolvido por OrkaBr",
  },
};
