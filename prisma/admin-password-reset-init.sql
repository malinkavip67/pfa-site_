CREATE TABLE IF NOT EXISTS "AdminCredential" (
  "adminId" TEXT NOT NULL,
  "passwordHash" TEXT,
  "resetTokenHash" TEXT,
  "resetExpiresAt" TIMESTAMP(3),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "AdminCredential_pkey" PRIMARY KEY ("adminId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "AdminCredential_resetTokenHash_key"
  ON "AdminCredential"("resetTokenHash");

CREATE INDEX IF NOT EXISTS "AdminCredential_resetExpiresAt_idx"
  ON "AdminCredential"("resetExpiresAt");
