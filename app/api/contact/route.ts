import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SITE_CONTACT_EMAIL = "plasmaster.embalagem@gmail.com";

function getTargetEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() || SITE_CONTACT_EMAIL;
}

function getFormSubmitEndpoint(email: string): string {
  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  source?: unknown;
};

function asString(value: unknown, max = 5000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = asString(payload.name, 200);
  const email = asString(payload.email, 200);
  const message = asString(payload.message, 5000);
  const source = asString(payload.source, 80) || "site";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const body = {
    name,
    email,
    message,
    _replyto: email,
    _subject: `Novo contato pelo site (${source})`,
    _template: "table",
    _captcha: "false",
    origem: source,
  };

  try {
    const res = await fetch(getFormSubmitEndpoint(getTargetEmail()), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("formsubmit error", res.status, text);
      return NextResponse.json(
        { ok: false, error: "upstream_error" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact send failed", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }
}
