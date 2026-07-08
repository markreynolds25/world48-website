"use client";

import { useState } from "react";
import Link from "next/link";

const DAYS = ["Day 1 — Coaches Day", "Day 2 — Showcase Day"];
const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50";
const errCls = "mt-1.5 text-xs font-medium text-brand-red";
const checkCls = (active: boolean) =>
  `flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition ${
    active
      ? "border-brand-cyan bg-brand-cyan/10 text-white"
      : "border-surface-3 bg-surface-2/60 text-white/60 hover:border-white/25 hover:text-white"
  }`;

function isUnder18(dob: string): boolean {
  if (!dob) return false;
  const ms = Date.now() - new Date(dob).getTime();
  return ms / (365.25 * 24 * 3600 * 1000) < 18;
}

export default function PlayerRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    dob: "",
    gradYear: "",
    country: "",
    headshotUrl: "",
    highlightUrl: "",
    statsLink: "",
    twitter: "",
    instagram: "",
    agent: "",
    jerseyNumber: "",
    jerseySize: "",
    parentName: "",
    parentEmail: "",
    consent: false,
  });
  const [days, setDays] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const under18 = isUnder18(form.dob);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleDay = (d: string) =>
    setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Player name is required.";
    if (!EMAIL_RE.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.dob) e.dob = "Date of birth is required.";
    const gy = parseInt(form.gradYear, 10);
    if (!gy || gy < 2025 || gy > 2033) e.gradYear = "Graduation year (e.g. 2028).";
    if (!form.country.trim()) e.country = "Home country is required.";
    if (days.length === 0) e.days = "Select at least one day.";
    if (under18) {
      if (!form.parentName.trim()) e.parentName = "Required for players under 18.";
      if (!EMAIL_RE.test(form.parentEmail)) e.parentEmail = "Required for players under 18.";
    }
    if (!form.consent) e.consent = "Consent is required to apply.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const { consent, ...fields } = form;
      const res = await fetch("/api/register-2027", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "player", ...fields, days: days.join(" + ") }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-7 w-7 text-brand-green">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="mt-5 font-display text-3xl font-black tracking-tight text-white">
          Application received.
        </h1>
        <p className="mt-3 text-white/60">
          The World 48 team reviews every application. You&apos;ll get a
          confirmation email if you&apos;re approved. One thing you can do
          right now: start your NCAA eligibility registration — it&apos;s
          mandatory to compete.
        </p>
        <Link
          href="/ncaa-eligibility"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90"
        >
          Start NCAA eligibility — 3 steps
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16 md:py-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
        World 48 · 2027 · Players
      </p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
        Apply to play
      </h1>
      <p className="mt-4 text-white/60">
        48 spots. NCAA coaches courtside. Applications reviewed by the World 48
        team and confirmed by email.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-5">
        <div>
          <label htmlFor="p-name" className={labelCls}>Player full name *</label>
          <input id="p-name" type="text" value={form.name} onChange={set("name")} placeholder="e.g. Adam Charles" className={inputCls} />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="p-email" className={labelCls}>Email *</label>
            <input id="p-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
            {errors.email && <p className={errCls}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="p-whatsapp" className={labelCls}>WhatsApp</label>
            <input id="p-whatsapp" type="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder="+353 00 000 0000" className={inputCls} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="p-dob" className={labelCls}>Date of birth *</label>
            <input id="p-dob" type="date" value={form.dob} onChange={set("dob")} className={inputCls} />
            {errors.dob && <p className={errCls}>{errors.dob}</p>}
          </div>
          <div>
            <label htmlFor="p-gradyear" className={labelCls}>HS grad year *</label>
            <input id="p-gradyear" type="number" inputMode="numeric" value={form.gradYear} onChange={set("gradYear")} placeholder="2028" className={inputCls} />
            {errors.gradYear && <p className={errCls}>{errors.gradYear}</p>}
          </div>
          <div>
            <label htmlFor="p-country" className={labelCls}>Home country *</label>
            <input id="p-country" type="text" value={form.country} onChange={set("country")} placeholder="e.g. Ireland" className={inputCls} />
            {errors.country && <p className={errCls}>{errors.country}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="p-headshot" className={labelCls}>Head shot link</label>
          <input id="p-headshot" type="url" value={form.headshotUrl} onChange={set("headshotUrl")} placeholder="Google Drive / Dropbox link to a recent head shot" className={inputCls} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="p-highlight" className={labelCls}>Most up-to-date highlight link</label>
            <input id="p-highlight" type="url" value={form.highlightUrl} onChange={set("highlightUrl")} placeholder="YouTube link preferred" className={inputCls} />
          </div>
          <div>
            <label htmlFor="p-stats" className={labelCls}>Season stats link</label>
            <input id="p-stats" type="url" value={form.statsLink} onChange={set("statsLink")} placeholder="https://…" className={inputCls} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="p-twitter" className={labelCls}>Twitter / X</label>
            <input id="p-twitter" type="text" value={form.twitter} onChange={set("twitter")} placeholder="@handle" className={inputCls} />
          </div>
          <div>
            <label htmlFor="p-instagram" className={labelCls}>Instagram</label>
            <input id="p-instagram" type="text" value={form.instagram} onChange={set("instagram")} placeholder="@handle" className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="p-agent" className={labelCls}>Agent and their contact (if any)</label>
          <input id="p-agent" type="text" value={form.agent} onChange={set("agent")} placeholder="Name + email/phone, or leave blank" className={inputCls} />
        </div>

        <fieldset>
          <legend className={labelCls}>Which days? *</legend>
          <div className="flex flex-col gap-2 sm:flex-row">
            {DAYS.map((d) => (
              <label key={d} className={`${checkCls(days.includes(d))} sm:flex-1`}>
                <input
                  type="checkbox"
                  checked={days.includes(d)}
                  onChange={() => toggleDay(d)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#00D9FF]"
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
          {errors.days && <p className={errCls}>{errors.days}</p>}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="p-jerseynum" className={labelCls}>Preferred jersey number</label>
            <input id="p-jerseynum" type="number" inputMode="numeric" value={form.jerseyNumber} onChange={set("jerseyNumber")} placeholder="e.g. 7" className={inputCls} />
          </div>
          <div>
            <label htmlFor="p-jerseysize" className={labelCls}>Jersey size</label>
            <select id="p-jerseysize" value={form.jerseySize} onChange={set("jerseySize")} className={inputCls}>
              <option value="">Select size</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={`rounded-xl border p-5 ${under18 ? "border-brand-gold/40 bg-brand-gold/5" : "border-surface-3/60 bg-surface-1/40"}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Parent / guardian {under18 ? "(required — player is under 18)" : "(optional)"}
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="p-parentname" className={labelCls}>Name</label>
              <input id="p-parentname" type="text" value={form.parentName} onChange={set("parentName")} placeholder="Parent or guardian" className={inputCls} />
              {errors.parentName && <p className={errCls}>{errors.parentName}</p>}
            </div>
            <div>
              <label htmlFor="p-parentemail" className={labelCls}>Email</label>
              <input id="p-parentemail" type="email" value={form.parentEmail} onChange={set("parentEmail")} placeholder="parent@example.com" className={inputCls} />
              {errors.parentEmail && <p className={errCls}>{errors.parentEmail}</p>}
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-white/60">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            className="mt-1 h-4 w-4 shrink-0 accent-[#E53E3E]"
          />
          <span>
            I confirm this information is accurate and — if the player is under
            18 — that a parent or guardian consents to this application and to
            World 48 processing the player&apos;s data as described in the{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
              privacy policy
            </Link>
            . *
          </span>
        </label>
        {errors.consent && <p className={errCls}>{errors.consent}</p>}

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-brand-red">
            We couldn&apos;t save your application. Please try again, or email
            us at{" "}
            <a href="mailto:info@undiscoveredworld48.com" className="underline underline-offset-2">
              info@undiscoveredworld48.com
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 w-full rounded-lg bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-red/90 disabled:opacity-60"
        >
          {status === "loading" ? "Submitting…" : "Submit application"}
        </button>
      </form>
    </div>
  );
}
