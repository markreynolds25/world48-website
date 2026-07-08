"use client";

import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";

/**
 * Client wrapper: a waitlist button + its modal, usable inside server pages.
 * `variant` picks the button styling; `label` overrides the default text.
 */
export default function WaitlistCTA({
  variant = "primary",
  label = "Join the 2027 Waitlist",
  className,
}: {
  variant?: "primary" | "ghost";
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const base =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-red/20 transition hover:bg-brand-red/90"
      : "inline-flex items-center justify-center gap-2 rounded-lg border border-surface-3 bg-surface-2/60 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white";

  return (
    <>
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
      <button type="button" onClick={() => setOpen(true)} className={className ?? base}>
        {label}
      </button>
    </>
  );
}
