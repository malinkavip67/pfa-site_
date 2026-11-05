import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlayerQuestionnaireForm from "@/components/forms/PlayerQuestionnaireForm";
import { databaseQuery } from "@/lib/postgres";
import { QUESTIONNAIRE_SELECT, toQuestionnaireRecord } from "@/lib/player-questionnaire";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Анкета футболиста", robots: { index: false, follow: false } };

interface Props { params: Promise<{ token: string }>; }
export default async function PlayerQuestionnairePage({ params }: Props) {
  const { token } = await params;
  const rows = await databaseQuery<Record<string, unknown>>(
    `SELECT ${QUESTIONNAIRE_SELECT}, CASE WHEN p."id" IS NULL THEN NULL ELSE CONCAT_WS(' ',p."lastName",p."firstName") END AS "linkedPlayerName"
     FROM "PlayerQuestionnaire" q LEFT JOIN "Player" p ON p."id"=q."linkedPlayerId" WHERE q."token"=$1 LIMIT 1`, [token],
  );
  if (!rows[0]) notFound();
  const record = toQuestionnaireRecord(rows[0]);
  const initial = Object.fromEntries(Object.entries(record).filter(([key]) => !["id", "token", "linkedPlayerId"].includes(key))) as Omit<typeof record, "id" | "token" | "linkedPlayerId">;
  return <div className="min-h-screen bg-[#050b14] px-4 py-8 text-white md:px-8 md:py-10"><div className="mx-auto max-w-5xl"><p className="text-[11px] font-extrabold text-[#39d873]">PFA · Premier Football Agency</p><h1 className="mt-2 max-w-3xl text-2xl font-extrabold tracking-[-.03em] md:text-4xl">Анкета футболиста</h1><p className="mt-3 max-w-2xl text-xs leading-5 text-slate-300 md:text-sm">Заполните профиль для работы с агентством. Данные попадут в CRM и будут проверены сотрудником PFA перед подтверждением.</p></div><div className="mt-6"><PlayerQuestionnaireForm token={token} initial={initial} /></div></div>;
}
