import { NextResponse } from "next/server";

import { contactSchema, toFieldErrors, type ContactApiResponse } from "@/lib/contact-schema";
import { deliverLead } from "@/lib/contact-delivery";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

/** Leads are delivered per request — nothing here may be cached. */
export const dynamic = "force-dynamic";

const json = (body: ContactApiResponse, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export async function POST(request: Request) {
  const limit = checkRateLimit(clientKey(request.headers));
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        error: "Ai trimis prea multe mesaje. Încearcă din nou peste câteva minute.",
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Cerere invalidă." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Verifică datele din formular și încearcă din nou.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      422,
    );
  }

  // Honeypot: a filled hidden field means a bot. Answer 200 so the bot learns
  // nothing, but never deliver the message.
  if (parsed.data.website) {
    return json({ ok: true }, 200);
  }

  const delivery = await deliverLead(parsed.data);

  if (!delivery.ok) {
    // Never report success for a message that was not delivered.
    const error =
      delivery.reason === "not-configured"
        ? "Formularul nu este configurat momentan. Te rugăm să ne scrii direct pe email sau Telegram."
        : "Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne direct.";

    return json({ ok: false, error }, delivery.reason === "not-configured" ? 503 : 502);
  }

  return json({ ok: true }, 200);
}

/** Anything other than POST is not supported on this endpoint. */
export function GET() {
  return json({ ok: false, error: "Metodă nepermisă." }, 405, { Allow: "POST" });
}
