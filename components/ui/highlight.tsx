"use client";

import * as React from "react";

export interface HighlightProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "mark" | "span";
}

export function Highlight({
  children,
  delay = 0,
  className = "",
  as: Component = "mark",
  style,
  ...props
}: HighlightProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is not supported (SSR or old browser), activate immediately
    if (typeof IntersectionObserver === "undefined") {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={ref as React.RefObject<any>}
      className={`mark ${isActive ? "highlight-active" : ""} ${className}`.trim()}
      style={{
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
