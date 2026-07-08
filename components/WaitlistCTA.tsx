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

  const base = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <>
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
      <button type="button" onClick={() => setOpen(true)} className={className ?? base}>
        {label}
      </button>
    </>
  );
}
