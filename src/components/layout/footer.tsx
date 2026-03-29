import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  const services = [
    { href: `/${lang}/servicii/interior-auto`, label: dict.services.autoInterior.title },
    { href: `/${lang}/servicii/mobila`, label: dict.services.furniture.title },
    { href: `/${lang}/servicii/alte-servicii`, label: dict.nav.otherServices },
    { href: `/${lang}/portofoliu`, label: dict.nav.portfolio },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">

        {/* Top: Logo — hidden on mobile, shown on desktop */}
        <div className="hidden sm:flex sm:justify-center mb-14">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2.5">
            <Image src="/images/brand/Logo3.png" alt="Restauro" width={36} height={36} className="w-9 h-9" />
            <span className="text-lg font-light tracking-[0.25em] uppercase text-foreground">Restauro</span>
          </Link>
        </div>

        {/* Columns — left-aligned proportionally */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16 text-center sm:text-left max-w-4xl mx-auto">
          {/* Services */}
          <div>
            <h3 className="text-xs font-medium text-foreground uppercase tracking-[0.15em] mb-4">
              {dict.nav.services}
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-muted hover:text-accent transition-colors font-light">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium text-foreground uppercase tracking-[0.15em] mb-4">
              {dict.nav.contact}
            </h3>
            <ul className="space-y-2">
              <li><a href={`tel:${SITE.phone}`} className="text-sm text-muted hover:text-accent transition-colors font-light">{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="text-sm text-muted hover:text-accent transition-colors font-light">{SITE.email}</a></li>
              <li className="text-sm text-muted font-light">{SITE.address}</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-medium text-foreground uppercase tracking-[0.15em] mb-4">
              {dict.contact.info.hours}
            </h3>
            <ul className="space-y-2 text-sm text-muted font-light">
              <li>{dict.common.monday}–{dict.common.friday}: <span className="text-foreground">{SITE.hours.weekdays}</span></li>
              <li>{dict.common.saturday}: <span className="text-foreground">{SITE.hours.saturday}</span></li>
              <li>{dict.common.sunday}: <span className="text-accent">{dict.common.closed}</span></li>
            </ul>
          </div>
        </div>

        {/* Mobile only: Logo at the end */}
        <div className="sm:hidden text-center mt-10">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2.5 justify-center">
            <Image src="/images/brand/Logo3.png" alt="Restauro" width={32} height={32} className="w-8 h-8" />
            <span className="text-base font-light tracking-[0.25em] uppercase text-foreground">Restauro</span>
          </Link>
        </div>

        {/* Bottom: social + copyright centered */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-border flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            {Object.entries(SITE.social).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-background border border-[#2A2622] flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-300"
                aria-label={platform}>
                <SocialIcon platform={platform} />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Restauro.md. {dict.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
      return (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>);
    case "facebook":
      return (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>);
    case "tiktok":
      return (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>);
    default:
      return null;
  }
}
