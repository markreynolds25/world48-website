import type { Metadata } from "next";
import Link from "next/link";
import WaitlistCTA from "@/components/WaitlistCTA";

export const metadata: Metadata = {
  title: "Register — World 48 2027",
  description:
    "Apply to play at World 48 2027 or register as a college coach. Applications reviewed by the World 48 team.",
};

export default function RegisterLandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
        World 48 · 2027
      </p>
      <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
        Be part of <span className="text-gradient-brand">the next 48.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-white/60">
        Every application is reviewed by the World 48 team. Approval is
        confirmed by email — usually within a few days.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Player */}
        <div className="flex flex-col rounded-2xl border border-surface-3/70 bg-surface-1 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
            Players
          </p>
          <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-white">
            Apply to play
          </h2>
          <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-white/60">
            <li>Evaluated live in front of 20+ NCAA programs in Dublin</li>
            <li>NCAA-certified event — eligibility support included</li>
            <li>13 college placements came out of the 2026 class</li>
          </ul>
          <Link
            href="/register/player"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90"
          >
            Start player application
          </Link>
        </div>

        {/* Coach */}
        <div className="flex flex-col rounded-2xl border border-surface-3/70 bg-surface-1 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Coaches &amp; Scouts
          </p>
          <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-white">
            Coach registration
          </h2>
          <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-white/60">
            <li>Invite-only Coaches Day — private evaluation sessions</li>
            <li>48 pre-vetted international prospects in one gym</li>
            <li>Full roster, film and contact requests on this site</li>
          </ul>
          <Link
            href="/register/coach"
            className="mt-6 inline-flex items-center justify-center rounded-lg border border-surface-3 bg-surface-2/60 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Register as a coach
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-surface-3/60 bg-surface-1/40 px-6 py-8 text-center">
        <p className="text-sm text-white/60">
          Just here for dates, roster news and tickets?
        </p>
        <WaitlistCTA variant="ghost" />
      </div>
    </div>
  );
}
