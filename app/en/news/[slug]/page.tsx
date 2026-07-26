import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Typography from "@/components/ui/Typography";
import { getPublishedNewsBySlug } from "@/data/news";
import { createPageMetadata } from "@/lib/metadata";
interface Props { params: Promise<{ slug: string }>; }
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getPublishedNewsBySlug((await params).slug); return item ? createPageMetadata({ title: item.title, description: item.excerpt ?? item.content?.slice(0,160) ?? "", path: `/en/news/${item.slug}`, image: item.image, keywords: [item.title, "PFA news"] }) : { title: "News" }; }
export default async function EnglishNewsArticlePage({ params }: Props) { const item = await getPublishedNewsBySlug((await params).slug); if (!item) notFound(); return <><PageHero eyebrow={item.date || "PFA Journal"} title={item.title} description={item.excerpt ?? ""} /><Container className="py-20 max-md:py-14"><article className="mx-auto max-w-4xl border border-white/10 bg-[#08111d] p-10 max-sm:p-6"><Typography variant="bodyLarge" className="whitespace-pre-wrap text-slate-200">{item.content}</Typography></article></Container></>; }
