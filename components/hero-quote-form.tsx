type HeroQuoteField = {
  label: string;
  placeholder: string;
  helperText: string;
  name?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
};

export type HeroQuoteFormProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  fields: {
    name: HeroQuoteField;
    email: HeroQuoteField;
    message: HeroQuoteField;
  };
  idPrefix?: string;
  action?: string;
  method?: "get" | "post";
  className?: string;
};

function fieldId(prefix: string, key: keyof HeroQuoteFormProps["fields"]) {
  return `${prefix}-${key}`;
}

export function HeroQuoteForm({
  eyebrow,
  title,
  subtitle,
  buttonLabel,
  fields,
  idPrefix = "hero-quote-form",
  action = "#",
  method = "post",
  className = "",
}: HeroQuoteFormProps) {
  return (
    <form
      action={action}
      method={method}
      className={`glass-panel relative overflow-hidden p-6 sm:p-8 ${className}`.trim()}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,201,167,0.12),transparent_44%)]" />

      <div className="relative space-y-6">
        <div className="space-y-3 border-b border-[var(--line)] pb-4">
          <span className="section-kicker">{eyebrow}</span>
          <div className="space-y-2">
            <h2 className="text-2xl leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-[2.05rem]">
              {title}
            </h2>
            <p className="max-w-[58ch] text-sm leading-7 text-[var(--ink-muted)]">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          <label className="field-shell" htmlFor={fieldId(idPrefix, "name")}>
            <span className="field-label">{fields.name.label}</span>
            <input
              id={fieldId(idPrefix, "name")}
              type={fields.name.type ?? "text"}
              name={fields.name.name ?? "name"}
              autoComplete={fields.name.autoComplete ?? "name"}
              inputMode={fields.name.inputMode}
              className="field-control"
              placeholder={fields.name.placeholder}
            />
            <span className="field-helper">{fields.name.helperText}</span>
          </label>

          <label className="field-shell" htmlFor={fieldId(idPrefix, "email")}>
            <span className="field-label">{fields.email.label}</span>
            <input
              id={fieldId(idPrefix, "email")}
              type={fields.email.type ?? "email"}
              name={fields.email.name ?? "email"}
              autoComplete={fields.email.autoComplete ?? "email"}
              inputMode={fields.email.inputMode}
              className="field-control"
              placeholder={fields.email.placeholder}
            />
            <span className="field-helper">{fields.email.helperText}</span>
          </label>

          <label className="field-shell" htmlFor={fieldId(idPrefix, "message")}>
            <span className="field-label">{fields.message.label}</span>
            <textarea
              id={fieldId(idPrefix, "message")}
              name={fields.message.name ?? "message"}
              rows={5}
              className="field-control resize-none"
              placeholder={fields.message.placeholder}
            />
            <span className="field-helper">{fields.message.helperText}</span>
          </label>
        </div>

        <button type="submit" className="solid-button w-full">
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
