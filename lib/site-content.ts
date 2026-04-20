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
        { label: "Capacidade", value: "+2.800h/mês" },
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
      title: "Solicite seu Orçamento",
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
    eyebrow: "Qualidade e dedicação",
    title: "Precisão em cada detalhe. Qualidade em cada peça.",
    description:
      "Combinamos tecnologia de produção de última geração com técnicas consolidadas de moldagem para entregar peças em termoplástico com alta repetitividade dimensional, acabamento impecável e conformidade total com as especificações do cliente.",
    capacity: {
      eyebrow: "Capacidade técnica",
      title: "Estrutura dimensionada para a solução certa em cada projeto.",
      description:
        "Com equipamentos modernos e uma equipe especializada, dimensionamos nossa estrutura para oferecer a solução certa para cada projeto — independentemente do volume, material ou complexidade da peça.",
      metrics: [
        { label: "Horas produtivas", value: "+2.800h/mês" },
        { label: "Máquinas injetoras", value: "6" },
        { label: "Moinhos", value: "3" },
      ],
      cta: {
        label: "Saiba mais sobre nossa estrutura",
        href: "#servicos",
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
    title: "Soluções para operações que exigem consistência industrial.",
    description:
      "Estruturamos cada frente de atendimento para acompanhar o seu projeto do primeiro lote à produção em escala, com controle de processo e continuidade operacional.",
    items: [
      {
        id: "01",
        title: "Terceirização de Injeção de Termoplásticos",
        description:
          "Somos especialistas na injeção de peças termoplásticas para os mais variados segmentos industriais, com sólida experiência em PVC rígido. Nossos processos são tecnicamente rigorosos e orientados à repetitividade de ciclos, garantindo que cada lote atenda com exatidão às especificações definidas pelo cliente — do primeiro protótipo à produção em escala.",
        cta: { label: "Entre em contato", href: "#contato" },
      },
      {
        id: "02",
        title: "Full Service em Injeção de Termoplásticos",
        description:
          "Oferecemos uma solução completa, do conceito ao produto final: projeto, desenvolvimento, prototipagem e fabricação — tudo sob um único parceiro. Por meio de parcerias estratégicas com ferramentarias, também realizamos correções e manutenções de moldes, garantindo continuidade e eficiência à sua linha de produção.",
        cta: { label: "Entre em contato", href: "#contato" },
      },
    ],
  },
  differentials: {
    eyebrow: "Por que a Plasmaster?",
    title: "Qualidade não é diferencial. É compromisso de processo.",
    description:
      "Da seleção criteriosa da matéria-prima ao acabamento final, cada decisão é tomada para garantir que o produto entregue supere as suas expectativas.",
    items: [
      {
        title: "Qualidade",
        description:
          "Processos rigorosos do início ao fim para garantir peças com precisão e acabamento de excelência.",
      },
      {
        title: "Suporte",
        description:
          "Uma equipe dedicada, onde cada profissional é peça fundamental para o sucesso do seu projeto.",
      },
      {
        title: "Tecnologia",
        description:
          "Equipamentos modernos e processos inovadores que transformam ideias em produtos reais.",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Solicite um orçamento hoje.",
    subtitle: "Nossa equipe está pronta para atender o seu projeto.",
    addressLines: [
      "Rodovia SC 108 nº 18201, Galpão 9",
      "CEP 89215-210 — Morro do Meio, Joinville/SC",
    ],
    email: "adm@plasmaster.ind.br",
    phone: "(47) 3440-0683",
    form: {
      title: "Solicite um orçamento",
      subtitle:
        "Compartilhe os dados essenciais do seu projeto para iniciar o atendimento.",
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
