"use client";

export default function NcaaBadge() {
  return (
    <a
      href="https://www.ncaa.org/"
      target="_blank"
      rel="noreferrer"
      title="NCAA Certified Event"
      className="group inline-flex items-center gap-2.5 rounded-full border border-brand-gold/40 bg-surface-1/70 px-3 py-1.5 transition hover:border-brand-gold/70"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://d67oz7qfnvgpz.cloudfront.net/img/main_logo.17e742a1.svg"
        alt="NCAA"
        className="h-6 w-auto object-contain brightness-[0.9] sepia saturate-[3] hue-rotate-[5deg] group-hover:brightness-100"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold group-hover:text-brand-gold/90">
        Certified Event
      </span>
    </a>
  );
}
