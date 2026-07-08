import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "World 48 is a curated showcase of undiscovered international basketball talent, built for top US college coaches.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="eyebrow mb-3 text-brand-cyan">About</p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        Elite international talent,{" "}
        <span className="text-gradient-brand">one shortlist.</span>
      </h1>

      <div className="mt-8 max-w-none text-white/75">
        <p className="text-lg leading-relaxed">
          World 48 showcases 48 international prospects for top US college
          coaches. We travel, evaluate and vet each player so you save time
          and get real recruiting opportunities.
        </p>

        <p className="mt-6 leading-relaxed">
          Built by scouts, coaches and recruiters with real experience across
          Europe, US colleges and pro basketball. We save top staffs hours of
          travel and film work.
        </p>

        <p className="mt-6 leading-relaxed">
          World 48 is produced in partnership with{" "}
          <a
            href="https://weave.agency"
            target="_blank"
            rel="noreferrer"
            className="text-brand-cyan underline-offset-4 hover:underline"
          >
            Weave Agency
          </a>
          , a leading US college recruitment agency.
        </p>
      </div>

      <div className="mt-12">
        <Link href="/contact" className="btn-secondary">
          Get in touch
        </Link>
      </div>
    </div>
  );
}
