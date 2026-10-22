"use client";

import React, { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolioData";
import { MessageSquare, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Tech Stack", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHref(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock scroll + close on Escape / resize-to-desktop while the drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[#080c16]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Logo / Name */}
            <a href="#" className="flex items-center gap-3 group min-w-0" onClick={closeMenu}>
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center font-bold text-white text-lg shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                SM
              </div>
              <div className="min-w-0">
                <div className="font-bold text-white text-[15px] sm:text-base tracking-tight flex items-center gap-2">
                  <span className="truncate">{personalInfo.name}</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono hidden lg:block">
                  Solutions Engineer & Architect
                </p>
              </div>
            </a>

            {/* Desktop / tablet navigation (>= 768px) */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-white/5 border border-white/10 px-2 lg:px-4 py-1.5 rounded-full backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 lg:px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    activeHref === link.href
                      ? "text-white bg-[#00e5b0]/15 shadow-[inset_0_0_0_1px_rgba(0,229,176,0.35)]"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA & Actions (desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Chat</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Discuss Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile hamburger (< 768px) */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden no-touch-fx shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl text-slate-200 bg-white/5 border border-white/10 hover:border-[#00e5b0]/40 active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <span className={`hamburger ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile glassmorphic drawer — rendered outside <header> so its backdrop-filter
          doesn't become the containing block for this fixed layer */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer md:hidden ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
      >
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="drawer-item flex flex-wrap items-center gap-2" style={{ ["--i" as string]: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-widest text-[#00e5b0] bg-[#00e5b0]/10 border border-[#00e5b0]/30 shadow-[0_0_18px_-4px_rgba(0,229,176,0.6)]">
              <span className="w-2 h-2 rounded-full bg-[#00e5b0] shadow-[0_0_8px_#00e5b0] animate-pulse" />
              OPEN TO WORK
            </span>
            <span className="text-xs text-emerald-400 font-medium">Available for Remote & Consulting Work</span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                tabIndex={mobileMenuOpen ? 0 : -1}
                style={{ ["--i" as string]: i + 1 }}
                className={`drawer-item flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold border transition-colors ${
                  activeHref === link.href
                    ? "text-white bg-[#00e5b0]/10 border-[#00e5b0]/30"
                    : "text-slate-200 bg-white/[0.04] border-white/10 active:bg-white/10"
                }`}
              >
                <span>{link.name}</span>
                <span className="font-mono text-[11px] text-slate-500">{String(i + 1).padStart(2, "0")}</span>
              </a>
            ))}
          </nav>

          <div className="drawer-item pt-2 flex flex-col gap-2.5" style={{ ["--i" as string]: navLinks.length + 1 }}>
            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
