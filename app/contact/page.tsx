import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

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

      {/* Contact form */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-1 p-8 md:p-10">
        <h2 className="mb-6 font-display text-xl font-bold tracking-tight">
          Send us a message
        </h2>
        <ContactForm />
      </div>

      {/* Direct email card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-1/50 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">
              Or email directly
            </div>
            <a
              href={mailto}
              className="mt-2 block break-all font-display text-xl font-bold tracking-tight text-white hover:text-brand-cyan"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <a
            href={mailto}
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-surface-3 bg-surface-2/60 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Open Mail App
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
      <div className={`text-[10px] font-semibold uppercase tracking-widest ${accent}`}>
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
    </div>
  );
}
