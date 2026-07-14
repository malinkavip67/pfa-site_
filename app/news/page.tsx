import type { Metadata } from "next";
import NewsCard from "@/components/news/NewsCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { news } from "@/data/news";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Новости", description: "Новости PFA: трансферы, достижения игроков и профессиональный взгляд на развитие футбольной карьеры.", path: "/news", keywords: ["футбольные новости", "трансферы", "новости игроков", "PFA Journal"] });

export default function NewsPage() {
  return <><PageHero eyebrow="PFA Journal" title="Новости" description="Трансферы, достижения и идеи, которые формируют современную футбольную карьеру." /><Container className="grid grid-cols-3 gap-5 py-20 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:py-14">{news.map((item) => <NewsCard item={item} key={item.id} />)}</Container></>;
}
