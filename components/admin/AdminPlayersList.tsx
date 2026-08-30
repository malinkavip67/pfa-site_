"use client";

import { CalendarClock, CircleAlert, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { AdminPlayerRecord } from "@/types/admin-content";

interface Props { players: AdminPlayerRecord[]; }
type TrackingState = "CURRENT" | "EXPIRING" | "MISSING";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Moscow",
});

function trackingState(player: AdminPlayerRecord): TrackingState {
  if (!player.club || !player.clubContractUntil || !player.agencyContractUntil) return "MISSING";
  const warningDate = new Date();
  warningDate.setDate(warningDate.getDate() + 90);
  if (new Date(player.clubContractUntil) <= warningDate || new Date(player.agencyContractUntil) <= warningDate) return "EXPIRING";
  return "CURRENT";
}

const trackingLabels: Record<TrackingState, string> = {
  CURRENT: "Актуально", EXPIRING: "Скоро истекает", MISSING: "Заполнить",
};
const trackingStyles: Record<TrackingState, string> = {
  CURRENT: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  EXPIRING: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  MISSING: "border-amber-400/30 bg-amber-400/10 text-amber-300",
};

export default function AdminPlayersList({ players }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "ATTENTION" | "CURRENT">("ALL");
  const visible = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("ru-RU");
    return players
      .filter((player) => filter === "ALL" || (filter === "CURRENT" ? trackingState(player) === "CURRENT" : trackingState(player) !== "CURRENT"))
      .filter((player) => !term || [player.firstName, player.lastName, player.club ?? "", player.position ?? ""].some((value) => value.toLocaleLowerCase("ru-RU").includes(term)))
      .sort((left, right) => left.sortOrder - right.sortOrder || right.createdAt.localeCompare(left.createdAt));
  }, [filter, players, search]);
  const currentCount = players.filter((player) => trackingState(player) === "CURRENT").length;
  const attentionCount = players.length - currentCount;

  return (
    <div className="text-white [color-scheme:dark]">
      <div className="grid gap-4 sm:grid-cols-3">
        <Summary label="Всего игроков" value={players.length} />
        <Summary label="Контракты актуальны" value={currentCount} />
        <Summary label="Требуют внимания" value={attentionCount} warning={attentionCount > 0} />
      </div>
      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0c1726] p-4 md:flex-row md:items-center md:justify-between">
        <label className="relative block min-w-0 flex-1 md:max-w-md">
          <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <span className="sr-only">Поиск игрока</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Имя, клуб или позиция" className="h-12 w-full rounded-xl border border-white/10 bg-[#050b14] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-pfa-accent" />
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold text-slate-400">Контроль
          <select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="h-12 rounded-xl border border-white/10 bg-[#050b14] px-4 text-sm font-semibold text-white outline-none focus:border-pfa-accent">
            <option value="ALL">Все игроки</option><option value="ATTENTION">Требуют внимания</option><option value="CURRENT">Актуальные</option>
          </select>
        </label>
      </div>

      {visible.length === 0 ? <div className="mt-5 rounded-2xl border border-white/10 bg-[#0c1726] px-6 py-16 text-center"><p className="text-xl font-extrabold">Игроки не найдены</p></div> : <>
        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-white/10 bg-[#0c1726] lg:block">
          <table className="w-full border-collapse text-left"><thead><tr className="border-b border-white/10 text-xs font-bold text-slate-400">
            <th className="px-5 py-5">Игрок</th><th className="px-5 py-5">Клуб</th><th className="px-5 py-5">Контракт с клубом</th><th className="px-5 py-5">Договор с PFA</th><th className="px-5 py-5">Контроль</th><th className="px-5 py-5" />
          </tr></thead><tbody>{visible.map((player) => {
            const state = trackingState(player);
            return <tr className="border-b border-white/10 align-middle hover:bg-white/[.025]" key={player.id}>
              <td className="px-5 py-4"><div className="flex items-center gap-3">{player.photoUrl ? <img src={player.photoUrl} alt="" className="size-13 rounded-xl object-cover" /> : <span className="grid size-13 place-items-center rounded-xl bg-white/5 text-lg font-extrabold text-slate-400">{player.firstName.slice(0, 1)}{player.lastName.slice(0, 1)}</span>}<div><p className="font-bold">{player.firstName} {player.lastName}</p><p className="mt-1 text-xs text-slate-400">{player.position || "Позиция не указана"}</p></div></div></td>
              <td className="px-5 py-4 text-sm font-semibold text-slate-200">{player.club || "Не указан"}</td>
              <ContractCell value={player.clubContractUntil} />
              <ContractCell value={player.agencyContractUntil} />
              <td className="px-5 py-4"><span className={`inline-flex rounded-lg border px-3 py-2 text-xs font-bold ${trackingStyles[state]}`}>{trackingLabels[state]}</span></td>
              <td className="px-5 py-4 text-right"><Link href={`/admin/players/${player.id}`} className="inline-flex rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-slate-300 hover:border-pfa-accent hover:text-pfa-accent">Открыть</Link></td>
            </tr>;
          })}</tbody></table>
        </div>
        <div className="mt-5 grid gap-4 lg:hidden">{visible.map((player) => {
          const state = trackingState(player);
          return <article className="rounded-2xl border border-white/10 bg-[#0c1726] p-5" key={player.id}>
            <div className="flex items-center gap-3">{player.photoUrl ? <img src={player.photoUrl} alt="" className="size-14 rounded-xl object-cover" /> : <span className="grid size-14 place-items-center rounded-xl bg-white/5 font-extrabold text-slate-400">{player.firstName.slice(0, 1)}{player.lastName.slice(0, 1)}</span>}<div><h2 className="font-extrabold">{player.firstName} {player.lastName}</h2><p className="mt-1 text-xs text-slate-400">{player.position || "Позиция не указана"}</p></div></div>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2"><Datum label="Клуб" value={player.club || "Не указан"} /><Datum label="Контракт с клубом" value={formatDate(player.clubContractUntil)} /><Datum label="Договор с PFA" value={formatDate(player.agencyContractUntil)} /><div><dt className="text-xs text-slate-500">Контроль</dt><dd className="mt-2"><span className={`inline-flex rounded-lg border px-3 py-2 text-xs font-bold ${trackingStyles[state]}`}>{trackingLabels[state]}</span></dd></div></dl>
            <Link href={`/admin/players/${player.id}`} className="mt-5 flex min-h-12 items-center justify-center rounded-xl border border-white/10 text-xs font-bold text-slate-300">Открыть карточку</Link>
          </article>;
        })}</div>
      </>}
    </div>
  );
}

function formatDate(value: string | null | undefined) { return value ? dateFormatter.format(new Date(value)) : "Требует заполнения"; }
function ContractCell({ value }: { value: string | null | undefined }) {
  return <td className={`px-5 py-4 text-sm font-semibold ${value ? "text-slate-200" : "text-amber-300"}`}><span className="inline-flex items-center gap-2">{value ? <CalendarClock size={16} /> : <CircleAlert size={16} />}{formatDate(value)}</span></td>;
}
function Summary({ label, value, warning = false }: { label: string; value: number; warning?: boolean }) { return <div className="rounded-2xl border border-white/10 bg-[#0c1726] px-5 py-4"><p className="text-xs font-semibold text-slate-400">{label}</p><p className={`mt-1 text-2xl font-extrabold ${warning ? "text-amber-300" : "text-white"}`}>{value}</p></div>; }
function Datum({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 text-sm font-semibold text-slate-200">{value}</dd></div>; }
