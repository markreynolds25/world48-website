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
        Whether you&apos;re a US college coach, a prospect, a potential sponsor
        or media, we read every message.
      </p>

      {/* Contact form */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-1 p-8 md:p-10">
        <h2 className="mb-6 font-display text-xl font-bold tracking-tight">
          Send us a message
        </h2>
        <ContactForm />
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
