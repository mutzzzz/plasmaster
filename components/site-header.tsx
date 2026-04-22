import Image from "next/image";
import type { NavItem } from "../lib/site-content";

type SiteHeaderProps = {
  items: NavItem[];
};

export default function SiteHeader({ items }: SiteHeaderProps) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 py-4 sm:py-5">
      <div className="site-shell flex items-end justify-between gap-3 sm:items-center">
        <a
          href="#home"
          className="group flex min-w-0 items-center gap-3 rounded-full border border-white/80 bg-[rgba(255,255,255,0.76)] px-4 py-3 shadow-[0_24px_70px_-46px_rgba(14,29,41,0.4)] backdrop-blur-[18px] transition duration-500 ease-out hover:-translate-y-px hover:bg-white/86"
        >
          <Image
            src="/plasmaster-logo.png"
            alt="Plasmaster"
            width={190}
            height={40}
            priority
            className="h-auto w-[148px] sm:w-[164px]"
          />
          <span className="hidden h-8 w-px bg-[var(--line)] xl:block" />
          <span className="hidden text-[0.66rem] font-medium uppercase tracking-[0.26em] text-[var(--ink-soft)] xl:block">
            Joinville desde 2005
          </span>
        </a>

        <div className="flex items-center justify-end gap-2">
          <nav className="hidden items-center gap-1 rounded-full border border-white/80 bg-[rgba(255,255,255,0.66)] p-2 text-sm text-[var(--ink-muted)] shadow-[0_24px_70px_-46px_rgba(14,29,41,0.3)] backdrop-blur-[18px] md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 font-medium transition duration-500 ease-out hover:bg-white hover:text-[var(--ink)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className="solid-button shrink-0 min-h-[2.9rem] border border-[rgba(17,32,44,0.08)] px-3 py-2 text-[0.78rem] leading-[1.05] whitespace-nowrap sm:min-h-[3.25rem] sm:px-5 sm:py-3 sm:text-sm"
            style={{ color: "#ffffff" }}
          >
            Solicitar orçamento
          </a>
        </div>
      </div>
    </header>
  );
}
