import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-background">
      <div className="container-landing section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-lg font-bold">Embalagens Integradas</h3>
            <p className="mt-4 text-sm leading-relaxed text-background/80">
              Excelência e solidez em soluções integradas de embalagens para indústria e comércio.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/60">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-background/80 hover:text-background">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/#linhas" className="text-background/80 hover:text-background">
                  Nossas Linhas
                </Link>
              </li>
              <li>
                <Link to="/#quem-somos" className="text-background/80 hover:text-background">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/#diferenciais" className="text-background/80 hover:text-background">
                  Diferenciais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/60">
              Contato
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-background/80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+55 (00) 00000-0000</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contato@embalagensintegradas.com.br</span>
              </li>
              <li className="flex items-start gap-2 text-background/80">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Av. Industrial, 1000 — Brasil</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/60">
              Atendimento
            </h4>
            <p className="mt-4 text-sm text-background/80">
              Segunda a sexta, das 8h às 18h.
              <br />
              Nossa equipe está pronta para entender a sua demanda.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8 text-center text-sm text-background/60">
          © {new Date().getFullYear()} Embalagens Integradas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
