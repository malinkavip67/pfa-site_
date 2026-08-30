"use client";

import { ChevronDown, ChevronUp, Mail, Phone, Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  APPLICATION_STATUSES,
  type ApplicationRecord,
  type ApplicationStatusValue,
  type ApplicationTypeValue,
} from "@/types/application";

interface Props { initialApplications: ApplicationRecord[]; }
interface NewApplicationForm {
  type: ApplicationTypeValue;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  story: string;
  internalNote: string;
}

const STATUS_LABELS: Record<ApplicationStatusValue, string> = {
  NEW: "Новая", IN_PROGRESS: "В работе", COMPLETED: "Завершена", ARCHIVED: "Архив",
};
const TYPE_LABELS: Record<ApplicationTypeValue, string> = { PLAYER: "Игрок", PARENT: "Родитель" };
const STATUS_STYLES: Record<ApplicationStatusValue, string> = {
  NEW: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  IN_PROGRESS: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  COMPLETED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  ARCHIVED: "border-slate-400/20 bg-slate-400/10 text-slate-300",
};
const emptyForm: NewApplicationForm = {
  type: "PLAYER", firstName: "", lastName: "", phone: "", email: "", story: "", internalNote: "",
};
const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Moscow" });
const timeFormatter = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow" });

export default function ApplicationsDashboard({ initialApplications }: Props) {
  const [applications, setApplications] = useState(initialApplications);
  const [statusFilter, setStatusFilter] = useState<"ALL" | ApplicationStatusValue>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>(
    Object.fromEntries(initialApplications.map((application) => [application.id, application.internalNote ?? ""])),
  );
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; type: "success" | "error"; message: string } | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newApplication, setNewApplication] = useState<NewApplicationForm>(emptyForm);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    if (!isCreateOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setIsCreateOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCreateOpen]);

  const visibleApplications = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("ru-RU");
    return applications.filter((application) => {
      if (statusFilter !== "ALL" && application.status !== statusFilter) return false;
      return !query || [application.firstName, application.lastName, application.phone, application.email]
        .some((value) => value.toLocaleLowerCase("ru-RU").includes(query));
    });
  }, [applications, searchQuery, statusFilter]);

  const counts = useMemo(() => ({
    all: applications.length,
    new: applications.filter((item) => item.status === "NEW").length,
    inProgress: applications.filter((item) => item.status === "IN_PROGRESS").length,
  }), [applications]);

  const savePatch = async (id: string, patch: Partial<{ status: ApplicationStatusValue; internalNote: string }>) => {
    setSavingId(id);
    setFeedback(null);
    try {
      const response = await fetch(`/api/applications/${encodeURIComponent(id)}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
      });
      if (response.status === 401) { window.location.assign("/admin/login"); return; }
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("application" in result)) {
        const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
          ? result.message : "Не удалось сохранить изменения.";
        throw new Error(message);
      }
      const updated = result.application as Pick<ApplicationRecord, "id" | "status" | "internalNote">;
      setApplications((current) => current.map((application) => application.id === id
        ? { ...application, status: updated.status, internalNote: updated.internalNote } : application));
      setNotes((current) => ({ ...current, [id]: updated.internalNote ?? "" }));
      setFeedback({ id, type: "success", message: "Сохранено" });
    } catch (error) {
      setFeedback({ id, type: "error", message: error instanceof Error ? error.message : "Не удалось сохранить изменения." });
    } finally { setSavingId(null); }
  };

  const changeStatus = (id: string, status: ApplicationStatusValue) => {
    setApplications((current) => current.map((application) => application.id === id ? { ...application, status } : application));
    void savePatch(id, { status });
  };

  const createApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    setCreateError("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newApplication, adminEntry: true, isAdult: true, consent: true, status: "NEW" }),
      });
      if (response.status === 401) { window.location.assign("/admin/login"); return; }
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("application" in result)) {
        const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
          ? result.message : "Не удалось добавить заявку.";
        throw new Error(message);
      }
      const application = result.application as ApplicationRecord;
      setApplications((current) => [application, ...current]);
      setNotes((current) => ({ ...current, [application.id]: application.internalNote ?? "" }));
      setNewApplication(emptyForm);
      setIsCreateOpen(false);
      setExpandedId(application.id);
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Не удалось добавить заявку.");
    } finally { setIsCreating(false); }
  };

  const statusSelect = (application: ApplicationRecord) => (
    <select
      aria-label={`Статус заявки ${application.firstName} ${application.lastName}`}
      value={application.status}
      disabled={savingId === application.id}
      onChange={(event) => changeStatus(application.id, event.target.value as ApplicationStatusValue)}
      className={`h-11 min-w-32 rounded-xl border px-3 text-sm font-semibold outline-none transition focus:border-[#00a63e] disabled:opacity-60 ${STATUS_STYLES[application.status]}`}
    >
      {APPLICATION_STATUSES.map((status) => <option value={status} key={status}>{STATUS_LABELS[status]}</option>)}
    </select>
  );

  const details = (application: ApplicationRecord) => (
    <div className="grid gap-6 border-t border-white/10 bg-black/15 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.72fr)]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Описание обращения</p>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-200">{application.story}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div><dt className="text-xs font-semibold text-slate-400">Подтверждение возраста</dt><dd className="mt-1 text-sm font-semibold text-slate-200">{application.isAdult ? "Получено" : "Не получено"}</dd></div>
          <div><dt className="text-xs font-semibold text-slate-400">Согласие на обработку данных</dt><dd className="mt-1 text-sm font-semibold text-slate-200">{application.consent ? "Получено" : "Не получено"}</dd></div>
        </dl>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-[.12em] text-slate-400" htmlFor={`note-${application.id}`}>Внутренняя заметка</label>
        <textarea id={`note-${application.id}`} rows={5} value={notes[application.id] ?? ""}
          onChange={(event) => setNotes((current) => ({ ...current, [application.id]: event.target.value }))}
          placeholder="Следующий шаг, итог звонка или напоминание"
          className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-[#050b14] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-pfa-accent focus:ring-2 focus:ring-emerald-400/10" />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className={`text-xs ${feedback?.id === application.id && feedback.type === "error" ? "text-red-600" : "text-emerald-700"}`}>
            {feedback?.id === application.id ? feedback.message : "Заметка видна только администраторам"}
          </span>
          <button type="button" disabled={savingId === application.id}
            onClick={() => void savePatch(application.id, { internalNote: notes[application.id] ?? "" })}
            className="rounded-xl bg-[#071b3a] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#0d2b57] disabled:opacity-60">
            {savingId === application.id ? "Сохраняю…" : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#050b14] px-5 py-10 text-white [color-scheme:dark] md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-pfa-accent">PFA CRM</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-.04em] text-white md:text-5xl">Заявки</h1><p className="mt-2 text-base text-slate-400">Все обращения с сайта и добавленные вручную</p></div>
          <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex min-h-14 items-center gap-2 rounded-xl bg-[#00b846] px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(0,184,70,.2)] transition hover:-translate-y-0.5 hover:bg-[#00a63e]">
            <Plus aria-hidden="true" size={20} />Добавить заявку
          </button>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[["Все заявки", counts.all], ["Новые", counts.new], ["В работе", counts.inProgress]].map(([label, value]) => (
            <div className="rounded-2xl border border-white/10 bg-[#0c1726] px-5 py-4 shadow-sm" key={label}><p className="text-xs font-semibold text-slate-400">{label}</p><p className="mt-1 text-2xl font-extrabold text-white">{value}</p></div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0c1726] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <label className="relative block min-w-0 flex-1 md:max-w-md">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><span className="sr-only">Поиск по заявкам</span>
            <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Имя, телефон или email"
              className="h-12 w-full rounded-xl border border-white/10 bg-[#050b14] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-pfa-accent focus:ring-2 focus:ring-emerald-400/10" />
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-400">Статус
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "ALL" | ApplicationStatusValue)} className="h-12 min-w-40 rounded-xl border border-white/10 bg-[#050b14] px-4 font-semibold text-white outline-none focus:border-pfa-accent">
              <option value="ALL">Все статусы</option>{APPLICATION_STATUSES.map((status) => <option value={status} key={status}>{STATUS_LABELS[status]}</option>)}
            </select>
          </label>
        </div>

        {visibleApplications.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#0c1726] px-6 py-16 text-center shadow-sm"><p className="text-xl font-extrabold text-white">Заявки не найдены</p><p className="mt-2 text-sm text-slate-400">Измените фильтр или добавьте новое обращение.</p></div>
        ) : <>
          <div className="mt-5 hidden overflow-hidden rounded-2xl border border-white/10 bg-[#0c1726] shadow-sm lg:block">
            <table className="w-full border-collapse text-left"><thead><tr className="border-b border-white/10 text-xs font-bold text-slate-400">
              <th className="px-5 py-5">Дата</th><th className="px-5 py-5">Заявитель</th><th className="px-5 py-5">Формат</th><th className="px-5 py-5">Контакты</th><th className="px-5 py-5">Статус</th><th className="px-5 py-5"><span className="sr-only">Подробнее</span></th>
            </tr></thead><tbody>{visibleApplications.map((application) => <ApplicationRows key={application.id} application={application} expanded={expandedId === application.id} onToggle={() => setExpandedId((current) => current === application.id ? null : application.id)} statusSelect={statusSelect(application)} details={details(application)} />)}</tbody></table>
          </div>
          <div className="mt-5 grid gap-4 lg:hidden">
            {visibleApplications.map((application) => <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1726] shadow-sm" key={application.id}>
              <div className="p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold text-slate-400">{dateFormatter.format(new Date(application.createdAt))} · {timeFormatter.format(new Date(application.createdAt))}</p><h2 className="mt-2 text-lg font-extrabold text-white">{application.firstName} {application.lastName}</h2><p className="mt-1 text-sm font-semibold text-pfa-accent">{TYPE_LABELS[application.type]}</p></div>{statusSelect(application)}</div>
                <div className="mt-5 grid gap-2 text-sm text-slate-300"><a href={`tel:${application.phone}`} className="flex items-center gap-2 font-semibold"><Phone size={15} />{application.phone}</a><a href={`mailto:${application.email}`} className="flex min-w-0 items-center gap-2"><Mail size={15} /><span className="truncate">{application.email}</span></a></div>
                <button type="button" onClick={() => setExpandedId((current) => current === application.id ? null : application.id)} className="mt-5 flex w-full items-center justify-between border-t border-white/10 pt-4 text-sm font-bold text-white">Подробнее{expandedId === application.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
              </div>{expandedId === application.id && details(application)}
            </article>)}
          </div>
        </>}
      </div>

      {isCreateOpen && <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-[#020817]/70 p-4 backdrop-blur-sm md:items-center" role="dialog" aria-modal="true" aria-labelledby="create-application-title">
        <form onSubmit={createApplication} className="my-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c1726] shadow-2xl">
          <div className="flex items-start justify-between border-b border-white/10 px-6 py-5"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-pfa-accent">PFA CRM</p><h2 id="create-application-title" className="mt-1 text-2xl font-extrabold text-white">Новая заявка</h2></div><button type="button" onClick={() => setIsCreateOpen(false)} className="grid size-10 place-items-center rounded-xl bg-white/5 text-slate-300 hover:bg-white/10" aria-label="Закрыть"><X aria-hidden="true" size={20} /></button></div>
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <FormField label="Кто обращается"><select value={newApplication.type} onChange={(event) => setNewApplication((current) => ({ ...current, type: event.target.value as ApplicationTypeValue }))} className="crm-input"><option value="PLAYER">Игрок</option><option value="PARENT">Родитель / представитель</option></select></FormField><div className="hidden sm:block" />
            <FormField label="Имя"><input required maxLength={100} value={newApplication.firstName} onChange={(event) => setNewApplication((current) => ({ ...current, firstName: event.target.value }))} className="crm-input" /></FormField>
            <FormField label="Фамилия"><input required maxLength={100} value={newApplication.lastName} onChange={(event) => setNewApplication((current) => ({ ...current, lastName: event.target.value }))} className="crm-input" /></FormField>
            <FormField label="Телефон"><input required maxLength={50} type="tel" value={newApplication.phone} onChange={(event) => setNewApplication((current) => ({ ...current, phone: event.target.value }))} className="crm-input" /></FormField>
            <FormField label="Email"><input required maxLength={254} type="email" value={newApplication.email} onChange={(event) => setNewApplication((current) => ({ ...current, email: event.target.value }))} className="crm-input" /></FormField>
            <FormField label="Описание обращения" className="sm:col-span-2"><textarea required maxLength={10_000} rows={4} value={newApplication.story} onChange={(event) => setNewApplication((current) => ({ ...current, story: event.target.value }))} className="crm-input min-h-28 resize-y py-3" /></FormField>
            <FormField label="Внутренняя заметка" className="sm:col-span-2"><textarea maxLength={10_000} rows={3} value={newApplication.internalNote} onChange={(event) => setNewApplication((current) => ({ ...current, internalNote: event.target.value }))} placeholder="Необязательно" className="crm-input min-h-24 resize-y py-3" /></FormField>
            {createError && <p className="sm:col-span-2 text-sm font-semibold text-red-600">{createError}</p>}
          </div>
          <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 bg-black/15 px-6 py-4"><button type="button" onClick={() => setIsCreateOpen(false)} className="min-h-12 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-bold text-slate-300 hover:border-white/20">Отмена</button><button type="submit" disabled={isCreating} className="min-h-12 rounded-xl bg-[#00b846] px-6 text-sm font-extrabold text-white hover:bg-[#00a63e] disabled:opacity-60">{isCreating ? "Добавляю…" : "Добавить заявку"}</button></div>
        </form>
      </div>}
    </div>
  );
}

function ApplicationRows({ application, expanded, onToggle, statusSelect, details }: { application: ApplicationRecord; expanded: boolean; onToggle: () => void; statusSelect: ReactNode; details: ReactNode; }) {
  return <><tr className="border-b border-white/10 align-top transition hover:bg-white/[.025]">
    <td className="whitespace-nowrap px-5 py-5 text-sm font-semibold text-white">{dateFormatter.format(new Date(application.createdAt))}<span className="mt-1 block text-xs font-normal text-slate-400">{timeFormatter.format(new Date(application.createdAt))}</span></td>
    <td className="px-5 py-5"><p className="font-bold text-white">{application.firstName} {application.lastName}</p><a className="mt-1 block text-xs text-slate-400 hover:text-pfa-accent" href={`mailto:${application.email}`}>{application.email}</a></td>
    <td className="px-5 py-5 text-sm font-semibold text-slate-300">{TYPE_LABELS[application.type]}</td>
    <td className="px-5 py-5"><a href={`tel:${application.phone}`} className="text-sm font-bold text-white hover:text-pfa-accent">{application.phone}</a><span className="mt-1 block text-xs text-slate-400">Форма сайта</span></td>
    <td className="px-5 py-4">{statusSelect}</td><td className="px-5 py-4 text-right"><button type="button" onClick={onToggle} className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-pfa-accent hover:text-pfa-accent" aria-label={expanded ? "Скрыть подробности" : "Показать подробности"}>{expanded ? <ChevronUp size={19} /> : <ChevronDown size={19} />}</button></td>
  </tr>{expanded && <tr><td colSpan={6}>{details}</td></tr>}</>;
}

function FormField({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-xs font-bold text-slate-300">{label}</span>{children}</label>;
}
