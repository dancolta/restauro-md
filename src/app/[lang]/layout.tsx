import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { LOCALES, SITE } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCTA } from "@/components/layout/floating-cta";
import "../globals.css";

const BASE_URL = "https://restauro.md";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.meta.title,
      template: `%s | Restauro.md`,
    },
    description: dict.meta.description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        "ro": `${BASE_URL}/ro`,
        "ru": `${BASE_URL}/ru`,
        "x-default": `${BASE_URL}/ro`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${BASE_URL}/${lang}`,
      locale: lang === "ro" ? "ro_MD" : "ru_MD",
      alternateLocale: lang === "ro" ? "ru_MD" : "ro_MD",
      type: "website",
      siteName: "Restauro.md",
      images: [
        {
          url: `${BASE_URL}/images/hero/hero-main.jpg`,
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${BASE_URL}/images/hero/hero-main.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {},
    other: {
      "geo.region": "MD-CU",
      "geo.placename": "Chisinau",
      "geo.position": `${SITE.coordinates.lat};${SITE.coordinates.lng}`,
      "ICBM": `${SITE.coordinates.lat}, ${SITE.coordinates.lng}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <FloatingCTA dict={dict} />
      </body>
    </html>
  );
}
