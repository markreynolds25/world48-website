/**
 * Bespoke World 48 icon set — drawn on a 24px grid with 2.25px strokes and
 * squared terminals so the site never falls back to stock icon-library glyphs.
 */

interface IconProps {
  className?: string;
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function ShieldCheck({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 11.5 2.2 2.2L15.5 9" />
    </svg>
  );
}

export function PlayBadge({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M10 8.5 15.5 12 10 15.5v-7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramMark({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17" cy="7" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChevronLeft({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function ChevronRight({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function TrophyMark({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5A3.5 3.5 0 0 1 16.5 11" />
      <path d="M12 14v3.5M8.5 20.5h7M9.5 17.5h5" />
    </svg>
  );
}
