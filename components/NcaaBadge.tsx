"use client";

export default function NcaaBadge() {
  return (
    <a
      href="https://www.ncaa.com/"
      target="_blank"
      rel="noreferrer"
      title="NCAA Certified Event"
      className="group inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-surface-1/60 px-3 py-1 transition hover:border-brand-gold/60"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://logo.clearbit.com/ncaa.com"
        alt="NCAA"
        className="h-4 w-4 object-contain opacity-80 group-hover:opacity-100"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold/80 group-hover:text-brand-gold">
        NCAA Certified Event
      </span>
    </a>
  );
}
