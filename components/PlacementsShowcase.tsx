import type { Placement } from "@/lib/googleSheets";
import { countryFlag } from "@/lib/country";
import { TrophyMark } from "@/components/icons";

const LEVEL_LABELS: Record<string, string> = {
  D1: "NCAA D1",
  D2: "NCAA D2",
  JUCO: "JUCO",
  NAIA: "NAIA",
  PREP: "Prep",
};

function levelKey(level: string): string {
  return level.trim().toUpperCase();
}

/**
 * 2026 scholarship results — the site's strongest proof. D1 placements get
 * feature cards; every other level lists below. Renders a designed holding
 * state until the Placements sheet tab has rows.
 */
export default function PlacementsShowcase({
  placements,
}: {
  placements: Placement[];
}) {
  const d1 = placements.filter((p) => levelKey(p.level) === "D1");
  const rest = placements.filter((p) => levelKey(p.level) !== "D1");
  const total = placements.length || 13;
  const d1Count = d1.length || 6;
  const countryCount =
    new Set(placements.map((p) => p.country).filter(Boolean)).size || 9;

  return (
    <section id="results" className="scroll-mt-20 border-b border-surface-3/60">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="kicker mb-3">2026 Results</p>
        <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
          Dublin to <span className="text-gradient-brand">Division I.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/70">
          {total} players from {countryCount} countries left the National
          Basketball Arena with college opportunities. {d1Count} of them NCAA
          Division I, with more at D2, NAIA, JUCO and prep level. That is what
          one weekend in front of the right coaches does.
        </p>

        {placements.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-3 bg-surface-1/40 px-6 py-16 text-center">
            <TrophyMark className="h-8 w-8 text-brand-gold/60" />
            <p className="mt-4 max-w-md text-sm text-ink-muted">
              The full list of commitments (players, schools and levels) is
              being finalised and lands here shortly.
            </p>
          </div>
        ) : (
          <>
            {/* D1 feature cards */}
            {d1.length > 0 && (
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {d1.map((p) => (
                  <div
                    key={`${p.player}-${p.school}`}
                    className="group relative overflow-hidden rounded-xl border border-surface-3/70 bg-surface-1 p-6 transition hover:border-brand-gold/50"
                  >
                    <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-gold/70" />
                    <span className="inline-flex rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                      NCAA D1
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-black tracking-tight text-white">
                      {p.player}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-white/80">
                      {p.school}
                    </p>
                    {p.country && (
                      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
                        {countryFlag(p.country) ? countryFlag(p.country) + " " : ""}
                        {p.country}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Everything else — a clean results ledger (no coloured tags) */}
            {rest.length > 0 && (
              <div className="mt-6 overflow-hidden rounded-xl border border-surface-3/70 bg-surface-1">
                {/* Column header */}
                <div className="hidden grid-cols-[76px_1fr_auto] items-center gap-4 border-b border-surface-3/60 px-6 py-3 sm:grid">
                  <span className="eyebrow text-[10px] text-ink-faint">Level</span>
                  <span className="eyebrow text-[10px] text-ink-faint">Player &amp; program</span>
                  <span className="eyebrow text-right text-[10px] text-ink-faint">Country</span>
                </div>

                {rest.map((p, i) => (
                  <div
                    key={`${p.player}-${p.school}`}
                    className={`grid grid-cols-[64px_1fr] items-center gap-4 px-6 py-4 transition hover:bg-surface-2/30 sm:grid-cols-[76px_1fr_auto] ${
                      i > 0 ? "border-t border-surface-3/40" : ""
                    }`}
                  >
                    <span className="stat-nums text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
                      {LEVEL_LABELS[levelKey(p.level)] ?? p.level}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-bold leading-tight text-white">
                        {p.player}
                      </p>
                      <p className="truncate text-sm text-ink-muted">{p.school}</p>
                    </div>
                    {p.country && (
                      <span className="col-span-2 text-xs font-medium uppercase tracking-wider text-ink-faint sm:col-span-1 sm:text-right">
                        {countryFlag(p.country) ? countryFlag(p.country) + " " : ""}
                        {p.country}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
