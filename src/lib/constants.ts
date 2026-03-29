export const BASE_URL = "https://restauro.md";

export const SITE = {
  name: "Restauro.md",
  phone: "+373 69 619 000",
  email: "info@restauro.md",
  address: "Strada Nicolae Milescu Spătaru 30, MD-2075, Chișinău",
  hours: {
    weekdays: "08:00 – 18:00",
    saturday: "10:00 – 16:00",
    sunday: null,
  },
  social: {
    instagram: "https://www.instagram.com/restauro.md/",
    facebook: "https://www.facebook.com/restauro.md",
    tiktok: "https://www.tiktok.com/@restauro.md",
  },
  coordinates: {
    lat: 47.0643457,
    lng: 28.8984936,
  },
} as const;

export const LOCALES = ["ro", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ro";
