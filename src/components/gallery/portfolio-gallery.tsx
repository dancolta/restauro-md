"use client";

import { useState } from "react";
import { BeforeAfter } from "./before-after";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface PortfolioGalleryProps {
  dict: Dictionary;
}

type FilterCategory = "auto" | "furniture";

interface GalleryItem {
  type: "before-after" | "single";
  category: FilterCategory;
  before?: string;
  after?: string;
  src?: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  {
    type: "before-after",
    category: "auto",
    before: "/images/gallery/scaun_auto_before.jpg",
    after: "/images/gallery/scaun_auto_after.jpg",
    alt: "Scaun auto din piele",
  },
  {
    type: "before-after",
    category: "auto",
    before: "/images/gallery/cotiera_before.jpg",
    after: "/images/gallery/cotiera_after.jpg",
    alt: "Cotieră auto",
  },
  {
    type: "before-after",
    category: "auto",
    before: "/images/services/cleaning/cotiera_before.jpg",
    after: "/images/services/cleaning/cotiera_after.jpg",
    alt: "Curățare cotieră",
  },
  {
    type: "single",
    category: "auto",
    src: "/images/hero/restaurare_scaun_masina_piele.jpg",
    alt: "Restaurare scaun mașină",
  },
  {
    type: "single",
    category: "auto",
    src: "/images/hero/restaurare_volan_piele.jpg",
    alt: "Restaurare volan din piele",
  },
  {
    type: "single",
    category: "furniture",
    src: "/images/hero/restaurare_canapea_piele.jpg",
    alt: "Restaurare canapea din piele",
  },
  {
    type: "single",
    category: "furniture",
    src: "/images/hero/restaurare_canapea_din_piele.jpg",
    alt: "Restaurare canapea",
  },
  {
    type: "single",
    category: "furniture",
    src: "/images/hero/restaurare_fotoliu_piele.jpg",
    alt: "Restaurare fotoliu din piele",
  },
];

export function PortfolioGallery({ dict }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<FilterCategory | "all">("all");

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "auto", label: dict.gallery.filterAuto },
    { key: "furniture", label: dict.gallery.filterFurniture },
  ];

  const renderItems = (items: GalleryItem[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((item, index) =>
        item.type === "before-after" && item.before && item.after ? (
          <div key={index} className="brightness-[0.85] hover:brightness-100 transition-all duration-500">
            <BeforeAfter
              before={item.before}
              after={item.after}
              alt={item.alt}
              beforeLabel={dict.gallery.before}
              afterLabel={dict.gallery.after}
            />
          </div>
        ) : item.src ? (
          <div key={index} className="relative aspect-[4/3] overflow-hidden group">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover brightness-[0.7] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : null
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        {filters.map((f) => (
          <button key={f.key} onClick={() => setFilter(filter === f.key ? "all" : f.key)}
            className={`px-5 py-2 text-xs tracking-[0.1em] uppercase font-medium transition-all whitespace-nowrap cursor-pointer ${filter === f.key ? "bg-accent text-accent-foreground" : "border border-[#2A2622] text-muted hover:text-foreground hover:border-accent/30"}`}>
            {f.label}
          </button>
        ))}
        {filter !== "all" && (
          <button onClick={() => setFilter("all")}
            className="px-5 py-2 text-xs tracking-[0.1em] uppercase font-medium border border-[#2A2622] text-muted hover:text-foreground cursor-pointer">
            ×
          </button>
        )}
      </div>

      {filter !== "all" ? (
        renderItems(galleryItems.filter((item) => item.category === filter))
      ) : (
        filters.map((f) => {
          const items = galleryItems.filter((item) => item.category === f.key);
          if (items.length === 0) return null;
          return (
            <div key={f.key} className="mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-xs tracking-[0.2em] uppercase text-accent font-medium">{f.label}</h3>
                <div className="w-8 h-px bg-accent/40" />
              </div>
              {renderItems(items)}
            </div>
          );
        })
      )}
    </div>
  );
}
