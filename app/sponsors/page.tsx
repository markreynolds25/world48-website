import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sponsors & Partnerships — World 48",
  description:
    "Partnership opportunities with World 48 — an NCAA D1-focused showcase of elite international basketball talent.",
};

const PARTNERS = [
  {
    name: "SDCC",
    description: "Sport Development Club Cork",
    url: "https://sdcc.ie/en/",
    logo: "https://logo.clearbit.com/sdcc.ie",
  },
  {
    name: "Resync Physiotherapy",
    description: "Elite sports physiotherapy & rehabilitation",
    url: "https://resyncphysiotherapy.ie/",
    logo: "https://logo.clearbit.com/resyncphysiotherapy.ie",
  },
  {
    name: "People Playbook",
    description: "Leadership & performance consulting",
    url: "https://www.peopleplaybook.com/",
    logo: "https://logo.clearbit.com/peopleplaybook.com",
  },
  {
    name: "Weave Agency",
    description: "The leading international recruiting agency in US college basketball",
    url: "https://weave.agency/",
    logo: "https://logo.clearbit.com/weave.agency",
  },
  {
    name: "Get Recruited Hoops",
    description: "Connecting international players with US college programs",
    url: "https://getrecruitedhoops.com/",
    logo: "https://logo.clearbit.com/getrecruitedhoops.com",
  },
];

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
        Sponsors &amp; Partnerships
      </p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        Put your brand in front of the{" "}
        <span className="text-gradient-brand">next wave.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-white/70">
        World 48 brings together elite international basketball prospects and
        NCAA Division I coaching staffs. A small number of partners come along
        for the ride — on-site, on-roster, and in the room.
      </p>

      {/* Current Partners */}
      <div className="mt-14">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
          Current Partners
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4 rounded-xl border border-surface-3/70 bg-surface-1 p-6 transition hover:border-white/20 hover:bg-surface-2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-surface-3/60 bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-8 max-w-[2.5rem] object-contain opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div>
                <div className="font-semibold text-white transition group-hover:text-brand-cyan">
                  {partner.name}
                </div>
                <p className="mt-1 text-sm text-white/55">{partner.description}</p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-white/40 transition group-hover:text-brand-cyan">
                Visit site
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                  <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Partnership pillars */}
      <div className="mt-14">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
          What Partnership Includes
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <Pillar
            accent="text-brand-cyan"
            title="Visibility"
            body="Prominent placement across the site, player profiles, highlight reels, and event day collateral."
          />
          <Pillar
            accent="text-brand-green"
            title="Access"
            body="Direct line to D1 coaches, players, and the scouts who curate the roster. Attend the showcase in person."
          />
          <Pillar
            accent="text-brand-gold"
            title="Storytelling"
            body="Co-branded content with the prospects — a uniquely ownable angle on the global development pipeline."
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
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-surface-0 transition hover:bg-white/90"
          >
            Start the Conversation
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-md border border-surface-3 bg-surface-2/60 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Learn About World 48
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
      <div className={`text-[10px] font-semibold uppercase tracking-widest ${accent}`}>
        {title}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
    </div>
  );
}
