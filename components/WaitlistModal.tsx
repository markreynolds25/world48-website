"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = ["Fan", "Player", "Parent", "Coach"] as const;

type Status = "idle" | "loading" | "success" | "error";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("Fan");
  const [status, setStatus] = useState<Status>("idle");
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close + focus the panel on open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), role }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl border border-surface-3/70 bg-surface-1 p-8 shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md text-white/40 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-7 w-7 text-brand-green">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg font-bold text-white">You&apos;re on the list.</p>
            <p className="max-w-xs text-sm text-white/60">
              You&apos;ll be the first to hear when World 48 2027 dates, roster
              news and tickets drop.
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-sm text-white/50 transition hover:text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
              World 48 · 2027
            </p>
            <h2 id="waitlist-title" className="text-2xl font-bold text-white">
              Get notified for 2027
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Dates, roster reveals and tickets — straight to your inbox, nothing else.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="wl-name" className="mb-1.5 block text-xs font-medium text-white/60">
                  Full name
                </label>
                <input
                  id="wl-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan"
                />
              </div>

              <div>
                <label htmlFor="wl-email" className="mb-1.5 block text-xs font-medium text-white/60">
                  Email address
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan"
                />
              </div>

              <div>
                <span className="mb-2 block text-xs font-medium text-white/60">I am a</span>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      aria-pressed={role === r}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                        role === r
                          ? "border-brand-cyan bg-brand-cyan/10 text-brand-cyan"
                          : "border-surface-3 bg-surface-2/60 text-white/60 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm font-medium text-brand-red">
                  That didn&apos;t save — please try again, or reach us on
                  Instagram @undiscoveredworld48.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 w-full rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90 disabled:opacity-60"
              >
                {status === "loading" ? "Joining…" : "Join the 2027 waitlist"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
