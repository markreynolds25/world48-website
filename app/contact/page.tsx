import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — World 48",
  description:
    "Get in touch with World 48 — for D1 coaches, prospects, sponsors, and media.",
};

const CONTACT_EMAIL = "mark.reynolds25@gmail.com";

export default function ContactPage() {
  const mailto = `mailto:${CONTACT_EMAIL}`;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
        Contact
      </p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        Let&apos;s talk.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-white/70">
        Whether you&apos;re a Division I coach, a prospect, a potential sponsor,
        or media — we read every message.
      </p>

      {/* Email card */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-1 p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">
              Email
            </div>
            <a
              href={mailto}
              className="mt-2 block break-all font-display text-2xl font-bold tracking-tight text-white hover:text-brand-cyan md:text-3xl"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Direct line to the team. We aim to reply within 48 hours on
              business days.
            </p>
          </div>
          <a
            href={mailto}
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-surface-0 transition hover:bg-white/90"
          >
            Send Email
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-2 h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 0 1 0-1.06L10.94 10 7.21 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Who should write */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Lane
          accent="text-brand-cyan"
          title="Coaches"
          body="Roster access, film requests, on-site visits to the showcase."
        />
        <Lane
          accent="text-brand-green"
          title="Prospects"
          body="Nominations, evaluation inquiries, and representation."
        />
        <Lane
          accent="text-brand-gold"
          title="Sponsors & Media"
          body="Partnership opportunities, press requests, and co-branded content."
        />
      </div>

      <div className="mt-12">
        <Link
          href="/players"
          className="text-sm text-white/60 transition hover:text-white"
        >
          ← Back to the roster
        </Link>
      </div>
    </div>
  );
}

function Lane({
  accent,
  title,
  body,
}: {
  accent: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-surface-3/70 bg-surface-1 p-5">
      <div
        className={`text-[10px] font-semibold uppercase tracking-widest ${accent}`}
      >
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
    </div>
  );
}
