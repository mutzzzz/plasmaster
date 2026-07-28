import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as Search, l as MessageCircle, o as Package, s as PackageOpen } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-CI7FoQ18.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtos-7zwTIK6K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var plasmasterProducts = [
	{
		id: 1,
		name: "Etiqueta Transparente Retangular 33x22/3 com Tarja",
		category: "etiquetas",
		details: "Rolo com 3 carreiras e tarja preta de leitura sensorial.",
		code: "PM-001"
	},
	{
		id: 2,
		name: "Ribbon Dourado 30x300 para Fita de Cetim (Feliz Páscoa)",
		category: "ribbons",
		details: "Película ouro para impressão em fitas escuras.",
		code: "PM-002"
	},
	{
		id: 3,
		name: "Etiquetas Adesivas Vigilância Sanitária 60x40 mm Couchê",
		category: "etiquetas",
		details: "Milheiro padrão para adequação de normas sanitárias.",
		code: "PM-003"
	},
	{
		id: 4,
		name: "Etiqueta Transparente Retangular 50x30/2 com Tarja",
		category: "etiquetas",
		details: "Bobina com 2 carreiras e marcação óptica traseira.",
		code: "PM-004"
	},
	{
		id: 5,
		name: "Ribbon Dourado 30x300 para Fita de Cetim (D'or Prestige)",
		category: "ribbons",
		details: "Película metálica ouro de alta definição para fitas finas.",
		code: "PM-005"
	},
	{
		id: 6,
		name: "Ribbon Resina 110x74 Dourado (Brilhante)",
		category: "ribbons",
		details: "Fita de resina ouro para alta durabilidade e acabamento espelhado.",
		code: "PM-006"
	},
	{
		id: 7,
		name: "Etiqueta Transparente Retangular 50x30/2 (Verso com Tarja)",
		category: "etiquetas",
		details: "Destaque para o espaçamento de tarja preta industrial no liner.",
		code: "PM-007"
	},
	{
		id: 8,
		name: "Ribbon Inkanto Misto (Wax Resin) - Preto",
		category: "ribbons",
		details: "Fita mista preta para impressões industriais duráveis.",
		code: "PM-008"
	},
	{
		id: 9,
		name: "Etiquetas Adesivas Selo Frágil 100x50 mm Milheiro",
		category: "etiquetas",
		details: "Adesivo Couchê vermelho de alerta para embalagens.",
		code: "PM-009"
	},
	{
		id: 10,
		name: "Ribbon Inkanto Cera (Wax) - Preto",
		category: "ribbons",
		details: "Fita de cera econômica ideal para códigos de barras logísticos.",
		code: "PM-010"
	},
	{
		id: 11,
		name: "Etiqueta Transparente Retangular 33x22/3 (Bobina Horizontal)",
		category: "etiquetas",
		details: "Variação de rebobinamento horizontal para rotuladoras automáticas.",
		code: "PM-011"
	},
	{
		id: 12,
		name: "Ribbon Resina 110x74 Dourado (Acompanha Selo 'Love')",
		category: "ribbons",
		details: "Película homologada para impressão de lacres redondos metalizados.",
		code: "PM-012"
	},
	{
		id: 13,
		name: "Ribbon Dourado 30x300 (Fita 'Seja Doce como Chocolate')",
		category: "ribbons",
		details: "Excelente fixação em fitas de cetim personalizadas para docerias.",
		code: "PM-013"
	},
	{
		id: 14,
		name: "Ribbon Misto 110x74 Dourado para Fita de Cetim (Kit 3 Rolos)",
		category: "ribbons",
		details: "Pack industrial de ribbons ribbons metálicos de média largura.",
		code: "PM-014"
	},
	{
		id: 15,
		name: "Etiquetas de Voltagem Identificação 110V (Rolo Compacto)",
		category: "etiquetas",
		details: "Adesivos amarelos para marcação rápida de maquinários.",
		code: "PM-015"
	},
	{
		id: 16,
		name: "Etiquetas Adesivas de Identificação 110V Tomadas - 1 Milheiro",
		category: "etiquetas",
		details: "Cartela e rolo completo para padronização elétrica predial.",
		code: "PM-016"
	},
	{
		id: 17,
		name: "Ribbon Resina 110x74 Dourado (Rolo Vertical)",
		category: "ribbons",
		details: "Bobinamento padrão para impressoras térmicas de mesa (Zebra, Argox).",
		code: "PM-017"
	},
	{
		id: 18,
		name: "Etiqueta Gôndola Amarela 75x35 mm Couchê Adesiva",
		category: "etiquetas",
		details: "Etiqueta sem adesivo central/total para precificação em calhas.",
		code: "PM-018"
	},
	{
		id: 19,
		name: "Etiquetas de Validade para Alimentos 40x40 mm Couchê",
		category: "etiquetas",
		details: "Campos para preenchimento manual de lote e controle interno.",
		code: "PM-019"
	},
	{
		id: 20,
		name: "Etiquetas Vigilância Sanitária 60x40 mm (Rolo Vertical)",
		category: "etiquetas",
		details: "Disposição vertical para fácil aplicação manual em cozinhas.",
		code: "PM-020"
	},
	{
		id: 21,
		name: "Ribbon Misto 110x74 Dourado (Fita Branca D'or Prestige)",
		category: "ribbons",
		details: "Fórmula especial que evita borrões em fitas de cetim brancas.",
		code: "PM-021"
	},
	{
		id: 22,
		name: "Etiqueta Frágil Selo 'Este Lado Para Cima' 100x100 mm",
		category: "etiquetas",
		details: "Sinalização quadrada de grande porte com setas indicativas de fluxo.",
		code: "PM-022"
	}
];
function ProductsPage() {
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [failedImages, setFailedImages] = (0, import_react.useState)({});
	const handleImageError = (code) => {
		setFailedImages((prev) => ({
			...prev,
			[code]: true
		}));
	};
	const filteredProducts = (0, import_react.useMemo)(() => {
		return plasmasterProducts.filter((product) => {
			const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.details.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
			return matchesSearch && matchesCategory;
		});
	}, [searchTerm, categoryFilter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col pt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-grow container-landing pt-12 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 text-center md:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl",
							children: "Catálogo Plasmaster"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base md:text-lg text-muted-foreground max-w-2xl",
							children: "Gerenciamento e consulta de bobinas de etiquetas, rótulos e ribbons industriais"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-4 rounded-3xl border border-border/60 shadow-sm backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-grow max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Buscar produtos...",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value),
								className: "w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCategoryFilter("all"),
									className: `px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${categoryFilter === "all" ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10" : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`,
									children: "Todos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCategoryFilter("etiquetas"),
									className: `px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${categoryFilter === "etiquetas" ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10" : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`,
									children: "Etiquetas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCategoryFilter("ribbons"),
									className: `px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${categoryFilter === "ribbons" ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10" : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`,
									children: "Ribbons Premium"
								})
							]
						})]
					}),
					filteredProducts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: filteredProducts.map((product) => {
							product.category;
							const hasImageFailed = failedImages[product.code];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group border border-border bg-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative w-full h-48 bg-slate-50/60 rounded-2xl overflow-hidden flex items-center justify-center mb-4 border border-border/40 transition-colors group-hover:border-primary/20",
										children: !hasImageFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: `/products/${product.code.toLowerCase()}.jpeg`,
											alt: product.name,
											className: "w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105",
											onError: () => handleImageError(product.code)
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors group-hover:text-primary/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-10 w-10 stroke-[1.2] transition-transform duration-500 group-hover:scale-110" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xs font-medium uppercase tracking-wider font-mono",
												children: "Sem Foto"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-semibold text-lg text-navy leading-snug group-hover:text-primary transition-colors",
										children: product.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-slate-600 leading-relaxed",
										children: product.details
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-4 border-t border-border/60 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-2xs text-muted-foreground font-mono",
										children: ["CÓD: ", product.code]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `https://wa.me/5511996411512?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20o%20produto%20da%20Plasmaster:%20${encodeURIComponent(product.name)}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 text-xs font-semibold transition-colors duration-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5" }), "Orçamento"]
									})]
								})]
							}, product.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-16 bg-card rounded-3xl border border-border/60 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4 animate-bounce" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-medium text-slate-700",
								children: "Nenhum produto encontrado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Tente ajustar seus termos de busca ou filtros."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ProductsPage as component };
