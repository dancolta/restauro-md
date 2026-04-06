import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface HeroProps {
  lang: Locale;
  dict: Dictionary;
}

export function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt={dict.seo.heroImageAlt}
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080706] via-[#080706]/85 to-[#080706]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/40" />
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-[#C6975B]/[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-0 w-full">
        <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
          {/* Brand label */}
          <div className="mb-10 animate-fade-in-up">
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium font-sans">
              {dict.hero.label}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl animate-fade-in-up animation-delay-100">
            {dict.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-base sm:text-lg text-muted max-w-md mx-auto lg:mx-0 leading-relaxed font-light animate-fade-in-up animation-delay-200">
            {dict.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-12 animate-fade-in-up animation-delay-300">
            <a
              href={`tel:${SITE.phone}`}
              className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-accent-hover transition-all duration-300 cursor-pointer rounded"
            >
              <Phone className="w-4 h-4" />
              {dict.hero.cta}
            </a>
            <Link
              href={`/${lang}/portofoliu`}
              className="inline-flex items-center gap-3 text-foreground/70 px-8 py-4 text-sm font-light tracking-wider uppercase hover:text-accent transition-colors duration-300 border border-border hover:border-accent/40 cursor-pointer rounded"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-12 mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-border/40 animate-fade-in-up animation-delay-400 text-center lg:text-left">
          <div>
            <div className="text-2xl sm:text-4xl font-serif font-light text-accent tracking-tight">5+</div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted mt-2 font-sans">{dict.stats.years}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-serif font-light text-foreground tracking-tight">500+</div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted mt-2 font-sans">{dict.stats.projects}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-serif font-light text-foreground tracking-tight">98%</div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted mt-2 font-sans">{dict.stats.clients}</div>
          </div>
        </div>
      </div>

    </section>
  );
}
