import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PartnersCarousel from "@/components/PartnersCarousel";
import PlacementsShowcase from "@/components/PlacementsShowcase";
import EventGallery from "@/components/EventGallery";
import WaitlistCTA from "@/components/WaitlistCTA";
import { getPlacements } from "@/lib/googleSheets";

// Re-check the sheet-backed sections every 5 minutes.
export const revalidate = 300;

export default async function HomePage() {
  // Results stats derive from the Placements tab so they never go stale;
  // the fallbacks are the confirmed 2026 numbers.
  const placements = await getPlacements();
  const total = placements.length || 13;
  const d1Count =
    placements.filter((p) => p.level.trim().toUpperCase() === "D1").length || 6;
  const countryCount =
    new Set(placements.map((p) => p.country).filter(Boolean)).size || 9;

  return (
    <div className="relative overflow-hidden">

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── PARTNERS ──────────────────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 py-8">
        <div className="mx-auto mb-5 max-w-7xl px-6">
          <p className="eyebrow text-center text-ink-faint">
            Partners &amp; Supporters
          </p>
        </div>
        <PartnersCarousel />
      </section>

      {/* ─── RESULTS STATS STRIP ───────────────────────────────────────── */}
      <section className="border-b border-surface-3/60 bg-surface-1/40">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden md:grid-cols-4">
          {[
            { k: String(total), l: "College Placements" },
            { k: String(d1Count), l: "NCAA D1 Commits" },
            { k: String(countryCount), l: "Countries Placed" },
            { k: "20+", l: "NCAA Programs Courtside" },
          ].map((s) => (
            <div
              key={s.l}
              className="flex flex-col gap-1 border-r border-surface-3/40 px-8 py-8 last:border-r-0"
            >
              <dt className="eyebrow text-ink-faint">{s.l}</dt>
              <dd className="stat-nums font-display text-3xl font-black tracking-tight">{s.k}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ─── SCHOLARSHIP RESULTS ───────────────────────────────────────── */}
      <PlacementsShowcase placements={placements} />

      {/* ─── 2026 EVENT GALLERY ────────────────────────────────────────── */}
      <EventGallery />

      {/* ─── 2027 CTA BAND ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="overflow-hidden rounded-2xl border border-brand-red/25 bg-gradient-to-br from-surface-1 via-surface-1 to-surface-2 p-8 md:p-12">
          <p className="eyebrow text-brand-red">World 48 · 2027</p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight md:text-4xl">
            The next 48 are coming.
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            National Basketball Arena, Dublin. Dates, roster reveals and
            tickets land with the waitlist first. Coaches, players, parents
            and fans all welcome.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <WaitlistCTA />
            <span className="text-sm text-white/60">
              Playing or coaching in 2027?{" "}
              <Link
                href="/register"
                className="font-semibold text-brand-cyan underline-offset-2 hover:underline"
              >
                Register here
              </Link>
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
