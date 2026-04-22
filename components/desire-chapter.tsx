import Image from "next/image";
import type { SiteContent } from "../lib/site-content";

type DesireChapterProps = {
  principles: SiteContent["about"]["principles"];
  differentials: SiteContent["differentials"];
  manifestParagraph: SiteContent["manifestParagraph"];
  proofStack: SiteContent["proofStack"];
  proofCarousel: SiteContent["proofCarousel"];
};

export default function DesireChapter({
  principles,
  differentials,
  manifestParagraph,
  proofStack,
  proofCarousel,
}: DesireChapterProps) {
  return (
    <section
      data-animate-desire
      className="section-shell scroll-mt-32"
      aria-labelledby="desire-heading"
    >
      <div className="site-shell space-y-12 sm:space-y-16 lg:space-y-20">
        <div className="grid gap-8 lg:items-start lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div data-desire-text-reveal className="space-y-7 lg:space-y-9">
            <div className="space-y-5">
              <span className="section-kicker">{principles.eyebrow}</span>
              <h2
                id="desire-heading"
                className="max-w-5xl text-[clamp(2.4rem,4.6vw,5rem)] leading-[0.94] tracking-[-0.065em] text-[var(--ink)] text-balance"
              >
                <span data-desire-typing-text>{manifestParagraph}</span>
                <span
                  data-desire-typing-cursor
                  aria-hidden
                  className="ml-[0.08em] inline-block text-[0.84em] text-[var(--accent-strong)]"
                >
                  |
                </span>
              </h2>
            </div>

            <p className="max-w-[58ch] text-sm leading-7 text-[var(--ink-muted)]">
              {principles.intro}
            </p>

            <div className="flex flex-wrap gap-2">
              {principles.values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-[var(--line)] bg-white/82 px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-muted)]"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel overflow-hidden p-5 sm:p-6 lg:self-start lg:p-7">
            <div className="space-y-5 sm:space-y-6">
              {proofCarousel.map((slide, index) => (
                <article
                  key={slide.title}
                  data-desire-carousel-card
                  className="grid items-start gap-6 border-b border-[var(--line)] pb-5 last:border-b-0 last:pb-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                >
                  <div
                    data-desire-card-image
                    className="group overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-white/84"
                  >
                    <div data-desire-parallax data-parallax-strength="10" className="h-full w-full">
                      <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        width={1152}
                        height={864}
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        className="block aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div data-desire-card-body className="flex flex-col gap-6">
                    <div className="space-y-4">
                      <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                        {slide.note}
                      </span>
                      <h3 className="max-w-[14ch] text-[clamp(1.9rem,2.8vw,3rem)] leading-[0.96] tracking-[-0.05em] text-[var(--ink)] text-balance">
                        {slide.title}
                      </h3>
                      <p className="text-sm leading-7 text-[var(--ink-muted)]">
                        {slide.description}
                      </p>
                    </div>

                    <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                      {String(index + 1).padStart(2, "0")} / {String(proofCarousel.length).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div data-desire-stack-pin className="space-y-8 lg:space-y-10">
            <div className="max-w-3xl space-y-4">
              <span className="section-kicker">{differentials.eyebrow}</span>
              <p className="max-w-[58ch] text-base leading-8 text-[var(--ink-muted)]">
                {differentials.description}
              </p>
            </div>

            <div className="relative h-[80dvh] lg:h-[72dvh] space-y-0">
              {proofStack.map((item, index) => (
                <article
                  key={item.title}
                  data-proof-card
                  className="group absolute inset-0 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,#f4f7fa_100%)] shadow-[0_28px_88px_-48px_rgba(14,29,41,0.32)]"
                >
                  <div className="grid h-full gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:p-8">
                    <div className="flex flex-col justify-between gap-6">
                      <div className="space-y-4">
                        <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="max-w-[13ch] text-[clamp(2rem,3vw,3.4rem)] leading-[0.96] tracking-[-0.06em] text-[var(--ink)] text-balance">
                          {item.title}
                        </h3>
                        <p className="max-w-[34ch] text-sm leading-7 text-[var(--ink-muted)]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-white">
                      <div data-desire-parallax data-parallax-strength="8" className="h-full w-full">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={1152}
                          height={864}
                          sizes="(min-width: 1024px) 44vw, 100vw"
                          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
