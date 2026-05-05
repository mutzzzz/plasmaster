"use client";

import { useState, type FormEvent } from "react";
import type { SiteContent } from "../lib/site-content";

type ContactFormProps = {
  form: SiteContent["contact"]["form"];
  source?: string;
};

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const ERROR_MESSAGES: Record<string, string> = {
  missing_fields: "Preencha todos os campos.",
  invalid_email: "E-mail inválido.",
  upstream_error: "Falha no envio. Tente novamente em instantes.",
  invalid_json: "Erro ao processar a solicitação.",
};

export function ContactForm({ form, source = "contato" }: ContactFormProps) {
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const el = event.currentTarget;
    const data = new FormData(el);
    const payload = {
      name: String(data.get(form.fields.name.name ?? "name") ?? ""),
      email: String(data.get(form.fields.email.name ?? "email") ?? ""),
      message: String(data.get(form.fields.message.name ?? "message") ?? ""),
      source,
    };

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setStatus({
          kind: "error",
          message:
            ERROR_MESSAGES[json.error ?? ""] ??
            "Não foi possível enviar agora. Tente novamente.",
        });
        return;
      }
      setStatus({ kind: "success" });
      el.reset();
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
      data-action-form
      id="contato-form"
      onSubmit={handleSubmit}
      noValidate
      data-action-reveal
      data-action-parallax-scope
      className="relative overflow-hidden rounded-[2.2rem] border border-[rgba(244,243,238,0.9)] bg-[linear-gradient(180deg,rgba(244,243,238,0.92),rgba(244,243,238,0.78))] p-6 shadow-[0_28px_90px_-54px_rgba(18,21,31,0.28)] sm:p-7 lg:p-8"
    >
      <div
        data-action-parallax
        data-parallax-strength="8"
        className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,201,167,0.12),transparent_42%)]"
      />
      <div className="relative grid gap-5">
        <div className="space-y-3 border-b border-[var(--line)] pb-5">
          <span className="section-kicker">{form.title}</span>
          <p className="max-w-[56ch] text-sm leading-7 text-[var(--ink-muted)]">
            {form.subtitle}
          </p>
        </div>

        {(["name", "email"] as const).map((fieldName) => {
          const field = form.fields[fieldName];
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
                required
                disabled={submitting}
              />
              <span className="field-helper">{field.helperText}</span>
            </label>
          );
        })}

        <label className="field-shell" htmlFor="contact-message">
          <span className="field-label">{form.fields.message.label}</span>
          <textarea
            id="contact-message"
            name={form.fields.message.name ?? "message"}
            rows={6}
            className="field-control resize-none"
            placeholder={form.fields.message.placeholder}
            required
            disabled={submitting}
          />
          <span className="field-helper">{form.fields.message.helperText}</span>
        </label>

        <button type="submit" className="solid-button w-full" disabled={submitting}>
          {submitting ? "Enviando..." : form.buttonLabel}
        </button>

        {status.kind === "success" && (
          <p role="status" className="text-sm leading-6 text-[var(--accent-deep)]">
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
