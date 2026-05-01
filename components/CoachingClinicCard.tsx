const CLINIC_URL =
  "https://www.eventbrite.com/e/1988338007505?aff=oddtdtcreator";

export default function CoachingClinicCard() {
  return (
    <div
      className="mt-8 w-full overflow-hidden rounded-xl border border-white/10"
      style={{ background: "rgba(10,12,16,0.82)", backdropFilter: "blur(12px)" }}
    >
      {/* ── Flyer image — top 25% (logo + heading) ── */}
      <div className="h-[88px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/partners/coaching-clinic.jpeg"
          alt="International Coaching Clinic & Networking"
          className="w-full object-cover object-top"
        />
      </div>

      {/* ── Info + CTA ── */}
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cyan">
            Coaching Clinic
          </p>
          <p className="text-xs font-black text-white">May 14, 2026</p>
          <p className="text-[11px] text-white/55">
            6:00 PM – 10:00 PM · National Basketball Arena
          </p>
        </div>
        <a
          href={CLINIC_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-brand-cyan px-3 py-1.5 text-[11px] font-semibold text-surface-0 shadow-md transition hover:bg-brand-cyan/85 hover:-translate-y-px"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}
