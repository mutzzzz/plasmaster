"use client";

import { useState, type FormEvent } from "react";

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
  source?: string;
  className?: string;
};

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

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
  source = "hero",
  className = "",
}: HeroQuoteFormProps) {
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get(fields.name.name ?? "name") ?? ""),
      email: String(data.get(fields.email.name ?? "email") ?? ""),
      message: String(data.get(fields.message.name ?? "message") ?? ""),
      source,
    };

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        const map: Record<string, string> = {
          missing_fields: "Preencha todos os campos.",
          invalid_email: "E-mail inválido.",
          upstream_error: "Falha no envio. Tente novamente em instantes.",
          invalid_json: "Erro ao processar a solicitação.",
        };
        setStatus({
          kind: "error",
          message: map[json.error ?? ""] ?? "Não foi possível enviar agora. Tente novamente.",
        });
        return;
      }
      setStatus({ kind: "success" });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Sem conexão. Tente novamente em instantes.",
      });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      data-home-quote-form
      onSubmit={handleSubmit}
      noValidate
      className={`glass-panel relative overflow-hidden p-6 sm:p-8 ${className}`.trim()}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,201,167,0.12),transparent_44%)]" />

      <div className="relative space-y-6">
        <div
          data-home-quote-item
          className="space-y-3 border-b border-[var(--line)] pb-4"
        >
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
          <label
            data-home-quote-item
            className="field-shell"
            htmlFor={fieldId(idPrefix, "name")}
          >
            <span className="field-label">{fields.name.label}</span>
            <input
              id={fieldId(idPrefix, "name")}
              type={fields.name.type ?? "text"}
              name={fields.name.name ?? "name"}
              autoComplete={fields.name.autoComplete ?? "name"}
              inputMode={fields.name.inputMode}
              className="field-control"
              placeholder={fields.name.placeholder}
              required
              disabled={submitting}
            />
            <span className="field-helper">{fields.name.helperText}</span>
          </label>

          <label
            data-home-quote-item
            className="field-shell"
            htmlFor={fieldId(idPrefix, "email")}
          >
            <span className="field-label">{fields.email.label}</span>
            <input
              id={fieldId(idPrefix, "email")}
              type={fields.email.type ?? "email"}
              name={fields.email.name ?? "email"}
              autoComplete={fields.email.autoComplete ?? "email"}
              inputMode={fields.email.inputMode}
              className="field-control"
              placeholder={fields.email.placeholder}
              required
              disabled={submitting}
            />
            <span className="field-helper">{fields.email.helperText}</span>
          </label>

          <label
            data-home-quote-item
            className="field-shell"
            htmlFor={fieldId(idPrefix, "message")}
          >
            <span className="field-label">{fields.message.label}</span>
            <textarea
              id={fieldId(idPrefix, "message")}
              name={fields.message.name ?? "message"}
              rows={5}
              className="field-control resize-none"
              placeholder={fields.message.placeholder}
              required
              disabled={submitting}
            />
            <span className="field-helper">{fields.message.helperText}</span>
          </label>
        </div>

        <button
          data-home-quote-item
          type="submit"
          className="solid-button w-full"
          disabled={submitting}
        >
          {submitting ? "Enviando..." : buttonLabel}
        </button>

        {status.kind === "success" && (
          <p
            role="status"
            className="text-sm leading-6 text-[var(--accent-deep)]"
          >
            Mensagem enviada. Em breve entraremos em contato.
          </p>
        )}
        {status.kind === "error" && (
          <p role="alert" className="text-sm leading-6 text-red-600">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
