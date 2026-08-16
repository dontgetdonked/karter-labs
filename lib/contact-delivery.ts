import "server-only";

import { pricing } from "@/config/pricing";
import { projectTypes, type ContactInput } from "@/lib/contact-schema";

/**
 * Where a submitted lead goes.
 *
 * Two providers, both plain `fetch` calls — no SDK dependency. The first one
 * that is configured wins:
 *
 *   1. Resend   — RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL)
 *   2. Telegram — TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 *
 * If neither is configured, development logs the lead and reports success so
 * the form can be exercised locally, while production refuses the submission.
 * The form never shows a success state for a message that went nowhere.
 */

export type DeliveryResult =
  | { ok: true; via: "resend" | "telegram" | "console" }
  | { ok: false; reason: "not-configured" | "provider-error" };

const label = (value: string | undefined, options: readonly { value: string; label: string }[]) =>
  options.find((option) => option.value === value)?.label ?? value ?? "—";

function formatLead(input: ContactInput): { subject: string; lines: string[] } {
  const lines = [
    `Nume: ${input.name}`,
    `Companie: ${input.company || "—"}`,
    `Email: ${input.email}`,
    `Telefon: ${input.phone || "—"}`,
    `Tip proiect: ${label(input.projectType, projectTypes)}`,
    `Buget: ${input.budget ? label(input.budget, pricing.budgetOptions) : "—"}`,
    "",
    "Descriere:",
    input.message,
  ];

  return {
    subject: `Cerere nouă — ${input.name}${input.company ? ` (${input.company})` : ""}`,
    lines,
  };
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function sendViaResend(input: ContactInput): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return { ok: false, reason: "not-configured" };

  const { subject, lines } = formatLead(input);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Karter Labs <onboarding@resend.dev>",
      to: [to],
      reply_to: input.email,
      subject,
      text: lines.join("\n"),
      html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
        lines.join("\n"),
      )}</pre>`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend responded with", response.status, await response.text());
    return { ok: false, reason: "provider-error" };
  }

  return { ok: true, via: "resend" };
}

async function sendViaTelegram(input: ContactInput): Promise<DeliveryResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, reason: "not-configured" };

  const { subject, lines } = formatLead(input);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      text: `<b>${escapeHtml(subject)}</b>\n\n${escapeHtml(lines.join("\n"))}`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Telegram responded with", response.status, await response.text());
    return { ok: false, reason: "provider-error" };
  }

  return { ok: true, via: "telegram" };
}

/** True when at least one delivery provider is configured. */
export function isDeliveryConfigured(): boolean {
  return Boolean(
    (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) ||
      (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
  );
}

export async function deliverLead(input: ContactInput): Promise<DeliveryResult> {
  const providers = [sendViaResend, sendViaTelegram];

  for (const send of providers) {
    const result = await send(input);
    if (result.ok) return result;
    if (result.reason === "provider-error") return result;
  }

  if (process.env.NODE_ENV !== "production") {
    const { subject, lines } = formatLead(input);
    console.info(`[contact] No delivery provider configured. Lead logged only.\n${subject}\n${lines.join("\n")}`);
    return { ok: true, via: "console" };
  }

  return { ok: false, reason: "not-configured" };
}
