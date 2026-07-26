"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import {
  APPLICATION_STATUSES,
  type ApplicationRecord,
  type ApplicationStatusValue,
} from "@/types/application";

interface Props {
  initialApplications: ApplicationRecord[];
}

const STATUS_LABELS: Record<ApplicationStatusValue, string> = {
  NEW: "Новая",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершена",
  ARCHIVED: "Архив",
};

const TYPE_LABELS = {
  PLAYER: "Игрок",
  PARENT: "Родитель",
} as const;

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Moscow",
});

export default function ApplicationsDashboard({ initialApplications }: Props) {
  const [applications, setApplications] = useState(initialApplications);
  const [statusFilter, setStatusFilter] = useState<"ALL" | ApplicationStatusValue>("ALL");
  const [drafts, setDrafts] = useState<Record<string, { status: ApplicationStatusValue; internalNote: string }>>(
    Object.fromEntries(
      initialApplications.map((application) => [
        application.id,
        { status: application.status, internalNote: application.internalNote ?? "" },
      ]),
    ),
  );
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; type: "success" | "error"; message: string } | null>(null);

  const visibleApplications = useMemo(
    () => applications.filter((application) => statusFilter === "ALL" || application.status === statusFilter),
    [applications, statusFilter],
  );

  const updateDraft = (id: string, patch: Partial<{ status: ApplicationStatusValue; internalNote: string }>) => {
    setDrafts((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }));
  };

  const saveApplication = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;

    setSavingId(id);
    setFeedback(null);

    try {
      const response = await fetch(`/api/applications/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (response.status === 401) {
        window.location.assign("/admin/login");
        return;
      }

      const result: unknown = await response.json();

      if (
        !response.ok
        || !result
        || typeof result !== "object"
        || !("application" in result)
      ) {
        const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
          ? result.message
          : "Не удалось сохранить изменения.";
        throw new Error(message);
      }

      const updated = result.application as Pick<ApplicationRecord, "id" | "status" | "internalNote">;
      setApplications((current) => current.map((application) => (
        application.id === id
          ? { ...application, status: updated.status, internalNote: updated.internalNote }
          : application
      )));
      setFeedback({ id, type: "success", message: "Изменения сохранены." });
    } catch (error) {
      setFeedback({
        id,
        type: "error",
        message: error instanceof Error ? error.message : "Не удалось сохранить изменения.",
      });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <Card as="div" className="flex flex-wrap items-end justify-between gap-5 bg-[#081321] p-5">
        <label className="min-w-[220px]">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">
            Фильтр по статусу
          </span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "ALL" | ApplicationStatusValue)}
            className="h-12 w-full rounded-none border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none transition-colors focus:border-pfa-accent"
          >
            <option value="ALL">Все заявки</option>
            {APPLICATION_STATUSES.map((status) => (
              <option value={status} key={status}>{STATUS_LABELS[status]}</option>
            ))}
          </select>
        </label>
        <Typography variant="caption" className="text-slate-300">
          Показано: <span className="text-pfa-accent">{visibleApplications.length}</span>
        </Typography>
      </Card>

      {visibleApplications.length === 0 ? (
        <Card as="div" className="mt-5 p-10 text-center">
          <Typography as="h2" variant="sectionTitle" className="text-[clamp(1.4rem,3vw,2.4rem)]">
            Заявок пока нет
          </Typography>
          <Typography variant="bodyMedium" className="mx-auto mt-4 max-w-lg">
            В выбранном статусе нет заявок. Измените фильтр или дождитесь нового обращения.
          </Typography>
        </Card>
      ) : (
        <div className="mt-5 grid gap-5">
          {visibleApplications.map((application) => {
            const draft = drafts[application.id];
            const isSaving = savingId === application.id;
            const applicationFeedback = feedback?.id === application.id ? feedback : null;

            return (
              <Card as="article" className="overflow-hidden bg-[#081321]" key={application.id}>
                <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(300px,.85fr)] max-lg:grid-cols-1">
                  <div className="min-w-0 p-7 max-sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <div>
                        <Typography variant="sectionSubtitle">
                          {TYPE_LABELS[application.type]} · {STATUS_LABELS[application.status]}
                        </Typography>
                        <Typography as="h2" variant="sectionTitle" className="mt-3 break-words text-[clamp(1.35rem,2.5vw,2.25rem)] leading-tight">
                          {application.firstName} {application.lastName}
                        </Typography>
                      </div>
                      <Typography variant="caption" className="text-slate-300">
                        {dateFormatter.format(new Date(application.createdAt))}
                      </Typography>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                      <div>
                        <Typography as="dt" variant="caption">Телефон</Typography>
                        <Typography as="dd" variant="bodyMedium" className="mt-1 break-all text-white">{application.phone}</Typography>
                      </div>
                      <div>
                        <Typography as="dt" variant="caption">Email</Typography>
                        <Typography as="dd" variant="bodyMedium" className="mt-1 break-all text-white">{application.email}</Typography>
                      </div>
                      <div>
                        <Typography as="dt" variant="caption">Совершеннолетие / представитель</Typography>
                        <Typography as="dd" variant="bodyMedium" className="mt-1 text-white">{application.isAdult ? "Подтверждено" : "Не подтверждено"}</Typography>
                      </div>
                      <div>
                        <Typography as="dt" variant="caption">Согласие</Typography>
                        <Typography as="dd" variant="bodyMedium" className="mt-1 text-white">{application.consent ? "Предоставлено" : "Не предоставлено"}</Typography>
                      </div>
                    </dl>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <Typography variant="caption">История заявителя</Typography>
                      <Typography variant="bodyMedium" className="mt-3 whitespace-pre-wrap break-words text-slate-200">
                        {application.story}
                      </Typography>
                    </div>
                  </div>

                  <div className="border-l border-white/10 bg-black/15 p-7 max-lg:border-l-0 max-lg:border-t max-sm:p-5">
                    <label className="block">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Статус</span>
                      <select
                        value={draft.status}
                        onChange={(event) => updateDraft(application.id, { status: event.target.value as ApplicationStatusValue })}
                        className="h-12 w-full rounded-none border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none transition-colors focus:border-pfa-accent"
                      >
                        {APPLICATION_STATUSES.map((status) => (
                          <option value={status} key={status}>{STATUS_LABELS[status]}</option>
                        ))}
                      </select>
                    </label>

                    <label className="mt-5 block">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Внутренняя заметка</span>
                      <textarea
                        rows={7}
                        value={draft.internalNote}
                        onChange={(event) => updateDraft(application.id, { internalNote: event.target.value })}
                        placeholder="Добавьте контекст разговора, следующий шаг или важное напоминание"
                        className="min-h-36 w-full resize-y rounded-none border border-white/15 bg-[#050b14] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-pfa-accent"
                      />
                    </label>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <Typography
                        variant="caption"
                        className={applicationFeedback?.type === "error" ? "normal-case tracking-normal text-red-300" : "normal-case tracking-normal text-pfa-accent"}
                      >
                        {applicationFeedback?.message ?? "Изменения видны только администратору."}
                      </Typography>
                      <Button
                        type="button"
                        shape="square"
                        size="compact"
                        disabled={isSaving}
                        onClick={() => saveApplication(application.id)}
                      >
                        {isSaving ? "Сохранение" : "Сохранить"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
