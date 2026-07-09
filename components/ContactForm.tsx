"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-surface-3 bg-surface-2/50 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan focus:bg-surface-2";
const labelCls = "mb-2 block text-xs font-medium uppercase tracking-wider text-ink-muted";

export default function ContactForm({ subject }: { subject?: string }) {
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
          subject: subject ?? "General enquiry — World 48",
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

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-7 w-7 text-brand-green">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-white">Message received.</p>
        <p className="text-sm text-ink-muted">We reply within 48 hours on business days.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-ink-muted underline-offset-2 transition hover:text-white hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Your name</label>
          <input
            id="cf-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Coach Smith"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>Email</label>
          <input
            id="cf-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell us what you're looking for…"
          className={`${inputCls} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-brand-red">
          Something went wrong. Please try again, or reach us on Instagram
          @undiscoveredworld48.
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary self-start">
        {status === "loading" ? "Sending…" : "Send message"}
        {status !== "loading" && <ArrowUpRight className="h-3.5 w-3.5" />}
      </button>
    </form>
  );
}
