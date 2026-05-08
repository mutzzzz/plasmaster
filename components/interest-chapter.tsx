import Image from "next/image";
import { renderBrandText } from "../lib/brand-format";
import type { SiteContent } from "../lib/site-content";
import { imageBlurData } from "../lib/image-blur-data";

type InterestChapterProps = {
  intro: SiteContent["interestIntro"];
  marqueeItems: SiteContent["marqueeItems"];
  about: SiteContent["about"];
  services: SiteContent["services"];
  differentials: SiteContent["differentials"];
};

const inlineImage = {
  src: "/site-images/about-inline-badge-industrial.webp?v=2",
  alt: "Macro de bobina transparente com camadas visíveis e núcleo de papelão.",
};

const capacityImage = {
  src: "/site-images/about-industrial-floor.webp?v=2",
  alt: "Assortimento de embalagens Plasmaster com bobinas, sacaria e pilhas de embalagens flexíveis.",
};

const serviceImages = {
  "01": {
    src: "/site-images/service-outsourcing-detail.webp?v=2",
    alt: "Close-up de bobina parcialmente desenrolada ao lado de embalagens flexíveis empilhadas.",
  },
  "02": {
    src: "/site-images/service-full-service-workflow.webp?v=2",
    alt: "Família completa de soluções de embalagem com bobinas, sacaria e embalagens flexíveis organizadas em estúdio.",
  },
} as const;

const recommendationCriteria = [
  {
    label: "Aplicação",
    text: "Uso final, contato com o produto, exposição e rotina de manuseio.",
  },
  {
    label: "Volume",
    text: "Giro, recorrência e necessidade de reposição sem ruptura.",
  },
  {
    label: "Proteção",
    text: "Fechamento, transporte, armazenamento e risco de avaria.",
  },
  {
    label: "Restrição",
    text: "Material, resistência e exigência físico-química da operação.",
  },
];

