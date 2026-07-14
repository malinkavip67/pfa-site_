import type { Metadata } from "next";
import NewsCard from "@/components/news/NewsCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { englishNews } from "@/data/english";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "News", description: "PFA news, transfers, player achievements and professional career insights.", path: "/en/news", keywords: ["football news", "transfers", "PFA news"] });

export default function EnglishNewsPage() {
  return <><PageHero eyebrow="PFA Journal" title="News" description="Transfers, achievements and ideas shaping the modern football career." /><Container className="grid grid-cols-3 gap-5 py-20 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:py-14">{englishNews.map((item) => <NewsCard item={item} key={item.id} />)}</Container></>;
}
