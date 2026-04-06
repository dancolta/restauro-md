import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowLeft, Check } from "lucide-react";
import { getDictionary, hasLocale } from "../../dictionaries";
import { SITE } from "@/lib/constants";
import { BeforeAfter } from "@/components/gallery/before-after";
import type { Metadata } from "next";

const BASE_URL = "https://restauro.md";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/servicii/interior-auto">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.autoInteriorTitle,
    description: dict.seo.autoInteriorDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/servicii/interior-auto`,
      languages: {
        "ro": `${BASE_URL}/ro/servicii/interior-auto`,
        "ru": `${BASE_URL}/ru/servicii/interior-auto`,
        "x-default": `${BASE_URL}/ro/servicii/interior-auto`,
      },
    },
    openGraph: {
      title: dict.seo.autoInteriorTitle,
      description: dict.seo.autoInteriorDescription,
      url: `${BASE_URL}/${lang}/servicii/interior-auto`,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/hero/restaurare_scaun_auto_piele.jpg`,
          width: 1200,
          height: 630,
          alt: dict.services.autoInterior.title,
        },
      ],
    },
  };
}

export default async function AutoInteriorPage({
  params,
}: PageProps<"/[lang]/servicii/interior-auto">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const service = dict.services.autoInterior;

  const galleryItems = [
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
        name: dict.nav.services,
        item: `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${BASE_URL}/${lang}/servicii/interior-auto`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/${lang}/servicii/interior-auto`,
    image: `${BASE_URL}/images/hero/restaurare_scaun_auto_piele.jpg`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "Restauro.md",
    },
    areaServed: {
      "@type": "City",
      name: "Chișinău",
    },
    serviceType: "Leather Restoration",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/restaurare_scaun_auto_piele.jpg"
            alt={dict.seo.heroImageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 w-full">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {dict.common.backToHome}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Description + Features */}
            <div>
              <p className="text-lg text-muted leading-relaxed">
                {service.longDescription}
              </p>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-accent-hover transition-all rounded"
                >
                  <Phone className="w-5 h-5" />
                  {dict.services.requestQuote}
                </a>
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-6">
              {galleryItems.map((item, index) => (
                <BeforeAfter
                  key={index}
                  before={item.before}
                  after={item.after}
                  alt={item.alt}
                  beforeLabel={dict.gallery.before}
                  afterLabel={dict.gallery.after}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
