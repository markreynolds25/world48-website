"use client";

export default function NcaaBadge() {
  return (
    <a
      href="https://www.ncaa.org/"
      target="_blank"
      rel="noreferrer"
      title="NCAA Certified Event"
      className="group inline-flex items-center gap-2.5 rounded-full border border-brand-gold/30 bg-surface-1/60 px-3 py-1.5 transition hover:border-brand-gold/60"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://d67oz7qfnvgpz.cloudfront.net/img/main_logo.17e742a1.svg"
        alt="NCAA"
        width={36}
        height={16}
        className="h-4 w-auto object-contain brightness-[0.85] sepia saturate-[3] hue-rotate-[5deg] group-hover:brightness-100"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold/80 group-hover:text-brand-gold">
        Certified Event
      </span>
    </a>
  );
}
