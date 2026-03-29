"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface TestimonialsProps {
  dict: Dictionary;
}

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Restauro/@47.0643457,28.8984936,17z/data=!4m8!3m7!1s0x40c97d9eecb31a4f:0x8723c7e8e0ec1aba!8m2!3d47.0643457!4d28.8984936!9m1!1b1";
const TEXT_LIMIT = 100;

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function ReviewCard({ t, dict }: { t: { name: string; role: string; text: string }; dict: Dictionary }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.text.length > TEXT_LIMIT;
  const displayText = isLong && !expanded ? t.text.slice(0, TEXT_LIMIT) + "..." : t.text;

  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[340px] p-6 sm:p-7 bg-[#0F0E0D] border border-[#1A1816] hover:border-accent/10 snap-center flex flex-col transition-[height,border-color] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      style={{ height: expanded ? "auto" : "280px" }}
    >
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} className="w-3 h-3 fill-accent text-accent" />
            ))}
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-80 transition-opacity"
            aria-label="Google Reviews"
          >
            <GoogleIcon />
          </a>
        </div>
        <p className="text-foreground/75 text-sm sm:text-[15px] leading-[1.8] font-light">
          &ldquo;{displayText}&rdquo;
        </p>
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-accent text-xs mb-4 hover:underline cursor-pointer shrink-0 text-left"
        >
          {expanded ? dict.testimonials.showLess : dict.testimonials.showMore}
        </button>
      )}
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 pt-5 mt-auto border-t border-[#1A1816] shrink-0 group/footer cursor-pointer"
      >
        <div className="w-9 h-9 bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
          <span className="text-xs font-medium text-accent">{t.name.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground">{t.name}</div>
          <div className="text-[11px] text-muted">{t.role}</div>
        </div>
      </a>
    </div>
  );
}

export function Testimonials({ dict }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const userInteracted = useRef(false);

  const stopAutoScroll = useCallback(() => {
    userInteracted.current = true;
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const initTimer = setTimeout(() => {
      el.scrollTo({ left: 356 * 2, behavior: "smooth" });
      setTimeout(checkScroll, 500);
    }, 300);

    el.addEventListener("scroll", checkScroll, { passive: true });

    const handleUserScroll = () => { if (!userInteracted.current) stopAutoScroll(); };
    el.addEventListener("pointerdown", handleUserScroll);
    el.addEventListener("wheel", handleUserScroll, { passive: true });

    autoScrollRef.current = setInterval(() => {
      if (userInteracted.current || !el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 356, behavior: "smooth" });
      }
    }, 4000);

    return () => {
      clearTimeout(initTimer);
      el.removeEventListener("scroll", checkScroll);
      el.removeEventListener("pointerdown", handleUserScroll);
      el.removeEventListener("wheel", handleUserScroll);
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [checkScroll, stopAutoScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    stopAutoScroll();
    scrollRef.current.scrollBy({ left: direction === "left" ? -356 : 356, behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="luxury-divider" />
            </div>
            <h2 className="text-4xl sm:text-5xl">
              {dict.testimonials.title}
            </h2>
            {/* Google rating badge */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-muted hover:text-foreground transition-colors"
            >
              <GoogleIcon />
              <span className="text-sm font-light">4.8</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs text-muted">(10)</span>
            </a>
          </div>
        </AnimateOnScroll>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {canScrollLeft && (
          <button onClick={() => scroll("left")}
            className="absolute left-1 sm:left-3 top-[140px] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-background/50 border border-[#2A2622]/40 text-muted/40 hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-pointer"
            aria-label="Previous">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll("right")}
            className="absolute right-1 sm:right-3 top-[140px] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-background/50 border border-[#2A2622]/40 text-muted/40 hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-pointer"
            aria-label="Next">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}

        {canScrollLeft && <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />}
        {canScrollRight && <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />}

        <AnimateOnScroll delay={0.15}>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-6 sm:px-10 pb-4 snap-x snap-mandatory items-start"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {dict.testimonials.items.map((t, i) => (
              <ReviewCard key={i} t={t} dict={dict} />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
