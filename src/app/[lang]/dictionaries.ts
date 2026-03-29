import "server-only";

const dictionaries = {
  ro: () => import("./dictionaries/ro.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ro"]>>;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
