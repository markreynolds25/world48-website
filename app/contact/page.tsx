import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { ChevronLeft } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with World 48 for D1 coaches, prospects, sponsors and media.",
};

const LANES: { title: string; body: string }[] = [
  { title: "Coaches", body: "Roster access, film requests, on-site visits to the showcase." },
  { title: "Prospects", body: "Nominations, evaluation inquiries and representation." },
  { title: "Sponsors & media", body: "Partnership opportunities, press requests and co-branded content." },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="eyebrow mb-3 text-brand-cyan">Contact</p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        Let&apos;s talk.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-muted">
        Whether you&apos;re a US college coach, a prospect, a potential sponsor
        or media, we read every message.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-[1.6fr_1fr] md:gap-10">
        {/* Form */}
        <div className="overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-1 p-8 md:p-10">
          <h2 className="mb-6 font-display text-xl font-bold tracking-tight">
            Send us a message
          </h2>
          <ContactForm />
        </div>

        {/* Reassurance rail — single accent, no rainbow */}
        <aside className="flex flex-col gap-6 md:border-l md:border-surface-3/60 md:pl-10">
          <p className="eyebrow text-brand-cyan">Who to write</p>
          <div className="flex flex-col gap-5">
            {LANES.map((lane) => (
              <div key={lane.title} className="border-l-2 border-brand-cyan/40 pl-4">
                <p className="font-semibold text-white">{lane.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{lane.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 border-t border-surface-3/60 pt-5 text-sm text-ink-faint">
            We reply within 48 hours on business days.
          </p>
        </aside>
      </div>

      <div className="mt-12">
        <Link
          href="/players"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-white"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to the roster
        </Link>
      </div>
    </div>
  );
}
