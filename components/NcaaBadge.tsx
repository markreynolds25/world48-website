"use client";

export default function NcaaBadge() {
  return (
    <a
      href="https://www.ncaa.org/"
      target="_blank"
      rel="noreferrer"
      title="NCAA Certified Event"
      className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 transition hover:bg-white/25"
    >
      {/* NCAA logo on white tile so it's always visible */}
      <div className="flex h-6 w-14 shrink-0 items-center justify-center rounded bg-white px-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://d67oz7qfnvgpz.cloudfront.net/img/main_logo.17e742a1.svg"
          alt="NCAA"
          className="h-4 w-auto object-contain"
          onError={(e) => {
            e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] font-black text-[#00539B]">NCAA</span>';
          }}
        />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80">
        Certified Event
      </span>
    </a>
  );
}
