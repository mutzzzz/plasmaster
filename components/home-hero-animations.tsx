"use client";

import { useEffect } from "react";

type CleanupFn = () => void;

const HERO_STAGE_SELECTOR = "[data-home-hero-stage]";
const QUOTE_CLUSTER_SELECTOR = "[data-home-quote-cluster]";

function definedElements(elements: Array<HTMLElement | null>) {
  return elements.filter((element): element is HTMLElement => element !== null);
}

export default function HomeHeroAnimations() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: CleanupFn | null = null;

    const startAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { CustomEase }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/CustomEase"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger, CustomEase);

      const revealEase = CustomEase.create(
        "plasmasterHeroReveal",
        "M0,0 C0.16,1 0.3,1 1,1",
      );
      const settleEase = CustomEase.create(
        "plasmasterHeroSettle",
        "M0,0 C0.2,0.88 0.18,1 1,1",
      );
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            return undefined;
          }

          const ctx = gsap.context(() => {
            const heroStage = document.querySelector<HTMLElement>(HERO_STAGE_SELECTOR);
            const quoteCluster =
              document.querySelector<HTMLElement>(QUOTE_CLUSTER_SELECTOR);

            if (heroStage) {
              const heroMedia = gsap.utils.toArray<HTMLElement>(
                "[data-home-hero-media]",
                heroStage,
              );
              const heroGrid = heroStage.querySelector<HTMLElement>(
                "[data-home-hero-grid]",
              );
              const heroLogo = heroStage.querySelector<HTMLElement>(
                "[data-home-hero-logo]",
              );
              const heroMeta = heroStage.querySelector<HTMLElement>(
                "[data-home-hero-meta]",
              );
              const heroKicker = heroStage.querySelector<HTMLElement>(
                "[data-home-hero-kicker]",
              );
              const heroLines = gsap.utils.toArray<HTMLElement>(
                "[data-home-hero-line]",
                heroStage,
              );
              const heroCopy = heroStage.querySelector<HTMLElement>(
                "[data-home-hero-copy]",
              );
              const heroActions = heroStage.querySelector<HTMLElement>(
                "[data-home-hero-actions]",
              );
              const heroProof = heroStage.querySelector<HTMLElement>(
                "[data-home-hero-proof]",
              );
              const heroProofItems = gsap.utils.toArray<HTMLElement>(
                "[data-home-hero-proof-item]",
                heroStage,
              );

              const topRow = definedElements([heroLogo, heroMeta]);
              const copyBlock = definedElements([heroKicker, heroCopy, heroActions]);

              gsap.set(heroMedia, {
                scale: isDesktop ? 1.075 : 1.045,
                xPercent: isDesktop ? 1.2 : 0,
                transformOrigin: "50% 50%",
                willChange: "transform",
              });
              gsap.set(heroGrid, { autoAlpha: 0, y: isDesktop ? 22 : 12 });
              gsap.set(topRow, { autoAlpha: 0, y: -18 });
              gsap.set(heroKicker, { autoAlpha: 0, x: -18 });
              gsap.set(heroLines, {
                autoAlpha: 0,
                yPercent: 112,
                rotationX: -14,
                transformOrigin: "left bottom",
                willChange: "transform, opacity",
              });
              gsap.set([heroCopy, heroActions], { autoAlpha: 0, y: 34 });
              gsap.set(heroProof, { autoAlpha: 0, x: isDesktop ? 44 : 0, y: 20 });
              gsap.set(heroProofItems, { autoAlpha: 0, x: isDesktop ? 28 : 0 });

              const introTimeline = gsap.timeline({
                defaults: { ease: revealEase },
              });

              introTimeline
                .to(
                  heroMedia,
                  {
                    scale: 1,
                    xPercent: 0,
                    duration: 2.45,
                    ease: "power3.out",
                  },
                  0,
                )
                .to(heroGrid, { autoAlpha: 1, y: 0, duration: 1.4 }, 0.12)
                .to(topRow, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.16)
                .to(heroKicker, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.38)
                .to(
                  heroLines,
                  {
                    autoAlpha: 1,
                    yPercent: 0,
                    rotationX: 0,
                    duration: 1.15,
                    stagger: 0.075,
                  },
                  0.48,
                )
                .to(copyBlock.slice(1), { autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.1 }, 0.9)
                .to(
                  heroProof,
                  { autoAlpha: 1, x: 0, y: 0, duration: 0.86, ease: settleEase },
                  1.02,
                )
                .to(
                  heroProofItems,
                  { autoAlpha: 1, x: 0, duration: 0.64, stagger: 0.08 },
                  1.12,
                );

              gsap.to(heroMedia, {
                scale: isDesktop ? 1.035 : 1.018,
                duration: isDesktop ? 13 : 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                overwrite: false,
              });

              const heroExit = gsap.timeline({
                scrollTrigger: {
                  trigger: heroStage,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              });

              heroExit
                .to(
                  heroLines,
                  {
                    yPercent: isDesktop ? -28 : -18,
                    autoAlpha: 0.22,
                    stagger: { each: 0.025, from: "end" },
                    ease: "none",
                  },
                  0,
                )
                .to(copyBlock, { y: isDesktop ? -56 : -32, autoAlpha: 0, ease: "none" }, 0)
                .to(heroProof, { y: -36, autoAlpha: 0, ease: "none" }, 0)
                .to(heroGrid, { y: -46, autoAlpha: 0.3, ease: "none" }, 0);
            }

            if (quoteCluster) {
              const quoteVisual = quoteCluster.querySelector<HTMLElement>(
                "[data-home-quote-visual]",
              );
              const quoteForm = quoteCluster.querySelector<HTMLElement>(
                "[data-home-quote-form]",
              );
              const quoteMedia = quoteCluster.querySelector<HTMLElement>(
                "[data-home-quote-media]",
              );
              const quoteLabel = quoteCluster.querySelector<HTMLElement>(
                "[data-home-quote-label]",
              );
              const quoteFormItems = gsap.utils.toArray<HTMLElement>(
                "[data-home-quote-item]",
                quoteCluster,
              );

              const quoteCards = definedElements([quoteVisual, quoteForm]);
              gsap.set(quoteCards, {
                autoAlpha: 0,
                y: 76,
                scale: 0.975,
                willChange: "transform, opacity",
              });
              gsap.set(quoteLabel, { autoAlpha: 0, y: -12 });
              gsap.set(quoteFormItems, { autoAlpha: 0, y: 24 });

              const quoteTimeline = gsap.timeline({
                scrollTrigger: {
                  trigger: quoteCluster,
                  start: isDesktop ? "top 78%" : "top 86%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
                defaults: { ease: settleEase },
              });

              quoteTimeline
                .to(
                  quoteVisual,
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.05,
                  },
                  0,
                )
                .to(
                  quoteForm,
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.05,
                  },
                  0.12,
                )
                .to(quoteLabel, { autoAlpha: 1, y: 0, duration: 0.52 }, 0.34)
                .to(
                  quoteFormItems,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.58,
                    stagger: 0.055,
                  },
                  0.36,
                );

              if (quoteMedia) {
                gsap.fromTo(
                  quoteMedia,
                  { scale: 1.08, yPercent: -4 },
                  {
                    scale: 1.01,
                    yPercent: 4,
                    ease: "none",
                    scrollTrigger: {
                      trigger: quoteCluster,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              }
            }

            window.setTimeout(() => ScrollTrigger.refresh(), 80);
          });

          return () => ctx.revert();
        },
      );

      cleanup = () => mm.revert();
    };

    void startAnimations();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
