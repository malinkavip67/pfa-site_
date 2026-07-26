"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { AdminPlayerRecord } from "@/types/admin-content";

interface Props { players: AdminPlayerRecord[]; }

export default function AdminPlayersList({ players }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PUBLISHED" | "HIDDEN">("ALL");
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return players
      .filter((player) => filter === "ALL" || (filter === "PUBLISHED" ? player.isPublished : !player.isPublished))
      .filter((player) => !term || `${player.firstName} ${player.lastName} ${player.slug}`.toLowerCase().includes(term))
      .sort((left, right) => left.sortOrder - right.sortOrder || right.createdAt.localeCompare(left.createdAt));
  }, [filter, players, search]);

  return (
    <div>
      <Card as="div" className="grid grid-cols-[1fr_220px] gap-4 bg-[#081321] p-5 max-sm:grid-cols-1">
        <label>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Поиск</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Имя или slug" className="h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent" />
        </label>
        <label>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Публикация</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent">
            <option value="ALL">Все</option><option value="PUBLISHED">Опубликованные</option><option value="HIDDEN">Скрытые</option>
          </select>
        </label>
      </Card>
      <div className="mt-5 grid gap-3">
        {visible.length === 0 ? (
          <Card as="div" className="p-8 text-center"><Typography variant="bodyLarge">Игроки не найдены.</Typography></Card>
        ) : visible.map((player) => (
          <Link href={`/admin/players/${player.id}`} key={player.id} className="grid grid-cols-[1fr_auto] items-center gap-5 border border-white/10 bg-[#081321] p-5 transition-colors hover:border-pfa-accent/60">
            <div className="min-w-0">
              <Typography as="h2" variant="bodyLarge" className="truncate text-white">{player.firstName} {player.lastName}</Typography>
              <Typography variant="caption" className="mt-2">{player.slug} · порядок {player.sortOrder}</Typography>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-[.12em] ${player.isPublished ? "text-pfa-accent" : "text-slate-400"}`}>{player.isPublished ? "Опубликован" : "Скрыт"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
