import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-[7rem] font-black leading-none tracking-tight text-white/10 md:text-[10rem]">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-black tracking-tight text-white md:text-3xl">
        Out of bounds.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-white/55">
        That page doesn&apos;t exist — but the roster and the 2026 results are
        very real.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90"
        >
          Back to the home page
        </Link>
        <Link
          href="/players"
          className="inline-flex items-center justify-center rounded-lg border border-surface-3 bg-surface-2/60 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
        >
          See the roster
        </Link>
      </div>
    </div>
  );
}
