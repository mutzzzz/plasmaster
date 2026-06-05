"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./site-loading-screen.module.css";

const LOADER_COMPLETE_EVENT = "plasmaster:loading-complete";
const START_X = 50;
const END_X = 750;
const TOTAL_DISTANCE = END_X - START_X;
const FLOOR_Y = 156;
const ROLL_RADIUS = 40;
const MIN_VISIBLE_MS = 2600;
const EXIT_DELAY_MS = 520;
const EXIT_ANIMATION_MS = 720;

type LoadingStage = "falling" | "loading" | "done";

function buildId(prefix: string, name: string) {
  return `${prefix}-${name}`;
}

export default function SiteLoadingScreen() {
  const idPrefix = useId().replace(/:/g, "");
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const rollGroupRef = useRef<SVGGElement>(null);
  const unrolledPlasticRef = useRef<SVGRectElement>(null);
  const rollShadowRef = useRef<SVGEllipseElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const subtitleTextRef = useRef<HTMLParagraphElement>(null);

  const plasticRollGradId = buildId(idPrefix, "plastic-roll-grad");
  const plasticFlatGradId = buildId(idPrefix, "plastic-flat-grad");
  const cardboardGradId = buildId(idPrefix, "cardboard-grad");
  const rollShadowFilterId = buildId(idPrefix, "roll-shadow");
  const groundBlurFilterId = buildId(idPrefix, "ground-blur");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrameId: number | null = null;
    let progressTimeoutId: number | null = null;
    let exitDelayTimeoutId: number | null = null;
    let exitAnimationTimeoutId: number | null = null;
    let isCancelled = false;
    let stage: LoadingStage = prefersReducedMotion ? "loading" : "falling";
    let targetProgress = prefersReducedMotion ? 0.86 : 0;
    let currentProgress = prefersReducedMotion ? 0.86 : 0;
    let rollY = prefersReducedMotion ? FLOOR_Y : -82;
    let velocityY = 0;
    let pageReady = document.readyState === "complete";
    const minVisibleUntil = performance.now() + (prefersReducedMotion ? 650 : MIN_VISIBLE_MS);

    document.documentElement.dataset.siteLoading = "true";

    const clearAnimationFrame = () => {
      if (animationFrameId != null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const clearTimers = () => {
      if (progressTimeoutId != null) {
        window.clearTimeout(progressTimeoutId);
      }

      if (exitDelayTimeoutId != null) {
        window.clearTimeout(exitDelayTimeoutId);
      }

      if (exitAnimationTimeoutId != null) {
        window.clearTimeout(exitAnimationTimeoutId);
      }
    };

    const setLoadingCopy = (percentage: number) => {
      const titleText = titleTextRef.current;
      const subtitleText = subtitleTextRef.current;

      if (!titleText || !subtitleText) {
        return;
      }

      if (stage === "done") {
        titleText.textContent = "Entrada pronta";
        subtitleText.textContent = "Abrindo o site PlasMASTER.";
        return;
      }

      if (percentage < 30) {
        titleText.textContent = "Preparando o ambiente";
        subtitleText.textContent = "Organizando materiais e aplicacoes.";
        return;
      }

      if (percentage < 70) {
        titleText.textContent = "Desenrolando o portfolio";
        subtitleText.textContent = "Carregando imagens, linhas e detalhes.";
        return;
      }

      titleText.textContent = "Alinhando a operacao";
      subtitleText.textContent = "Ajustando a experiencia final.";
    };

    const updateDom = () => {
      const rollGroup = rollGroupRef.current;
      const unrolledPlastic = unrolledPlasticRef.current;
      const rollShadow = rollShadowRef.current;
      const progressText = progressTextRef.current;

      if (!rollGroup || !unrolledPlastic || !rollShadow || !progressText) {
        return;
      }

      const currentX = START_X + currentProgress * TOTAL_DISTANCE;
      const distanceMoved = currentX - START_X;
      const angle = (distanceMoved / ROLL_RADIUS) * (180 / Math.PI);
      const shadowOpacity = rollY > 0 ? Math.min(0.48, (rollY / FLOOR_Y) * 0.48) : 0;
      const percentage = Math.min(100, Math.floor(currentProgress * 100));

      rollGroup.setAttribute(
        "transform",
        `translate(${currentX}, ${rollY}) rotate(${angle})`,
      );
      unrolledPlastic.setAttribute("width", String(Math.max(0, distanceMoved)));
      rollShadow.setAttribute("cx", String(currentX));
      rollShadow.setAttribute("opacity", String(shadowOpacity));
      progressText.textContent = `${percentage}%`;
      setLoadingCopy(percentage);
    };

    const finishLoader = () => {
      if (isCancelled || stage === "done") {
        return;
      }

      stage = "done";
      currentProgress = 1;
      targetProgress = 1;
      updateDom();

      exitDelayTimeoutId = window.setTimeout(() => {
        if (isCancelled) {
          return;
        }

        delete document.documentElement.dataset.siteLoading;
        setIsExiting(true);
        window.dispatchEvent(new CustomEvent(LOADER_COMPLETE_EVENT));

        exitAnimationTimeoutId = window.setTimeout(() => {
          if (!isCancelled) {
            setIsVisible(false);
          }
        }, EXIT_ANIMATION_MS);
      }, prefersReducedMotion ? 120 : EXIT_DELAY_MS);
    };

    const canComplete = () => pageReady && performance.now() >= minVisibleUntil;

    const scheduleProgress = () => {
      if (isCancelled || stage !== "loading") {
        return;
      }

      if (canComplete()) {
        targetProgress = 1;
        return;
      }

      const cap = pageReady ? 0.96 : 0.88;
      targetProgress = Math.min(cap, targetProgress + 0.07 + Math.random() * 0.1);
      progressTimeoutId = window.setTimeout(
        scheduleProgress,
        170 + Math.random() * 260,
      );
    };

    const tick = () => {
      animationFrameId = null;

      if (isCancelled) {
        return;
      }

      if (stage === "falling") {
        velocityY += 0.78;
        rollY += velocityY;

        if (rollY >= FLOOR_Y) {
          rollY = FLOOR_Y;

          if (velocityY > 1.6) {
            velocityY = -velocityY * 0.58;
          } else {
            velocityY = 0;
            stage = "loading";
            progressTimeoutId = window.setTimeout(scheduleProgress, 180);
          }
        }
      } else if (stage === "loading") {
        if (canComplete()) {
          targetProgress = 1;
        }

        currentProgress += (targetProgress - currentProgress) * 0.085;

        if (targetProgress === 1 && currentProgress > 0.996) {
          finishLoader();
          return;
        }
      }

      updateDom();
      animationFrameId = window.requestAnimationFrame(tick);
    };

    const handlePageLoad = () => {
      pageReady = true;
    };

    if (!pageReady) {
      window.addEventListener("load", handlePageLoad, { once: true });
    }

    updateDom();
    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      window.removeEventListener("load", handlePageLoad);
      clearAnimationFrame();
      clearTimers();
      delete document.documentElement.dataset.siteLoading;
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.loader}${isExiting ? ` ${styles.loaderExit}` : ""}`}
      data-site-loader
      data-state={isExiting ? "complete" : "active"}
      role="status"
      aria-live="polite"
      aria-label="Carregando site da PlasMASTER"
    >
      <div className={styles.grid} aria-hidden="true" />
      <section className={styles.panel} aria-label="Progresso de carregamento">
        <div className={styles.header}>
          <div className={styles.copy}>
            <p className={styles.kicker}>PlasMASTER / carregamento</p>
            <h2 ref={titleTextRef} className={styles.title}>
              Preparando o ambiente
            </h2>
            <p ref={subtitleTextRef} className={styles.subtitle}>
              Organizando materiais e aplicacoes.
            </p>
          </div>
          <span ref={progressTextRef} className={styles.progress}>
            0%
          </span>
        </div>

        <svg
          className={styles.svg}
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={plasticRollGradId} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgb(208 255 247)" stopOpacity="0.96" />
              <stop offset="42%" stopColor="rgb(0 201 167)" stopOpacity="0.86" />
              <stop offset="78%" stopColor="rgb(15 116 112)" stopOpacity="0.92" />
              <stop offset="100%" stopColor="rgb(18 21 31)" stopOpacity="0.98" />
            </radialGradient>

            <linearGradient id={plasticFlatGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(18 21 31)" stopOpacity="0.36" />
              <stop offset="62%" stopColor="rgb(0 201 167)" stopOpacity="0.58" />
              <stop offset="100%" stopColor="rgb(208 255 247)" stopOpacity="0.92" />
            </linearGradient>

            <radialGradient id={cardboardGradId} cx="40%" cy="38%" r="64%">
              <stop offset="0%" stopColor="rgb(245 166 35)" />
              <stop offset="68%" stopColor="rgb(178 110 42)" />
              <stop offset="100%" stopColor="rgb(92 58 26)" />
            </radialGradient>

            <filter id={rollShadowFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="5"
                floodColor="rgb(18 21 31)"
                floodOpacity="0.24"
              />
            </filter>

            <filter id={groundBlurFilterId} x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>

          <rect x="50" y="200" width="700" height="4" rx="2" className={styles.rail} />
          <circle cx="50" cy="202" r="4" className={styles.railMark} />
          <circle cx="400" cy="202" r="3" className={styles.railMark} />
          <circle cx="750" cy="202" r="4" className={styles.railMark} />
          <rect
            ref={unrolledPlasticRef}
            x="50"
            y="196"
            width="0"
            height="4"
            rx="2"
            fill={`url(#${plasticFlatGradId})`}
          />
          <ellipse
            ref={rollShadowRef}
            cx="50"
            cy="206"
            rx="38"
            ry="6"
            fill="rgb(18 21 31)"
            filter={`url(#${groundBlurFilterId})`}
            opacity="0"
          />

          <g ref={rollGroupRef} transform="translate(50, -82) rotate(0)">
            <circle
              cx="0"
              cy="0"
              r="40"
              fill={`url(#${plasticRollGradId})`}
              filter={`url(#${rollShadowFilterId})`}
            />
            <path
              d="M -30 -26 A 40 40 0 0 1 30 -26"
              fill="none"
              stroke="rgb(208 255 247)"
              strokeWidth="1.5"
              opacity="0.68"
            />
            <path
              d="M -38 12 A 40 40 0 0 0 38 12"
              fill="none"
              stroke="rgb(208 255 247)"
              strokeWidth="1"
              opacity="0.48"
            />
            <path
              d="M 15 -37 A 40 40 0 0 1 37 15"
              fill="none"
              stroke="rgb(244 243 238)"
              strokeWidth="2"
              opacity="0.56"
            />
            <line x1="0" y1="-40" x2="0" y2="-20" className={styles.rollMark} />
            <line x1="0" y1="40" x2="0" y2="20" className={styles.rollMark} />
            <line x1="-40" y1="0" x2="-20" y2="0" className={styles.rollMark} />
            <line x1="40" y1="0" x2="20" y2="0" className={styles.rollMark} />
            <circle
              cx="0"
              cy="0"
              r="14"
              fill={`url(#${cardboardGradId})`}
              stroke="rgb(92 58 26)"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="9" fill="rgb(42 26 15)" />
          </g>
        </svg>

        <div className={styles.footer} aria-hidden="true">
          <span>PlasMASTER desde 1997</span>
          <span>filmes, protecao e embalagens rigidas</span>
        </div>
      </section>
    </div>
  );
}
