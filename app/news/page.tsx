import type { Metadata } from "next";
import NewsCard from "@/components/news/NewsCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { news } from "@/data/news";

export const metadata: Metadata = { title: "Новости" };

export default function NewsPage() {
  return <><PageHero eyebrow="PFA Journal" title="Новости" description="Трансферы, достижения и идеи, которые формируют современную футбольную карьеру." /><Container className="grid grid-cols-2 gap-8 py-24 max-md:grid-cols-1">{news.map((item) => <NewsCard item={item} key={item.id} />)}</Container></>;
}
