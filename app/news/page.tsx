import type { Metadata } from "next";
import NewsCard from "@/components/news/NewsCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getPublishedNews } from "@/data/news";
import { createPageMetadata } from "@/lib/metadata";
export const metadata: Metadata = createPageMetadata({ title: "Новости", description: "Новости PFA: трансферы, достижения игроков и профессиональный взгляд на развитие футбольной карьеры.", path: "/news", keywords: ["футбольные новости", "трансферы", "новости игроков", "PFA Journal"] });
export const dynamic = "force-dynamic";
export default async function NewsPage() { const news = await getPublishedNews(); return <><PageHero eyebrow="PFA Journal" title="Новости" description="Трансферы, достижения и идеи, которые формируют современную футбольную карьеру." /><Container className="grid grid-cols-3 gap-5 py-20 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:py-14">{news.length ? news.map((item) => <NewsCard item={item} key={item.id} />) : <div className="col-span-full border border-white/10 bg-[#08111d] p-10 text-center text-sm text-slate-300">Опубликованных новостей пока нет.</div>}</Container></>; }
