import type { Metadata } from "next";
import Link from "next/link";
import PartnerGrid from "@/components/PartnerGrid";

export const metadata: Metadata = {
  title: "Sponsors & Partnerships · World 48",
  description:
    "Partnership opportunities with World 48, a curated showcase of elite international basketball talent for top US college coaches.",
};

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="eyebrow mb-3 text-brand-cyan">Partners</p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        Put your brand in front of the{" "}
        <span className="text-gradient-brand">next wave.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-white/70">
        World 48 connects elite international basketball prospects with top US
        college coaches. A select few partners are part of the journey too:
        on-site, on-roster and in the room.
      </p>

      {/* Current Partners */}
      <div className="mt-14">
        <p className="eyebrow mb-6 text-ink-faint">Current Partners</p>
        <PartnerGrid />
      </div>

      {/* Partnership pillars */}
      <div className="mt-14">
        <p className="eyebrow mb-6 text-ink-faint">What Partnership Includes</p>
        <div className="grid gap-4 md:grid-cols-3">
          <Pillar
            accent="text-brand-cyan"
            title="Visibility"
            body="Prominent placement across the site, player profiles, highlight reels and event-day collateral."
          />
          <Pillar
            accent="text-brand-green"
            title="Access"
            body="Direct line to top US college coaches, players and the scouts who curate the roster. Attend the showcase in person."
          />
          <Pillar
            accent="text-brand-gold"
            title="Storytelling"
            body="Co-branded content with the prospects. A uniquely ownable angle on the global development pipeline."
          />
        </div>
      </div>

      {/* CTA band */}
      <div className="mt-14 overflow-hidden rounded-2xl border border-surface-3/70 bg-gradient-to-br from-surface-1 via-surface-1 to-surface-2 p-8 md:p-12">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Become a founding partner.
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          We&apos;re selective about who we work with. If your brand belongs in
          front of this audience, we&apos;d like to hear from you.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Start the conversation
          </Link>
          <Link href="/about" className="btn-secondary">
            Learn about World 48
          </Link>
        </div>
      </div>
    </div>
  );
}

function Pillar({
  accent,
  title,
  body,
}: {
  accent: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-surface-3/70 bg-surface-1 p-6">
      <div className={`eyebrow text-[10px] ${accent}`}>{title}</div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
    </div>
  );
}
