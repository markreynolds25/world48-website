import Link from "next/link";
import NcaaBadge from "@/components/NcaaBadge";
import PartnersCarousel from "@/components/PartnersCarousel";

const EVENTBRITE_URL =
  "https://www.eventbrite.ie/e/undiscovered-world-48-tickets-1988109094821";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center">
        {/* Layered backgrounds */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(0,217,255,0.13) 0%, transparent 55%), radial-gradient(ellipse 70% 80% at 80% 100%, rgba(255,183,77,0.10) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-noise opacity-40" aria-hidden />
        {/* Subtle basketball seam overlay */}
        <div className="absolute inset-0 bg-basketball-seams opacity-[0.035]" aria-hidden />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-16 md:pt-24">
          <div className="max-w-3xl">

            {/* Title */}
            <h1 className="text-5xl font-black leading-[1.01] tracking-tight md:text-7xl lg:text-[5.25rem]">
              Undiscovered
              <br />
              <span className="text-gradient-brand">World 48</span>
            </h1>

            {/* NCAA badge — below title */}
            <div className="mt-5">
              <NcaaBadge />
            </div>

            {/* Tagline */}
            <p className="mt-5 max-w-xl text-lg text-white/65 md:text-xl">
              48 elite international basketball prospects. 20+ top US college
              coaches. One live showcase in Dublin.
            </p>

            {/* Event meta */}
            <dl className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/75">
                <CalendarIcon />
                <span>May 15 &amp; 16, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/75">
                <LocationIcon />
                <span>National Basketball Arena, Dublin</span>
              </div>
              <div className="flex items-center gap-2 text-white/75">
                <ClockIcon />
                <span>Doors at 1PM · Showcase 1:30 PM</span>
              </div>
            </dl>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={EVENTBRITE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-red/25 transition hover:bg-brand-red/90"
              >
                <TicketIcon />
                Get Tickets
              </a>
              <Link
                href="/players"
                className="inline-flex items-center justify-center rounded-md border border-surface-3 bg-surface-1/60 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Browse Roster
              </Link>
            </div>

            {/* Instagram link — prominent */}
            <a
              href="https://www.instagram.com/undiscoveredworld48"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 rounded-lg border border-surface-3/80 bg-surface-1/60 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-surface-2 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4 shrink-0" />
              @undiscoveredworld48
              <ExternalLinkIcon className="ml-0.5 h-3 w-3 shrink-0 text-white/30" />
            </a>

            {/* NCAA Eligibility note for players */}
            <div className="mt-5 inline-flex items-start gap-2.5 rounded-xl border border-surface-3/60 bg-surface-1/50 px-4 py-3 text-sm text-white/60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan/60">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>
              <span>
                <span className="font-medium text-white/80">Competing at World 48?</span>{" "}
                International players pursuing US college opportunities may need to register with the{" "}
                <a
                  href="https://web3.ncaa.org/ecwr3/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-brand-cyan underline-offset-2 hover:underline"
                >
                  NCAA Eligibility Center
                </a>
                .
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ───────────────────────────────────────────────── */}
      <section className="border-y border-surface-3/60 bg-surface-1/40">
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

      {/* ─── PARTNERS ──────────────────────────────────────────────────── */}
      <section className="border-y border-surface-3/60 py-8">
        <div className="mx-auto mb-5 max-w-7xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
            Partners &amp; Supporters
          </p>
        </div>
        <PartnersCarousel />
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
                    Private evaluation sessions for NCAA-accredited coaching
                    staff. Full player assessments with coaches in the room.
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

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0 text-brand-cyan/70"
    >
      <path
        fillRule="evenodd"
        d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0 text-brand-gold/70"
    >
      <path
        fillRule="evenodd"
        d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 15.1 17 12.462 17 9A7 7 0 1 0 3 9c0 3.462 1.698 6.1 3.354 7.584a13.731 13.731 0 0 0 2.274 1.765 11.842 11.842 0 0 0 1.037.573l.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0 text-brand-green/70"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "h-4 w-4 shrink-0"}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
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
