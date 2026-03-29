import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/forms/contact-form";
import type { Metadata } from "next";

const BASE_URL = "https://restauro.md";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.contactTitle,
    description: dict.seo.contactDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/contact`,
      languages: {
        "ro": `${BASE_URL}/ro/contact`,
        "ru": `${BASE_URL}/ru/contact`,
        "x-default": `${BASE_URL}/ro/contact`,
      },
    },
    openGraph: {
      title: dict.seo.contactTitle,
      description: dict.seo.contactDescription,
      url: `${BASE_URL}/${lang}/contact`,
      type: "website",
    },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.seo.breadcrumbHome,
        item: `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.contact.title,
        item: `${BASE_URL}/${lang}/contact`,
      },
    ],
  };

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: dict.contact.title,
    description: dict.seo.contactDescription,
    url: `${BASE_URL}/${lang}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "Restauro.md",
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Strada Nicolae Milescu Spătaru 30",
        postalCode: "MD-2075",
        addressLocality: "Chișinău",
        addressCountry: "MD",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
    <div className="pt-20 lg:pt-24">
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {dict.common.backToHome}
            </Link>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="luxury-divider" />
            </div>
            <h1 className="text-3xl sm:text-5xl">
              {dict.contact.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted font-light max-w-2xl mx-auto lg:mx-0">
              {dict.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-surface border border-border p-6 sm:p-8">
                <ContactForm dict={dict} />
              </div>
            </div>

            {/* Contact Info + Map */}
            <div className="lg:col-span-2 space-y-8">
              {/* Info cards */}
              <div className="space-y-4">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-4 p-5 bg-surface border border-border hover:border-accent/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider mb-1">
                      {dict.contact.info.phone}
                    </div>
                    <div className="text-foreground font-medium group-hover:text-accent transition-colors">
                      {SITE.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-4 p-5 bg-surface border border-border hover:border-accent/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider mb-1">
                      {dict.contact.info.email}
                    </div>
                    <div className="text-foreground font-medium group-hover:text-accent transition-colors">
                      {SITE.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-surface border border-border">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider mb-1">
                      {dict.contact.info.address}
                    </div>
                    <div className="text-foreground font-medium">{SITE.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-surface border border-border">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider mb-1">
                      {dict.contact.info.hours}
                    </div>
                    <div className="text-sm text-foreground space-y-1">
                      <div>{dict.common.monday}–{dict.common.friday}: <span className="font-medium">{SITE.hours.weekdays}</span></div>
                      <div>{dict.common.saturday}: <span className="font-medium">{SITE.hours.saturday}</span></div>
                      <div>{dict.common.sunday}: <span className="font-medium text-accent">{dict.common.closed}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative aspect-[4/3] overflow-hidden border border-border">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720!2d${SITE.coordinates.lng}!3d${SITE.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d9eecb31a4f%3A0x8723c7e8e0ec1aba!2sRestauro!5e0!3m2!1sen!2smd!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
