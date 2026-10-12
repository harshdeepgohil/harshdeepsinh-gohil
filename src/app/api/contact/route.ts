import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form endpoint (Resend).
 * Env vars (see README):
 *  - RESEND_API_KEY      required
 *  - CONTACT_TO_EMAIL    where messages are delivered
 *  - CONTACT_FROM_EMAIL  verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *                        (defaults to Resend's onboarding sender for testing)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Naive in-memory rate limit (per server instance): 5 requests / 10 min / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message (10+ characters)." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages — please try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured");
    return NextResponse.json({ error: "The contact form isn't configured yet." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to: [to],
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escape(name)}</p><p><strong>Email:</strong> ${escape(email)}</p><hr/><p style="white-space:pre-wrap">${escape(message)}</p>`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json({ error: "Couldn't send your message right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
