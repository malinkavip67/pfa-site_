DO $$ BEGIN
  CREATE TYPE "PlayerQuestionnaireStatus" AS ENUM ('INVITED', 'SUBMITTED', 'NEEDS_CLARIFICATION', 'CONFIRMED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "PlayerQuestionnaire" (
  "id" TEXT PRIMARY KEY,
  "token" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedAt" TIMESTAMP(3),
  "confirmedAt" TIMESTAMP(3),
  "status" "PlayerQuestionnaireStatus" NOT NULL DEFAULT 'INVITED',
  "fullName" TEXT,
  "birthDate" TIMESTAMP(3),
  "citizenship" TEXT,
  "height" INTEGER,
  "weight" INTEGER,
  "preferredFoot" TEXT,
  "positions" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "clubs" TEXT,
  "videoLinks" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "transfermarktUrl" TEXT,
  "achievements" TEXT,
  "individualFeatures" TEXT,
  "contact" TEXT,
  "consent" BOOLEAN NOT NULL DEFAULT false,
  "photoData" BYTEA,
  "photoMimeType" TEXT,
  "photoFileName" TEXT,
  "photoSize" INTEGER,
  "linkedPlayerId" TEXT REFERENCES "Player"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "PlayerQuestionnaire_status_idx" ON "PlayerQuestionnaire"("status");
CREATE INDEX IF NOT EXISTS "PlayerQuestionnaire_createdAt_idx" ON "PlayerQuestionnaire"("createdAt");
CREATE INDEX IF NOT EXISTS "PlayerQuestionnaire_linkedPlayerId_idx" ON "PlayerQuestionnaire"("linkedPlayerId");
