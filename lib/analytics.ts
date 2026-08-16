/**
 * Analytics abstraction.
 *
 * No analytics vendor is wired in. Components call `track()` today; when a
 * provider is chosen later, it is registered once in a client component near
 * the root and every call site keeps working unchanged.
 *
 * Privacy: event payloads carry no personal data — no names, emails, phone
 * numbers or free text. Only the coarse, non-identifying fields declared in
 * `AnalyticsEventMap` below are ever sent.
 */

export type AnalyticsEventMap = {
  /** A primary or secondary call-to-action was clicked. */
  cta_clicked: {
    /** Button label, e.g. "Începe un proiect". */
    label: string;
    /** Where on the site it was clicked, e.g. "hero", "header", "footer". */
    location: string;
  };
  /** A service page or service card was opened. */
  service_viewed: {
    /** Service slug from config/services.ts. */
    slug: string;
    source: "card" | "page";
  };
  /** A portfolio entry was expanded or opened. */
  project_viewed: {
    /** Project slug from config/projects.ts. */
    slug: string;
  };
  /** The contact form passed client-side validation and was sent. */
  contact_form_submitted: {
    /** Selected project type. Never the free-text description. */
    projectType: string;
    /** Whether a budget band was picked. The band itself is not sent. */
    hasBudget: boolean;
  };
  /** The contact form was rejected — by validation or by the server. */
  contact_form_failed: {
    reason: "validation" | "server" | "network";
  };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsProvider = <TName extends AnalyticsEventName>(
  name: TName,
  properties: AnalyticsEventMap[TName],
) => void;

let provider: AnalyticsProvider | null = null;

/**
 * Registers the active analytics provider. Call once, client-side.
 *
 * @example
 *   registerAnalyticsProvider((name, props) => plausible(name, { props }));
 */
export function registerAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next;
}

/** Removes the active provider — used when consent is withdrawn. */
export function clearAnalyticsProvider(): void {
  provider = null;
}

/**
 * Records an event. A no-op until a provider is registered, so it is safe to
 * call from anywhere, including during SSR.
 */
export function track<TName extends AnalyticsEventName>(
  name: TName,
  properties: AnalyticsEventMap[TName],
): void {
  if (typeof window === "undefined") return;

  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", name, properties);
  }

  provider?.(name, properties);
}
