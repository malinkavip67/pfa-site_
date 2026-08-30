ALTER TABLE "Player"
  ADD COLUMN IF NOT EXISTS "clubContractUntil" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "agencyContractUntil" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "Player_clubContractUntil_idx" ON "Player"("clubContractUntil");
CREATE INDEX IF NOT EXISTS "Player_agencyContractUntil_idx" ON "Player"("agencyContractUntil");
