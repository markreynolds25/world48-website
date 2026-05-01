const CLINIC_URL =
  "https://www.eventbrite.com/e/1988338007505?aff=oddtdtcreator";

export default function CoachingClinicCard() {
  return (
    <div className="relative mt-8 w-full overflow-hidden rounded-xl border border-white/10">

      {/* ── Full flyer image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/partners/coaching-clinic.jpeg"
        alt="International Coaching Clinic & Networking"
        className="w-full object-cover"
      />

      {/* ── Gradient overlay — bottom half ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 35%, rgba(5,8,12,0.72) 58%, rgba(5,8,12,0.95) 100%)",
        }}
      />

      {/* ── Text + CTA overlaid at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cyan drop-shadow">
            Coaching Clinic
          </p>
          <p className="text-sm font-black text-white drop-shadow">May 14, 2026</p>
          <p className="text-xs font-medium text-white/80 drop-shadow">
            6:00 PM – 10:00 PM · National Basketball Arena
          </p>
        </div>

        <a
          href={CLINIC_URL}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center justify-center rounded-md bg-brand-cyan px-4 py-2 text-xs font-semibold text-surface-0 shadow-lg transition hover:bg-brand-cyan/85 hover:-translate-y-px"
        >
          Register Now
        </a>
      </div>

    </div>
  );
}
