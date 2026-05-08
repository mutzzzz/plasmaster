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
          const marqueePills = gsap.utils.toArray<HTMLElement>("[data-interest-marquee-pill]");
          const highlightTiles = gsap.utils.toArray<HTMLElement>("[data-interest-highlight]");
          const criteriaRows = gsap.utils.toArray<HTMLElement>("[data-interest-criteria-row]");
          const capacityMetrics = gsap.utils.toArray<HTMLElement>("[data-interest-capacity-metric]");
          const serviceCards = gsap.utils.toArray<HTMLElement>("[data-interest-service-card]");
          const differentialItems = gsap.utils.toArray<HTMLElement>(
            "[data-interest-differential-item]",
          );

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
            const scaleBuffer = 1 + (strength * 2 + 6) / 100;
            gsap.fromTo(
              target,
              { yPercent: -strength, scale: scaleBuffer },
              {
                yPercent: strength,
                scale: scaleBuffer,
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

          if (marqueePills.length > 0) {
            gsap.set(marqueePills, {
              autoAlpha: 0,
              y: 20,
              scale: 0.96,
              willChange: "transform, opacity",
            });
            gsap.to(marqueePills, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              ease: "power3.out",
              stagger: { each: 0.025, from: "center" },
              scrollTrigger: {
                trigger: interestHeader ?? interestSection,
                start: "top 82%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            });
          }

          if (highlightTiles.length > 0) {
            gsap.set(highlightTiles, {
              autoAlpha: 0,
              y: 32,
              scale: 0.94,
              willChange: "transform, opacity",
            });
            ScrollTrigger.batch(highlightTiles, {
              interval: 0.08,
              batchMax: isDesktop ? 3 : 2,
              start: "top 90%",
              onEnter: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.74,
                  ease: "power3.out",
                  stagger: 0.07,
                  overwrite: "auto",
                });
              },
              onLeaveBack: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 0,
                  y: 26,
                  scale: 0.96,
                  duration: 0.34,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
            });
          }

          if (criteriaRows.length > 0) {
            const criteriaPanel = interestSection.querySelector<HTMLElement>(
              "[data-interest-criteria-panel]",
            );

            gsap.set(criteriaRows, {
              autoAlpha: 0.22,
              x: isDesktop ? -34 : 0,
              y: 18,
              willChange: "transform, opacity",
            });

            gsap.timeline({
              scrollTrigger: {
                trigger: criteriaPanel ?? criteriaRows[0],
                start: isDesktop ? "top 84%" : "top 88%",
                end: isDesktop ? "bottom 62%" : "bottom 72%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }).to(criteriaRows, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              ease: "none",
              stagger: 0.18,
            });
          }

          if (capacityMetrics.length > 0) {
            gsap.set(capacityMetrics, {
              autoAlpha: 0,
              x: isDesktop ? 42 : 0,
              y: isDesktop ? 0 : 22,
              scale: 0.98,
              willChange: "transform, opacity",
            });
            ScrollTrigger.batch(capacityMetrics, {
              interval: 0.08,
              batchMax: 3,
              start: "top 88%",
              onEnter: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.68,
                  ease: "power3.out",
                  stagger: 0.065,
                  overwrite: "auto",
                });
              },
              onLeaveBack: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 0,
                  x: isDesktop ? 32 : 0,
                  y: isDesktop ? 0 : 18,
                  scale: 0.98,
                  duration: 0.32,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
            });
          }

          serviceCards.forEach((card) => {
            const visual = card.querySelector<HTMLElement>("[data-interest-service-visual]");
            const copy = card.querySelector<HTMLElement>("[data-interest-service-copy]");
            const action = card.querySelector<HTMLElement>("[data-interest-service-action]");
            const nestedTargets = [visual, copy, action].filter(
              (element): element is HTMLElement => element != null,
            );

            if (nestedTargets.length === 0) {
              return;
            }

            gsap.set(nestedTargets, {
              autoAlpha: 0,
              y: 28,
              willChange: "transform, opacity",
            });
            if (visual) {
              gsap.set(visual, {
                xPercent: isDesktop ? -5 : 0,
                scale: 0.96,
                transformOrigin: "50% 50%",
              });
            }

            const serviceTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: isDesktop ? "top 84%" : "top 90%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
              defaults: { duration: 0.72, ease: "power3.out" },
            });

            if (visual) {
              serviceTimeline.to(
                visual,
                { autoAlpha: 1, xPercent: 0, y: 0, scale: 1 },
                0,
              );
            }
            if (copy) {
              serviceTimeline.to(copy, { autoAlpha: 1, y: 0 }, 0.12);
            }
            if (action) {
              serviceTimeline.to(
                action,
                { autoAlpha: 1, y: 0, duration: 0.54 },
                0.24,
              );
            }
          });

          if (differentialItems.length > 0) {
            gsap.set(differentialItems, {
              autoAlpha: 0,
              y: 24,
              scale: 0.965,
              willChange: "transform, opacity",
            });
            ScrollTrigger.batch(differentialItems, {
              interval: 0.08,
              batchMax: 3,
              start: "top 90%",
              onEnter: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.64,
                  ease: "power3.out",
                  stagger: 0.065,
                  overwrite: "auto",
                });
              },
              onLeaveBack: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 0,
                  y: 22,
                  scale: 0.97,
                  duration: 0.32,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
            });
          }

          const heading = interestSection.querySelector<HTMLElement>(
            "[data-interest-header] h2",
          );
          const rollAnchor = interestSection.querySelector<HTMLElement>(
            "[data-interest-roll-anchor]",
          );
          const rollInline = interestSection.querySelector<HTMLElement>(
            "[data-interest-roll-inline]",
          );
          const rollSource = interestSection.querySelector<HTMLElement>(
            "[data-interest-roll-source]",
          );
          const rollOverlay = interestSection.querySelector<HTMLElement>(
            "[data-interest-roll-overlay]",
          );
          const rollOverlayBox = interestSection.querySelector<HTMLElement>(
            "[data-interest-roll-overlay-box]",
          );
          const sideLeft = interestSection.querySelector<HTMLElement>(
            '[data-interest-side-card="left"]',
          );
          const sideRight = interestSection.querySelector<HTMLElement>(
            '[data-interest-side-card="right"]',
          );

          if (
            heading &&
            rollAnchor &&
            rollInline &&
            rollSource &&
            rollOverlay &&
            rollOverlayBox
          ) {
            gsap.set(rollInline, { autoAlpha: 0 });
            gsap.set(rollSource, { autoAlpha: 1 });
            gsap.set(rollOverlay, { autoAlpha: 0 });
            gsap.set(rollOverlayBox, { force3D: true });

            const midProgress = 0.68;
            const clampProgress = (value: number) =>
              Math.min(1, Math.max(0, value));
            const rangeProgress = (progress: number, start: number, end: number) =>
              clampProgress((progress - start) / (end - start));

            const computeStartFrame = () => {
              const r = rollSource.getBoundingClientRect();

              return {
                w: r.width,
                h: r.height,
                cx: window.innerWidth * 0.5,
                cy: window.innerHeight * (isDesktop ? 0.56 : 0.52),
                radius: isDesktop ? 32 : 24,
              };
            };

            const computeMidFrame = () => {
              const size = Math.min(
                window.innerWidth * (isDesktop ? 0.28 : 0.68),
                window.innerHeight * (isDesktop ? 0.48 : 0.36),
                isDesktop ? 520 : 292,
              );

              return {
                w: size,
                h: size,
                cx: window.innerWidth * 0.5,
                cy: window.innerHeight * (isDesktop ? 0.6 : 0.46),
                radius: size / 2,
              };
            };

            const computeEndFrame = () => {
              const r = rollAnchor.getBoundingClientRect();
              return {
                w: r.width,
                h: r.height,
                cx: r.left + r.width / 2,
                pageCy: window.scrollY + r.top + r.height / 2,
                radius: Math.max(r.width, r.height),
              };
            };

            let startFrame = computeStartFrame();
            let midFrame = computeMidFrame();
            let endFrame = computeEndFrame();
            const refreshFrames = () => {
              startFrame = computeStartFrame();
              midFrame = computeMidFrame();
              endFrame = computeEndFrame();
            };

            const interp = gsap.utils.interpolate;
            const applyFrame = (progress: number) => {
              const e = {
                ...endFrame,
                cy: endFrame.pageCy - window.scrollY,
              };
              const from = progress <= midProgress ? startFrame : midFrame;
              const to = progress <= midProgress ? midFrame : e;
              const p =
                progress <= midProgress
                  ? rangeProgress(progress, 0, midProgress)
                  : rangeProgress(progress, midProgress, 1);
              const w = interp(from.w, to.w, p);
              const h = interp(from.h, to.h, p);
              const cx = interp(from.cx, to.cx, p);
              const cy = interp(from.cy, to.cy, p);
              const radius = interp(from.radius, to.radius, p);
              rollOverlayBox.style.width = `${w}px`;
              rollOverlayBox.style.height = `${h}px`;
              rollOverlayBox.style.borderRadius = `${radius}px`;
              rollOverlayBox.style.transform = `translate(${cx - w / 2}px, ${cy - h / 2}px)`;
            };

            const applySideCard = (
              card: HTMLElement | null,
              progress: number,
              fromX: number,
              enterStart: number,
              enterEnd: number,
              exitStart: number,
              exitEnd: number,
            ) => {
              if (!card) {
                return;
              }

              const enter = rangeProgress(progress, enterStart, enterEnd);
              const exit = rangeProgress(progress, exitStart, exitEnd);
              const visible = clampProgress(enter - exit);
              gsap.set(card, {
                autoAlpha: visible,
                x: interp(fromX, 0, enter) + fromX * 0.45 * exit,
                y: interp(24, 0, enter) - 18 * exit,
              });
            };

            const applySideCards = (progress: number) => {
              if (isDesktop) {
                applySideCard(sideLeft, progress, -90, 0.16, 0.28, 0.5, 0.64);
                applySideCard(sideRight, progress, 90, 0.28, 0.4, 0.56, 0.7);
              } else {
                applySideCard(sideLeft, progress, -32, 0.1, 0.22, 0.26, 0.36);
                applySideCard(sideRight, progress, 32, 0.2, 0.32, 0.3, 0.4);
              }
            };

            const updateVisibility = (progress: number, isActive: boolean) => {
              if (progress >= 0.995) {
                gsap.set(rollOverlay, { autoAlpha: 0 });
                gsap.set(rollInline, { autoAlpha: 1 });
                gsap.set(rollSource, { autoAlpha: 0 });
              } else if (isActive || progress > 0) {
                gsap.set(rollOverlay, { autoAlpha: 1 });
                gsap.set(rollInline, { autoAlpha: 0 });
                gsap.set(rollSource, { autoAlpha: 0 });
              } else {
                gsap.set(rollOverlay, { autoAlpha: 0 });
                gsap.set(rollInline, { autoAlpha: 0 });
                gsap.set(rollSource, { autoAlpha: 1 });
              }
            };

            ScrollTrigger.create({
              trigger: rollSource,
              start: isDesktop ? "center 56%" : "center 52%",
              endTrigger: heading,
              end: isDesktop ? "top 28%" : "top 34%",
              scrub: 0.25,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                applyFrame(self.progress);
                applySideCards(self.progress);
                updateVisibility(self.progress, self.isActive);
              },
              onRefresh: (self) => {
                refreshFrames();
                applyFrame(self.progress);
                applySideCards(self.progress);
                updateVisibility(self.progress, self.isActive);
              },
              onToggle: (self) => {
                applySideCards(self.progress);
                updateVisibility(self.progress, self.isActive);
              },
            });
          }
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
          const supportCopy = desireSection.querySelector<HTMLElement>(
            "[data-desire-support-copy]",
          );
          const valuePills = gsap.utils.toArray<HTMLElement>("[data-desire-pill]");
          const carouselShell = desireSection.querySelector<HTMLElement>(
            "[data-desire-carousel-shell]",
          );
          const carouselCards = gsap.utils.toArray<HTMLElement>("[data-desire-carousel-card]");
          const proofCards = gsap.utils.toArray<HTMLElement>("[data-proof-card]");
          const proofIntroDetails = gsap.utils.toArray<HTMLElement>("[data-proof-intro-detail]");
          const parallaxTargets = gsap.utils.toArray<HTMLElement>("[data-desire-parallax]");

          parallaxTargets.forEach((target) => {
            const strength = Number(target.dataset.parallaxStrength ?? "12");
            const scaleBuffer = 1 + (strength * 2 + 6) / 100;
            gsap.fromTo(
              target,
              { yPercent: -strength, scale: scaleBuffer },
              {
                yPercent: strength,
                scale: scaleBuffer,
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

          const introDetails = [supportCopy, ...valuePills].filter(
            (element): element is HTMLElement => element != null,
          );
          if (introDetails.length > 0) {
            gsap.set(introDetails, {
              autoAlpha: 0,
              y: 26,
              willChange: "transform, opacity",
            });
            gsap.to(introDetails, {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              ease: "power3.out",
              stagger: 0.055,
              overwrite: "auto",
              scrollTrigger: {
                trigger: textReveal ?? desireSection,
                start: isDesktop ? "top 74%" : "top 82%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            });
          }

          if (carouselShell) {
            gsap.fromTo(
              carouselShell,
              {
                autoAlpha: 0,
                x: isDesktop ? 60 : 0,
                y: isDesktop ? 0 : 36,
                scale: 0.985,
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: carouselShell,
                  start: isDesktop ? "top 88%" : "top 92%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          if (carouselCards.length > 0) {
            gsap.set(carouselCards, {
              autoAlpha: 0,
              y: 72,
              scale: 0.965,
              willChange: "transform, opacity",
            });

            carouselCards.forEach((card) => {
              const imageShell = card.querySelector<HTMLElement>("[data-desire-card-image]");
              const bodyShell = card.querySelector<HTMLElement>("[data-desire-card-body]");
              const cardDetails = gsap.utils.toArray<HTMLElement>(
                card.querySelectorAll("[data-desire-card-detail]"),
              );

              gsap.set(cardDetails, {
                autoAlpha: 0,
                y: 18,
                willChange: "transform, opacity",
              });

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
                  autoAlpha: 1,
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

              if (cardDetails.length > 0) {
                timeline.to(
                  cardDetails,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.58,
                    ease: "none",
                    stagger: 0.06,
                  },
                  0.22,
                );
              }
            });
          }

          if (proofIntroDetails.length > 0) {
            gsap.set(proofIntroDetails, {
              autoAlpha: 0,
              y: 28,
              willChange: "transform, opacity",
            });
            gsap.to(proofIntroDetails, {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: "auto",
              scrollTrigger: {
                trigger: proofIntroDetails[0],
                start: "top 88%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            });
          }

          if (proofCards.length > 1 && stackPin) {
            const stackLeadIn = isDesktop ? 0.8 : 0.6;
            const stackStepDuration = 1;
            const stackScrollLength = (proofCards.length - 1) * stackStepDuration + stackLeadIn;
            const getProofDetails = (card: HTMLElement) =>
              gsap.utils.toArray<HTMLElement>(card.querySelectorAll("[data-proof-card-detail]"));
            const getProofVisual = (card: HTMLElement) =>
              card.querySelector<HTMLElement>("[data-proof-card-visual]");
            const allProofDetails = proofCards.flatMap((card) => getProofDetails(card));
            const proofVisuals = proofCards
              .map((card) => getProofVisual(card))
              .filter((element): element is HTMLElement => element != null);

            gsap.set(proofCards, {
              zIndex: (index) => index + 1,
              yPercent: (index) => (index === 0 ? 0 : 100),
              rotate: (index) => (index === 0 ? 0 : index % 2 === 0 ? -3 : 3),
              xPercent: (index) => (index === 0 ? 0 : index % 2 === 0 ? -4 : 4),
              scale: (index) => (index === 0 ? 1 : 0.98),
              opacity: 1,
              transformOrigin: "center top",
              force3D: true,
            });
            gsap.set(allProofDetails, {
              autoAlpha: 0,
              y: 30,
              willChange: "transform, opacity",
            });
            gsap.set(proofVisuals, {
              autoAlpha: 0,
              xPercent: isDesktop ? 5 : 0,
              y: isDesktop ? 0 : 22,
              scale: 0.96,
              transformOrigin: "50% 50%",
              willChange: "transform, opacity",
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
            const revealProofCard = (card: HTMLElement, position: number) => {
              const details = getProofDetails(card);
              const visual = getProofVisual(card);

              if (details.length > 0) {
                stackTimeline.to(
                  details,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.24,
                    ease: "power2.out",
                    stagger: 0.035,
                  },
                  position,
                );
              }

              if (visual) {
                stackTimeline.to(
                  visual,
                  {
                    autoAlpha: 1,
                    xPercent: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  },
                  position + 0.04,
                );
              }
            };

            revealProofCard(proofCards[0], 0.12);

            for (let index = 1; index < proofCards.length; index += 1) {
              const cardStart = stackLeadIn + (index - 1) * stackStepDuration;
              const previousCard = proofCards[index - 1];
              const previousDetails = getProofDetails(previousCard);
              const previousVisual = getProofVisual(previousCard);

              stackTimeline.to(
                proofCards[index],
                {
                  yPercent: 0,
                  xPercent: 0,
                  rotate: 0,
                  scale: 1,
                  ease: "power2.out",
                  duration: stackStepDuration,
                },
                cardStart,
              );
              if (previousDetails.length > 0) {
                stackTimeline.to(
                  previousDetails,
                  {
                    autoAlpha: 0,
                    y: -18,
                    duration: 0.36,
                    ease: "power2.out",
                  },
                  cardStart + stackStepDuration * 0.1,
                );
              }
              if (previousVisual) {
                stackTimeline.to(
                  previousVisual,
                  {
                    autoAlpha: isDesktop ? 0.22 : 0.08,
                    scale: 0.985,
                    duration: 0.42,
                    ease: "power2.out",
                  },
                  cardStart + stackStepDuration * 0.12,
                );
              }
              stackTimeline.to(
                previousCard,
                {
                  yPercent: -5,
                  scale: 0.94,
                  opacity: isDesktop ? 0.72 : 0.36,
                  ease: "power2.out",
                  duration: 0.55,
                },
                cardStart + stackStepDuration * 0.42,
              );
              revealProofCard(proofCards[index], cardStart + stackStepDuration * 0.02);
            }
          }
        }, desireSection);

        ctxCleanups.push(() => desireCtx.revert());
      }

      const actionSection = document.querySelector<HTMLElement>(ACTION_SELECTOR);
      const actionFooter = document.querySelector<HTMLElement>("[data-action-footer]");
      if (actionSection) {
        const ctaPanel = actionSection.querySelector<HTMLElement>("[data-action-cta-panel]");
        const formElement = actionSection.querySelector<HTMLElement>("[data-action-form]");

        const actionCtx = gsap.context(() => {
          const ctaWords = gsap.utils.toArray<HTMLElement>("[data-action-word]");
          const ctaDetails = gsap.utils.toArray<HTMLElement>("[data-action-cta-detail]");
          const ctaActions = gsap.utils.toArray<HTMLElement>("[data-action-cta-action]");
          const actionSignals = gsap.utils.toArray<HTMLElement>("[data-action-signal]");
          const revealCards = gsap.utils.toArray<HTMLElement>(
            "[data-action-reveal]:not([data-action-signal]):not([data-action-form])",
          );
          const parallaxTargets = gsap.utils.toArray<HTMLElement>("[data-action-parallax]");
          const contactMedia = gsap.utils.toArray<HTMLElement>("[data-action-contact-media]");
          const contactDetails = gsap.utils.toArray<HTMLElement>("[data-action-contact-detail]");
          const formHeader =
            formElement?.querySelector<HTMLElement>("[data-action-form-header]") ?? null;
          const formFields = formElement
            ? gsap.utils.toArray<HTMLElement>(
                formElement.querySelectorAll("[data-action-form-field]"),
              )
            : [];
          const formSubmit =
            formElement?.querySelector<HTMLElement>("[data-action-form-submit]") ?? null;
          const formNote =
            formElement?.querySelector<HTMLElement>("[data-action-form-note]") ?? null;
          const formSignals = formElement
            ? gsap.utils.toArray<HTMLElement>(
                formElement.querySelectorAll("[data-action-form-signal]"),
              )
            : [];
          const formSequence = [formHeader, ...formFields, formSubmit, formNote].filter(
            (element): element is HTMLElement => element != null,
          );
          const footerColumns = actionFooter
            ? gsap.utils.toArray<HTMLElement>(
                actionFooter.querySelectorAll("[data-action-footer-column]"),
              )
            : [];
          const footerLinks = actionFooter
            ? gsap.utils.toArray<HTMLElement>(
                actionFooter.querySelectorAll("[data-action-footer-link]"),
              )
            : [];

          gsap.set(ctaWords, { opacity: 0.2, y: 32, willChange: "transform, opacity" });
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

          if (ctaDetails.length > 0 || ctaActions.length > 0) {
            gsap.set(ctaDetails, {
              autoAlpha: 0,
              y: 28,
              willChange: "transform, opacity",
            });
            gsap.set(ctaActions, {
              y: 18,
              scale: 0.96,
              transformOrigin: "50% 50%",
              willChange: "transform",
            });

            const ctaDetailTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: ctaPanel ?? actionSection,
                start: isDesktop ? "top 80%" : "top 86%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
              defaults: { duration: 0.68, ease: "power3.out" },
            });

            if (ctaDetails.length > 0) {
              ctaDetailTimeline.to(
                ctaDetails,
                { autoAlpha: 1, y: 0, stagger: 0.075, overwrite: "auto" },
                0,
              );
            }
            if (ctaActions.length > 0) {
              ctaDetailTimeline.to(
                ctaActions,
                { y: 0, scale: 1, stagger: 0.06, overwrite: "auto" },
                0.24,
              );
            }
          }

          if (actionSignals.length > 0) {
            gsap.set(actionSignals, {
              autoAlpha: 0,
              y: 36,
              scale: 0.96,
              willChange: "transform, opacity",
            });
            gsap.to(actionSignals, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              ease: "power3.out",
              stagger: 0.085,
              overwrite: "auto",
              scrollTrigger: {
                trigger: ctaPanel ?? actionSignals[0],
                start: isDesktop ? "top 82%" : "top 88%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            });
          }

          parallaxTargets.forEach((target) => {
            const strength = Number(target.dataset.parallaxStrength ?? "10");
            const scaleBuffer = 1 + (strength * 2 + 6) / 100;
            gsap.fromTo(
              target,
              { yPercent: -strength, scale: scaleBuffer },
              {
                yPercent: strength,
                scale: scaleBuffer,
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

          if (revealCards.length > 0) {
            gsap.set(revealCards, {
              autoAlpha: 0,
              y: 72,
              scale: 0.985,
              willChange: "transform, opacity",
            });
            ScrollTrigger.batch(revealCards, {
              interval: 0.08,
              batchMax: isDesktop ? 3 : 2,
              start: "top 92%",
              onEnter: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.9,
                  ease: "power3.out",
                  stagger: 0.075,
                  overwrite: "auto",
                });
              },
              onLeaveBack: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 0,
                  y: 42,
                  scale: 0.99,
                  duration: 0.34,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
            });
          }

          if (contactMedia.length > 0 || contactDetails.length > 0) {
            gsap.set(contactMedia, {
              autoAlpha: 0,
              y: 38,
              scale: 0.96,
              transformOrigin: "50% 50%",
              willChange: "transform, opacity",
            });
            gsap.set(contactDetails, {
              autoAlpha: 0,
              y: 26,
              scale: 0.98,
              willChange: "transform, opacity",
            });

            const contactTimeline = gsap.timeline({
              scrollTrigger: {
                trigger:
                  contactMedia[0]?.closest("[data-action-reveal]") ??
                  contactDetails[0] ??
                  actionSection,
                start: isDesktop ? "top 82%" : "top 90%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
              defaults: { duration: 0.68, ease: "power3.out" },
            });

            if (contactMedia.length > 0) {
              contactTimeline.to(contactMedia, { autoAlpha: 1, y: 0, scale: 1 }, 0);
            }
            if (contactDetails.length > 0) {
              contactTimeline.to(
                contactDetails,
                { autoAlpha: 1, y: 0, scale: 1, stagger: 0.07, overwrite: "auto" },
                0.18,
              );
            }
          }

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

          if (formSequence.length > 0) {
            gsap.set(formSequence, {
              autoAlpha: 0,
              y: 30,
              willChange: "transform, opacity",
            });
            gsap.set(formSignals, {
              autoAlpha: 0,
              y: 10,
              scale: 0.94,
              willChange: "transform, opacity",
            });

            const formTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: formElement ?? formSequence[0],
                start: isDesktop ? "top 86%" : "top 92%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
              defaults: { duration: 0.62, ease: "power3.out" },
            });

            formTimeline.to(
              formSequence,
              { autoAlpha: 1, y: 0, stagger: 0.07, overwrite: "auto" },
              isDesktop ? 0.28 : 0,
            );

            if (formSignals.length > 0) {
              formTimeline.to(
                formSignals,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.42,
                  stagger: 0.045,
                  overwrite: "auto",
                },
                "-=0.16",
              );
            }
          }

          if (actionFooter && footerColumns.length > 0) {
            gsap.set(footerColumns, {
              autoAlpha: 0,
              y: 40,
              willChange: "transform, opacity",
            });
            gsap.set(footerLinks, {
              autoAlpha: 0,
              x: isDesktop ? -12 : 0,
              y: isDesktop ? 0 : 8,
              willChange: "transform, opacity",
            });

            const footerTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: actionFooter,
                start: "top 96%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
              defaults: { duration: 0.62, ease: "power3.out" },
            });

            footerTimeline.to(
              footerColumns,
              { autoAlpha: 1, y: 0, stagger: 0.09, overwrite: "auto" },
              0,
            );
            if (footerLinks.length > 0) {
              footerTimeline.to(
                footerLinks,
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  duration: 0.46,
                  stagger: 0.035,
                  overwrite: "auto",
                },
                0.18,
              );
            }
          }
        }, actionSection);

        ctxCleanups.push(() => actionCtx.revert());
      }

      const refresh = () => ScrollTrigger.refresh();
      const timers = [120, 600, 1500].map((delay) => window.setTimeout(refresh, delay));
      window.addEventListener("load", refresh);

      const roots = [interestSection, desireSection, actionSection, actionFooter].filter(
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
