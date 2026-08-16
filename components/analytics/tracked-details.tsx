"use client";

import { track, type AnalyticsEventMap, type AnalyticsEventName } from "@/lib/analytics";

type TrackedDetailsProps<TName extends AnalyticsEventName> = Omit<
  React.ComponentProps<"details">,
  "onToggle"
> & {
  event: TName;
  eventProps: AnalyticsEventMap[TName];
};

/**
 * A native <details> that records one analytics event the first time it opens.
 * The summary and body are rendered on the server and passed through as
 * children, so only the wrapper is hydrated.
 */
export function TrackedDetails<TName extends AnalyticsEventName>({
  event,
  eventProps,
  children,
  ...detailsProps
}: TrackedDetailsProps<TName>) {
  return (
    <details
      {...detailsProps}
      onToggle={(nativeEvent) => {
        if (nativeEvent.currentTarget.open) track(event, eventProps);
      }}
    >
      {children}
    </details>
  );
}
