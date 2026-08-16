import { cn } from "@/lib/utils";

/**
 * Accordion built on native <details>/<summary>.
 *
 * Zero JavaScript: keyboard support, screen-reader semantics and open/close
 * state all come from the browser. The shared `name` makes the group
 * exclusive in browsers that support it, and degrades to independent items
 * everywhere else.
 */
export function Accordion({
  items,
  name,
  className,
}: {
  items: { question: string; answer: string }[];
  /** Shared group name — one open item at a time. */
  name: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.question} name={name} className="group border-b border-line">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors hover:text-muted">
            <h3 className="text-h3 font-medium">{item.question}</h3>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pb-7 pr-10 text-[0.9375rem] leading-relaxed text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
