import Image from "next/image";
import type { SiteContent } from "../lib/site-content";

type InterestChapterProps = {
  intro: SiteContent["interestIntro"];
  marqueeItems: SiteContent["marqueeItems"];
  about: SiteContent["about"];
  services: SiteContent["services"];
  differentials: SiteContent["differentials"];
};

const inlineImage = {
  src: "/site-images/about-industrial-floor.png",
  alt: "Linha industrial da Plasmaster com operação técnica em andamento.",
};

const capacityImage = {
  src: "/site-images/about-industrial-floor.png",
  alt: "Técnico medindo componentes em PVC rígido ao lado de uma injetora industrial.",
};

const serviceImages = {
  "01": {
    src: "/site-images/service-outsourcing-detail.png",
    alt: "Molde industrial com peças termoplásticas recém-injetadas em destaque.",
  },
  "02": {
    src: "/site-images/service-full-service-workflow.png",
    alt: "Mesa técnica com molde, peças plásticas e desenho de engenharia em revisão.",
  },
} as const;

export default function InterestChapter({
  intro,
  marqueeItems,
  about,
  services,
  differentials,
}: InterestChapterProps) {
  const marqueeLoop = [...marqueeItems, ...marqueeItems];

  return (
    <section id="sobre" className="section-shell scroll-mt-32">
      <div className="site-shell space-y-12 sm:space-y-16 lg:space-y-20">
        <div className="space-y-8 lg:space-y-10">
          <div className="max-w-6xl space-y-6">
            <span className="section-kicker">{intro.eyebrow}</span>
            <h2 className="max-w-6xl text-[clamp(3.2rem,6vw,6.4rem)] leading-[0.9] tracking-[-0.07em] text-[var(--ink)] text-balance">
              {intro.titleLead}{" "}
              <span className="inline-flex h-[0.9em] w-[1.95em] translate-y-[-0.04em] overflow-hidden rounded-full align-middle border border-white/80 shadow-[0_18px_48px_-28px_rgba(14,29,41,0.45)]">
                <span className="relative block h-full w-full">
                  <Image
                    src={inlineImage.src}
                    alt={inlineImage.alt}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </span>
              </span>{" "}
              {intro.titleTrail}
            </h2>
            <p className="section-copy max-w-[64ch]">{intro.description}</p>
          </div>

          <div className="overflow-hidden rounded-full border border-[rgba(255,255,255,0.9)] bg-[rgba(255,255,255,0.62)] p-2 shadow-[0_24px_80px_-48px_rgba(14,29,41,0.34)]">
            <div className="marquee-track flex w-max min-w-full items-center gap-3 whitespace-nowrap">
              {marqueeLoop.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/88 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--ink-muted)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:grid-flow-dense">
          <article className="glass-panel group relative overflow-hidden p-7 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,183,219,0.2),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.22),transparent_56%)]" />
            <div className="relative space-y-8">
              <span className="section-kicker">{about.eyebrow}</span>

              <div className="space-y-5">
                <h3 className="max-w-[17ch] text-[clamp(2.4rem,4vw,4.8rem)] leading-[0.92] tracking-[-0.065em] text-[var(--ink)] text-balance">
                  {about.title}
                </h3>
                <p className="section-copy max-w-[58ch]">{about.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {about.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/82 px-4 py-5 shadow-[0_16px_44px_-30px_rgba(14,29,41,0.18)]"
                  >
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                      {highlight.label}
                    </p>
                    <p className="mt-3 text-lg font-medium tracking-[-0.04em] text-[var(--ink)]">
                      {highlight.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(18,35,48,0.96)] p-6 text-white shadow-[0_30px_90px_-46px_rgba(8,16,24,0.78)] sm:p-7 lg:col-span-5 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,183,219,0.28),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_30%)]" />
            <div className="relative space-y-6">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/12">
                <Image
                  src={capacityImage.src}
                  alt={capacityImage.alt}
                  width={1152}
                  height={864}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="aspect-[4/3] h-auto w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="space-y-4">
                <span className="text-[0.72rem] uppercase tracking-[0.24em] text-white/62">
                  {about.capacity.eyebrow}
                </span>
                <h3 className="max-w-[13ch] text-[clamp(2rem,3vw,3.8rem)] leading-[0.94] tracking-[-0.06em] text-balance">
                  {about.capacity.title}
                </h3>
                <p className="max-w-[36ch] text-sm leading-7 text-white/74">
                  {about.capacity.description}
                </p>
              </div>

              <div className="grid gap-3">
                {about.capacity.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/72"
                  >
                    <span>{metric.label}</span>
                    <span className="font-mono text-white">{metric.value}</span>
                  </div>
                ))}
              </div>

              <a
                href={about.capacity.cta.href}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--accent-deep)] transition duration-500 ease-out hover:-translate-y-px hover:bg-white/94"
              >
                {about.capacity.cta.label}
              </a>
            </div>
          </article>

          {services.items.map((service) => {
            const visual = serviceImages[service.id as keyof typeof serviceImages];

            return (
              <article
                key={service.id}
                id={service.id === services.items[0]?.id ? "servicos" : undefined}
                className="glass-panel group relative overflow-hidden p-6 sm:p-7 lg:col-span-4 lg:p-8"
              >
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(127,183,219,0.14),transparent_42%)]" />
                <div className="relative space-y-6">
                  <div className="overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-white/85">
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      width={1152}
                      height={864}
                      sizes="(min-width: 1024px) 26vw, 100vw"
                      className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                      {service.eyebrow}
                    </span>
                    <h3 className="max-w-[16ch] text-[clamp(1.7rem,2.5vw,2.6rem)] leading-[0.96] tracking-[-0.05em] text-[var(--ink)] text-balance">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-7 text-[var(--ink-muted)]">
                      {service.description}
                    </p>
                  </div>

                  <a href={service.cta.href} className="outline-button w-fit">
                    {service.cta.label}
                  </a>
                </div>
              </article>
            );
          })}

          <article className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(248,251,252,0.94),rgba(255,255,255,0.8))] p-6 shadow-[0_24px_80px_-50px_rgba(19,32,44,0.28)] sm:p-7 lg:col-span-4 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,183,219,0.16),transparent_34%)]" />
            <div className="relative space-y-6">
              <div className="space-y-3">
                <span className="section-kicker">{differentials.eyebrow}</span>
                <h3 className="max-w-[15ch] text-[clamp(1.9rem,2.7vw,2.9rem)] leading-[0.96] tracking-[-0.05em] text-[var(--ink)] text-balance">
                  {differentials.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--ink-muted)]">
                  {differentials.description}
                </p>
              </div>

              <div className="grid gap-3">
                {differentials.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.35rem] border border-[var(--line)] bg-white/88 px-4 py-4 shadow-[0_14px_40px_-30px_rgba(14,29,41,0.16)]"
                  >
                    <h4 className="text-sm font-medium tracking-[0.06em] text-[var(--ink)]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
