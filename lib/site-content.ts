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
  headerCtaLabel: string;
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
      eyebrow: string;
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
    { href: "#sobre", label: "Quem Somos" },
    { href: "#servicos", label: "Soluções" },
    { href: "#contato", label: "Contato" },
  ],
  headerCtaLabel: "Falar com um consultor",
  marqueeItems: [
    "Portfólio integrado",
    "Plásticos flexíveis",
    "Proteção e logística",
    "Embalagens rígidas",
    "Qualidade homologada",
    "Atendimento consultivo",
  ],
  interestIntro: {
    eyebrow: "Portfólio robusto para a operação inteira",
    titleLead: "Soluções integradas para quem precisa",
    titleTrail: "comprar com escala e critério.",
    description:
      "A Plasmaster é uma empresa que atua no mercado de embalagens plásticas flexíveis. Com anos de experiência e um time altamente capacitado, a Plasmaster é reconhecida por oferecer soluções de qualidade e inovação aos seus clientes.\nNossa linha de produtos inclui embalagens plásticas flexíveis para uma ampla gama de aplicações, desde alimentos e bebidas até produtos químicos e cosméticos. Todas as nossas embalagens são fabricadas com materiais de alta qualidade e tecnologia avançada, garantindo segurança, proteção e preservação dos produtos.\nAcreditamos em oferecer aos nossos clientes um serviço excepcional, desde o atendimento ao cliente até a entrega dos produtos. Nós trabalhamos de perto com nossos clientes para compreender suas necessidades e fornecer soluções personalizadas e eficientes.\nEscolha a Plasmaster para suas necessidades de embalagem plástica flexível e experimente a diferença de trabalhar com uma empresa comprometida com a qualidade e o atendimento ao cliente.",
  },
  manifestParagraph:
    "Fornecer bem não é apenas entregar produto. É conectar portfólio, qualidade homologada e atendimento consultivo para sustentar a rotina operacional com mais previsibilidade, segurança e eficiência comercial.",
  proofStack: [
    {
      title: "Portfólio integrado",
      description:
        "Embalagem, proteção, fechamento e acondicionamento podem ser tratados em uma única relação comercial, com menos dispersão de compra e mais coerência entre as soluções escolhidas.",
      image: {
        src: "/site-images/proof-quality-molding-detail.webp?v=3",
        alt: "Detalhe industrial usado para representar amplitude de portfólio e controle de fornecimento.",
      },
    },
    {
      title: "Qualidade homologada",
      description:
        "A seleção das linhas prioriza resistência, conformidade e desempenho para que o fornecimento responda a padrões técnicos mais exigentes.",
      image: {
        src: "/site-images/proof-support-operator-line.webp?v=3",
        alt: "Ambiente industrial usado para representar acompanhamento de qualidade e operação assistida.",
      },
    },
    {
      title: "Atendimento consultivo",
      description:
        "A recomendação parte da necessidade real da operação, equilibrando aplicação, custo-benefício e continuidade de abastecimento sem empurrar solução genérica.",
      image: {
        src: "/site-images/proof-technology-workbench.webp?v=4",
        alt: "Mesa técnica com bobinas e amostras coloridas usada para representar análise consultiva de materiais.",
      },
    },
  ],
  proofCarousel: [
    {
      title: "Amplitude de linhas",
      note: "One-stop-shop para embalagens",
      description:
        "Plásticos flexíveis, materiais de proteção e soluções rígidas entram no portfólio para simplificar a compra e reduzir a fragmentação entre fornecedores.",
      image: {
        src: "/site-images/carousel-technical-inspection.webp?v=3",
        alt: "Conjunto colorido de bobinas, sacaria e embalagens flexíveis representando amplitude de soluções.",
      },
    },
    {
      title: "Proteção para a cadeia",
      note: "Logística com fechamento seguro",
      description:
        "Stretch, shrink, PVC, plástico bolha, papelão ondulado e fitas adesivas compõem uma frente voltada a proteção, fechamento e estabilidade no transporte.",
      image: {
        src: "/site-images/carousel-cycle-control.webp?v=2",
        alt: "Detalhe industrial representando soluções para fechamento, proteção e logística.",
      },
    },
    {
      title: "Robustez de alta exigência",
      note: "Embalagens rígidas com barreira",
      description:
        "Galões plásticos e embalagens fluoretadas ampliam a resposta para aplicações que exigem resistência físico-química, ergonomia e proteção avançada.",
      image: {
        src: "/site-images/carousel-project-to-lot.webp?v=3",
        alt: "Linha colorida de produtos com bobinas, embalagens flexíveis e sacaria organizada em progressão de portfólio.",
      },
    },
  ],
  hero: {
    intro: {
      eyebrow: "Soluções integradas de embalagens",
      title: "Excelência e solidez em soluções integradas de embalagens.",
      description:
        "Atendemos às exigências da indústria e do comércio com um portfólio completo de plásticos flexíveis, materiais de proteção e embalagens rígidas. Estrutura, tecnologia e compromisso para sustentar a operação do seu negócio.",
      primaryAction: {
        label: "Falar com um consultor",
        href: "#contato-form",
      },
      secondaryAction: {
        label: "Conhecer nossas linhas",
        href: "#servicos",
      },
      metrics: [
        { label: "Portfólio", value: "integrado" },
        { label: "Plásticos", value: "flexíveis" },
        { label: "Proteção", value: "logística" },
        { label: "Atendimento", value: "consultivo" },
      ],
    },
    sequence: {
      badge: "Portfólio em foco",
      note:
        "A narrativa apresenta amplitude de portfólio, centralização comercial e apoio consultivo sincronizados ao avanço do scroll.",
      beats: [
        {
          id: "portfolio",
          eyebrow: "Fornecimento estratégico",
          title: "Portfólio completo para operações que exigem escala, regularidade e resposta.",
          body:
            "A Plasmaster se posiciona como parceira de abastecimento para empresas que não querem pulverizar compras entre vários fornecedores.",
          start: 0.04,
          end: 0.28,
          depth: 42,
        },
        {
          id: "centralizacao",
          eyebrow: "Centralização com critério",
          title: "Embalagem, proteção e fechamento em um único parceiro.",
          body:
            "A segunda passagem reforça menos ruído operacional, melhor leitura da demanda e mais consistência na rotina de compra.",
          start: 0.3,
          end: 0.6,
          depth: 54,
        },
        {
          id: "eficiencia",
          eyebrow: "Eficiência comercial",
          title: "Mais previsibilidade para a cadeia. Menos fricção para o time.",
          body:
            "O fechamento direciona o visitante ao contato consultivo para enquadrar aplicação, material e custo-benefício.",
          start: 0.62,
          end: 0.94,
          depth: 48,
        },
      ],
    },
    form: {
      eyebrow: "Atendimento consultivo",
      title: "Solicite atendimento consultivo",
      subtitle: "Envie sua demanda e nosso time indica a linha mais adequada para a sua operação.",
      buttonLabel: "Quero falar com um especialista",
      fields: {
        name: {
          label: "Seu nome",
          placeholder: "Seu nome",
          helperText: "Informe quem conduz a demanda comercial.",
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
          label: "Qual é a sua demanda?",
          placeholder: "Descreva aplicação, volume, material ou necessidade logística.",
          helperText: "Quanto mais contexto, mais assertiva será a recomendação.",
          name: "message",
        },
      },
    },
  },
  about: {
    eyebrow: "Quem somos",
    title: "Autoridade comercial com visão técnica de operação.",
    description:
      "Com sólida presença no mercado de embalagens, a Plasmaster atua como elo estratégico entre clientes e soluções industriais. Nosso modelo combina amplitude de portfólio, qualidade consistente e atendimento consultivo para demandas de diferentes portes e segmentos.",
    highlights: [
      { label: "Modelo", value: "One-stop-shop" },
      { label: "Mercado", value: "Indústria e comércio" },
      { label: "Abordagem", value: "Consultiva" },
    ],
    capacity: {
      eyebrow: "Modelo de atendimento",
      title: "Uma operação desenhada para indicar a solução certa, sem dispersar a compra.",
      description:
        "Em vez de empurrar catálogo, a Plasmaster organiza linhas complementares para orientar aplicação, fechamento, proteção e acondicionamento com mais coerência técnica e comercial.",
      metrics: [
        { label: "Portfólio", value: "integrado" },
        { label: "Apoio", value: "consultivo" },
        { label: "Foco", value: "continuidade" },
      ],
      cta: {
        label: "Fale com a equipe",
        href: "#contato-form",
      },
    },
    principles: {
      eyebrow: "Base de atuação",
      intro:
        "Nosso papel é simplificar a decisão de compra com portfólio amplo, qualidade homologada e recomendação técnica orientada ao melhor encaixe para cada operação.",
      mission:
        "Conectar indústria e comércio a soluções de embalagem que combinem desempenho, continuidade de fornecimento e segurança operacional.",
      vision:
        "Ser reconhecida como parceira estratégica em soluções integradas de embalagens, unindo amplitude de portfólio e atendimento consultivo.",
      values: [
        "Portfólio integrado",
        "Qualidade homologada",
        "Atendimento consultivo",
        "Confiabilidade operacional",
        "Compromisso comercial",
      ],
    },
  },
  services: {
    eyebrow: "Linhas de atuação",
    title: "Soluções para embalar, proteger e sustentar a operação.",
    description:
      "Nosso portfólio combina amplitude comercial e leitura técnica para atender compra recorrente, proteção logística e aplicações de maior exigência.",
    items: [
      {
        id: "01",
        eyebrow: "Plásticos flexíveis",
        title: "Flexibilidade para rotinas industriais e comerciais",
        description:
          "Bobinas industriais e comerciais, sacarias de alta densidade, filmes lisos e impressos, materiais reciclados e envelopes de segurança com fita permanente para operações que pedem resistência e versatilidade.",
        cta: { label: "Falar sobre essa linha", href: "#contato-form" },
      },
      {
        id: "02",
        eyebrow: "Proteção, logística e rígidos",
        title: "Fechamento seguro, proteção de carga e robustez de alta exigência",
        description:
          "Stretch, shrink, PVC, plástico bolha, papelão ondulado e fitas adesivas cobrem fechamento e proteção no transporte, enquanto galões plásticos e embalagens fluoretadas atendem aplicações com maior exigência físico-química.",
        cta: { label: "Falar sobre essa linha", href: "#contato-form" },
      },
    ],
  },
  differentials: {
    eyebrow: "Por que a Plasmaster",
    title: "O mercado escolhe quem simplifica a compra sem perder critério.",
    description:
      "Sem promessas vazias: a superioridade vem da capacidade de centralizar soluções, manter padrão de qualidade e responder com leitura técnica à demanda de cada operação.",
    items: [
      {
        title: "Portfólio integrado",
        description:
          "Soluções de embalagem, fechamento e proteção centralizadas em um único parceiro de negócios.",
      },
      {
        title: "Qualidade homologada",
        description:
          "Linhas pensadas para sustentar padrões rigorosos de resistência, conformidade e desempenho.",
      },
      {
        title: "Atendimento consultivo",
        description:
          "Um time preparado para entender a demanda técnica e indicar o melhor encaixe entre aplicação, custo e continuidade.",
      },
    ],
  },
  actionCta: {
    eyebrow: "Contato comercial",
    titleLead: "Centralize suas soluções",
    titleTrail: "com mais critério.",
    description:
      "Se a sua operação precisa de regularidade de fornecimento, apoio técnico e amplitude de portfólio, a conversa começa com aplicação, volume e rotina de consumo.",
    primaryAction: {
      label: "Enviar demanda",
      href: "#contato-form",
    },
    secondaryAction: {
      label: "Falar com a equipe",
      href: "#contato-form",
    },
    signals: [
      { label: "Modelo", value: "portfólio integrado" },
      { label: "Atendimento", value: "consultivo" },
      { label: "Foco", value: "continuidade" },
    ],
  },
  contact: {
    eyebrow: "Conte o que sua operação precisa",
    title: "Abra a conversa com o contexto comercial certo.",
    subtitle:
      "Descreva aplicação, volume, tipo de material ou necessidade logística para direcionarmos o atendimento.",
    addressLines: [],
    email: "plasmaster.embalagem@gmail.com",
    phone: "(47) 3440-0683",
    form: {
      title: "Envie seu briefing",
      subtitle:
        "Quanto mais contexto sobre uso, volume e restrições, mais assertiva será a indicação da linha.",
      buttonLabel: "Solicitar contato",
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
          placeholder: "Descreva aplicação, volume, material ou necessidade logística.",
          helperText: "Inclua contexto suficiente para direcionar a recomendação.",
          name: "message",
        },
      },
    },
  },
  footer: {
    tagline:
      "Soluções integradas de embalagem com foco em continuidade, qualidade e confiança comercial.",
    socialLinks: ["Facebook", "Twitter / X", "Instagram", "Google", "LinkedIn"],
    copyright:
      "Copyright © 2026 Plasmaster. Todos os direitos reservados. — Desenvolvido por OrkaBr",
  },
};
