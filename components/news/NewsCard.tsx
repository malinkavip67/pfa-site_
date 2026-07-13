import Image from "next/image";
import type { NewsItem } from "@/types/news";

interface Props { item: NewsItem; }

export default function NewsCard({ item }: Props) {
  return <article className="group"><div className="relative aspect-[16/10] overflow-hidden bg-[#0C1726]"><Image src={item.image} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" alt={item.title} /></div><span className="mt-6 block text-[10px] tracking-wider text-[#22C55E]">{item.date}</span><h2 className="font-display mt-2 text-4xl uppercase">{item.title}</h2><p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">{item.excerpt}</p></article>;
}
