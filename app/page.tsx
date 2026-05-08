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
const primaryHeroImage = {
  desktop: "/site-images/hero-section.webp",
  mobile: "/site-images/hero-section-mobile.webp",
  alt: "Extrusora industrial produzindo filme plástico azul em ambiente fabril.",
};
const heroQuoteSideImage = {
  src: "/site-images/hero-quote-side-industrial.webp?v=2",
  alt: "Conjunto premium de bobinas transparentes da linha de embalagens Plasmaster em fundo neutro.",
  label: "Portfólio em destaque",
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
    headerCtaLabel,
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
      <SiteHeader items={navItems} ctaLabel={headerCtaLabel} />

      <main className="relative w-full max-w-full overflow-x-clip">
        <section id="home" className="scroll-mt-28">
          <div className="relative left-1/2 min-h-[100svh] w-screen -translate-x-1/2 overflow-hidden bg-[var(--accent-deep)] text-white lg:min-h-[100dvh]">
            <Image
              src={primaryHeroImage.desktop}
              alt={primaryHeroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 100vw, 0px"
              className="hidden object-cover object-center lg:block"
            />
            <Image
              src={primaryHeroImage.mobile}
              alt=""
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 0px"
              className="object-cover object-center lg:hidden"
            />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,18,0.9)_0%,rgba(7,11,18,0.68)_30%,rgba(7,11,18,0.2)_58%,rgba(7,11,18,0.42)_100%),linear-gradient(180deg,rgba(7,11,18,0.74)_0%,rgba(7,11,18,0.18)_38%,rgba(7,11,18,0.82)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,11,18,0.92)_0%,rgba(7,11,18,0.7)_28%,rgba(7,11,18,0.18)_58%,rgba(7,11,18,0.34)_100%),linear-gradient(180deg,rgba(7,11,18,0.62)_0%,rgba(7,11,18,0.12)_40%,rgba(7,11,18,0.76)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(244,243,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,243,238,0.08)_1px,transparent_1px)] bg-[length:96px_96px] opacity-35" />

            <div className="site-shell relative z-10 flex min-h-[100svh] flex-col justify-between py-6 sm:py-7 lg:min-h-[100dvh] lg:py-9">
              <div className="flex items-center justify-between gap-5">
                <Image
                  src="/plasmaster-logo-hero.png"
                  alt="Plasmaster"
                  width={494}
                  height={119}
                  priority
                  className="h-auto w-[174px] brightness-0 invert sm:w-[208px]"
                />
                <span className="hidden border border-white/16 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-white/68 sm:inline-flex">
                  Joinville/SC desde 2005
                </span>
              </div>

              <div className="grid gap-8 pb-16 pt-20 sm:pt-24 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,0.38fr)] lg:items-end lg:gap-10 lg:pb-16 lg:pt-24">
                <div className="max-w-[48rem]">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[rgba(0,201,167,0.9)]">
                    Soluções integradas de embalagens
                  </p>
                  <h1 className="mt-5 max-w-[13ch] text-5xl leading-[0.92] text-balance sm:text-6xl md:text-7xl lg:text-7xl xl:text-[5.75rem] 2xl:text-8xl">
                    Embalagens plásticas para indústria e comércio.
                  </h1>
                  <p className="mt-6 max-w-[40rem] text-base leading-8 text-white/78 sm:text-lg lg:text-xl lg:leading-9">
                    Plásticos flexíveis, proteção logística e embalagens rígidas em um único parceiro, com atendimento consultivo para indicar a linha certa para sua operação.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={hero.intro.primaryAction.href}
                      className="solid-button min-w-[12.5rem] border border-[rgba(244,243,238,0.2)]"
                    >
                      {hero.intro.primaryAction.label}
                    </a>
                    <a
                      href={hero.intro.secondaryAction.href}
                      className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-white/34 px-5 py-3 text-sm font-medium text-white transition duration-500 ease-out hover:-translate-y-px hover:border-white/62 hover:bg-white/10 active:translate-y-px active:scale-[0.99]"
                    >
                      {hero.intro.secondaryAction.label}
                    </a>
                  </div>
                </div>

                <div className="hidden max-w-[28rem] border-t border-white/20 pt-5 lg:block lg:justify-self-end">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/52">
                    O que entregamos
                  </p>
                  <ul className="mt-4 grid gap-3 text-[0.98rem] leading-7 text-white/82">
                    <li>Plásticos flexíveis para rotinas industriais e comerciais.</li>
                    <li>Materiais de proteção, fechamento e estabilidade logística.</li>
                    <li>Embalagens rígidas para aplicações de maior exigência.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

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
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,201,167,0.16),transparent_46%)]" />
              <div className="relative space-y-7">
                <div className="flex items-center gap-4">
                  <span className="section-kicker">{hero.intro.eyebrow}</span>
                </div>

                <div className="space-y-5">
                  <h2 className="section-heading max-w-[12ch] text-balance">{hero.intro.title}</h2>
                  <p className="section-copy">{hero.intro.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={hero.intro.primaryAction.href}
                    className="solid-button"
                  >
                    {hero.intro.primaryAction.label}
                  </a>
                  <a href={hero.intro.secondaryAction.href} className="outline-button">
                    {hero.intro.secondaryAction.label}
                  </a>
                </div>

                <div className="grid gap-1 rounded-[1.8rem] border border-[var(--line)] bg-white/70 p-5 shadow-[0_18px_58px_-42px_rgba(18,21,31,0.22)]">
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
              <article className="relative hidden min-h-[42rem] overflow-hidden rounded-[2rem] border border-white/80 bg-[var(--surface-solid)] shadow-[0_28px_88px_-52px_rgba(18,21,31,0.32)] lg:block">
                <Image
                  src={heroQuoteSideImage.src}
                  alt={heroQuoteSideImage.alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={imageBlurData[heroQuoteSideImage.src]?.blurDataURL}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,21,31,0.02)_0%,rgba(18,21,31,0.08)_48%,rgba(18,21,31,0.28)_100%)]" />
                <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-[rgba(244,243,238,0.84)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-deep)] shadow-[0_10px_30px_-18px_rgba(18,21,31,0.4)]">
                  {heroQuoteSideImage.label}
                </div>
              </article>
              <HeroQuoteForm
                eyebrow={hero.form.eyebrow}
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
