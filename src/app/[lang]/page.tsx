import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta-banner";
import { BeforeAfterShowcase } from "@/components/sections/before-after-showcase";
import { SITE } from "@/lib/constants";

const BASE_URL = "https://restauro.md";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Restauro.md",
    description: dict.meta.description,
    telephone: SITE.phone,
    email: SITE.email,
    url: BASE_URL,
    image: [
      `${BASE_URL}/images/hero/hero-main.jpg`,
      `${BASE_URL}/images/hero/restaurare_scaun_auto_piele.jpg`,
      `${BASE_URL}/images/hero/restaurare_canapea_piele.jpg`,
    ],
    logo: `${BASE_URL}/images/brand/Logo3.png`,
    priceRange: "$$",
    currenciesAccepted: "MDL, EUR",
    paymentAccepted: "Cash, Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Strada Nicolae Milescu Spătaru 30",
      postalCode: "MD-2075",
      addressLocality: "Chișinău",
      addressRegion: "Chișinău",
      addressCountry: "MD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.lat,
      longitude: SITE.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.tiktok,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "30",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: {
      "@type": "City",
      name: "Chișinău",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.title,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: dict.services.autoInterior.title,
            description: dict.services.autoInterior.description,
            url: `${BASE_URL}/${lang}/servicii/interior-auto`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: dict.services.furniture.title,
            description: dict.services.furniture.description,
            url: `${BASE_URL}/${lang}/servicii/mobila`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: dict.services.clothing.title,
            description: dict.services.clothing.description,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: dict.services.footwear.title,
            description: dict.services.footwear.description,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: dict.services.accessories.title,
            description: dict.services.accessories.description,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: dict.services.cleaning.title,
            description: dict.services.cleaning.description,
          },
        },
      ],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Restauro.md",
    url: BASE_URL,
    inLanguage: [lang === "ro" ? "ro-MD" : "ru-MD"],
    publisher: {
      "@id": `${BASE_URL}/#business`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero lang={lang} dict={dict} />
      <BeforeAfterShowcase dict={dict} />
      <ServicesGrid lang={lang} dict={dict} />
      <Process dict={dict} />
      <Testimonials dict={dict} />
      <CTABanner dict={dict} />
    </>
  );
}
