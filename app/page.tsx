import { readFile } from "node:fs/promises";
import { join } from "node:path";
import Image from "next/image";
import DesireChapter from "../components/desire-chapter";
import HeaderVisibilityController from "../components/header-visibility-controller";
import { HeroQuoteForm } from "../components/hero-quote-form";
import InterestChapter from "../components/interest-chapter";
import SiteHeader from "../components/site-header";
import ScrollSequenceHero from "../components/scroll-sequence-hero";
import { siteContent, type HeroSequenceManifest } from "../lib/site-content";

const telHref = "tel:+554734400683";
const mailHref = "mailto:adm@plasmaster.ind.br";
const heroQuoteSideImage = {
  src: "/site-images/hero-quote-side-industrial.png",
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

  const parsedManifest = JSON.parse(rawManifest) as Partial<HeroSequenceManifest>;

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

      <main className="relative w-full max-w-full overflow-x-hidden">
        <section id="home" className="scroll-mt-28 pt-5 sm:pt-6 lg:pt-4">
          <div className="site-shell lg:hidden">
            <article className="glass-panel relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(127,183,219,0.16),transparent_46%)]" />
              <div className="relative space-y-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="section-kicker">{hero.intro.eyebrow}</span>
                  <span className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                    24 fps scrub
                  </span>
                </div>

                <div className="space-y-5">
                  <h1 className="section-heading max-w-[12ch] text-balance">{hero.intro.title}</h1>
                  <p className="section-copy">{hero.intro.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a href={hero.intro.primaryAction.href} className="solid-button">
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

          <div className="mt-6 lg:mt-0">
            <div className="relative lg:left-1/2 lg:right-1/2 lg:-mx-[50vw] lg:w-screen">
              <ScrollSequenceHero
                badge={hero.sequence.badge}
                note={hero.sequence.note}
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

          <div className="site-shell mt-8 lg:mt-10">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(28rem,30rem)] lg:gap-6">
              <article className="relative hidden min-h-[42rem] overflow-hidden rounded-[2rem] border border-white/80 bg-[var(--surface-solid)] shadow-[0_28px_88px_-52px_rgba(19,32,44,0.32)] lg:block">
                <Image
                  src={heroQuoteSideImage.src}
                  alt={heroQuoteSideImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
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

        <section id="contato" className="section-shell scroll-mt-28">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
              <div className="space-y-6">
                <span className="section-kicker">{contact.eyebrow}</span>
                <div className="space-y-5">
                  <h2 className="section-heading max-w-[10ch] text-balance">{contact.title}</h2>
                  <p className="section-copy">{contact.subtitle}</p>
                </div>

                <div className="glass-panel grid gap-6 p-6 sm:p-8">
                  <div className="grid gap-2">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                      Onde nos encontrar
                    </h3>
                    <address className="not-italic text-sm leading-7 text-[var(--ink-muted)]">
                      {contact.addressLines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </address>
                  </div>

                  <div className="grid gap-3 text-sm text-[var(--ink-muted)]">
                    <a href={mailHref} className="outline-button w-fit">
                      {contact.email}
                    </a>
                    <a href={telHref} className="outline-button w-fit">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <form action="#" method="post" className="glass-panel grid gap-5 p-6 sm:p-8">
                <div className="space-y-3">
                  <span className="section-kicker">{contact.form.title}</span>
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">
                    {contact.form.subtitle}
                  </p>
                </div>

                {(["name", "email"] as const).map((fieldName) => {
                  const field = contact.form.fields[fieldName];

                  return (
                    <label key={fieldName} className="field-shell" htmlFor={`contact-${fieldName}`}>
                      <span className="field-label">{field.label}</span>
                      <input
                        id={`contact-${fieldName}`}
                        type={field.type ?? (fieldName === "email" ? "email" : "text")}
                        name={field.name ?? fieldName}
                        autoComplete={field.autoComplete}
                        inputMode={field.inputMode}
                        className="field-control"
                        placeholder={field.placeholder}
                      />
                      <span className="field-helper">{field.helperText}</span>
                    </label>
                  );
                })}

                <label className="field-shell" htmlFor="contact-message">
                  <span className="field-label">{contact.form.fields.message.label}</span>
                  <textarea
                    id="contact-message"
                    name={contact.form.fields.message.name ?? "message"}
                    rows={5}
                    className="field-control resize-none"
                    placeholder={contact.form.fields.message.placeholder}
                  />
                  <span className="field-helper">{contact.form.fields.message.helperText}</span>
                </label>

                <button type="submit" className="solid-button w-full">
                  {contact.form.buttonLabel}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] bg-white/70">
        <div className="site-shell grid gap-10 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-5">
            <Image
              src="/plasmaster-logo.png"
              alt="Plasmaster"
              width={190}
              height={40}
              className="h-auto w-[172px]"
            />
            <p className="max-w-[56ch] text-sm leading-7 text-[var(--ink-muted)]">
              {footer.tagline}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              {footer.socialLinks.join(" - ")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                Links Ãºteis
              </h3>
              <div className="grid gap-2 text-sm text-[var(--ink-muted)]">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="w-fit hover:text-[var(--ink)]">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                Contato direto
              </h3>
              <div className="grid gap-2 text-sm text-[var(--ink-muted)]">
                <a href={mailHref} className="w-fit hover:text-[var(--ink)]">
                  {contact.email}
                </a>
                <a href={telHref} className="w-fit hover:text-[var(--ink)]">
                  {contact.phone}
                </a>
                <span>Joinville / SC</span>
              </div>
            </div>
          </div>
        </div>

        <div className="site-shell border-t border-[var(--line)] py-5 text-xs text-[var(--ink-soft)]">
          {footer.copyright}
        </div>
      </footer>
    </>
  );
}
