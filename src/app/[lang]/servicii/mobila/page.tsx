import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowLeft, Check } from "lucide-react";
import { getDictionary, hasLocale } from "../../dictionaries";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

const BASE_URL = "https://restauro.md";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/servicii/mobila">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.furnitureTitle,
    description: dict.seo.furnitureDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/servicii/mobila`,
      languages: {
        "ro": `${BASE_URL}/ro/servicii/mobila`,
        "ru": `${BASE_URL}/ru/servicii/mobila`,
        "x-default": `${BASE_URL}/ro/servicii/mobila`,
      },
    },
    openGraph: {
      title: dict.seo.furnitureTitle,
      description: dict.seo.furnitureDescription,
      url: `${BASE_URL}/${lang}/servicii/mobila`,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/hero/restaurare_canapea_piele.jpg`,
          width: 1200,
          height: 630,
          alt: dict.services.furniture.title,
        },
      ],
    },
  };
}

export default async function FurniturePage({
  params,
}: PageProps<"/[lang]/servicii/mobila">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const service = dict.services.furniture;

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
        item: `${BASE_URL}/${lang}/servicii/mobila`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/${lang}/servicii/mobila`,
    image: `${BASE_URL}/images/hero/restaurare_canapea_piele.jpg`,
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
            src="/images/hero/restaurare_canapea_piele.jpg"
            alt={dict.seo.furnitureImageAlt}
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
            <div>
              <p className="text-lg text-muted leading-relaxed">
                {service.longDescription}
              </p>

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

            {/* Hero image as standalone since we don't have furniture before/after pairs */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/hero/restaurare_canapea_din_piele.jpg"
                alt={dict.seo.furnitureDetailImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
