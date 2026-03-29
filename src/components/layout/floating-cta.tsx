"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface FloatingCTAProps {
  dict: Dictionary;
}

export function FloatingCTA({ dict }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <a
        href={`tel:${SITE.phone}`}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-accent text-accent-foreground shadow-2xl shadow-accent/30 cursor-pointer"
        aria-label={dict.cta.call}
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
