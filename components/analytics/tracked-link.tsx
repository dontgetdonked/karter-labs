"use client";

import Link from "next/link";

import { track, type AnalyticsEventMap, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps<TName extends AnalyticsEventName> = Omit<
  React.ComponentProps<typeof Link>,
  "onClick"
> & {
  event: TName;
  eventProps: AnalyticsEventMap[TName];
};

/**
 * A `next/link` that records one analytics event on click.
 *
 * Kept as a thin client wrapper so the pages that use it stay Server
 * Components — only the anchor itself is hydrated.
 */
export function TrackedLink<TName extends AnalyticsEventName>({
  event,
  eventProps,
  ...linkProps
}: TrackedLinkProps<TName>) {
  return <Link {...linkProps} onClick={() => track(event, eventProps)} />;
}
