"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroQuoteForm, type HeroQuoteFormProps } from "./hero-quote-form";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type HeroQuoteShowcaseProps = {
  form: Pick<HeroQuoteFormProps, "title" | "subtitle" | "buttonLabel" | "fields">;
  sideImage: {
    src: string;
    alt: string;
    label: string;
  };
};

export default function HeroQuoteShowcase({ form, sideImage }: HeroQuoteShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      const mediaCard = mediaRef.current;
      const formCard = formRef.current?.querySelector("form");
      const formHeading = formRef.current?.querySelector("h2");
      const fieldShells = Array.from(
        formRef.current?.querySelectorAll<HTMLElement>(".field-shell") ?? [],
      );
      const submitButton = formRef.current?.querySelector("button[type='submit']");

      if (mediaCard && isDesktop) {
        gsap.fromTo(
          mediaCard,
          { y: 88, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mediaCard,
              start: "top 82%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );

        const mediaImage = mediaCard.querySelector<HTMLElement>("[data-hero-quote-image]");
        if (mediaImage) {
          gsap.fromTo(
            mediaImage,
            { scale: 0.86, opacity: 0.54 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: mediaCard,
                start: "top 94%",
                end: "top 68%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }

      if (formCard) {
        gsap.fromTo(
          formCard,
          { y: 64, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCard,
              start: isDesktop ? "top 88%" : "top 92%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (formHeading) {
        gsap.fromTo(
          formHeading,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.82,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formHeading,
              start: isDesktop ? "top 92%" : "top 95%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (fieldShells.length > 0) {
        gsap.fromTo(
          fieldShells,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: isDesktop ? "top 84%" : "top 90%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (submitButton) {
        gsap.fromTo(
          submitButton,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: submitButton,
              start: "top 95%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 140);
    const t2 = window.setTimeout(refresh, 650);
    window.addEventListener("load", refresh);

    const images = sectionRef.current?.querySelectorAll("img") ?? [];
    const imageListeners: Array<() => void> = [];

    images.forEach((img) => {
      if (!img.complete) {
        const listener = () => refresh();
        img.addEventListener("load", listener, { once: true });
        imageListeners.push(() => img.removeEventListener("load", listener));
      }
    });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      imageListeners.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="site-shell mt-8 lg:mt-10">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(28rem,30rem)] lg:gap-6">
        <article className="group relative hidden min-h-[42rem] overflow-hidden rounded-[2rem] border border-white/80 bg-[var(--surface-solid)] shadow-[0_28px_88px_-52px_rgba(19,32,44,0.32)] lg:block" ref={mediaRef}>
          <Image
            src={sideImage.src}
            alt={sideImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            data-hero-quote-image
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,32,44,0.02)_0%,rgba(19,32,44,0.08)_48%,rgba(19,32,44,0.28)_100%)]" />
          <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-[rgba(255,255,255,0.84)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-deep)] shadow-[0_10px_30px_-18px_rgba(19,32,44,0.4)]">
            {sideImage.label}
          </div>
        </article>

        <div ref={formRef} className="w-full lg:max-w-[30rem]">
          <HeroQuoteForm
            title={form.title}
            subtitle={form.subtitle}
            buttonLabel={form.buttonLabel}
            fields={form.fields}
            idPrefix="hero-quote"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
