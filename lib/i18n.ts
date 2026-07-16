export type Locale = "ru" | "en";

export const DEFAULT_LOCALE: Locale = "ru";

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

export function localizePath(path: string, locale: Locale): string {
  const [pathname, hash] = path.split("#");
  const russianPath = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname || "/";
  const localizedPath = locale === "en" ? (russianPath === "/" ? "/en" : `/en${russianPath}`) : russianPath;
  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

export const NAVIGATION_LABELS: Record<Locale, Record<string, string>> = {
  ru: {
    "/": "Главная",
    "/players": "Игроки",
    "/news": "Новости",
    "/#services": "Услуги",
    "/partners": "Партнёры",
    "/faq": "Вопросы",
    "/contacts": "Контакты",
  },
  en: {
    "/": "Home",
    "/players": "Players",
    "/news": "News",
    "/#services": "Services",
    "/partners": "Partners",
    "/faq": "FAQ",
    "/contacts": "Contacts",
  },
};
