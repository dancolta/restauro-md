import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";
import { PortfolioGallery } from "@/components/gallery/portfolio-gallery";
import type { Metadata } from "next";

const BASE_URL = "https://restauro.md";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/portofoliu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.portfolioTitle,
    description: dict.seo.portfolioDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/portofoliu`,
      languages: {
        "ro": `${BASE_URL}/ro/portofoliu`,
        "ru": `${BASE_URL}/ru/portofoliu`,
        "x-default": `${BASE_URL}/ro/portofoliu`,
      },
    },
    openGraph: {
      title: dict.seo.portfolioTitle,
      description: dict.seo.portfolioDescription,
      url: `${BASE_URL}/${lang}/portofoliu`,
      type: "website",
    },
  };
}

export default async function PortfolioPage({
  params,
}: PageProps<"/[lang]/portofoliu">) {
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
        name: dict.gallery.title,
        item: `${BASE_URL}/${lang}/portofoliu`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="pt-20 lg:pt-24">
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
            {dict.gallery.title}
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            {dict.gallery.subtitle}
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGallery dict={dict} />
        </div>
      </section>
    </div>
    </>
  );
}
