"use client";

export default function NcaaBadge() {
  return (
    <a
      href="https://www.ncaa.org/"
      target="_blank"
      rel="noreferrer"
      title="NCAA Certified Event"
      className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 transition hover:bg-white/20"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://d67oz7qfnvgpz.cloudfront.net/img/main_logo.17e742a1.svg"
        alt="NCAA"
        className="h-5 w-auto object-contain brightness-0 invert"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
        Certified Event
      </span>
    </a>
  );
}
