import Image from "next/image";
import type { SiteContent } from "../lib/site-content";

type ActionChapterProps = {
  navItems: SiteContent["navItems"];
  actionCta: SiteContent["actionCta"];
  contact: SiteContent["contact"];
  footer: SiteContent["footer"];
  mailHref: string;
  telHref: string;
};

export default function ActionChapter({
  navItems,
  actionCta,
  contact,
  footer,
  mailHref,
  telHref,
}: ActionChapterProps) {
  const titleLeadWords = actionCta.titleLead.split(" ");
  const titleTrailWords = actionCta.titleTrail.split(" ");

  return (
    <>
      <section
        id="contato"
        data-animate-action
        className="section-shell scroll-mt-32 pt-10 sm:pt-14 lg:pt-20"
      >
        <div className="site-shell space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="flex justify-center" data-action-reveal>
            <div className="flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.82)] bg-[rgba(255,255,255,0.72)] px-4 py-2 shadow-[0_20px_60px_-38px_rgba(14,29,41,0.34)] backdrop-blur-xl">
              <span className="h-1.5 w-10 rounded-full bg-[var(--accent-strong)]" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--ink-soft)]">
                Continuidade comercial
              </span>
            </div>
          </div>

          <article
            data-action-cta-panel
            data-action-parallax-scope
            className="relative overflow-hidden rounded-[2.6rem] border border-[rgba(255,255,255,0.16)] bg-[linear-gradient(135deg,rgba(12,24,34,0.98),rgba(24,52,72,0.98))] px-6 py-8 text-white shadow-[0_34px_120px_-56px_rgba(6,14,22,0.82)] sm:px-8 sm:py-10 lg:px-10 lg:py-12"
          >
            <div
              data-action-parallax
              data-parallax-strength="10"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,183,219,0.26),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_24%)]"
            />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
              <div className="space-y-6">
                <span className="text-[0.72rem] uppercase tracking-[0.24em] text-white/62">
                  {actionCta.eyebrow}
                </span>
                <h2 className="max-w-[12ch] text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.92] tracking-[-0.07em] text-balance">
                  {titleLeadWords.map((word, index) => (
                    <span
                      key={`lead-${word}-${index}`}
                      data-action-word
                      className="inline-block pr-[0.2em]"
                      style={{ willChange: "opacity, transform" }}
                    >
                      {word}
                    </span>
                  ))}{" "}
                  <span className="text-[rgba(255,255,255,0.72)]">
                    {titleTrailWords.map((word, index) => (
                      <span
                        key={`trail-${word}-${index}`}
                        data-action-word
                        className="inline-block pr-[0.2em]"
                        style={{ willChange: "opacity, transform" }}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </h2>
                <p className="max-w-[40ch] text-base leading-8 text-white/74">
                  {actionCta.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={actionCta.primaryAction.href}
                    className="inline-flex min-h-[3.35rem] items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium transition duration-500 ease-out hover:-translate-y-px hover:bg-white/94"
                    style={{ color: "var(--accent-deep)" }}
                  >
                    {actionCta.primaryAction.label}
                  </a>
                  <a
                    href={actionCta.secondaryAction.href}
                    className="inline-flex min-h-[3.35rem] items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-medium text-white transition duration-500 ease-out hover:-translate-y-px hover:bg-white/12"
                  >
                    {actionCta.secondaryAction.label}
                  </a>
                </div>
              </div>

              <div className="grid gap-3 self-end">
                {actionCta.signals.map((signal) => (
                  <div
                    key={signal.label}
                    data-action-reveal
                    className="rounded-[1.45rem] border border-white/10 bg-white/6 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/52">
                      {signal.label}
                    </p>
                    <p className="mt-3 text-lg font-medium tracking-[-0.04em] text-white">
                      {signal.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
            <article
              data-action-reveal
              data-action-parallax-scope
              className="glass-panel relative overflow-hidden p-6 sm:p-7 lg:p-8"
            >
              <div
                data-action-parallax
                data-parallax-strength="9"
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,183,219,0.14),transparent_34%)]"
              />
              <div className="relative space-y-7">
                <div className="space-y-4">
                  <span className="section-kicker">{contact.eyebrow}</span>
                  <h3 className="max-w-[13ch] text-[clamp(2rem,3.2vw,3.6rem)] leading-[0.95] tracking-[-0.06em] text-[var(--ink)] text-balance">
                    {contact.title}
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-7 text-[var(--ink-muted)]">
                    {contact.subtitle}
                  </p>
                </div>

                <div className="overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-white/84">
                  <div data-action-parallax data-parallax-strength="12" className="h-full w-full">
                    <Image
                      src="/site-images/contact-form-industrial-line.png"
                      alt="Operador caminhando entre injetoras e bandejas de componentes em PVC rígido."
                      width={1152}
                      height={864}
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="block aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/84 px-4 py-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                      E-mail
                    </p>
                    <a href={mailHref} className="mt-3 block text-sm leading-7 text-[var(--ink)]">
                      {contact.email}
                    </a>
                  </div>
                  <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/84 px-4 py-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                      Telefone
                    </p>
                    <a href={telHref} className="mt-3 block text-sm leading-7 text-[var(--ink)]">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-[var(--line)] bg-white/84 px-5 py-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                    Endereço
                  </p>
                  <address className="mt-3 not-italic text-sm leading-7 text-[var(--ink-muted)]">
                    {contact.addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </address>
                </div>
              </div>
            </article>

            <form
              data-action-form
              id="contato-form"
              action="#"
              method="post"
              data-action-reveal
              data-action-parallax-scope
              className="relative overflow-hidden rounded-[2.2rem] border border-[rgba(255,255,255,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,249,251,0.86))] p-6 shadow-[0_28px_90px_-54px_rgba(14,29,41,0.28)] sm:p-7 lg:p-8"
            >
              <div
                data-action-parallax
                data-parallax-strength="8"
                className="absolute inset-0 bg-[linear-gradient(145deg,rgba(127,183,219,0.12),transparent_42%)]"
              />
              <div className="relative grid gap-5">
                <div className="space-y-3 border-b border-[var(--line)] pb-5">
                  <span className="section-kicker">{contact.form.title}</span>
                  <p className="max-w-[56ch] text-sm leading-7 text-[var(--ink-muted)]">
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
                    rows={6}
                    className="field-control resize-none"
                    placeholder={contact.form.fields.message.placeholder}
                  />
                  <span className="field-helper">{contact.form.fields.message.helperText}</span>
                </label>

                <button type="submit" className="solid-button w-full">
                  {contact.form.buttonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-white/72">
        <div className="site-shell grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <div className="space-y-5">
            <Image
              src="/plasmaster-logo.png"
              alt="Plasmaster"
              width={190}
              height={40}
              className="h-auto w-[172px]"
            />
            <p className="max-w-[54ch] text-sm leading-7 text-[var(--ink-muted)]">
              {footer.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--ink-soft)]">
              Navegação
            </h3>
            <div className="grid gap-2 text-sm text-[var(--ink-muted)]">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="w-fit hover:text-[var(--ink)]">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--ink-soft)]">
              Presença
            </h3>
            <div className="grid gap-2 text-sm text-[var(--ink-muted)]">
              <a href={mailHref} className="w-fit hover:text-[var(--ink)]">
                {contact.email}
              </a>
              <a href={telHref} className="w-fit hover:text-[var(--ink)]">
                {contact.phone}
              </a>
              <span>{footer.socialLinks.join(" • ")}</span>
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
