"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { AdminNewsRecord } from "@/types/admin-content";

interface Props { news: AdminNewsRecord[]; }

export default function AdminNewsList({ news }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return news.filter((item) => filter === "ALL" || (filter === "PUBLISHED" ? item.isPublished : !item.isPublished))
      .filter((item) => !term || `${item.title} ${item.slug}`.toLowerCase().includes(term));
  }, [filter, news, search]);

  return (
    <div>
      <Card as="div" className="grid grid-cols-[1fr_220px] gap-4 bg-[#081321] p-5 max-sm:grid-cols-1">
        <label><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Поиск</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Заголовок или slug" className="h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent" /></label>
        <label><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Статус</span><select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent"><option value="ALL">Все</option><option value="PUBLISHED">Опубликованные</option><option value="DRAFT">Черновики</option></select></label>
      </Card>
      <div className="mt-5 grid gap-3">
        {visible.length === 0 ? <Card as="div" className="p-8 text-center"><Typography variant="bodyLarge">Новости не найдены.</Typography></Card> : visible.map((item) => (
          <Link href={`/admin/news/${item.id}`} key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-5 border border-white/10 bg-[#081321] p-5 transition-colors hover:border-pfa-accent/60">
            <div className="min-w-0"><Typography as="h2" variant="bodyLarge" className="truncate text-white">{item.title}</Typography><Typography variant="caption" className="mt-2">{item.slug} · {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("ru-RU") : "без даты"}</Typography></div>
            <span className={`text-[10px] font-bold uppercase tracking-[.12em] ${item.isPublished ? "text-pfa-accent" : "text-slate-400"}`}>{item.isPublished ? "Опубликована" : "Черновик"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
