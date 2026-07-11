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
      <p className="kicker mb-3">World 48 · 2027</p>
      <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
        Be part of <span className="text-gradient-brand">the next 48.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-white/70">
        Every application is reviewed by the World 48 team. Approval is
        confirmed by email, usually within a few days.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Player */}
        <div className="flex flex-col rounded-2xl border border-surface-3/70 bg-surface-1 p-8">
          <p className="kicker">Players</p>
          <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-white">
            Apply to play
          </h2>
          <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-ink-muted">
            <li>Evaluated live in front of 20+ NCAA programs in Dublin</li>
            <li>NCAA-certified event with eligibility support included</li>
            <li>13 college placements came out of the 2026 class</li>
          </ul>
          <Link href="/register/player" className="btn-primary mt-6">
            Start player application
          </Link>
        </div>

        {/* Coach */}
        <div className="flex flex-col rounded-2xl border border-surface-3/70 bg-surface-1 p-8">
          <p className="kicker">Coaches &amp; Scouts</p>
          <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-white">
            Coach registration
          </h2>
          <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-ink-muted">
            <li>Invite-only Coaches Day with private evaluation sessions</li>
            <li>48 pre-vetted international prospects in one gym</li>
            <li>Full roster, film and contact requests on this site</li>
          </ul>
          <Link href="/register/coach" className="btn-secondary mt-6">
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
