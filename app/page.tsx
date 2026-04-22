import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-hero-radial" aria-hidden />
        <div className="absolute inset-0 bg-noise opacity-50" aria-hidden />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 pb-24 pt-20 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-3 bg-surface-1/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            Undiscovered · Invitation-only
          </span>

          <h1 className="font-display text-5xl font-black leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
            The next wave of{" "}
            <span className="text-gradient-brand">
              international basketball
            </span>
            <br className="hidden md:block" /> — on one roster.
          </h1>

          <p className="max-w-2xl text-lg text-white/70 md:text-xl">
            World 48 is a curated showcase of 48 elite prospects from outside
            the U.S. pipeline. Built for Division I coaches. Bios, verified
            stats, and game film — no friction.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/players"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-surface-0 transition hover:bg-white/90"
            >
              Browse the Roster
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-surface-3 bg-surface-1/60 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              About the Event
            </Link>
          </div>

          {/* Key stats strip */}
          <dl className="mt-6 grid w-full max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-surface-3 bg-surface-3">
            {[
              { k: "48", l: "Prospects" },
              { k: "20+", l: "Countries" },
              { k: "D1", l: "Coaches Only" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex flex-col gap-1 bg-surface-1 px-6 py-5"
              >
                <dt className="text-xs font-medium uppercase tracking-widest text-white/50">
                  {s.l}
                </dt>
                <dd className="font-display text-3xl font-black tracking-tight">
                  {s.k}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Partner strip */}
      <section className="border-y border-surface-3/60 bg-surface-1/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
            In partnership with
          </p>
          <a
            href="https://weave.agency"
            target="_blank"
            rel="noreferrer"
            className="font-display text-xl font-semibold text-white/80 transition hover:text-white"
          >
            Weave Agency
          </a>
          <p className="text-xs text-white/50">
            The leading international recruiting agency in US college basketball.
          </p>
        </div>
      </section>
    </div>
  );
}
