"use client";

import { useEffect } from "react";

const HERO_SEQUENCE_SELECTOR = ".hero-sequence-stage";
const FALLBACK_VISIBLE_OFFSET = 8;

export default function HeaderVisibilityController() {
  useEffect(() => {
    let rafId: number | null = null;
    let heroSequenceElement: HTMLElement | null = null;

    const getHeroSequenceElement = () => {
      if (heroSequenceElement && document.contains(heroSequenceElement)) {
        return heroSequenceElement;
      }

      heroSequenceElement = document.querySelector<HTMLElement>(HERO_SEQUENCE_SELECTOR);
      return heroSequenceElement;
    };

    const syncHeaderVisibility = () => {
      rafId = null;
      const heroSequence = getHeroSequenceElement();

      const isVisible = heroSequence
        ? heroSequence.getBoundingClientRect().bottom <= 0
        : window.scrollY > FALLBACK_VISIBLE_OFFSET;

      document.documentElement.dataset.headerVisible = isVisible ? "true" : "false";
    };

    const scheduleVisibilitySync = () => {
      if (rafId != null) {
        return;
      }

      rafId = window.requestAnimationFrame(syncHeaderVisibility);
    };

    syncHeaderVisibility();
    window.addEventListener("scroll", scheduleVisibilitySync, { passive: true });
    window.addEventListener("resize", scheduleVisibilitySync);

    return () => {
      window.removeEventListener("scroll", scheduleVisibilitySync);
      window.removeEventListener("resize", scheduleVisibilitySync);

      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }

      delete document.documentElement.dataset.headerVisible;
    };
  }, []);

  return null;
}
