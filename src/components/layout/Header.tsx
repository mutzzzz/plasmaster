import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Início", to: "/" as const, exact: true },
  { label: "Produtos", to: "/produtos" as const, exact: false },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl bg-white/60 backdrop-blur-md border border-white/20 shadow-lg px-6 flex flex-col transition-all duration-300 pointer-events-auto rounded-[26px] overflow-hidden ${open ? 'py-4' : 'py-2.5'}`}>
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/cubo.png" alt="Plasmaster Logo" className="h-8 w-auto" />
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-navy">
            Plasmaster
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              className="rounded-full px-4 py-1.5 font-medium transition-all duration-300 text-slate-600 hover:text-slate-900 hover:bg-white/40"
              activeProps={{
                className: "bg-white/80 text-primary shadow-sm font-semibold hover:bg-white/80"
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 text-sm transition-all duration-300 hover:-translate-y-px"
          >
            Falar com um Consultor
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-600 hover:text-slate-900 md:hidden transition-all duration-300"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Fluid Grid Transition */}
      <div 
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className={`transition-all duration-300 ease-out flex flex-col gap-2 ${
            open ? 'mt-4 pt-4 border-t border-slate-200/40 opacity-100 transform translate-y-0' : 'mt-0 pt-0 border-t border-transparent opacity-0 transform -translate-y-4'
          }`}>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  activeOptions={{ exact: link.exact }}
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-2 text-base font-medium text-slate-600 hover:bg-white/40 hover:text-slate-900 transition-colors whitespace-nowrap"
                  activeProps={{
                    className: "bg-white/80 text-primary font-semibold shadow-sm"
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/5511996411512?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Plasmaster."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 text-sm transition-colors block whitespace-nowrap"
              >
                Falar com um Consultor
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

