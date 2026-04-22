import { readFile } from "node:fs/promises";
import { join } from "node:path";
import Image from "next/image";
import { imageBlurData } from "../lib/image-blur-data";
import ActionChapter from "../components/action-chapter";
import DesireChapter from "../components/desire-chapter";
import HeaderVisibilityController from "../components/header-visibility-controller";
import { HeroQuoteForm } from "../components/hero-quote-form";
import HomeScrollAnimations from "../components/home-scroll-animations";
import InterestChapter from "../components/interest-chapter";
import SiteHeader from "../components/site-header";
import ScrollSequenceHero from "../components/scroll-sequence-hero";
import { siteContent, type HeroSequenceManifest } from "../lib/site-content";

const telHref = "tel:+554734400683";
const mailHref = "mailto:adm@plasmaster.ind.br";
const heroQuoteSideImage = {
  src: "/site-images/hero-quote-side-industrial.webp",
  alt: "Operador caminhando entre injetoras e bandejas de componentes em PVC rígido.",
  label: "Linha em operação",
};

async function readHeroManifest(): Promise<HeroSequenceManifest> {
  const manifestPath = join(
    process.cwd(),
    "public",
    "frames",
    "assembly",
    "manifest.json",
  );

  let rawManifest: string;

  try {
    rawManifest = await readFile(manifestPath, "utf8");
  } catch {
    throw new Error(
      "Frames manifest not found at public/frames/assembly/manifest.json. Run `node scripts/extract-scroll-frames.mjs` before starting the app.",
    );
  }

  let parsedManifest: Partial<HeroSequenceManifest>;
  try {
    parsedManifest = JSON.parse(rawManifest) as Partial<HeroSequenceManifest>;
  } catch {
    throw new Error(
      "Invalid frames manifest JSON at public/frames/assembly/manifest.json. Run `node scripts/extract-scroll-frames.mjs` to regenerate it.",
    );
  }

  for (const variant of ["desktop", "mobile"] as const) {
    const entry = parsedManifest[variant];

    if (
      !entry ||
      typeof entry.frameCount !== "number" ||
      typeof entry.width !== "number" ||
      typeof entry.height !== "number" ||
      typeof entry.posterFrame !== "string" ||
      typeof entry.pathPattern !== "string"
    ) {
      throw new Error(
        `Invalid hero sequence manifest. Missing ${variant} frame metadata in public/frames/assembly/manifest.json.`,
      );
    }
  }

  return parsedManifest as HeroSequenceManifest;
}

export default async function HomePage() {
  const manifest = await readHeroManifest();
  const {
    navItems,
    marqueeItems,
    interestIntro,
    manifestParagraph,
    proofStack,
    proofCarousel,
    actionCta,
    hero,
    about,
    services,
    differentials,
    contact,
    footer,
  } = siteContent;

  return (
    <>
      <HeaderVisibilityController />
      <SiteHeader items={navItems} />

      <main className="relative w-full max-w-full overflow-x-clip">
        <section id="home" className="scroll-mt-28 pt-5 sm:pt-6 lg:pt-4">
          <div>
            <div className="relative lg:left-1/2 lg:right-1/2 lg:-mx-[50vw] lg:w-screen">
              <ScrollSequenceHero
                badge={hero.sequence.badge}
                beats={hero.sequence.beats}
                manifest={manifest}
                className="hero-sequence-stage"
                finalCard={{
                  eyebrow: hero.intro.eyebrow,
                  title: hero.intro.title,
                  body: hero.intro.description,
                  primaryAction: hero.intro.primaryAction,
                  secondaryAction: hero.intro.secondaryAction,
                }}
              />

            </div>
          </div>

          <div className="site-shell mt-8 lg:hidden">
            <article className="glass-panel relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(127,183,219,0.16),transparent_46%)]" />
              <div className="relative space-y-7">
                <div className="flex items-center gap-4">
                  <span className="section-kicker">{hero.intro.eyebrow}</span>
                </div>

                <div className="space-y-5">
                  <h1 className="section-heading max-w-[12ch] text-balance">{hero.intro.title}</h1>
                  <p className="section-copy">{hero.intro.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={hero.intro.primaryAction.href}
                    className="solid-button !text-white"
                    style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                  >
                    {hero.intro.primaryAction.label}
                  </a>
                  <a href={hero.intro.secondaryAction.href} className="outline-button">
                    {hero.intro.secondaryAction.label}
                  </a>
                </div>

                <div className="grid gap-1 rounded-[1.8rem] border border-[var(--line)] bg-white/70 p-5 shadow-[0_18px_58px_-42px_rgba(19,32,44,0.22)]">
                  {hero.intro.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="metric-rule first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <span>{metric.label}</span>
                      <span className="font-mono text-[0.82rem] tracking-[0.2em] text-[var(--ink)]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          <div className="site-shell mt-8 lg:mt-10">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-6">
              <article className="relative hidden min-h-[42rem] overflow-hidden rounded-[2rem] border border-white/80 bg-[var(--surface-solid)] shadow-[0_28px_88px_-52px_rgba(19,32,44,0.32)] lg:block">
                <Image
                  src={heroQuoteSideImage.src}
                  alt={heroQuoteSideImage.alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={imageBlurData[heroQuoteSideImage.src]?.blurDataURL}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,32,44,0.02)_0%,rgba(19,32,44,0.08)_48%,rgba(19,32,44,0.28)_100%)]" />
                <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-[rgba(255,255,255,0.84)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-deep)] shadow-[0_10px_30px_-18px_rgba(19,32,44,0.4)]">
                  {heroQuoteSideImage.label}
                </div>
              </article>
              <HeroQuoteForm
                title={hero.form.title}
                subtitle={hero.form.subtitle}
                buttonLabel={hero.form.buttonLabel}
                fields={hero.form.fields}
                idPrefix="hero-quote"
                className="w-full lg:max-w-[30rem]"
              />
            </div>
          </div>
        </section>

        <HomeScrollAnimations />

        <InterestChapter
          intro={interestIntro}
          marqueeItems={marqueeItems}
          about={about}
          services={services}
          differentials={differentials}
        />

        <DesireChapter
          principles={about.principles}
          differentials={differentials}
          manifestParagraph={manifestParagraph}
          proofStack={proofStack}
          proofCarousel={proofCarousel}
        />
      </main>

      <ActionChapter
        navItems={navItems}
        actionCta={actionCta}
        contact={contact}
        footer={footer}
        mailHref={mailHref}
        telHref={telHref}
      />
    </>
  );
}
