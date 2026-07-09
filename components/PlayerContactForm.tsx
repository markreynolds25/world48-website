"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-surface-3 bg-surface-2/50 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan focus:bg-surface-2";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted";

export default function PlayerContactForm({ playerName }: { playerName: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: `Player Contact Request — ${playerName}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => { setOpen(true); setStatus("idle"); }}
        className="btn-primary"
      >
        Request Contact
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-md rounded-2xl border border-surface-3/70 bg-surface-1 p-6 shadow-2xl">
            {/* Modal header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Request Contact
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Regarding <span className="text-white/80">{playerName}</span>
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/50 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-brand-green">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="font-semibold text-white">Message sent.</p>
                <p className="text-sm text-ink-muted">We&apos;ll be in touch within 48 hours.</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 text-sm text-ink-muted transition hover:text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="pc-name" className={labelCls}>Your name</label>
                  <input
                    id="pc-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Coach Smith"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="pc-email" className={labelCls}>Email</label>
                  <input
                    id="pc-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="coach@university.edu"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="pc-message" className={labelCls}>Message</label>
                  <textarea
                    id="pc-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={`I'm interested in learning more about ${playerName}…`}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm font-medium text-brand-red">
                    Something went wrong. Please try again, or email us directly.
                  </p>
                )}

                <button type="submit" disabled={status === "loading"} className="btn-primary mt-1">
                  {status === "loading" ? "Sending…" : "Send Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
