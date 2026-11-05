"use client";

import { ChevronDown, ChevronUp, Clipboard, Download, ExternalLink, FileCheck2, Link2, Plus, RotateCcw, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { SITE_URL } from "@/lib/constants";
import type { AdminPlayerRecord } from "@/types/admin-content";
import type { PlayerQuestionnaireRecord, PlayerQuestionnaireStatus } from "@/types/player-questionnaire";

interface Props { initialQuestionnaires: PlayerQuestionnaireRecord[]; players: AdminPlayerRecord[]; }
const STATUS_LABELS: Record<PlayerQuestionnaireStatus, string> = { INVITED: "Ссылка создана", SUBMITTED: "На проверке", NEEDS_CLARIFICATION: "Нужно уточнение", CONFIRMED: "Подтверждена" };
const STATUS_STYLES: Record<PlayerQuestionnaireStatus, string> = { INVITED: "text-slate-300 bg-slate-400/10", SUBMITTED: "text-blue-300 bg-blue-400/10", NEEDS_CLARIFICATION: "text-amber-300 bg-amber-400/10", CONFIRMED: "text-emerald-300 bg-emerald-400/10" };

export default function PlayerQuestionnairesDashboard({ initialQuestionnaires, players }: Props) {
  const [items, setItems] = useState(initialQuestionnaires);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | PlayerQuestionnaireStatus>("ALL");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [linkedPlayerId, setLinkedPlayerId] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const visible = useMemo(() => filter === "ALL" ? items : items.filter((item) => item.status === filter), [filter, items]);
  const counts = useMemo(() => ({ submitted: items.filter((item) => item.status === "SUBMITTED").length, confirmed: items.filter((item) => item.status === "CONFIRMED").length }), [items]);

  const createInvite = async () => {
    setBusy("create"); setMessage("");
    try {
      const response = await fetch("/api/admin/player-questionnaires", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ linkedPlayerId: linkedPlayerId || null }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось создать ссылку.");
      setInviteUrl(result.url);
      const player = players.find((item) => item.id === linkedPlayerId);
      setItems((current) => [{ id: result.id, token: result.token, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), submittedAt: null, confirmedAt: null, status: "INVITED", fullName: null, birthDate: null, citizenship: null, height: null, weight: null, preferredFoot: null, positions: [], clubs: null, videoLinks: [], transfermarktUrl: null, achievements: null, individualFeatures: null, contact: null, consent: false, photoMimeType: null, photoFileName: null, photoSize: null, linkedPlayerId: linkedPlayerId || null, linkedPlayerName: player ? `${player.lastName} ${player.firstName}` : null, hasPhoto: false }, ...current]);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось создать ссылку."); }
    finally { setBusy(null); }
  };

  const copy = async (url: string) => { await navigator.clipboard.writeText(url); setMessage("Ссылка скопирована."); };
  const remove = async (item: PlayerQuestionnaireRecord) => {
    const label = item.fullName || item.linkedPlayerName || "эту анкету";
    if (!window.confirm(`Удалить ${label}? Карточка игрока в CRM, если она уже создана, останется без изменений.`)) return;
    setBusy(item.id); setMessage("");
    try {
      const response = await fetch(`/api/admin/player-questionnaires/${item.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось удалить анкету.");
      setItems((current) => current.filter((currentItem) => currentItem.id !== item.id));
      setExpanded((current) => current === item.id ? null : current);
      setMessage("Анкета удалена. Карточка игрока в CRM не изменена.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось удалить анкету."); }
    finally { setBusy(null); }
  };
  const update = async (id: string, action: "confirm" | "needs_clarification") => {
    setBusy(id); setMessage("");
    try {
      const response = await fetch(`/api/admin/player-questionnaires/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.message || "Не удалось сохранить.");
      setItems((current) => current.map((item) => item.id === id ? { ...item, status: result.status, confirmedAt: result.status === "CONFIRMED" ? new Date().toISOString() : item.confirmedAt, linkedPlayerId: result.playerId ?? item.linkedPlayerId } : item));
      setMessage(result.status === "CONFIRMED" ? "Анкета подтверждена и перенесена в карточку игрока." : "Анкета отмечена для уточнения.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось сохранить."); }
    finally { setBusy(null); }
  };

  return <div className="min-h-[calc(100vh-72px)] bg-[#050b14] px-5 py-10 text-white md:px-8 lg:px-10">
    <div className="mx-auto max-w-[1440px]">
      <header className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-sm font-bold text-[#39d873]">PFA CRM</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-.04em]">Анкеты игроков</h1><p className="mt-2 text-base text-slate-400">Персональные ссылки, проверка данных и PDF после подтверждения</p></div><button type="button" onClick={() => { setInviteOpen(true); setInviteUrl(""); setMessage(""); }} className="inline-flex min-h-14 items-center gap-2 bg-[#00b846] px-6 text-sm font-extrabold hover:bg-[#00a63e]"><Plus size={20} />Создать ссылку</button></header>
      <div className="mt-8 grid gap-4 sm:grid-cols-3"><Summary label="Всего анкет" value={items.length} /><Summary label="Ждут проверки" value={counts.submitted} warning={counts.submitted > 0} /><Summary label="Подтверждены" value={counts.confirmed} /></div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 bg-[#0c1726] p-4"><p className="text-sm text-slate-400">Фотографии сжимаются до 320 КБ. Видео хранятся только ссылками.</p><label className="flex items-center gap-3 text-sm text-slate-400">Статус<select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="crm-input min-w-48"><option value="ALL">Все</option>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
      {message && <p className="mt-4 bg-white/5 px-4 py-3 text-sm text-slate-200">{message}</p>}
      <div className="mt-5 space-y-3">{visible.length === 0 ? <div className="bg-[#0c1726] p-12 text-center"><p className="text-xl font-bold">Анкет пока нет</p><p className="mt-2 text-sm text-slate-400">Создайте ссылку и отправьте её футболисту.</p></div> : visible.map((item) => {
        const publicUrl = `${SITE_URL}/player-questionnaire/${item.token}`;
        return <article key={item.id} className="bg-[#0c1726]"><div className="grid gap-4 p-5 md:grid-cols-[minmax(240px,1fr)_180px_170px_auto] md:items-center"><div><p className="font-extrabold">{item.fullName || item.linkedPlayerName || "Новая анкета"}</p><p className="mt-1 text-xs text-slate-400">Создана {formatDate(item.createdAt)}{item.linkedPlayerName ? ` · привязана к ${item.linkedPlayerName}` : ""}</p></div><span className={`w-fit px-3 py-2 text-xs font-bold ${STATUS_STYLES[item.status]}`}>{STATUS_LABELS[item.status]}</span><span className="text-xs text-slate-400">{item.photoSize ? `Фото ${Math.ceil(item.photoSize / 1024)} КБ` : "Без фотографии"}</span><div className="flex flex-wrap justify-end gap-2"><button type="button" onClick={() => void copy(publicUrl)} className="inline-flex min-h-11 items-center gap-2 bg-[#00b846] px-4 text-xs font-extrabold text-white" aria-label="Скопировать ссылку"><Clipboard size={17} />Скопировать ссылку</button><button type="button" disabled={busy === item.id} onClick={() => void remove(item)} className="inline-flex min-h-11 items-center gap-2 bg-red-500/10 px-4 text-xs font-bold text-red-300 disabled:opacity-50" aria-label="Удалить анкету"><Trash2 size={17} />Удалить</button><button type="button" onClick={() => setExpanded((current) => current === item.id ? null : item.id)} className="grid size-11 place-items-center bg-white/5 text-slate-300" aria-label="Подробнее">{expanded === item.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button></div></div>
        {expanded === item.id && <div className="border-t border-white/10 p-5 md:p-6"><div className="grid gap-6 lg:grid-cols-[180px_1fr]"><div>{item.hasPhoto ? <Image unoptimized width={180} height={225} src={`/api/player-questionnaires/${item.token}/photo`} alt={item.fullName ?? "Фотография игрока"} className="aspect-[4/5] w-full object-cover" /> : <div className="grid aspect-[4/5] place-items-center bg-[#050b14] text-sm text-slate-500">Нет фото</div>}</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><Datum label="Дата рождения" value={formatDate(item.birthDate)} /><Datum label="Гражданство" value={item.citizenship} /><Datum label="Антропометрия" value={item.height && item.weight ? `${item.height} см · ${item.weight} кг` : null} /><Datum label="Рабочая нога" value={item.preferredFoot} /><Datum label="Позиции" value={item.positions.join(", ")} /><Datum label="Контакт" value={item.contact} /><Datum label="Клубы" value={item.clubs} wide /><Datum label="Достижения" value={item.achievements} wide /><Datum label="Индивидуальные особенности" value={item.individualFeatures} wide />{item.videoLinks.length > 0 && <div className="sm:col-span-2 lg:col-span-3"><p className="text-xs text-slate-500">Видео</p><div className="mt-2 flex flex-wrap gap-2">{item.videoLinks.map((url, index) => <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200"><ExternalLink size={14} />Видео {index + 1}</a>)}</div></div>}{item.transfermarktUrl && <a href={item.transfermarktUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#39d873]"><Link2 size={16} />Transfermarkt</a>}</div></div>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">{["SUBMITTED", "NEEDS_CLARIFICATION"].includes(item.status) && <><button type="button" disabled={busy === item.id} onClick={() => void update(item.id, "confirm")} className="inline-flex min-h-12 items-center gap-2 bg-[#00b846] px-5 text-sm font-extrabold disabled:opacity-50"><FileCheck2 size={18} />Подтвердить и перенести в CRM</button><button type="button" disabled={busy === item.id} onClick={() => void update(item.id, "needs_clarification")} className="inline-flex min-h-12 items-center gap-2 bg-white/5 px-5 text-sm font-bold text-slate-200"><RotateCcw size={18} />Нужно уточнение</button></>}{item.status === "CONFIRMED" && <a href={`/api/admin/player-questionnaires/${item.id}/pdf`} className="inline-flex min-h-12 items-center gap-2 bg-white px-5 text-sm font-extrabold text-[#050b14]"><Download size={18} />Выгрузить PDF</a>}<button type="button" onClick={() => void copy(publicUrl)} className="inline-flex min-h-12 items-center gap-2 bg-white/5 px-5 text-sm font-bold text-slate-200"><Clipboard size={18} />Копировать ссылку</button></div></div>}
      </article>; })}</div>
    </div>
    {inviteOpen && <div className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4"><div className="w-full max-w-xl bg-[#0c1726] p-6"><div className="flex items-start justify-between"><div><h2 className="text-2xl font-extrabold">Новая ссылка на анкету</h2><p className="mt-2 text-sm text-slate-400">Можно привязать ссылку к существующему игроку или оставить общей.</p></div><button onClick={() => setInviteOpen(false)} className="grid size-10 place-items-center bg-white/5" aria-label="Закрыть"><X size={18} /></button></div>{inviteUrl ? <div className="mt-6"><label className="block text-sm font-bold">Готовая ссылка</label><div className="mt-2 flex flex-col gap-2 sm:flex-row"><input readOnly value={inviteUrl} className="crm-input min-w-0 flex-1" /><button onClick={() => void copy(inviteUrl)} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#00b846] px-4 text-sm font-extrabold" aria-label="Скопировать ссылку"><Clipboard size={18} />Скопировать ссылку</button></div><button onClick={() => setInviteOpen(false)} className="mt-5 min-h-12 bg-white/5 px-5 text-sm font-bold">Закрыть</button></div> : <div className="mt-6"><label className="block text-sm font-bold">Игрок в CRM — необязательно</label><select value={linkedPlayerId} onChange={(event) => setLinkedPlayerId(event.target.value)} className="crm-input mt-2"><option value="">Новый игрок / без привязки</option>{players.map((player) => <option key={player.id} value={player.id}>{player.lastName} {player.firstName}</option>)}</select><button disabled={busy === "create"} onClick={() => void createInvite()} className="mt-5 inline-flex min-h-12 items-center gap-2 bg-[#00b846] px-5 text-sm font-extrabold disabled:opacity-50"><Link2 size={18} />{busy === "create" ? "Создаём…" : "Создать ссылку"}</button></div>}</div></div>}
  </div>;
}

function Summary({ label, value, warning = false }: { label: string; value: number; warning?: boolean }) { return <div className="bg-[#0c1726] px-5 py-4"><p className="text-xs text-slate-400">{label}</p><p className={`mt-1 text-2xl font-extrabold ${warning ? "text-amber-300" : "text-white"}`}>{value}</p></div>; }
function Datum({ label, value, wide = false }: { label: string; value: string | null | undefined; wide?: boolean }) { return <div className={wide ? "sm:col-span-2 lg:col-span-3" : ""}><p className="text-xs text-slate-500">{label}</p><p className="mt-1 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-200">{value || "—"}</p></div>; }
function formatDate(value: string | null) { if (!value) return "—"; return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Moscow" }).format(new Date(value)); }
