import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Linhas", to: "/#linhas" },
  { label: "Quem Somos", to: "/#quem-somos" },
  { label: "Diferenciais", to: "/#diferenciais" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container-landing flex h-18 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-navy">
            Embalagens Integradas
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+5500000000000"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">Fale conosco</span>
          </a>
          <Link
            to="/#contato"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Consultor
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-landing flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/#contato"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Falar com Consultor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
