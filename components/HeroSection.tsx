"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import NcaaBadge from "@/components/NcaaBadge";

const EVENTBRITE_URL =
  "https://www.eventbrite.ie/e/undiscovered-world-48-tickets-1988109094821";

const PLAYERS = [
  {
    name: "Colin Schroeder",
    country: "Germany",
    image: "/Players/colin-schroeder.jpg",
  },
  {
    name: "Yannick Pinas",
    country: "Netherlands",
    image: "/Players/yannick-pinas.jpg",
  },
  {
    name: "Martin Minarovjech",
    country: "Slovakia",
    image: "/Players/martin-minarovjech.jpg",
  },
];

const INTERVAL = 5000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((i: number) => setCurrent(i), []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % PLAYERS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const player = PLAYERS[current];

  return (
    <>
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(1.04) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .hero-img {
          animation: heroFadeIn 0.80s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <section className="relative flex min-h-[92vh] items-center overflow-hidden">

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
          {/* key change triggers animation on each slide switch */}
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
                "linear-gradient(90deg, #0A0C10 0%, rgba(10,12,16,0.93) 14%, rgba(10,12,16,0.42) 40%, transparent 72%), linear-gradient(0deg, rgba(10,12,16,0.60) 0%, transparent 22%)",
            }}
          />

          {/* Player name tag — bottom-right */}
          <div className="absolute bottom-10 right-7 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              {player.country}
            </p>
            <p className="mt-0.5 font-display text-xl font-black tracking-tight text-white/75">
              {player.name}
            </p>
          </div>
        </div>

        {/* ── Left content panel ────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
          <div className="w-full md:max-w-[46%]">

            {/* Eyebrow pill */}
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cyan">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan" />
              Dublin · May 15–16, 2026
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
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/65 md:text-lg">
              48 elite international prospects. 20+ US college coaches. One live
              showcase in Dublin.
            </p>

            {/* Event meta */}
            <dl className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <CalendarIcon />
                <span>May 15 &amp; 16, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <LocationIcon />
                <span>National Basketball Arena, Dublin</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <ClockIcon />
                <span>Doors 1PM · Showcase 1:30PM</span>
              </div>
            </dl>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
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

            {/* Slide indicators */}
            <div className="mt-8 flex items-center gap-2.5">
              {PLAYERS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => goTo(i)}
                  aria-label={`View ${p.name}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out focus:outline-none ${
                    i === current
                      ? "w-9 bg-brand-cyan"
                      : "w-3 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
              <span className="ml-1 text-[11px] font-semibold tracking-wide text-white/45 transition-all duration-300">
                {player.name.split(" ")[0]}
              </span>
            </div>

          </div>
        </div>
      </section>
    </>
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
