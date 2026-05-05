"use client";

import { useEffect } from "react";

const EASE = 0.085;
const WHEEL_MULTIPLIER = 1;
const SETTLE_THRESHOLD = 0.12;

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || isCoarse) {
      return;
    }

    const root = document.documentElement;
    root.classList.remove("scroll-smooth");

    let current = window.scrollY;
    let target = current;
    let rafId = 0;
    let running = false;
    let externalSync = false;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clampTarget = () => {
      const max = getMaxScroll();
      if (target < 0) target = 0;
      if (target > max) target = max;
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < SETTLE_THRESHOLD) {
        current = target;
        window.scrollTo(0, Math.round(current));
        running = false;
        rafId = 0;
        return;
      }
      current += diff * EASE;
      externalSync = true;
      window.scrollTo(0, current);
      externalSync = false;
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (event.defaultPrevented) return;

      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      else if (event.deltaMode === 2) delta *= window.innerHeight;

      event.preventDefault();
      target += delta * WHEEL_MULTIPLIER;
      clampTarget();
      start();
    };

    const onScroll = () => {
      if (externalSync || running) return;
      const sy = window.scrollY;
      if (Math.abs(sy - current) > 1) {
        current = sy;
        target = sy;
      }
    };

    const onResize = () => {
      clampTarget();
    };

    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const editable = (event.target as HTMLElement | null)?.isContentEditable;
      if (editable) return;

      const max = getMaxScroll();
      const vh = window.innerHeight;
      let handled = true;
      switch (event.key) {
        case "PageDown":
          target += vh * 0.9;
          break;
        case "PageUp":
          target -= vh * 0.9;
          break;
        case "Home":
          target = 0;
          break;
        case "End":
          target = max;
          break;
        case "ArrowDown":
          target += 80;
          break;
        case "ArrowUp":
          target -= 80;
          break;
        case " ":
          target += event.shiftKey ? -vh * 0.9 : vh * 0.9;
          break;
        default:
          handled = false;
      }
      if (handled) {
        event.preventDefault();
        clampTarget();
        start();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
