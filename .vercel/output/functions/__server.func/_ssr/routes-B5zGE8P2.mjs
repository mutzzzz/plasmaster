import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PackageCheck, f as Layers, h as ArrowRight, l as MessageCircle, m as Award, n as Users, o as Package, p as CircleCheckBig, r as Shield } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-CI7FoQ18.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B5zGE8P2.js
var import_jsx_runtime = require_jsx_runtime();
var hero_packaging_default = "/assets/hero-packaging-CSj6-IO6.jpg";
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "inicio",
		className: "relative overflow-hidden bg-background pt-20 pb-8 lg:pt-16 lg:pb-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-[92%] max-w-6xl mx-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid h-auto lg:min-h-[calc(100vh-6.5rem)] lg:grid-cols-2 lg:items-center gap-6 lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col justify-start pt-2 pb-2 lg:justify-start lg:h-full lg:py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground",
								children: "Soluções integradas de embalagens"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-display text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl",
								children: "Excelência e Solidez em Soluções Integradas de Embalagens"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-lg leading-relaxed text-muted-foreground",
								children: "Atendendo às mais altas exigências da indústria e do comércio com um portfólio completo de plásticos flexíveis, materiais de proteção e embalagens rígidas. Estrutura, tecnologia e compromisso com o seu negócio."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster.",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Falar com um Consultor"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/#linhas",
									className: "inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent",
									children: ["Conhecer Nossas Linhas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-0 lg:min-h-full lg:self-stretch lg:py-12 lg:px-0 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[220px] sm:min-h-[300px] lg:min-h-0 overflow-hidden rounded-3xl shadow-lg border border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_packaging_default,
							alt: "Linha de produção industrial de embalagens plásticas flexíveis",
							width: 1920,
							height: 1080,
							loading: "eager",
							className: "absolute inset-0 h-full w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" })]
					})
				})]
			})
		})
	});
}
var lines = [
	{
		id: "flexiveis",
		title: "Plásticos Flexíveis",
		icon: Layers,
		description: "Desenvolvidos com alta tecnologia para garantir resistência e versatilidade.",
		items: [
			"Bobinas industriais e comerciais",
			"Sacarias de alta densidade",
			"Filmes lisos e impressos",
			"Materiais reciclados sustentáveis",
			"Envelopes de segurança com fita permanente"
		],
		image: "/assets/flexible-plastics-CfyqfB43.jpg",
		alt: "Bobinas de plástico flexível, sacarias e materiais reciclados"
	},
	{
		id: "protecao",
		title: "Proteção e Logística",
		icon: Shield,
		description: "A segurança que a sua cadeia de suprimentos exige.",
		items: [
			"Filme Stretch, Shrink e PVC",
			"Plástico Bolha e Papelão Ondulado para absorção de impacto",
			"Fitas Adesivas de alta fixação para fechamento seguro"
		],
		image: "/assets/protection-logistics-Q250b2Oj.jpg",
		alt: "Materiais de proteção e logística: stretch, plástico bolha e fitas adesivas"
	},
	{
		id: "rigidas",
		title: "Embalagens Rígidas",
		icon: Package,
		description: "Robustez e segurança físico-química para produtos de alta exigência.",
		items: ["Galões Plásticos com design ergonômico e resistente", "Embalagens Fluoretadas (proteção de barreira avançada para produtos químicos e garantia de segurança ambiental)"],
		image: "/assets/rigid-packaging-C_cPWp9n.jpg",
		alt: "Galões plásticos e embalagens rígidas industriais"
	}
];
function Lines() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "linhas",
		className: "bg-background section-padding",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-landing",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold uppercase tracking-wider text-steel",
							children: "Portfólio completo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
							children: "Nossas Linhas de Atuação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-muted-foreground",
							children: "Atuamos como um fornecedor completo (One-Stop-Shop), unindo diversidade de produtos e garantia de entrega para atender todas as suas demandas de embalagem."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-8 lg:grid-cols-3",
					children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/70 backdrop-blur-md shadow-sm transition-all hover:shadow-lg hover:-translate-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[3/2] overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: line.image,
								alt: line.alt,
								width: 1200,
								height: 800,
								loading: "lazy",
								className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(line.icon, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-bold text-foreground",
										children: line.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: line.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 flex-1 space-y-2",
									children: line.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2 text-sm text-foreground/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-steel" }), item]
									}, item))
								})
							]
						})]
					}, line.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://wa.me/5511996411512?text=Olá,%20gostaria%20de%20solicitar%20uma%20cotação.",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors",
						children: ["Solicitar cotação", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			]
		})
	});
}
var pillars = [
	"Amplo portfólio de produtos",
	"Garantia de qualidade homologada",
	"Atendimento técnico consultivo"
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "quem-somos",
		className: "bg-navy text-background section-padding",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-landing",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold uppercase tracking-wider text-background/60",
						children: "Quem Somos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl",
						children: "A Autoridade no Mercado de Embalagens"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg leading-relaxed text-background/85",
						children: "Com sólida presença no mercado de embalagens, atuamos como o elo estratégico entre as melhores indústrias. Nosso modelo de negócios é fundamentado em três pilares: amplo portfólio, garantia de qualidade e atendimento técnico consultivo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-relaxed text-background/85",
						children: "Entendemos as complexidades do setor produtivo e logístico, e por isso entregamos não apenas produtos, mas confiabilidade operacional para clientes de diversos portes e segmentos."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-background/10 bg-background/5 p-8 backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold",
							children: "Três pilares que nos sustentam"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-4",
							children: pillars.map((pillar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "mt-0.5 h-5 w-5 shrink-0 text-steel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base text-background/90",
									children: pillar
								})]
							}, pillar))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid grid-cols-3 gap-4 border-t border-background/10 pt-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl font-bold text-steel",
									children: "+15"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-background/60",
									children: "anos de mercado"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl font-bold text-steel",
									children: "+500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-background/60",
									children: "clientes atendidos"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl font-bold text-steel",
									children: "3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-background/60",
									children: "linhas de atuação"
								})] })
							]
						})
					]
				})]
			})
		})
	});
}
var differentials = [
	{
		icon: PackageCheck,
		title: "Portfólio Integrado",
		description: "Todas as soluções de embalagem, fechamento e transporte centralizadas em um único parceiro de negócios."
	},
	{
		icon: Award,
		title: "Qualidade Homologada",
		description: "Trabalhamos apenas com fabricantes de ponta, garantindo padrões rigorosos de resistência e conformidade."
	},
	{
		icon: Users,
		title: "Atendimento Consultivo",
		description: "Uma equipe preparada para entender a demanda técnica da sua empresa e indicar o material com o melhor custo-benefício."
	}
];
function Differentials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "diferenciais",
		className: "bg-background section-padding",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-landing",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold uppercase tracking-wider text-steel",
						children: "Por que nos escolher"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
						children: "Nossos Diferenciais"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground",
						children: "Sem gatilhos de urgência. Apenas fatos que comprovam a superioridade do nosso trabalho."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-8 md:grid-cols-3",
				children: differentials.map((diff) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(diff.icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-xl font-bold text-foreground",
							children: diff.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: diff.description
						})
					]
				}, diff.title))
			})]
		})
	});
}
function CTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contato",
		className: "bg-navy-light text-background section-padding",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-landing",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold tracking-tight sm:text-4xl",
						children: "Pronto para encontrar a embalagem ideal para o seu negócio?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-background/85",
						children: "Fale com um dos nossos consultores e descubra como podemos otimar o seu processo de embalagem, proteção e transporte com soluções sob medida."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster.",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-background/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Falar com um Consultor"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/#linhas",
							className: "inline-flex items-center justify-center gap-2 rounded-full border border-background/30 bg-transparent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-background/10",
							children: ["Conhecer Nossas Linhas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-background/60",
						children: "Responderemos em até 24 horas úteis."
					})
				]
			})
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Differentials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
//#endregion
export { Index as component };
