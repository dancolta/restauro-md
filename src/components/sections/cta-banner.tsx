import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/forms/contact-form";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface CTABannerProps {
  dict: Dictionary;
}

export function CTABanner({ dict }: CTABannerProps) {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt=""
          fill
          className="object-cover brightness-[0.15]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080706]/90 via-[#080706]/70 to-[#080706]/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: headline + trust signals */}
          <AnimateOnScroll>
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="hidden lg:inline text-xs tracking-[0.3em] uppercase text-accent font-medium">
                  {dict.nav.contact}
                </span>
                <div className="luxury-divider" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl">
                {dict.services.requestQuote}
              </h2>
              <p className="mt-5 text-base text-muted font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                {dict.process.step1.description}
              </p>

              {/* Quick contact */}
              <div className="flex justify-center lg:justify-start mt-10">
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-300 cursor-pointer group"
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-accent/40 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-muted">{dict.contact.info.phone}</div>
                    <div className="text-sm font-medium text-left">{SITE.phone}</div>
                  </div>
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: premium form card */}
          <AnimateOnScroll delay={0.2}>
            <div className="bg-surface/80 backdrop-blur-sm border border-border/50 p-8 lg:p-10">
              <div className="mb-6">
                <h3 className="text-lg font-serif font-light text-foreground text-center lg:text-left">{dict.contact.form.submit}</h3>
                <div className="luxury-divider mt-3 mx-auto lg:mx-0" />
              </div>
              <ContactForm dict={dict} />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
