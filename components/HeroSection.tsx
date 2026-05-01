"use client";

import { useState, useEffect, useCallback } from "react";
import NcaaBadge from "@/components/NcaaBadge";
import CoachingClinicCard from "@/components/CoachingClinicCard";

const PLAYERS = [
  {
    name: "Colin Schroeder",
    country: "Germany",
    image: "/Players/colin-schroeder.jpg",
  },
  {
    name: "Yannick Pinas",
    country: "Netherlands",
    image: "/Players/yannick-pinas.jpeg",
  },
  {
    name: "Martin Minarovjech",
    country: "Slovakia",
    image: "/Players/martin-minarovjech.jpeg",
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

      <section className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden pb-16 pt-16 md:pt-24">

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

          {/* Player name tag — above the strip */}
          <div className="absolute bottom-24 right-7 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              {player.country}
            </p>
            <p className="mt-0.5 font-display text-xl font-black tracking-tight text-white/75">
              {player.name}
            </p>
          </div>
        </div>

        {/* ── Left content panel ────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="w-full md:max-w-[46%]">

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

          </div>
        </div>

        {/* ── Coaching clinic card — left column only ──────────────────── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="w-full md:max-w-[46%]">
            <CoachingClinicCard />
          </div>
        </div>

        {/* ── Carousel dots — bottom-centre ────────────────────────────── */}
        <div className="relative z-10 flex items-center justify-center gap-3 pb-1">
          {PLAYERS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => goTo(i)}
              aria-label={`View ${p.name}`}
              className={`h-3 w-3 rounded-full border-2 transition-all duration-500 ease-out focus:outline-none ${
                i === current
                  ? "border-white bg-white"
                  : "border-white/60 bg-transparent hover:border-white"
              }`}
            />
          ))}
        </div>

      </section>
    </>
  );
}
