# Karter Labs

Marketing site for Karter Labs — a software agency serving businesses in the Republic of Moldova.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Site language is Romanian.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Development server on http://localhost:3000    |
| `npm run build`     | Production build                              |
| `npm run start`     | Serves the production build                   |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | Route typegen + `tsc --noEmit`                |

## Before launch

Two inputs are still missing and are not something the code can supply:

1. **Logo.** No logo file was provided. The wordmark is currently set
   typographically in `components/logo.tsx`. Drop the real asset at
   `public/logo.svg`, follow the comment in that file to switch to
   `next/image`, and replace `app/icon.svg` (the favicon).
2. **Contact details.** Every channel is read from an environment variable and
   is simply not rendered when empty, so the site never ships a dead link or an
   invented phone number. Fill in `.env.local`:
   `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`,
   `NEXT_PUBLIC_TELEGRAM`, `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_WHATSAPP`,
   plus `NEXT_PUBLIC_SITE_URL` for the real domain.

The contact form also needs a delivery provider (see below) — without one it
refuses submissions in production rather than showing a false success.

## Structure

```
app/          Routes, metadata, sitemap, robots, OG image, contact API
components/   Shared components; components/ui holds the primitives
config/       All content and business data — the only place copy lives
lib/          Utilities: cn, SEO, analytics, contact schema and delivery
```

### Configuration

Nothing user-facing is written inside a component. Edit these instead:

| File                  | Holds                                                  |
| --------------------- | ------------------------------------------------------ |
| `config/site.ts`      | Company details, contact channels, social links        |
| `config/navigation.ts`| Header/footer links and CTA labels                      |
| `config/services.ts`  | The four services — drives cards, pages and the sitemap |
| `config/projects.ts`  | Portfolio entries                                      |
| `config/content.ts`   | Homepage, about and contact copy                       |
| `config/faq.ts`       | FAQ questions and answers                              |
| `config/pricing.ts`   | Every price and budget band on the site                |
| `config/i18n.ts`      | Locale setup and notes for adding a second language     |

Adding a service is one entry in `config/services.ts`: the card, the
`/servicii/[slug]` page, the footer link and the sitemap entry all follow.

### Portfolio entries are concepts

Every project in `config/projects.ts` carries `demo: true`, which renders a
visible **Demo project** badge. These are in-house concepts, not client work.
The site contains no client names, no metrics and no testimonials. Leave the
flag on until an entry is replaced by a real, delivered project.

### Contact form

`POST /api/contact` validates with the same zod schema the browser uses
(`lib/contact-schema.ts`), applies a honeypot check and a per-IP rate limit,
then delivers the lead. The first configured provider wins:

1. **Resend** — set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
2. **Telegram** — set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

With neither configured, development logs the lead to the console and reports
success; production returns 503 and the form tells the visitor to use the
direct channels. A submission that was not delivered never shows a success
state.

The rate limiter (`lib/rate-limit.ts`) is in-memory and per-instance. On
serverless hosting, swap it for a shared store if you need a hard guarantee.

### Analytics

`lib/analytics.ts` is a vendor-free abstraction. Components already call
`track()` for `cta_clicked`, `service_viewed`, `project_viewed`,
`contact_form_submitted` and `contact_form_failed`. To connect a provider,
call `registerAnalyticsProvider()` once from a client component near the root.
Event payloads carry no personal data — no names, emails or free text. Set
`NEXT_PUBLIC_ANALYTICS_DEBUG=true` to log events to the browser console.

### Design system

Colours, type scale and motion tokens live in the `@theme` block of
`app/globals.css` — Tailwind v4 is CSS-first, so there is no
`tailwind.config.js`. The palette is monochrome by design: `paper`, `surface`,
`line`, `muted`, `ink` and their on-dark counterparts.

Animation is limited to one fade-and-rise on scroll (`components/reveal.tsx`)
plus hover transitions. `prefers-reduced-motion: reduce` disables all of it,
and a `<noscript>` override keeps content visible without JavaScript.

### Adding a second language

The site ships in Romanian only, but no copy is hardcoded in components. See
the notes in `config/i18n.ts` for the three steps.
