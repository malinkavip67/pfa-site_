import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";

const DEFAULT_IMAGE = "/images/hero/hero-stadium.webp";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  image?: string;
}

export function createPageMetadata({ title, description, path, keywords, image = DEFAULT_IMAGE }: PageMetadataOptions): Metadata {
  const locale = getLocaleFromPathname(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path, languages: { ru: localizePath(path, "ru"), en: localizePath(path, "en") } },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [{ url: image, width: 1366, height: 768, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
