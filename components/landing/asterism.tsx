import * as React from "react";

/* Print asterism: three small diamonds used to mark a section break.
   Purely decorative, inherits its color from the parent text color. */
export function Asterism({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 10"
      width="40"
      height="10"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2.9" y="2.9" width="4.2" height="4.2" transform="rotate(45 5 5)" fill="currentColor" />
      <rect x="17.9" y="2.9" width="4.2" height="4.2" transform="rotate(45 20 5)" fill="currentColor" />
      <rect x="32.9" y="2.9" width="4.2" height="4.2" transform="rotate(45 35 5)" fill="currentColor" />
    </svg>
  );
}
