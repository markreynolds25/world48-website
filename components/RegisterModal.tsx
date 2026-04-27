"use client";

import { useState } from "react";
import type { Registration } from "@/hooks/useRegistration";

const ROLES = ["Coach", "Player", "Agent", "Other"] as const;
type PrimaryRole = (typeof ROLES)[number];
const MAX_OTHER = 24;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: Registration) => void;
}

export default function RegisterModal({ open, onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<PrimaryRole>("Coach");
  const [otherText, setOtherText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const finalRole =
    role === "Other" ? `Other: ${otherText.trim()}` : role;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    if (role === "Other" && !otherText.trim()) return;

    setSubmitting(true);

    // Best-effort write to Google Sheets — still registers locally if it fails
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: finalRole,
        }),
      });
    } catch {
      // silent — local save still happens
    }

    onSuccess({ name: name.trim(), email: email.trim(), role: finalRole });
    setSubmitting(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-surface-3/70 bg-surface-1 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-white/40 transition hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>

        {/* Header */}
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
          World 48
        </p>
        <h2 className="text-2xl font-bold text-white">Register for access</h2>
        <p className="mt-1 text-sm text-white/50">
          Free to register. Instant access to all 48 player profiles.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {/* Name */}
          <div>
            <label
              htmlFor="reg-name"
              className="mb-1.5 block text-xs font-medium text-white/60"
            >
              Full name
            </label>
            <input
              id="reg-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Smith"
              className="w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="mb-1.5 block text-xs font-medium text-white/60"
            >
              Email address
            </label>
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              className="w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-xs font-medium text-white/60">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
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

            {role === "Other" && (
              <div className="relative mt-2">
                <input
                  type="text"
                  maxLength={MAX_OTHER}
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="Describe your role..."
                  className="w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-3 pr-14 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">
                  {otherText.length}/{MAX_OTHER}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 w-full rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90 disabled:opacity-60"
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
