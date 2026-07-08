"use client";

import { useState, useEffect, useCallback } from "react";
import NcaaBadge from "@/components/NcaaBadge";
import SponsorCard from "@/components/SponsorCard";
import WaitlistModal from "@/components/WaitlistModal";
import { ArrowDown } from "@/components/icons";

/**
 * Hero carousel players — all four earned college placements out of the
 * 2026 event, so each photo carries its offer credit.
 */
const PLAYERS = [
  {
    name: "Colin Schroeder",
    country: "Germany",
    image: "/Players/colin-schroeder.jpg",
    offer: "Fresno State · NCAA D1",
  },
  {
    name: "Jannick Pinas",
    country: "Netherlands",
    image: "/Players/jannick-pinas.jpeg",
    offer: "Evansville · NCAA D1",
  },
  {
    name: "Martin Minarovjech",
    country: "Slovakia",
    image: "/Players/martin-minarovjech.jpeg",
    offer: "Lamar · NCAA D1",
  },
  {
    name: "Mark Burns",
    country: "Ireland",
    image: "/Players/mark-burns.jpeg",
    offer: "Layton Christian · Prep",
  },
];

const INTERVAL = 5000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const goTo = useCallback((i: number) => setCurrent(i), []);

  // Auto-advance; pauses on hover/focus. Re-running the effect when `current`
  // changes also resets the timer after a manual dot click.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % PLAYERS.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [paused, current]);

  const player = PLAYERS[current];

  return (
    <>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(1.04) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .hero-img {
          animation: heroFadeIn 0.80s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <section
        className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden pb-16 pt-16 md:pt-24"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >

        {/* ── Background gradients ─────────────────────────────────────── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(0,217,255,0.11) 0%, transparent 55%), radial-gradient(ellipse 60% 70% at 90% 100%, rgba(255,183,77,0.09) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 z-0 bg-noise opacity-40" aria-hidden />

        {/* ── Mobile: full-bleed faint image behind text ───────────────── */}
        <div className="absolute inset-0 z-0 md:hidden" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={player.image}
            alt=""
            className="h-full w-full object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0.75) 100%)",
            }}
          />
        </div>

        {/* ── Desktop: right-half player photo ─────────────────────────── */}
        <div
          className="absolute bottom-0 right-0 top-0 z-0 hidden w-[52%] md:block"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`${player.name}-${current}`}
            src={player.image}
            alt={player.name}
            className="hero-img h-full w-full object-cover object-top"
          />

          {/* Gradient: left-edge blend to bg + subtle bottom vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #0A0C10 0%, rgba(10,12,16,0.93) 14%, rgba(10,12,16,0.42) 40%, transparent 72%), linear-gradient(0deg, rgba(10,12,16,0.75) 0%, transparent 28%)",
            }}
          />

          {/* Player name tag + offer credit — above the strip */}
          <div className="absolute bottom-24 right-7 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              {player.country}
            </p>
            <p className="mt-0.5 font-display text-xl font-black tracking-tight text-white/75">
              {player.name}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md border border-brand-gold/30 bg-surface-0/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-gold backdrop-blur-md">
              Offer received · {player.offer}
            </p>
          </div>
        </div>

        {/* ── Left content panel ────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="w-full md:max-w-[46%]">

            {/* Eyebrow */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">
              2026 delivered · Returning 2027
            </p>

            {/* Headline */}
            <h1 className="font-display text-5xl font-black leading-[1.01] tracking-tight text-white md:text-7xl lg:text-[5.25rem]">
              Undiscovered
              <br />
              <span className="text-gradient-brand">World 48</span>
            </h1>

            {/* NCAA badge */}
            <div className="mt-5">
              <NcaaBadge />
            </div>

            {/* Tagline */}
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              48 international prospects. 13 college placements across 9
              countries — six of them NCAA Division I. The 2027 class is next.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setWaitlistOpen(true)}
                className="inline-flex items-center justify-center rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-red/25 transition hover:bg-brand-red/90"
              >
                Join the 2027 Waitlist
              </button>
              <a
                href="#results"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-surface-3 bg-surface-2/40 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/30 hover:text-white"
              >
                See the 2026 results
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* ── Sponsor card — half the left column ──────────────────────── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="w-1/2 md:max-w-[23%]">
            <SponsorCard />
          </div>
        </div>

        {/* ── Carousel dots — bottom-centre, ≥44px touch targets ───────── */}
        <div className="relative z-10 flex items-center justify-center pb-1">
          {PLAYERS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => goTo(i)}
              aria-label={`View ${p.name}`}
              aria-current={i === current}
              className="group flex h-11 w-11 items-center justify-center focus:outline-none"
            >
              <span
                className={`h-3 w-3 rounded-full border-2 transition-all duration-500 ease-out group-focus-visible:ring-2 group-focus-visible:ring-brand-cyan group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-surface-0 ${
                  i === current
                    ? "border-white bg-white"
                    : "border-white/60 bg-transparent group-hover:border-white"
                }`}
              />
            </button>
          ))}
        </div>

      </section>
    </>
  );
}
