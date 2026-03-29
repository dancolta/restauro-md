import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Car, Sofa, Shirt, Footprints, Watch, Sparkles } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ServicesGridProps {
  lang: Locale;
  dict: Dictionary;
}

const serviceImages: Record<string, string> = {
  autoInterior: "/images/hero/restaurare_scaun_auto_piele.jpg",
  furniture: "/images/hero/restaurare_canapea_piele.jpg",
  clothing: "/images/services/clothing.jpg",
  footwear: "/images/services/footwear.jpg",
  accessories: "/images/services/accessories.jpg",
  cleaning: "/images/services/cleaning.jpg",
};

const serviceIcons: Record<string, React.ElementType> = {
  autoInterior: Car,
  furniture: Sofa,
  clothing: Shirt,
  footwear: Footprints,
  accessories: Watch,
  cleaning: Sparkles,
};

const serviceLinks: Record<string, string> = {
  autoInterior: "servicii/interior-auto",
  furniture: "servicii/mobila",
  clothing: "servicii/alte-servicii#imbracaminte",
  footwear: "servicii/alte-servicii#incaltaminte",
  accessories: "servicii/alte-servicii#accesorii",
  cleaning: "servicii/alte-servicii#curatare",
};

const serviceKeys = [
  "autoInterior",
  "furniture",
  "clothing",
  "footwear",
  "accessories",
  "cleaning",
] as const;

export function ServicesGrid({ lang, dict }: ServicesGridProps) {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <AnimateOnScroll className="max-w-2xl mb-20 text-center mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="luxury-divider" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl">
            {dict.services.title}
          </h2>
          <p className="mt-6 text-muted text-base font-light leading-relaxed max-w-lg mx-auto">
            {dict.services.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Symmetric grid — 3 columns, 2 rows, all same aspect ratio */}
        <AnimateOnScroll delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceKeys.map((key) => {
              const service = dict.services[key] as { title: string; description: string };
              const Icon = serviceIcons[key];
              const image = serviceImages[key];

              return (
                <Link
                  key={key}
                  href={`/${lang}/${serviceLinks[key]}`}
                  className="group relative overflow-hidden bg-surface border border-border hover:border-accent/30 transition-all duration-500 cursor-pointer"
                >
                  {/* Image — all same aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-700 brightness-[0.55] group-hover:brightness-[0.85]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="w-4 h-4 text-accent" />
                          <h3 className="text-sm font-medium text-foreground tracking-wide">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-xs text-muted/80 line-clamp-2 font-light leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="shrink-0 w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:text-accent-foreground transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
