"use client";

import { useEffect } from "react";

const INTEREST_SELECTOR = "#sobre";
const DESIRE_SELECTOR = "[data-animate-desire]";
const ACTION_SELECTOR = "#contato";

type CleanupFn = () => void;

export default function HomeScrollAnimations() {
  useEffect(() => {
    let cancelled = false;
    let started = false;
    let observer: IntersectionObserver | null = null;
    let cleanup: CleanupFn | null = null;

    const startAnimations = async () => {
      if (started || cancelled) {
        return;
      }
      started = true;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        return;
      }

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctxCleanups: CleanupFn[] = [];

      const interestSection = document.querySelector<HTMLElement>(INTEREST_SELECTOR);
      if (interestSection) {
        const interestHeader = interestSection.querySelector<HTMLElement>("[data-interest-header]");

        const interestCtx = gsap.context(() => {
          const titleWords = gsap.utils.toArray<HTMLElement>("[data-interest-word]");
          const bentoCards = gsap.utils.toArray<HTMLElement>("[data-interest-card]");
          const parallaxTargets = gsap.utils.toArray<HTMLElement>("[data-interest-parallax]");

          gsap.set(titleWords, { opacity: 0.18, y: 24 });
          gsap.to(titleWords, {
            opacity: 1,
            y: 0,
            ease: "none",
            stagger: isDesktop ? 0.03 : 0.022,
            scrollTrigger: {
              trigger: interestHeader ?? interestSection,
              start: isDesktop ? "top 88%" : "top 92%",
              end: isDesktop ? "top 40%" : "top 50%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(bentoCards, { y: 96, opacity: 0, scale: 0.96 });
          bentoCards.forEach((card, index) => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              delay: (index % 3) * 0.08,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            });
          });

          parallaxTargets.forEach((target) => {
            const strength = Number(target.dataset.parallaxStrength ?? "14");
            gsap.fromTo(
              target,
              { yPercent: -strength },
              {
                yPercent: strength,
                ease: "none",
                scrollTrigger: {
                  trigger: target.closest("[data-interest-card]") ?? target,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        }, interestSection);

        ctxCleanups.push(() => interestCtx.revert());
      }

      const desireSection = document.querySelector<HTMLElement>(DESIRE_SELECTOR);
      if (desireSection) {
        const textReveal = desireSection.querySelector<HTMLElement>("[data-desire-text-reveal]");
        const typingText = desireSection.querySelector<HTMLElement>("[data-desire-typing-text]");
        const typingCursor = desireSection.querySelector<HTMLElement>("[data-desire-typing-cursor]");
        const stackPin = desireSection.querySelector<HTMLElement>("[data-desire-stack-pin]");

        const desireCtx = gsap.context(() => {
          const carouselCards = gsap.utils.toArray<HTMLElement>("[data-desire-carousel-card]");
          const proofCards = gsap.utils.toArray<HTMLElement>("[data-proof-card]");
          const parallaxTargets = gsap.utils.toArray<HTMLElement>("[data-desire-parallax]");

          parallaxTargets.forEach((target) => {
            const strength = Number(target.dataset.parallaxStrength ?? "12");
            gsap.fromTo(
              target,
              { yPercent: -strength },
              {
                yPercent: strength,
                ease: "none",
                scrollTrigger: {
                  trigger: target,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          if (typingText && textReveal) {
            const fullText = typingText.textContent ?? "";
            const typingState = { count: 0 };
            typingText.textContent = "";

            gsap.to(typingState, {
              count: fullText.length,
              ease: "none",
              scrollTrigger: {
                trigger: textReveal,
                start: isDesktop ? "top 88%" : "top 94%",
                end: () => `+=${Math.round(window.innerHeight * (isDesktop ? 1.1 : 0.58))}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
              onUpdate: () => {
                typingText.textContent = fullText.slice(0, Math.round(typingState.count));
              },
            });
          }

          if (typingCursor) {
            gsap.to(typingCursor, {
              opacity: 0.2,
              duration: 0.62,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          }

          if (carouselCards.length > 0) {
            gsap.set(carouselCards, { opacity: 0, y: 72, scale: 0.965 });

            carouselCards.forEach((card) => {
              const imageShell = card.querySelector<HTMLElement>("[data-desire-card-image]");
              const bodyShell = card.querySelector<HTMLElement>("[data-desire-card-body]");

              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: isDesktop ? "top 90%" : "top 94%",
                  end: isDesktop ? "top 58%" : "top 74%",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              });

              timeline.to(
                card,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  ease: "none",
                },
                0,
              );

              if (imageShell) {
                timeline.fromTo(
                  imageShell,
                  { xPercent: -7, scale: 0.94 },
                  { xPercent: 0, scale: 1, ease: "none" },
                  0,
                );
              }

              if (bodyShell) {
                timeline.fromTo(
                  bodyShell,
                  { xPercent: 8, opacity: 0.35 },
                  { xPercent: 0, opacity: 1, ease: "none" },
                  0,
                );
              }
            });
          }

          if (proofCards.length > 1 && stackPin) {
            const stackLeadIn = isDesktop ? 0.8 : 0.6;
            const stackStepDuration = 1;
            const stackScrollLength = (proofCards.length - 1) * stackStepDuration + stackLeadIn;

            gsap.set(proofCards, {
              zIndex: (index) => index + 1,
              yPercent: (index) => (index === 0 ? 0 : 100),
              rotate: (index) => (index === 0 ? 0 : index % 2 === 0 ? -3 : 3),
              xPercent: (index) => (index === 0 ? 0 : index % 2 === 0 ? -4 : 4),
              opacity: 1,
              transformOrigin: "center top",
              force3D: true,
            });

            const stackTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: stackPin,
                pin: stackPin,
                start: "top top",
                end: () => `+=${stackScrollLength * window.innerHeight}`,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            for (let index = 1; index < proofCards.length; index += 1) {
              stackTimeline.to(
                proofCards[index],
                {
                  yPercent: 0,
                  xPercent: 0,
                  rotate: 0,
                  ease: "power2.out",
                  duration: stackStepDuration,
                },
                stackLeadIn + (index - 1) * stackStepDuration,
              );
            }
          }
        }, desireSection);

        ctxCleanups.push(() => desireCtx.revert());
      }

      const actionSection = document.querySelector<HTMLElement>(ACTION_SELECTOR);
      if (actionSection) {
        const ctaPanel = actionSection.querySelector<HTMLElement>("[data-action-cta-panel]");
        const formElement = actionSection.querySelector<HTMLElement>("[data-action-form]");

        const actionCtx = gsap.context(() => {
          const ctaWords = gsap.utils.toArray<HTMLElement>("[data-action-word]");
          const revealCards = gsap.utils.toArray<HTMLElement>("[data-action-reveal]");
          const parallaxTargets = gsap.utils.toArray<HTMLElement>("[data-action-parallax]");

          gsap.set(ctaWords, { opacity: 0.2, y: 32 });
          gsap.to(ctaWords, {
            opacity: 1,
            y: 0,
            ease: "none",
            stagger: isDesktop ? 0.028 : 0.02,
            scrollTrigger: {
              trigger: ctaPanel ?? actionSection,
              start: isDesktop ? "top 88%" : "top 92%",
              end: isDesktop ? "top 48%" : "top 56%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          parallaxTargets.forEach((target) => {
            const strength = Number(target.dataset.parallaxStrength ?? "10");
            gsap.fromTo(
              target,
              { yPercent: -strength },
              {
                yPercent: strength,
                ease: "none",
                scrollTrigger: {
                  trigger: target.closest("[data-action-parallax-scope]") ?? target,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          revealCards.forEach((card, index) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 72 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: (index % 3) * 0.08,
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          if (isDesktop && formElement) {
            gsap.fromTo(
              formElement,
              { x: 96, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: formElement,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          }
        }, actionSection);

        ctxCleanups.push(() => actionCtx.revert());
      }

      const refresh = () => ScrollTrigger.refresh();
      const timers = [120, 600, 1500].map((delay) => window.setTimeout(refresh, delay));
      window.addEventListener("load", refresh);

      const roots = [interestSection, desireSection, actionSection].filter(
        (root): root is HTMLElement => root != null,
      );

      const imageListeners: CleanupFn[] = [];
      roots.forEach((root) => {
        const images = root.querySelectorAll("img");
        images.forEach((img) => {
          if (!img.complete) {
            const listener = () => refresh();
            img.addEventListener("load", listener, { once: true });
            imageListeners.push(() => img.removeEventListener("load", listener));
          }
        });
      });

      cleanup = () => {
        timers.forEach((timer) => window.clearTimeout(timer));
        window.removeEventListener("load", refresh);
        imageListeners.forEach((removeListener) => removeListener());
        ctxCleanups.forEach((teardown) => teardown());
      };
    };

    const triggerElement = document.querySelector<HTMLElement>(INTEREST_SELECTOR);
    if (!triggerElement) {
      return () => {
        cancelled = true;
      };
    }

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          observer?.disconnect();
          observer = null;
          void startAnimations();
        },
        { rootMargin: "120% 0px 60% 0px", threshold: 0.01 },
      );

      observer.observe(triggerElement);
    } else {
      void startAnimations();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      cleanup?.();
    };
  }, []);

  return null;
}