export default function InterestChapter({
  intro,
  marqueeItems,
  about,
  services,
  differentials,
}: InterestChapterProps) {
  const marqueeLoop = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ];

  const titleLeadWords = intro.titleLead.split(" ");
  const titleTrailWords = intro.titleTrail.split(" ");

  return (
    <section
      id="sobre"
      data-animate-interest
      className="section-shell scroll-mt-32"
    >
      <div
        data-interest-roll-overlay
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[35] opacity-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div
          data-interest-roll-overlay-box
          className="absolute left-0 top-0 overflow-hidden border border-white/80 bg-white/70 shadow-[0_40px_120px_-40px_rgba(18,21,31,0.55)] will-change-transform"
          style={{
            width: 1,
            height: 1,
            borderRadius: 28,
            transform: "translate(0px,0px)",
          }}
        >
          <Image
            src={inlineImage.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 46vw, 70vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <aside
        data-interest-side-card="left"
        className="pointer-events-none fixed left-4 top-[16%] z-[45] flex w-[min(17rem,calc(100vw-2rem))] flex-col rounded-[1.2rem] border border-[var(--line)] bg-white/90 p-3 opacity-0 shadow-[0_24px_60px_-30px_rgba(18,21,31,0.4)] backdrop-blur-md sm:p-4 lg:left-5 lg:top-[36%] lg:max-w-[16rem] lg:rounded-[1.4rem]"
      >
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[var(--accent-strong)]">
          Volume sem ruptura
        </span>
        <p className="mt-2 text-sm leading-6 text-[var(--ink)]">
          Bobinas e filmes alinhados ao giro da operação, com reposição pensada para manter a
          linha abastecida.
        </p>
      </aside>

      <aside
        data-interest-side-card="right"
        className="pointer-events-none fixed right-4 top-[32%] z-[45] flex w-[min(17rem,calc(100vw-2rem))] flex-col rounded-[1.2rem] border border-[var(--line)] bg-white/90 p-3 opacity-0 shadow-[0_24px_60px_-30px_rgba(18,21,31,0.4)] backdrop-blur-md sm:p-4 lg:right-5 lg:top-[60%] lg:max-w-[16rem] lg:rounded-[1.4rem]"
      >
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[var(--accent-strong)]">
          Encaixe técnico
        </span>
        <p className="mt-2 text-sm leading-6 text-[var(--ink)]">
          Aplicação, resistência e logística entram na análise antes da recomendação comercial.
        </p>
      </aside>

      <div
        data-interest-roll-stage
        aria-hidden="true"
        className="site-shell pointer-events-none mb-10 block sm:mb-12 lg:mb-14"
      >
        <div className="flex min-h-[22rem] items-center justify-center sm:min-h-[28rem] lg:min-h-[34rem]">
          <div
            data-interest-roll-source
            className="relative aspect-[3/2] w-full max-w-[28rem] overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/70 shadow-[0_40px_120px_-54px_rgba(18,21,31,0.48)] sm:max-w-[34rem] lg:w-[min(76vw,58rem)] lg:max-w-none lg:rounded-[2rem]"
          >
            <Image
              src={inlineImage.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 58rem, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="site-shell space-y-12 sm:space-y-16 lg:space-y-20">
        <div className="space-y-8 lg:space-y-10">
          <div data-interest-header className="max-w-6xl space-y-6">
            <span className="section-kicker">{intro.eyebrow}</span>
            <h2 className="max-w-6xl text-[clamp(3.2rem,6vw,6.4rem)] leading-[0.9] tracking-[-0.07em] text-[var(--ink)] text-balance">
              {titleLeadWords.map((word, index) => (
                <span
                  key={`lead-${word}-${index}`}
                  data-interest-word
                  className="inline-block pr-[0.22em]"
                >
                  {word}
                </span>
              ))}
              <span
                data-interest-roll-anchor
                className="inline-flex h-[0.9em] w-[1.95em] translate-y-[-0.04em] overflow-hidden rounded-full align-middle border border-white/80 shadow-[0_18px_48px_-28px_rgba(18,21,31,0.45)]"
              >
                <span className="relative block h-full w-full" data-interest-roll-inline>
                  <Image
                    src={inlineImage.src}
                    alt={inlineImage.alt}
                    fill
                    sizes="160px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={imageBlurData[inlineImage.src]?.blurDataURL}
                  />
                </span>
              </span>{" "}
              {titleTrailWords.map((word, index) => (
                <span
                  key={`trail-${word}-${index}`}
                  data-interest-word
                  className="inline-block pr-[0.22em]"
                >
                  {word}
                </span>
              ))}
            </h2>
            <p className="section-copy max-w-[64ch]">{renderBrandText(intro.description)}</p>
          </div>

          <div className="overflow-hidden rounded-full border border-[rgba(244,243,238,0.9)] bg-[rgba(244,243,238,0.62)] p-2 shadow-[0_24px_80px_-48px_rgba(18,21,31,0.34)]">
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
          <article
            data-interest-card
            className="glass-panel group relative overflow-hidden p-7 sm:p-8 lg:col-span-7 lg:p-10"
          >
            <div
              data-interest-parallax
              data-parallax-strength="8"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,201,167,0.2),transparent_38%),linear-gradient(135deg,rgba(244,243,238,0.22),transparent_56%)]"
            />
            <div className="relative flex h-full flex-col gap-8">
              <span className="section-kicker">{about.eyebrow}</span>

              <div className="space-y-5">
                <h3 className="max-w-[17ch] text-[clamp(2.4rem,4vw,4.8rem)] leading-[0.92] tracking-[-0.065em] text-[var(--ink)] text-balance">
                  {about.title}
                </h3>
                <p className="section-copy max-w-[58ch]">{renderBrandText(about.description)}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {about.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/82 px-4 py-5 shadow-[0_16px_44px_-30px_rgba(18,21,31,0.18)]"
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

              <div className="rounded-[1.7rem] border border-[var(--line)] bg-[rgba(244,243,238,0.68)] p-5 shadow-[inset_0_1px_0_rgba(244,243,238,0.86)] sm:p-6">
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                      Leitura antes da linha
                    </p>
                    <p className="mt-2 max-w-[48ch] text-sm leading-6 text-[var(--ink-muted)]">
                      O espaço comercial vira critério: antes da indicação, a equipe cruza
                      aplicação, volume, proteção e restrições da operação.
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--line)] bg-white/78 px-3 py-1 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                    04 pontos
                  </span>
                </div>

                <div className="divide-y divide-[var(--line)]">
                  {recommendationCriteria.map((criterion) => (
                    <div
                      key={criterion.label}
                      className="grid gap-2 py-4 first:pt-5 last:pb-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5"
                    >
                      <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                        {criterion.label}
                      </span>
                      <span className="text-sm leading-6 text-[var(--ink)]">
                        {criterion.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article
            data-interest-card
            className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(18,21,31,0.96)] p-6 text-white shadow-[0_30px_90px_-46px_rgba(18,21,31,0.78)] sm:p-7 lg:col-span-5 lg:p-8"
          >
            <div
              data-interest-parallax
              data-parallax-strength="10"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,201,167,0.28),transparent_34%),linear-gradient(180deg,rgba(245,166,35,0.08),transparent_30%)]"
            />
            <div className="relative space-y-6">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/12">
                <div data-interest-parallax data-parallax-strength="12" className="h-full w-full">
                  <Image
                    src={capacityImage.src}
                    alt={capacityImage.alt}
                    width={1152}
                    height={864}
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="block aspect-[4/3] h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={imageBlurData[capacityImage.src]?.blurDataURL}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[0.72rem] uppercase tracking-[0.24em] text-white/62">
                  {about.capacity.eyebrow}
                </span>
                <h3 className="max-w-[13ch] text-[clamp(2rem,3vw,3.8rem)] leading-[0.94] tracking-[-0.06em] text-balance">
                  {about.capacity.title}
                </h3>
                <p className="max-w-[36ch] text-sm leading-7 text-white/74">
                  {renderBrandText(about.capacity.description)}
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
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium transition duration-500 ease-out hover:-translate-y-px hover:bg-white/94"
                style={{ color: "var(--ink)" }}
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
                data-interest-card
                id={service.id === services.items[0]?.id ? "servicos" : undefined}
                className="glass-panel group relative scroll-mt-32 overflow-hidden p-6 sm:p-7 lg:col-span-4 lg:p-8"
              >
                <div
                  data-interest-parallax
                  data-parallax-strength="9"
                  className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,201,167,0.14),transparent_42%)]"
                />
                <div className="relative space-y-6">
                  <div className="overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-white/85">
                    <div data-interest-parallax data-parallax-strength="12" className="h-full w-full">
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        width={1152}
                        height={864}
                        sizes="(min-width: 1024px) 26vw, 100vw"
                        className="block aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={imageBlurData[visual.src]?.blurDataURL}
                      />
                    </div>
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

          <article
            data-interest-card
            className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(244,243,238,0.94),rgba(244,243,238,0.8))] p-6 shadow-[0_24px_80px_-50px_rgba(18,21,31,0.28)] sm:p-7 lg:col-span-4 lg:p-8"
          >
            <div
              data-interest-parallax
              data-parallax-strength="9"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,201,167,0.16),transparent_34%)]"
            />
            <div className="relative space-y-6">
              <div className="space-y-3">
                <span className="section-kicker">{renderBrandText(differentials.eyebrow)}</span>
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
                    className="rounded-[1.35rem] border border-[var(--line)] bg-white/88 px-4 py-4 shadow-[0_14px_40px_-30px_rgba(18,21,31,0.16)]"
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
