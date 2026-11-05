export const PLAYER_QUESTIONNAIRE_STATUSES = [
  "INVITED",
  "SUBMITTED",
  "NEEDS_CLARIFICATION",
  "CONFIRMED",
] as const;

export type PlayerQuestionnaireStatus = (typeof PLAYER_QUESTIONNAIRE_STATUSES)[number];

export interface PlayerQuestionnaireRecord {
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  confirmedAt: string | null;
  status: PlayerQuestionnaireStatus;
  fullName: string | null;
  birthDate: string | null;
  citizenship: string | null;
  height: number | null;
  weight: number | null;
  preferredFoot: string | null;
  positions: string[];
  clubs: string | null;
  videoLinks: string[];
  transfermarktUrl: string | null;
  achievements: string | null;
  individualFeatures: string | null;
  contact: string | null;
  consent: boolean;
  photoMimeType: string | null;
  photoFileName: string | null;
  photoSize: number | null;
  linkedPlayerId: string | null;
  linkedPlayerName?: string | null;
  hasPhoto: boolean;
}
