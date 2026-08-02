import type { MetadataRoute } from "next";
import { getPublishedNews } from "@/data/news";
import { getPlayers } from "@/data/players";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [players, news] = await Promise.all([getPlayers(), getPublishedNews()]);
  const staticPaths = ["", "/players", "/news", "/services", "/partners", "/faq", "/contacts", "/privacy", "/personal-data-consent", "/cookies"];
  const englishPaths = ["/en", "/en/players", "/en/news", "/en/services", "/en/partners", "/en/faq", "/en/contacts", "/en/privacy", "/en/personal-data-consent", "/en/cookies"];
  return [
    ...staticPaths.map((path, index) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: "weekly" as const, priority: index === 0 ? 1 : 0.7 })),
    ...englishPaths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...players.flatMap((player) => [
      { url: `${SITE_URL}/players/${player.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
      { url: `${SITE_URL}/en/players/${player.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    ]),
    ...news.flatMap((item) => [
      { url: `${SITE_URL}/news/${item.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
      { url: `${SITE_URL}/en/news/${item.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 },
    ]),
  ];
}
