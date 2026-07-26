import type { Metadata } from "next";
import NewsCard from "@/components/news/NewsCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getPublishedNews } from "@/data/news";
import { createPageMetadata } from "@/lib/metadata";
export const metadata: Metadata = createPageMetadata({ title: "News", description: "PFA news, transfers, player achievements and professional career insights.", path: "/en/news", keywords: ["football news", "transfers", "PFA news"] });
export const dynamic = "force-dynamic";
export default async function EnglishNewsPage() { const news = await getPublishedNews(); return <><PageHero eyebrow="PFA Journal" title="News" description="Transfers, achievements and ideas shaping the modern football career." /><Container className="grid grid-cols-3 gap-5 py-20 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:py-14">{news.length ? news.map((item) => <NewsCard item={item} locale="en" key={item.id} />) : <div className="col-span-full border border-white/10 bg-[#08111d] p-10 text-center text-sm text-slate-300">No published news yet.</div>}</Container></>; }
