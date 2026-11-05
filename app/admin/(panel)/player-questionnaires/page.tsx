import PlayerQuestionnairesDashboard from "@/components/admin/PlayerQuestionnairesDashboard";
import { databaseQuery } from "@/lib/postgres";
import { QUESTIONNAIRE_SELECT, toQuestionnaireRecord } from "@/lib/player-questionnaire";
import type { AdminPlayerRecord } from "@/types/admin-content";

export const dynamic = "force-dynamic";
export default async function PlayerQuestionnairesPage() {
  const [questionnaireRows, playerRows] = await Promise.all([
    databaseQuery<Record<string, unknown>>(`SELECT ${QUESTIONNAIRE_SELECT}, CASE WHEN p."id" IS NULL THEN NULL ELSE CONCAT_WS(' ',p."lastName",p."firstName") END AS "linkedPlayerName" FROM "PlayerQuestionnaire" q LEFT JOIN "Player" p ON p."id"=q."linkedPlayerId" ORDER BY q."createdAt" DESC`),
    databaseQuery<AdminPlayerRecord>(`SELECT * FROM "Player" ORDER BY "lastName","firstName"`),
  ]);
  return <PlayerQuestionnairesDashboard initialQuestionnaires={questionnaireRows.map(toQuestionnaireRecord)} players={playerRows.map((row) => ({ ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt), birthDate: row.birthDate ? String(row.birthDate) : null, clubContractUntil: row.clubContractUntil ? String(row.clubContractUntil) : null, agencyContractUntil: row.agencyContractUntil ? String(row.agencyContractUntil) : null }))} />;
}
