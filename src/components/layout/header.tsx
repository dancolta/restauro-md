"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown, Globe } from "lucide-react";
import { SITE } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
}

export function Header({ lang, dict }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const otherLang = lang === "ro" ? "ru" : "ro";

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  // Track scroll for navbar background effect
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setIsServicesOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setIsLangOpen(false);
      // Close mobile menu on outside click
      if (
        isMobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setIsMobileOpen(false);
        setIsMobileServicesOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isMobileOpen]);

  const serviceLinks = [
    { href: `/${lang}/servicii/interior-auto`, label: dict.nav.autoInterior },
    { href: `/${lang}/servicii/mobila`, label: dict.nav.furniture },
    { href: `/${lang}/servicii/alte-servicii`, label: dict.nav.otherServices },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10" : "bg-background/60 backdrop-blur-md border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2.5 group shrink-0">
            <Image src="/images/brand/Logo3.png" alt="Restauro" width={40} height={40} className="w-9 h-9 lg:w-10 lg:h-10" priority />
            <span className="text-lg lg:text-xl font-light tracking-[0.25em] uppercase text-foreground group-hover:text-accent transition-colors duration-300">Restauro</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href={`/${lang}`} className="relative px-4 py-2 text-xs tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-4 after:h-px after:bg-accent after:transition-all after:duration-300">{dict.nav.home}</Link>
            <div ref={servicesRef} className="relative">
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="relative flex items-center gap-1.5 px-4 py-2 text-xs tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors duration-300 cursor-pointer after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-4 after:h-px after:bg-accent after:transition-all after:duration-300">
                {dict.nav.services}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-56 bg-[#111]/95 backdrop-blur-xl border border-[#2A2622] shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300 ease-out origin-top ${isServicesOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"}`}>
                {serviceLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsServicesOpen(false)} className="block px-5 py-3 text-sm text-muted hover:text-accent hover:bg-[#1A1816] transition-all duration-200 hover:pl-6">{link.label}</Link>
                ))}
              </div>
            </div>
            <Link href={`/${lang}/portofoliu`} className="relative px-4 py-2 text-xs tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-4 after:h-px after:bg-accent after:transition-all after:duration-300">{dict.nav.portfolio}</Link>
            <Link href={`/${lang}/contact`} className="relative px-4 py-2 text-xs tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-4 after:h-px after:bg-accent after:transition-all after:duration-300">{dict.nav.contact}</Link>
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <div ref={langRef} className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors border border-[#2A2622] hover:border-accent/30 cursor-pointer">
                <Globe className="w-3.5 h-3.5" />
                {lang.toUpperCase()}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-32 bg-[#111]/95 backdrop-blur-xl border border-[#2A2622] shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300 ease-out origin-top ${isLangOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"}`}>
                <Link href="/ro" onClick={() => setIsLangOpen(false)} className={`block px-4 py-2.5 text-sm transition-all duration-200 ${lang === "ro" ? "text-accent bg-[#1A1816]" : "text-muted hover:text-accent hover:bg-[#1A1816]"}`}>Română</Link>
                <Link href="/ru" onClick={() => setIsLangOpen(false)} className={`block px-4 py-2.5 text-sm transition-all duration-200 ${lang === "ru" ? "text-accent bg-[#1A1816]" : "text-muted hover:text-accent hover:bg-[#1A1816]"}`}>Русский</Link>
              </div>
            </div>
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium hover:bg-accent-hover transition-all duration-300 cursor-pointer group">
              <Phone className="w-4 h-4 group-hover:animate-pulse" />
              {SITE.phone}
            </a>
          </div>

          {/* Mobile: Lang + Menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={`/${otherLang}`}
              className="text-xs tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors px-2.5 py-1.5 border border-[#2A2622]"
            >
              {otherLang.toUpperCase()}
            </Link>
            <button
              ref={menuButtonRef}
              onClick={() => { setIsMobileOpen(!isMobileOpen); setIsMobileServicesOpen(false); }}
              className="p-2 text-foreground"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav — smooth slide */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="bg-[#0C0B0A] border-t border-[#1A1816] px-6 py-6 flex flex-col gap-1">
          {/* Home */}
          <Link href={`/${lang}`} onClick={() => setIsMobileOpen(false)}
            className="px-4 py-3.5 text-sm tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-200">
            {dict.nav.home}
          </Link>

          {/* Services dropdown */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-sm tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              {dict.nav.services}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileServicesOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="border-l border-[#2A2622] ml-6 pl-4 py-1">
                {serviceLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)}
                    className="block py-2.5 text-sm text-muted/70 hover:text-accent transition-colors duration-200">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio */}
          <Link href={`/${lang}/portofoliu`} onClick={() => setIsMobileOpen(false)}
            className="px-4 py-3.5 text-sm tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-200">
            {dict.nav.portfolio}
          </Link>

          {/* Contact */}
          <Link href={`/${lang}/contact`} onClick={() => setIsMobileOpen(false)}
            className="px-4 py-3.5 text-sm tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-200">
            {dict.nav.contact}
          </Link>

          {/* Phone CTA */}
          <div className="mt-3 pt-3 border-t border-[#1A1816]">
            <a href={`tel:${SITE.phone}`}
              className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-3.5 text-sm tracking-[0.1em] uppercase font-medium cursor-pointer">
              <Phone className="w-4 h-4" />
              {dict.nav.callNow}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
