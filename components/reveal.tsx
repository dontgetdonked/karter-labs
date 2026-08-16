"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in milliseconds. Keep it under ~200ms so nothing feels slow. */
  delay?: number;
};

/**
 * One fade + short rise as an element enters the viewport.
 *
 * The visible state is written straight to the DOM instead of React state:
 * there is nothing else to re-render, and the observer disconnects after the
 * first hit, so nothing observes or animates afterwards. Reduced motion and
 * the no-JS case are handled in CSS (see app/globals.css and the <noscript>
 * override in app/layout.tsx), so content is never trapped invisible.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const show = () => {
      element.dataset.reveal = "shown";
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="hidden"
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
