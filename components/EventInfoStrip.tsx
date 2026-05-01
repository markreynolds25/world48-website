const SHOWCASE_URL =
  "https://www.eventbrite.ie/e/undiscovered-world-48-tickets-1988109094821";
const CLINIC_URL =
  "https://www.eventbrite.com/e/1988338007505?aff=oddtdtcreator";

export default function EventInfoStrip() {
  return (
    <div
      className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2"
      style={{ background: "rgba(10,12,16,0.72)", backdropFilter: "blur(12px)" }}
    >
      {/* ── Coaching Clinic ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cyan">
          Coaching Clinic
        </p>
        <div className="space-y-1">
          <p className="text-sm font-bold text-white">May 14, 2026</p>
          <p className="text-xs text-white/60">6:00 PM – 10:00 PM</p>
          <p className="text-xs text-white/60">National Basketball Arena, Dublin</p>
        </div>
        <p className="text-xs leading-relaxed text-white/50">
          Private evaluation sessions for invited NCAA coaches.
        </p>
        <a
          href={CLINIC_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-md bg-brand-cyan px-4 py-2 text-xs font-semibold text-surface-0 transition hover:bg-brand-cyan/85 hover:-translate-y-px"
        >
          Register Now
        </a>
      </div>

      {/* Divider */}
      <div className="hidden sm:block absolute inset-y-0 left-1/2 w-px bg-white/10" aria-hidden />

      {/* ── Elite Showcase ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 border-t border-white/10 p-6 sm:border-l sm:border-t-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
          Elite Showcase
        </p>
        <div className="space-y-1">
          <p className="text-sm font-bold text-white">May 15–16, 2026</p>
          <p className="text-xs text-white/60">Doors 1PM · Showcase 1:30PM</p>
          <p className="text-xs text-white/60">National Basketball Arena, Dublin</p>
        </div>
        <p className="text-xs leading-relaxed text-white/50">
          48 elite international prospects. 20+ top US college coaches.
        </p>
        <a
          href={SHOWCASE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-md border border-white/40 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 hover:-translate-y-px"
        >
          Get Tickets
        </a>
      </div>
    </div>
  );
}
