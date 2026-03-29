import { BeforeAfter } from "@/components/gallery/before-after";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ShowcaseProps {
  dict: Dictionary;
}

export function BeforeAfterShowcase({ dict }: ShowcaseProps) {
  const showcaseItems = [
    {
      before: "/images/gallery/scaun_auto_before.jpg",
      after: "/images/gallery/scaun_auto_after.jpg",
      alt: dict.seo.beforeAfterAutoSeatAlt,
    },
    {
      before: "/images/gallery/cotiera_before.jpg",
      after: "/images/gallery/cotiera_after.jpg",
      alt: dict.seo.beforeAfterArmrestAlt,
    },
  ];
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <AnimateOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="luxury-divider" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl">
              {dict.gallery.title}
            </h2>
            <p className="mt-6 text-muted text-base font-light">{dict.gallery.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {showcaseItems.map((item, index) => (
              <div key={index} className="group">
                <div className="relative brightness-[0.85] hover:brightness-100 transition-all duration-500">
                  <BeforeAfter
                    before={item.before}
                    after={item.after}
                    alt={item.alt}
                    beforeLabel={dict.gallery.before}
                    afterLabel={dict.gallery.after}
                  />
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
