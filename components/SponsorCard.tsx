import Image from "next/image";

/**
 * Sponsor card for the hero (bottom-left of the left column).
 * Same glassmorphic container as the previous CoachingClinicCard so the
 * hero composition is unchanged — only the contents swap.
 *
 * The SDCC logo sits inside a clean white tile so it reads cleanly
 * regardless of the logo's intrinsic colours / transparency.
 */
export default function SponsorCard() {
  return (
    <div
      className="mt-8 flex w-full flex-col items-center gap-3 overflow-hidden rounded-xl border border-white/10 px-4 py-4"
      style={{ background: "rgba(10,12,16,0.82)", backdropFilter: "blur(12px)" }}
    >
      {/* ── Caption ── */}
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cyan">
        Proudly Sponsored By
      </p>

      {/* ── Logo tile (links to SDCC) ── */}
      <a
        href="https://sdcc.ie/en/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit SDCC website"
        title="Visit SDCC"
        className="flex w-full items-center justify-center rounded-lg bg-white px-3 py-3 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <Image
          src="/partners/SDCCMaster-Logo.png"
          alt="SDCC — Sponsor of Undiscovered World 48"
          width={400}
          height={160}
          priority
          className="h-auto w-full max-w-[160px] object-contain"
        />
      </a>
    </div>
  );
}
