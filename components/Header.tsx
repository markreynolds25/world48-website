"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import WaitlistModal from "@/components/WaitlistModal";
import { InstagramMark } from "@/components/icons";

const INSTAGRAM_URL = "https://www.instagram.com/undiscoveredworld48/";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/players", label: "Players" },
  { href: "/about", label: "About" },
  { href: "/ncaa-eligibility", label: "NCAA Eligibility" },
  { href: "/sponsors", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      <header className="sticky top-0 z-40 border-b border-surface-3/60 bg-surface-0/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/world48-icon-sm.png"
              alt="World 48"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-surface-1 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="World 48 on Instagram"
              title="@undiscoveredworld48"
              className="flex h-9 w-9 items-center justify-center rounded-md text-white/60 transition hover:bg-surface-1 hover:text-white"
            >
              <InstagramMark className="h-[18px] w-[18px]" />
            </a>
            <button
              onClick={() => setWaitlistOpen(true)}
              className="rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-red/25 transition hover:bg-brand-red/90"
            >
              Join 2027 Waitlist
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md text-white/70 hover:text-white md:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        aria-hidden={!menuOpen}
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile drawer */}
      <aside
        aria-label="Navigation menu"
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-surface-1 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-16 items-center justify-between border-b border-surface-3/60 px-6">
          <span className="text-lg font-bold tracking-widest text-white">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white/60 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-lg px-4 py-3 text-base font-medium text-white/70 transition hover:bg-surface-2 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-base font-medium text-white/70 transition hover:bg-surface-2 hover:text-white"
          >
            <InstagramMark className="h-[18px] w-[18px]" />
            @undiscoveredworld48
          </a>
        </nav>

        {/* Drawer CTA — persistent primary action on mobile */}
        <div className="mt-auto border-t border-surface-3/60 p-4">
          <button
            onClick={() => {
              setWaitlistOpen(true);
              close();
            }}
            className="block w-full rounded-md bg-brand-red py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-red/90"
          >
            Join 2027 Waitlist
          </button>
        </div>
      </aside>
    </>
  );
}
