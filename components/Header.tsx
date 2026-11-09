"use client"

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header sticky h-14 top-0 z-100 backdrop-blur-lg border-b flex items-center justify-between py-0 px-6 md:px-10">
      <a href="#" className="flex items-center gap-3">
        <img className="h-8 rounded-md" src="https://avatars.githubusercontent.com/u/259040706?s=200&v=4" alt="Flare Logo" />
        <span className="brand-name text-[22px] font-bold">FLARE</span>
        <span className="text-[10px] uppercase border rounded-sm py-0.5 px-1.75 brand-tag">OPEN SOURCE</span>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1.5">
        <a href="#features">Features</a>
        <a href="#install">Downloads</a>
        <a href="https://flare-animate.github.io/Flare/" target="_blank" rel="noreferrer">Web version</a>
        <a href="#contribute">Contribute</a>
        <a href="https://github.com/Flare-Animate/Flare" target="_blank" className="cta">GitHub ↗</a>
      </nav>

      {/* Hamburger Button */}
      <button
        className="hamburger md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`bar ${open ? "open-1" : ""}`} />
        <span className={`bar ${open ? "open-2" : ""}`} />
        <span className={`bar ${open ? "open-3" : ""}`} />
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <nav className="mobile-nav">
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#install" onClick={() => setOpen(false)}>Downloads</a>
          <a href="https://flare-animate.github.io/Flare/" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Web version</a>
          <a href="#contribute" onClick={() => setOpen(false)}>Contribute</a>
          <a href="https://github.com/Flare-Animate/Flare" target="_blank" className="cta" onClick={() => setOpen(false)}>GitHub ↗</a>
        </nav>
      )}
    </header>
  );
}

export default Header;