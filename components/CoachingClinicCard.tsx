const CLINIC_URL =
  "https://www.eventbrite.com/e/1988338007505?aff=oddtdtcreator";

export default function CoachingClinicCard() {
  return (
    <div
      className="mt-8 w-full overflow-hidden rounded-xl border border-white/10"
      style={{ background: "rgba(10,12,16,0.78)", backdropFilter: "blur(12px)" }}
    >
      {/* ── Flyer banner image ── */}
      <div className="h-28 w-full overflow-hidden sm:h-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/partners/coaching-clinic.jpeg"
          alt="International Coaching Clinic & Networking"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* ── Card content ── */}
      <div className="flex flex-col gap-3 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cyan">
          Coaching Clinic
        </p>

        <div className="space-y-0.5">
          <p className="text-sm font-bold text-white">May 14, 2026</p>
          <p className="text-xs text-white/55">6:00 PM – 10:00 PM</p>
          <p className="text-xs text-white/55">National Basketball Arena, Dublin</p>
        </div>

        <p className="text-xs leading-relaxed text-white/45">
          Private evaluation sessions for invited NCAA coaches.
        </p>

        <a
          href={CLINIC_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-brand-cyan px-4 py-2 text-xs font-semibold text-surface-0 transition hover:bg-brand-cyan/85 hover:-translate-y-px"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}
