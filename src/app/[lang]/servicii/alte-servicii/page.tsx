import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowLeft, Shirt, Footprints, Watch, Sparkles } from "lucide-react";
import { getDictionary, hasLocale } from "../../dictionaries";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

const BASE_URL = "https://restauro.md";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/servicii/alte-servicii">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.otherServicesTitle,
    description: dict.seo.otherServicesDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/servicii/alte-servicii`,
      languages: {
        "ro": `${BASE_URL}/ro/servicii/alte-servicii`,
        "ru": `${BASE_URL}/ru/servicii/alte-servicii`,
        "x-default": `${BASE_URL}/ro/servicii/alte-servicii`,
      },
    },
    openGraph: {
      title: dict.seo.otherServicesTitle,
      description: dict.seo.otherServicesDescription,
      url: `${BASE_URL}/${lang}/servicii/alte-servicii`,
      type: "website",
    },
  };
}

const services = [
  { key: "clothing" as const, icon: Shirt, image: "/images/services/clothing.jpg", anchor: "imbracaminte" },
  { key: "footwear" as const, icon: Footprints, image: "/images/services/footwear.jpg", anchor: "incaltaminte" },
  { key: "accessories" as const, icon: Watch, image: "/images/services/accessories.jpg", anchor: "accesorii" },
  { key: "cleaning" as const, icon: Sparkles, image: "/images/services/cleaning.jpg", anchor: "curatare" },
];

export default async function OtherServicesPage({
  params,
}: PageProps<"/[lang]/servicii/alte-servicii">) {
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
        name: dict.nav.services,
        item: `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dict.nav.otherServices,
        item: `${BASE_URL}/${lang}/servicii/alte-servicii`,
      },
    ],
  };

  const serviceItemsJsonLd = services.map((svc) => {
    const svcData = dict.services[svc.key] as { title: string; description: string };
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: svcData.title,
      description: svcData.description,
      url: `${BASE_URL}/${lang}/servicii/alte-servicii#${svc.anchor}`,
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
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceItemsJsonLd) }}
      />
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {dict.common.backToHome}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {dict.nav.otherServices}
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((svc, index) => {
            const Icon = svc.icon;
            const service = dict.services[svc.key] as { title: string; description: string };
            const isReversed = index % 2 === 1;

            return (
              <div
                key={svc.key}
                id={svc.anchor}
                className="scroll-mt-24"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                  {/* Image */}
                  <div className={`relative aspect-[4/3] overflow-hidden ${isReversed ? "lg:order-2" : ""}`}>
                    <Image
                      src={svc.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className={isReversed ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-lg text-muted leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-8">
                      <a
                        href={`tel:${SITE.phone}`}
                        className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 text-sm tracking-[0.1em] uppercase font-medium hover:bg-accent-hover transition-all rounded"
                      >
                        <Phone className="w-4 h-4" />
                        {dict.services.requestQuote}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < services.length - 1 && (
                  <div className="mt-16 border-t border-border" />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
    </>
  );
}
