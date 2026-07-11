import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { ArrowUpRight, WarningMark, ClockMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "NCAA Eligibility | World 48",
  description:
    "Learn what you need to do to be eligible to compete at World 48. Registration, certification, and document requirements.",
};

// ─── Step data ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Register with NCAA",
    description:
      "Create or renew your account in the Basketball Certification System (BBCS). This is the mandatory first step for all international players.",
    url: "https://bbcs.ncaa.org",
    urlLabel: "Open BBCS",
    time: "15–20 minutes",
    warning:
      "Returning athletes: RENEW your existing account. Do not create a new one.",
  },
  {
    num: "02",
    title: "Verify your eligibility",
    description:
      "Review NCAA guidelines and check the required documents. The FAQ and resource guides cover everything from amateur status to academic requirements.",
    url: "https://ncaa.egain.cloud/kb/ECAG/home",
    urlLabel: "Open FAQ & Guides",
    time: "10 minutes",
    warning: null,
  },
  {
    num: "03",
    title: "Confirm with World 48",
    description:
      "Once registered, let us know and we'll verify your eligibility status. Drop us a message below with your name and BBCS confirmation.",
    url: "#contact",
    urlLabel: "Send Confirmation",
    time: "5 minutes",
    warning: null,
  },
];

// ─── Resource links ──────────────────────────────────────────────────────────

const RESOURCES = [
  {
    title: "NCAA Basketball Certification Overview",
    url: "https://www.ncaa.org/basketballcertification",
    description: "Official NCAA certification page with eligibility guidelines.",
  },
  {
    title: "FAQ & Quick Reference Guide",
    url: "https://ncaa.egain.cloud/kb/ECAG/home",
    description: "Step-by-step instructions, FAQs, and user guides.",
  },
  {
    title: "Basketball Certification System (BBCS)",
    url: "https://bbcs.ncaa.org",
    description: "Register or renew your certification account here.",
  },
  {
    title: "NCAA Eligibility Center Support",
    url: "https://web3.ncaa.org/ecwr3/",
    description: "Contact the NCAA Eligibility Center directly with questions.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NcaaEligibilityPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="kicker mb-3">Players</p>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
            NCAA Eligibility
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            Everything you need to know to compete at World 48. Follow the three
            steps below and you&apos;ll be cleared well before showcase day.
          </p>
        </div>
      </section>

      {/* ── Warning banner ───────────────────────────────────────────────── */}
      <div className="border-b border-brand-gold/25 bg-brand-gold/8 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-semibold text-brand-gold">
            Returning coaches &amp; athletes:{" "}
            <span className="font-black uppercase tracking-wide">
              RENEW your existing account
            </span>
            . Do not create a new one or your history will be lost.
          </p>
        </div>
      </div>

      {/* ── 3-step flow ──────────────────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 font-display text-2xl font-black tracking-tight text-white md:text-3xl">
            Three steps to compete
          </h2>

          {/* Vertical numbered process — big Anton numerals, cyan connector */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex gap-5 sm:gap-7">
                {/* Left rail: numeral + connecting hairline */}
                <div className="flex flex-col items-center">
                  <span className="stat-nums font-numeral text-4xl font-black leading-none text-brand-cyan md:text-5xl">
                    {step.num}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="mt-3 w-px flex-1 bg-gradient-to-b from-brand-cyan/40 to-surface-3" aria-hidden />
                  )}
                </div>

                {/* Content */}
                <div className={i < STEPS.length - 1 ? "flex-1 pb-10" : "flex-1"}>
                  <h3 className="font-display text-xl font-black leading-tight tracking-tight text-white md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                    {step.description}
                  </p>

                  {step.warning && (
                    <p className="mt-4 flex items-start gap-2 rounded-lg border border-brand-gold/25 bg-brand-gold/8 px-3 py-2 text-xs font-semibold text-brand-gold">
                      <WarningMark className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{step.warning}</span>
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={step.url}
                      target={step.url.startsWith("http") ? "_blank" : undefined}
                      rel={step.url.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan transition hover:text-white"
                    >
                      {step.urlLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <span className="flex items-center gap-1.5 text-[11px] text-ink-faint">
                      <ClockMark className="h-3 w-3" />
                      {step.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you'll need ─────────────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 font-display text-2xl font-black tracking-tight text-white md:text-3xl">
            What you&apos;ll need
          </h2>
          <ul className="space-y-3">
            {[
              "Valid passport or government-issued ID",
              "High school or college transcripts (if applicable)",
              "Proof of amateur status",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm leading-relaxed md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Resources ────────────────────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 font-display text-2xl font-black tracking-tight text-white md:text-3xl">
            Helpful resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {RESOURCES.map((r) => (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-1.5 rounded-xl border border-surface-3/70 bg-surface-1 p-5 transition hover:border-brand-cyan/40 hover:bg-surface-2"
              >
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition group-hover:text-brand-cyan">
                  {r.title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-brand-cyan" />
                </span>
                <span className="text-xs leading-relaxed text-ink-muted">
                  {r.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Step 3 form ─────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-20 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="kicker mb-3">
            Step 03
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-white md:text-4xl">
            Confirm with World 48
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            Once you&apos;ve registered with the NCAA, send us a quick message
            with your name and your BBCS confirmation. We&apos;ll check you off
            and you&apos;re good to go.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-1 p-8 md:p-10">
            <ContactForm subject="NCAA Eligibility Confirmation — World 48" />
          </div>
        </div>
      </section>

    </div>
  );
}
