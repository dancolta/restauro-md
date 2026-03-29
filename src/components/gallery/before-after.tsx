"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  before: string;
  after: string;
  alt: string;
  beforeLabel: string;
  afterLabel: string;
}

export function BeforeAfter({
  before,
  after,
  alt,
  beforeLabel,
  afterLabel,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [position, setPosition] = useState(50);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      updatePosition(e.clientX);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(5, p - 2));
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(95, p + 2));
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden cursor-ew-resize select-none group"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label={`${alt} - ${beforeLabel} / ${afterLabel}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* AFTER image — fills entire container, always visible on the right side */}
      <Image
        src={after}
        alt={`${alt} - ${afterLabel}`}
        fill
        className="object-cover pointer-events-none"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* BEFORE image — fills entire container, clipped from the left */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} - ${beforeLabel}`}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-2xl shadow-black/40 flex items-center justify-center backdrop-blur-sm border border-white/50">
          <svg
            className="w-5 h-5 text-[#0A0908]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        {afterLabel}
      </div>
    </div>
  );
}
