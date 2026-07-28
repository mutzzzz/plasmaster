import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Phone, d as Mail, t as X, u as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-CI7FoQ18.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navLinks = [{
	label: "Início",
	to: "/",
	exact: true
}, {
	label: "Produtos",
	to: "/produtos",
	exact: false
}];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl bg-white/60 backdrop-blur-md border border-white/20 shadow-lg px-6 flex flex-col transition-all duration-300 pointer-events-auto ${open ? "rounded-[24px] py-4" : "rounded-full py-2.5"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg sm:text-xl font-bold tracking-tight text-navy",
						children: "Plasmasters"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 text-sm md:flex",
					children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						activeOptions: { exact: link.exact },
						className: "rounded-full px-4 py-1.5 font-medium transition-all duration-300 text-slate-600 hover:text-slate-900 hover:bg-white/40",
						activeProps: { className: "bg-white/80 text-primary shadow-sm font-semibold hover:bg-white/80" },
						children: link.label
					}, link.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster.",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "hidden sm:inline-flex rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 text-sm transition-all duration-300 hover:-translate-y-px",
						children: "Falar com um Consultor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(!open),
						className: "inline-flex items-center justify-center rounded-full p-2 text-slate-600 hover:text-slate-900 md:hidden transition-all duration-300",
						"aria-label": "Abrir menu",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 pt-4 border-t border-slate-200/40 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-2",
				children: [navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					activeOptions: { exact: link.exact },
					onClick: () => setOpen(false),
					className: "rounded-full px-4 py-2 text-base font-medium text-slate-600 hover:bg-white/40 hover:text-slate-900 transition-colors",
					activeProps: { className: "bg-white/80 text-primary font-semibold shadow-sm" },
					children: link.label
				}, link.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster.",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mt-2 text-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 text-sm transition-colors block",
					children: "Falar com um Consultor"
				})]
			})
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-slate-300 bg-slate-50 text-slate-600 font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-landing py-12 sm:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-bold text-navy",
						children: "Plasmasters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-slate-500 max-w-sm",
						children: "Soluções integradas de embalagem com foco em continuidade, qualidade e confiança comercial."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-semibold uppercase tracking-wider text-slate-900",
						children: "Navegação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-primary transition-colors duration-200",
								children: "Home"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/#quem-somos",
								className: "hover:text-primary transition-colors duration-200",
								children: "Quem Somos"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/#linhas",
								className: "hover:text-primary transition-colors duration-200",
								children: "Soluções"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/#contato",
								className: "hover:text-primary transition-colors duration-200",
								children: "Contato"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-semibold uppercase tracking-wider text-slate-900",
							children: "Presença"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://mail.google.com/mail/?view=cm&fs=1&to=plasmaster.embalagem@gmail.com",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex items-center gap-2 hover:text-primary transition-colors duration-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 shrink-0 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "plasmaster.embalagem@gmail.com" })]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+5511996411512",
								className: "flex items-center gap-2 hover:text-primary transition-colors duration-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "(11) 99641-1512" })]
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-row items-center gap-4 text-slate-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.instagram.com/plasmaster.embalagens/",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "hover:text-primary transition-colors duration-200",
									"aria-label": "Instagram",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-5 w-5 fill-current",
										viewBox: "0 0 24 24",
										xmlns: "http://www.w3.org/2000/svg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://wa.me/5511996411512?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "hover:text-primary transition-colors duration-200",
									"aria-label": "WhatsApp",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-5 w-5 fill-current",
										viewBox: "0 0 24 24",
										xmlns: "http://www.w3.org/2000/svg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.279 3.51 8.484 0 6.654-5.338 11.992-11.95 11.992-1.999-.001-3.963-.5-5.717-1.448L0 24zm6.59-4.846c1.673.993 3.328 1.52 5.351 1.521 5.392 0 9.778-4.387 9.778-9.78 0-5.392-4.386-9.778-9.778-9.778-5.397 0-9.785 4.386-9.785 9.778 0 2.148.599 4.214 1.733 5.903L2.628 21.31l4.019-1.056zm12.084-5.462c-.334-.168-1.977-.975-2.28-1.085-.304-.11-.526-.164-.747.168-.221.332-.856 1.084-1.048 1.306-.193.222-.387.248-.721.08-1.64-.819-2.835-1.433-3.957-3.356-.296-.508-.296-.822-.125-1.127.153-.274.334-.388.5-.582.167-.194.222-.333.334-.555.111-.222.056-.416-.028-.583-.083-.167-.747-1.802-1.023-2.467-.269-.648-.54-.56-.747-.57-.213-.01-.458-.012-.702-.012s-.64.092-.975.467c-.334.375-1.28 1.252-1.28 3.053 0 1.801 1.311 3.538 1.496 3.788.185.25 2.58 3.939 6.249 5.522.873.377 1.554.602 2.085.771.875.278 1.672.239 2.302.145.702-.105 1.977-.808 2.256-1.589.28-.78.28-1.447.196-1.589-.084-.142-.308-.252-.642-.42z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://mail.google.com/mail/?view=cm&fs=1&to=plasmaster.embalagem@gmail.com",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "hover:text-primary transition-colors duration-200",
									"aria-label": "Gmail",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-5 w-5 fill-current",
										viewBox: "0 0 24 24",
										xmlns: "http://www.w3.org/2000/svg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" })
									})
								})
							]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 border-t border-slate-200/80 pt-8 text-center text-xs text-slate-400",
				children: "Copyright © 2026 PlasMASTER. Todos os direitos reservados. — Desenvolvido por OrkaBr"
			})]
		})
	});
}
//#endregion
export { Header as n, Footer as t };
