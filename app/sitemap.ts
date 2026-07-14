import type { MetadataRoute } from "next";
import { players } from "@/data/players";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-13");
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/players`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/news`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/partners`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contacts`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
  const playerPages: MetadataRoute.Sitemap = players.map((player) => ({ url: `${SITE_URL}/players/${player.slug}`, lastModified, changeFrequency: "monthly", priority: 0.8 }));
  return [...staticPages, ...playerPages];
}
