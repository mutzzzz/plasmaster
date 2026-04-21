"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SiteContent } from "../lib/site-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRevealRef = useRef<HTMLDivElement | null>(null);
  const stackSectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselPanelRef = useRef<HTMLDivElement | null>(null);

  const words = useMemo(() => manifestParagraph.split(" "), [manifestParagraph]);
  const activeSlide = proofCarousel[activeIndex];

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReducedMotion = () => {
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    syncReducedMotion();

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", syncReducedMotion);
    } else {
      reducedMotionQuery.addListener(syncReducedMotion);
    }

    return () => {
      if (typeof reducedMotionQuery.removeEventListener === "function") {
        reducedMotionQuery.removeEventListener("change", syncReducedMotion);
      } else {
        reducedMotionQuery.removeListener(syncReducedMotion);
      }
    };
  }, []);

  useEffect(() => {
    if (!carouselPanelRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const animation = gsap.fromTo(
      carouselPanelRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
    );

    return () => {
      animation.kill();
    };
  }, [activeIndex]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduce } = context.conditions as {
            isDesktop: boolean;
            reduce: boolean;
          };

          const revealWords = gsap.utils.toArray<HTMLElement>("[data-manifest-word]");
          const proofCards = gsap.utils.toArray<HTMLElement>("[data-proof-card]");

          if (reduce) {
            gsap.set(revealWords, { opacity: 1, y: 0 });
            gsap.set(proofCards, { clearProps: "all" });
            return;
          }

          gsap.set(revealWords, { opacity: 0.16 });

          gsap.timeline({
            scrollTrigger: {
              trigger: textRevealRef.current,
              start: isDesktop ? "top 72%" : "top 82%",
              end: isDesktop ? "bottom 38%" : "bottom 46%",
              scrub: true,
            },
          }).to(revealWords, {
            opacity: 1,
            ease: "none",
            stagger: isDesktop ? 0.08 : 0.05,
          });

          if (isDesktop) {
            gsap.set(proofCards, {
              zIndex: (index) => proofCards.length - index,
              yPercent: (index) => (index === 0 ? 0 : 118),
              rotate: (index) => (index === 0 ? 0 : index % 2 === 0 ? -4 : 4),
              transformOrigin: "center top",
            });

            const stackTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: stackSectionRef.current,
                start: "top top+=120",
                end: "bottom bottom-=40",
                scrub: true,
              },
            });

            proofCards.forEach((card, index) => {
              if (index === 0) {
                return;
              }

              stackTimeline
                .to(
                  card,
                  {
                    yPercent: index * 6,
                    rotate: 0,
                    duration: 0.85,
                    ease: "none",
                  },
                  index * 0.95,
                )
                .to(
                  proofCards[index - 1],
                  {
                    scale: 0.95,
                    yPercent: -4,
                    opacity: 0.54,
                    duration: 0.85,
                    ease: "none",
                  },
                  index * 0.95,
                );
            });

            return;
          }

          proofCards.forEach((card) => {
            gsap.fromTo(
              card,
              { autoAlpha: 0, y: 56 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="section-shell scroll-mt-32" aria-labelledby="desire-heading">
      <div className="site-shell space-y-12 sm:space-y-16 lg:space-y-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div ref={textRevealRef} className="space-y-7 lg:space-y-9">
            <div className="space-y-5">
              <span className="section-kicker">{principles.eyebrow}</span>
              <h2
                id="desire-heading"
                className="max-w-5xl text-[clamp(2.4rem,4.6vw,5rem)] leading-[0.94] tracking-[-0.065em] text-[var(--ink)] text-balance"
              >
                {words.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    data-manifest-word
                    className="inline-block pr-[0.28em]"
                    style={{ willChange: "opacity" }}
                  >
                    {word}
                  </span>
                ))}
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

          <div className="glass-panel overflow-hidden p-5 sm:p-6 lg:p-7">
            <div ref={carouselPanelRef} className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="group overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-white/84">
                <Image
                  src={activeSlide.image.src}
                  alt={activeSlide.image.alt}
                  width={1152}
                  height={864}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                    {activeSlide.note}
                  </span>
                  <h3 className="max-w-[14ch] text-[clamp(1.9rem,2.8vw,3rem)] leading-[0.96] tracking-[-0.05em] text-[var(--ink)] text-balance">
                    {activeSlide.title}
                  </h3>
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">
                    {activeSlide.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(proofCarousel.length).padStart(2, "0")}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((currentIndex) =>
                          currentIndex === 0 ? proofCarousel.length - 1 : currentIndex - 1,
                        )
                      }
                      className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 text-sm font-medium text-[var(--ink)] transition duration-500 ease-out hover:-translate-y-px hover:bg-white/92"
                    >
                      Anterior
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((currentIndex) =>
                          currentIndex === proofCarousel.length - 1 ? 0 : currentIndex + 1,
                        )
                      }
                      className="solid-button px-4"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={stackSectionRef}
          className={prefersReducedMotion ? "relative" : "relative lg:min-h-[220vh]"}
        >
          <div className={prefersReducedMotion ? "space-y-8" : "space-y-8 lg:sticky lg:top-28"}>
            <div className="max-w-3xl space-y-4">
              <span className="section-kicker">{differentials.eyebrow}</span>
              <p className="max-w-[58ch] text-base leading-8 text-[var(--ink-muted)]">
                {differentials.description}
              </p>
            </div>

            <div className={prefersReducedMotion ? "relative h-auto space-y-5" : "relative h-auto space-y-5 lg:h-[68vh]"}>
              {proofStack.map((item, index) => (
                <article
                  key={item.title}
                  data-proof-card
                  className={`group overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,248,250,0.82))] shadow-[0_28px_88px_-48px_rgba(14,29,41,0.28)] ${prefersReducedMotion ? "" : "lg:absolute lg:inset-0"}`}
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

                    <div className="overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-white/84">
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
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
