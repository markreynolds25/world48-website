"use client";

import { useState } from "react";
import Link from "next/link";

const ATTENDANCE = [
  "In-person attendance · $350 registration fee",
  "In-person attendance (JUCO) · Free",
  "Live stream · Free",
];
const ACCOMMODATION = [
  "Hotel partnership accommodation · 25% discount",
  "Arranging own accommodation",
];
const DAYS = ["Day 1 · Coaches Day", "Day 2 · Showcase Day"];
const DIETARY = ["None", "Vegetarian", "Vegan", "Kosher", "Gluten-free", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-surface-3 bg-surface-2 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-brand-cyan";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted";
const errCls = "mt-1.5 text-xs font-medium text-brand-red";
const radioCls = (active: boolean) =>
  `flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition ${
    active
      ? "border-brand-cyan bg-brand-cyan/10 text-white"
      : "border-surface-3 bg-surface-2/60 text-white/60 hover:border-white/25 hover:text-white"
  }`;

export default function CoachRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    institution: "",
    email: "",
    attendance: "",
    bioLink: "",
    accommodation: "",
    recruitingFocus: "",
    social: "",
    dietary: DIETARY[0],
    irishNight: "",
    acknowledge: false,
  });
  const [days, setDays] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleDay = (d: string) =>
    setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.title.trim()) e.title = "Job title is required.";
    if (!EMAIL_RE.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.attendance) e.attendance = "Choose how you'll attend.";
    if (!form.accommodation) e.accommodation = "Choose an accommodation option.";
    if (days.length === 0) e.days = "Select at least one day.";
    if (!form.acknowledge) e.acknowledge = "Please acknowledge the registration fee terms.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const { acknowledge, ...fields } = form;
      const res = await fetch("/api/register-2027", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "coach", ...fields, days: days.join(" + ") }),
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
          Registration received.
        </h1>
        <p className="mt-3 text-ink-muted">
          Every coach registration is reviewed by the World 48 team. You&apos;ll
          get a confirmation email once you&apos;re approved. Payment and
          travel details follow with it.
        </p>
        <Link href="/players" className="btn-primary mt-8">
          Browse the roster while you wait
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16 md:py-20">
      <p className="eyebrow mb-3 text-brand-gold">
        World 48 · 2027 · Coaches
      </p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
        Coach registration
      </h1>
      <p className="mt-4 text-ink-muted">
        For college programs scouting Dublin in 2027. Reviewed and confirmed by
        email.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-5">
        <div>
          <label htmlFor="c-name" className={labelCls}>Full name *</label>
          <input id="c-name" type="text" value={form.name} onChange={set("name")} placeholder="Coach Smith" className={inputCls} />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-title" className={labelCls}>Job title *</label>
            <input id="c-title" type="text" value={form.title} onChange={set("title")} placeholder="e.g. Head Coach" className={inputCls} />
            {errors.title && <p className={errCls}>{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="c-institution" className={labelCls}>Institution</label>
            <input id="c-institution" type="text" value={form.institution} onChange={set("institution")} placeholder="e.g. Fresno State" className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="c-email" className={labelCls}>Email *</label>
          <input id="c-email" type="email" value={form.email} onChange={set("email")} placeholder="coach@university.edu" className={inputCls} />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>

        <fieldset>
          <legend className={labelCls}>Attendance *</legend>
          <div className="flex flex-col gap-2">
            {ATTENDANCE.map((a) => (
              <label key={a} className={radioCls(form.attendance === a)}>
                <input
                  type="radio"
                  name="attendance"
                  checked={form.attendance === a}
                  onChange={() => setForm((f) => ({ ...f, attendance: a }))}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#00D9FF]"
                />
                <span>{a}</span>
              </label>
            ))}
          </div>
          {errors.attendance && <p className={errCls}>{errors.attendance}</p>}
        </fieldset>

        <fieldset>
          <legend className={labelCls}>Travel &amp; hotel *</legend>
          <div className="flex flex-col gap-2">
            {ACCOMMODATION.map((a) => (
              <label key={a} className={radioCls(form.accommodation === a)}>
                <input
                  type="radio"
                  name="accommodation"
                  checked={form.accommodation === a}
                  onChange={() => setForm((f) => ({ ...f, accommodation: a }))}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#00D9FF]"
                />
                <span>{a}</span>
              </label>
            ))}
          </div>
          {errors.accommodation && <p className={errCls}>{errors.accommodation}</p>}
        </fieldset>

        <fieldset>
          <legend className={labelCls}>What days will you attend? *</legend>
          <div className="flex flex-col gap-2 sm:flex-row">
            {DAYS.map((d) => (
              <label key={d} className={`${radioCls(days.includes(d))} sm:flex-1`}>
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
            <label htmlFor="c-dietary" className={labelCls}>Venue lunch dietary needs *</label>
            <select id="c-dietary" value={form.dietary} onChange={set("dietary")} className={inputCls}>
              {DIETARY.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="c-irish" className={labelCls}>Attend Irish Night entertainment?</label>
            <select id="c-irish" value={form.irishNight} onChange={set("irishNight")} className={inputCls}>
              <option value="">No answer</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="c-bio" className={labelCls}>LinkedIn / coaching bio link</label>
          <input id="c-bio" type="url" value={form.bioLink} onChange={set("bioLink")} placeholder="https://…" className={inputCls} />
        </div>

        <div>
          <label htmlFor="c-focus" className={labelCls}>Recruiting focus</label>
          <input id="c-focus" type="text" value={form.recruitingFocus} onChange={set("recruitingFocus")} placeholder="Positions, class years, style of play…" className={inputCls} />
        </div>

        <div>
          <label htmlFor="c-social" className={labelCls}>Social media handles (Twitter / LinkedIn)</label>
          <input id="c-social" type="text" value={form.social} onChange={set("social")} placeholder="@handle" className={inputCls} />
        </div>

        <label className="flex items-start gap-3 text-sm text-white/60">
          <input
            type="checkbox"
            checked={form.acknowledge}
            onChange={(e) => setForm((f) => ({ ...f, acknowledge: e.target.checked }))}
            className="mt-1 h-4 w-4 shrink-0 accent-[#E53E3E]"
          />
          <span>
            I understand that in-person attendance (non-JUCO) carries a $350
            registration fee, payable ahead of the event. Payment details
            follow with approval. *
          </span>
        </label>
        {errors.acknowledge && <p className={errCls}>{errors.acknowledge}</p>}

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-brand-red">
            We couldn&apos;t save your registration. Please try again, or email
            us at{" "}
            <a href="mailto:info@undiscoveredworld48.com" className="underline underline-offset-2">
              info@undiscoveredworld48.com
            </a>
            .
          </p>
        )}

        <button type="submit" disabled={status === "loading"} className="btn-primary mt-2 w-full">
          {status === "loading" ? "Submitting…" : "Submit registration"}
        </button>
        <p className="text-center text-xs text-ink-faint">
          By submitting you agree to our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
