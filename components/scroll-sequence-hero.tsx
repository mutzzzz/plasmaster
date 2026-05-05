"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import type {
  HeroAction,
  HeroBeat,
  HeroSequenceManifest,
  HeroSequenceVariantManifest,
} from "../lib/site-content";

type ScrollSequenceFinalCard = {
  eyebrow: string;
  title: string;
  body: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
};

type ScrollSequenceHeroProps = {
  badge: string;
  beats: HeroBeat[];
  manifest: HeroSequenceManifest;
  finalCard?: ScrollSequenceFinalCard;
  className?: string;
};

type SequenceCache = {
  images: Array<HTMLImageElement | null>;
  requested: boolean[];
  total: number;
  loadedCount: number;
  failedCount: number;
  cancelled: boolean;
};

const DESKTOP_SCROLL_VH = 460;
const MOBILE_SCROLL_VH = 320;
const DESKTOP_FRAME_PREFETCH_RADIUS = 22;
const MOBILE_FRAME_PREFETCH_RADIUS = 14;
const FRAME_EVICT_BUFFER = 10;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function frameSourceFromPattern(pathPattern: string, index: number) {
  return pathPattern.replace("%04d", String(index).padStart(4, "0"));
}

function drawCoverFrame(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;

  if (!imageWidth || !imageHeight) {
    return;
  }

  const scale = Math.max(targetWidth / imageWidth, targetHeight / imageHeight);
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const offsetX = (targetWidth - drawWidth) / 2;
  const offsetY = (targetHeight - drawHeight) / 2;

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function beatMotion(progress: number, beat: HeroBeat) {
  const range = Math.max(0.001, beat.end - beat.start);
  const localProgress = clamp((progress - beat.start) / range, 0, 1);
  const opacity = Math.sin(localProgress * Math.PI);
  const translateY = (1 - localProgress) * beat.depth;
  const scale = 0.985 + localProgress * 0.015;

  return {
    opacity,
    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
  };
}

function revealWindow(progress: number, start: number, end: number) {
  const range = Math.max(0.001, end - start);
  return clamp((progress - start) / range, 0, 1);
}

function finalCardMotion(progress: number) {
  const reveal = revealWindow(progress, 0.88, 0.98);
  return {
    opacity: reveal,
    transform: `translate3d(${(1 - reveal) * -58}px, ${(1 - reveal) * 26}px, 0) scale(${0.972 + reveal * 0.028})`,
    pointerEvents: reveal > 0.94 ? "auto" : "none",
  } as const;
}

function variantByViewport(
  manifest: HeroSequenceManifest,
  isDesktop: boolean,
): HeroSequenceVariantManifest {
  return isDesktop ? manifest.desktop : manifest.mobile;
}

const initialFinalCardStyle: CSSProperties = {
  opacity: 0,
  transform: "translate3d(-58px, 26px, 0) scale(0.972)",
  pointerEvents: "none",
  border: "1px solid rgba(244,243,238,0.14)",
  background: "linear-gradient(180deg, rgba(18,21,31,0.36) 0%, rgba(18,21,31,0.76) 100%)",
  boxShadow: "inset 0 1px 0 rgba(244,243,238,0.14), 0 28px 90px -42px rgba(18,21,31,0.82)",
};

export default function ScrollSequenceHero({
  badge,
  beats,
  manifest,
  finalCard,
  className,
}: ScrollSequenceHeroProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasShellRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const beatRefs = useRef<Array<HTMLDivElement | null>>([]);
  const finalCardRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const lastWindowCenterRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const resizeFrameRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const scrollBoundRef = useRef(false);
  const cacheRef = useRef<SequenceCache>({
    images: [],
    requested: [],
    total: 0,
    loadedCount: 0,
    failedCount: 0,
    cancelled: false,
  });

  const [isDesktop, setIsDesktop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const activeVariant = variantByViewport(manifest, isDesktop);
  const scrollHeightVh = isDesktop ? DESKTOP_SCROLL_VH : MOBILE_SCROLL_VH;

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreferences = () => {
      setIsDesktop(desktopQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    syncPreferences();

    const handleDesktopChange = () => syncPreferences();
    const handleReducedMotionChange = () => syncPreferences();

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktopChange);
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    } else {
      desktopQuery.addListener(handleDesktopChange);
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }

    return () => {
      if (typeof desktopQuery.removeEventListener === "function") {
        desktopQuery.removeEventListener("change", handleDesktopChange);
        reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      } else {
        desktopQuery.removeListener(handleDesktopChange);
        reducedMotionQuery.removeListener(handleReducedMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvasShell = canvasShellRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvasShell || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const cache: SequenceCache = {
      images: new Array(activeVariant.frameCount).fill(null),
      requested: new Array(activeVariant.frameCount).fill(false),
      total: activeVariant.frameCount,
      loadedCount: 0,
      failedCount: 0,
      cancelled: false,
    };

    const framePrefetchRadius = isDesktop
      ? DESKTOP_FRAME_PREFETCH_RADIUS
      : MOBILE_FRAME_PREFETCH_RADIUS;
    const frameEvictRadius = framePrefetchRadius + FRAME_EVICT_BUFFER;

    cacheRef.current = cache;
    currentFrameRef.current = -1;
    lastWindowCenterRef.current = -1;
    progressRef.current = 0;

    const applyOverlayProgress = (progress: number) => {
      beats.forEach((beat, index) => {
        const beatElement = beatRefs.current[index];
        if (!beatElement) {
          return;
        }

        const motion = beatMotion(progress, beat);
        beatElement.style.opacity = String(motion.opacity);
        beatElement.style.transform = motion.transform;
      });

      if (!isDesktop || !finalCard || !finalCardRef.current) {
        return;
      }

      const motion = finalCardMotion(progress);
      finalCardRef.current.style.opacity = String(motion.opacity);
      finalCardRef.current.style.transform = motion.transform;
      finalCardRef.current.style.pointerEvents = motion.pointerEvents;
    };

    const syncCanvasSize = () => {
      if (!canvasRef.current || !canvasShellRef.current) {
        return;
      }

      const rect = canvasShellRef.current.getBoundingClientRect();
      const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
      const nextWidth = Math.max(1, Math.round(rect.width * pixelRatio));
      const nextHeight = Math.max(1, Math.round(rect.height * pixelRatio));

      if (canvas.width === nextWidth && canvas.height === nextHeight) {
        return;
      }

      canvas.width = nextWidth;
      canvas.height = nextHeight;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      renderCurrentFrame(true);
    };

    const renderImage = (image: HTMLImageElement, index: number, force: boolean) => {
      if (!force && currentFrameRef.current === index) {
        return;
      }

      currentFrameRef.current = index;
      const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawCoverFrame(context, image, canvas.width / pixelRatio, canvas.height / pixelRatio);
    };

    const renderFrameAtIndex = (index: number, force = false) => {
      const snapshot = cacheRef.current;
      const safeIndex = clamp(index, 0, Math.max(0, snapshot.total - 1));
      const image = snapshot.images[safeIndex];

      if (image) {
        renderImage(image, safeIndex, force);
        return;
      }

      for (let fallbackIndex = safeIndex - 1; fallbackIndex >= 0; fallbackIndex -= 1) {
        const fallbackImage = snapshot.images[fallbackIndex];
        if (fallbackImage) {
          renderImage(fallbackImage, fallbackIndex, force);
          return;
        }
      }
    };

    function renderCurrentFrame(force = false) {
      const total = cacheRef.current.total;
      if (total === 0) {
        return -1;
      }

      const targetIndex = clamp(
        Math.round(progressRef.current * (total - 1)),
        0,
        total - 1,
      );
      renderFrameAtIndex(targetIndex, force);
      return targetIndex;
    }

    const loadFrame = (index: number, eager = false) => {
      if (
        index < 0 ||
        index >= cache.total ||
        cache.cancelled ||
        cache.requested[index]
      ) {
        return;
      }

      cache.requested[index] = true;

      const image = new Image();
      if (eager) {
        image.fetchPriority = "high";
      }
      image.decoding = "async";

      image.onload = () => {
        if (cache.cancelled) {
          return;
        }

        cache.images[index] = image;
        cache.loadedCount += 1;

        if (index === 0 || index === currentFrameRef.current || cache.loadedCount === 1) {
          renderFrameAtIndex(
            index === 0 ? 0 : currentFrameRef.current >= 0 ? currentFrameRef.current : 0,
            true,
          );
        }
      };

      image.onerror = () => {
        if (cache.cancelled) {
          return;
        }

        cache.failedCount += 1;
      };

      image.src = frameSourceFromPattern(activeVariant.pathPattern, index + 1);
    };

    const warmFrameWindow = (centerIndex: number, eagerCenter = false) => {
      if (cache.cancelled || cache.total === 0) {
        return;
      }

      const safeCenter = clamp(centerIndex, 0, cache.total - 1);
      const start = Math.max(0, safeCenter - framePrefetchRadius);
      const end = Math.min(cache.total - 1, safeCenter + framePrefetchRadius);

      for (let index = start; index <= end; index += 1) {
        loadFrame(index, eagerCenter && index === safeCenter);
      }

      for (let index = 0; index < cache.total; index += 1) {
        const keepFrame =
          index === 0 ||
          index === currentFrameRef.current ||
          Math.abs(index - safeCenter) <= frameEvictRadius;

        if (keepFrame || !cache.images[index]) {
          continue;
        }

        cache.images[index] = null;
        cache.requested[index] = false;
      }
    };

    const updateProgress = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = Math.max(1, sectionRef.current.offsetHeight - window.innerHeight);
      const nextProgress = clamp(-rect.top / scrollable, 0, 1);

      progressRef.current = nextProgress;
      const targetIndex = renderCurrentFrame(false);
      applyOverlayProgress(nextProgress);

      if (!prefersReducedMotion && targetIndex >= 0 && targetIndex !== lastWindowCenterRef.current) {
        lastWindowCenterRef.current = targetIndex;
        warmFrameWindow(targetIndex, targetIndex === 0);
      }
    };

    const scheduleUpdate = () => {
      if (rafRef.current != null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateProgress();
      });
    };

    const bindScroll = () => {
      if (scrollBoundRef.current || prefersReducedMotion) {
        return;
      }

      scrollBoundRef.current = true;
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
      scheduleUpdate();
    };

    const unbindScroll = () => {
      if (!scrollBoundRef.current) {
        return;
      }

      scrollBoundRef.current = false;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bindScroll();
        } else {
          unbindScroll();
        }
      },
      { rootMargin: "40% 0px 40% 0px", threshold: 0.01 },
    );
    observerRef.current.observe(section);

    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = new ResizeObserver(() => {
      if (resizeFrameRef.current != null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }

      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeFrameRef.current = null;
        syncCanvasSize();
        renderCurrentFrame(true);
      });
    });
    resizeObserverRef.current.observe(canvasShell);

    syncCanvasSize();
    loadFrame(0, true);
    updateProgress();

    if (prefersReducedMotion) {
      unbindScroll();
    }

    return () => {
      cache.cancelled = true;

      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (resizeFrameRef.current != null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
        resizeFrameRef.current = null;
      }

      observerRef.current?.disconnect();
      resizeObserverRef.current?.disconnect();
      unbindScroll();
    };
  }, [activeVariant, beats, finalCard, isDesktop, prefersReducedMotion]);

  const stageClassName = [
    "relative min-w-0",
    isDesktop ? "left-1/2 w-screen -translate-x-1/2" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const sequenceStyle = {
    minHeight: `${scrollHeightVh}vh`,
  } as CSSProperties;

  const canvasShellStyle = (
    isDesktop
      ? {
          minHeight: "100dvh",
          height: "100dvh",
        }
      : {
          aspectRatio: `${activeVariant.width} / ${activeVariant.height}`,
        }
  ) as CSSProperties;

  const beatPositions = isDesktop
    ? [
        "pointer-events-none hidden",
        "absolute right-[max(2rem,5vw)] top-[24dvh] max-w-[22rem] text-right xl:max-w-[26rem]",
        "absolute right-[max(2rem,5vw)] bottom-[14dvh] max-w-[22rem] text-right xl:max-w-[26rem]",
      ]
    : [
        "absolute left-4 top-4 max-w-[17rem] md:left-6 md:top-6 md:max-w-[19rem]",
        "absolute right-4 top-[24%] max-w-[16rem] md:right-6 md:max-w-[18rem]",
        "absolute inset-x-4 bottom-4 md:bottom-6 md:left-6 md:right-auto md:max-w-[21rem]",
      ];

  const surfaceClassName = isDesktop
    ? "relative min-h-[100dvh] overflow-hidden bg-[var(--accent-deep)] shadow-[0_40px_120px_-64px_rgba(18,21,31,0.56)]"
    : "relative overflow-hidden rounded-[2.75rem] border border-[var(--line)] bg-[var(--accent-deep)] shadow-[0_34px_96px_-52px_rgba(18,21,31,0.54)]";

  const canvasClassName = isDesktop
    ? "block h-full w-full md:min-h-[100dvh]"
    : "block h-full w-full";

  const overlayClassName = isDesktop
    ? "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(0,201,167,0.08),transparent_24%),radial-gradient(circle_at_16%_22%,rgba(245,166,35,0.14),transparent_28%),linear-gradient(90deg,rgba(18,21,31,0.58)_0%,rgba(18,21,31,0.22)_30%,rgba(18,21,31,0.08)_54%,rgba(18,21,31,0.48)_100%),linear-gradient(180deg,rgba(18,21,31,0.18)_0%,rgba(18,21,31,0.1)_22%,rgba(18,21,31,0.12)_58%,rgba(18,21,31,0.64)_100%)]"
    : "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,201,167,0.18),transparent_26%),linear-gradient(180deg,rgba(18,21,31,0.04),rgba(18,21,31,0.48))]";

  const beatCardClassName = isDesktop
    ? "pointer-events-none rounded-[1.85rem] border border-white/10 bg-[rgba(18,21,31,0.28)] p-5 text-white shadow-[inset_0_1px_0_rgba(244,243,238,0.12),0_28px_64px_-42px_rgba(18,21,31,0.75)] backdrop-blur-[18px] md:p-6"
    : "pointer-events-none rounded-[1.7rem] border border-white/12 bg-[rgba(18,21,31,0.56)] p-4 text-white shadow-[0_20px_56px_-36px_rgba(18,21,31,0.48)] backdrop-blur-md md:p-5";

  const beatEyebrowClassName = isDesktop
    ? "text-[0.72rem] uppercase tracking-[0.3em] text-white/58"
    : "text-[0.68rem] uppercase tracking-[0.24em] text-white/56";

  const beatTitleClassName = isDesktop
    ? "mt-3 max-w-[12ch] text-[clamp(1.85rem,2.6vw,3.75rem)] leading-[0.92] tracking-[-0.055em] text-white"
    : "mt-3 text-lg leading-tight tracking-[-0.04em] text-white md:text-[1.35rem]";

  const beatBodyClassName = isDesktop
    ? "mt-3 max-w-[32ch] text-[0.98rem] leading-7 text-white/78"
    : "mt-2 text-sm leading-6 text-white/74";

  return (
    <div ref={sectionRef} className={stageClassName} style={sequenceStyle}>
      <div className="sticky top-0 flex min-h-[100dvh] items-center">
        <div className="w-full">
          <div className={surfaceClassName}>
            <div ref={canvasShellRef} className="relative w-full" style={canvasShellStyle}>
              <canvas ref={canvasRef} className={canvasClassName} aria-hidden="true" />

              <div className={overlayClassName} />

              <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-3 md:inset-x-8 md:top-7 xl:inset-x-[max(2rem,4vw)]">
                <span className="rounded-full border border-white/12 bg-[rgba(18,21,31,0.18)] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.24em] text-white/72 backdrop-blur-[12px]">
                  {badge}
                </span>
              </div>

              {isDesktop && finalCard ? (
                <article
                  ref={finalCardRef}
                  className="absolute left-[max(2rem,5vw)] bottom-[10dvh] z-20 max-w-[34rem] rounded-[2.25rem] p-7 text-white backdrop-blur-[22px] xl:max-w-[36rem] xl:p-8"
                  style={initialFinalCardStyle}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-white/72">
                      {finalCard.eyebrow}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h2 className="max-w-[13ch] text-[2.8rem] leading-[0.95] tracking-[-0.055em] text-white text-balance xl:text-[3.6rem]">
                      {finalCard.title}
                    </h2>
                    <p className="max-w-[36ch] text-[0.98rem] leading-7 text-white/76 xl:text-[1.02rem]">
                      {finalCard.body}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={finalCard.secondaryAction.href}
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium transition duration-300 ease-out hover:bg-white/92 active:translate-y-px active:scale-[0.99]"
                      style={{ color: "var(--ink)" }}
                    >
                      {finalCard.secondaryAction.label}
                    </a>
                    <a
                      href={finalCard.primaryAction.href}
                      className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-white transition duration-300 ease-out hover:bg-white/10 active:translate-y-px active:scale-[0.99]"
                      style={{
                        border: "1px solid rgba(244,243,238,0.22)",
                        background: "rgba(244,243,238,0.04)",
                      }}
                    >
                      {finalCard.primaryAction.label}
                    </a>
                  </div>
                </article>
              ) : null}

              {beats.map((beat, index) => (
                <div
                  key={beat.id}
                  ref={(element) => {
                    beatRefs.current[index] = element;
                  }}
                  className={`${beatPositions[index] ?? beatPositions[0]} ${beatCardClassName}`}
                  style={beatMotion(0, beat)}
                >
                  <p className={beatEyebrowClassName}>{beat.eyebrow}</p>
                  <h2 className={beatTitleClassName}>{beat.title}</h2>
                  <p className={beatBodyClassName}>{beat.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
