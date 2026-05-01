import HeroSection from "@/components/HeroSection";
import PartnersCarousel from "@/components/PartnersCarousel";

const EVENTBRITE_URL =
  "https://www.eventbrite.ie/e/undiscovered-world-48-tickets-1988109094821";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── PARTNERS ──────────────────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 py-8">
        <div className="mx-auto mb-5 max-w-7xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
            Partners &amp; Supporters
          </p>
        </div>
        <PartnersCarousel />
      </section>

      {/* ─── STATS STRIP ───────────────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 bg-surface-1/40">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden md:grid-cols-4">
          {[
            { k: "48", l: "Prospects" },
            { k: "20+", l: "Countries" },
            { k: "20+", l: "US College Coaches" },
            { k: "May 16", l: "Showcase Day" },
          ].map((s) => (
            <div
              key={s.l}
              className="flex flex-col gap-1 border-r border-surface-3/40 px-8 py-8 last:border-r-0"
            >
              <dt className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {s.l}
              </dt>
              <dd className="text-3xl font-black tracking-tight">{s.k}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ─── EVENT DETAILS ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Schedule */}
          <div className="rounded-2xl border border-surface-3/70 bg-surface-1 p-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
              Schedule
            </p>
            <div className="space-y-5">
              {/* Day 1 */}
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-cyan/30 bg-brand-cyan/10">
                  <span className="text-[10px] font-bold text-brand-cyan">15</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">Coaches Day</p>
                    <span className="rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cyan">
                      Invite Only
                    </span>
                  </div>
                  <p className="text-xs text-white/40">Friday, May 15, 2026</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    Private evaluation sessions for invited NCAA coaches. Up
                    close player sessions with coaches in the room.
                  </p>
                </div>
              </div>

              <div className="border-t border-surface-3/40" />

              {/* Day 2 */}
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-gold/30 bg-brand-gold/10">
                  <span className="text-[10px] font-bold text-brand-gold">16</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">Showcase Day</p>
                    <span className="rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-gold">
                      Open
                    </span>
                  </div>
                  <p className="text-xs text-white/40">Saturday, May 16, 2026 · 1:30 PM – 5:00 PM</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    Live games, elite international talent on display. Open to
                    fans, families, and players. BBQ on site. Doors at 1PM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">

            {/* Venue */}
            <div className="rounded-2xl border border-surface-3/70 bg-surface-1 p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                Venue
              </p>
              <h3 className="text-xl font-bold text-white">
                National Basketball Arena
              </h3>
              <p className="mt-1 text-sm text-white/55">
                Castletymon Road, Dublin, D24 N449, Ireland
              </p>
              <p className="mt-3 text-xs text-white/40">Free parking on site.</p>
              <a
                href="https://maps.google.com/?q=National+Basketball+Arena+Castletymon+Dublin"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/35 transition hover:text-brand-cyan"
              >
                Get directions
                <ExternalLinkIcon />
              </a>
            </div>

            {/* Ticket card */}
            <div className="overflow-hidden rounded-2xl border border-brand-red/25 bg-gradient-to-br from-surface-1 via-surface-1 to-surface-2 p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                Tickets available now
              </span>

              {/* Ticket tiers */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-surface-3/60 bg-surface-2/60 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">General Entry</p>
                    <p className="text-xs text-white/45">Single admission · May 16 showcase</p>
                  </div>
                  <span className="text-lg font-black text-white">€10</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-brand-red/30 bg-brand-red/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Family Bundle</p>
                    <p className="text-xs text-white/45">2 adults + up to 3 children</p>
                  </div>
                  <span className="text-lg font-black text-white">€20</span>
                </div>
              </div>

              <a
                href={EVENTBRITE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-red/20 transition hover:bg-brand-red/90"
              >
                <TicketIcon />
                Buy on Eventbrite
              </a>
              <p className="mt-3 text-center text-xs text-white/30">
                Refunds available up to 7 days before the event · Secure checkout
              </p>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
}

/* ─── Icon helpers ─────────────────────────────────────────────────────────── */

function TicketIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
    >
      <path d="M 2 7 C 2 5.895 2.895 5 4 5 H 16 C 17.105 5 18 5.895 18 7 V 9 C 17.448 9 17 9.448 17 10 C 17 10.552 17.448 11 18 11 V 13 C 18 14.105 17.105 15 16 15 H 4 C 2.895 15 2 14.105 2 13 V 11 C 2.552 11 3 10.552 3 10 C 3 9.448 2.552 9 2 9 V 7 Z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className ?? "h-3 w-3 shrink-0"}
    >
      <path
        fillRule="evenodd"
        d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
