DO $$
BEGIN
  CREATE TYPE "ApplicationType" AS ENUM ('PLAYER', 'PARENT');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

DO $$
BEGIN
  CREATE TYPE "ApplicationStatus" AS ENUM (
    'NEW',
    'IN_PROGRESS',
    'COMPLETED',
    'ARCHIVED'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS "Application" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "type" "ApplicationType" NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "story" TEXT NOT NULL,
  "isAdult" BOOLEAN NOT NULL,
  "consent" BOOLEAN NOT NULL,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
  "internalNote" TEXT,

  CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Application_createdAt_idx"
  ON "Application"("createdAt");

CREATE INDEX IF NOT EXISTS "Application_status_idx"
  ON "Application"("status");

CREATE INDEX IF NOT EXISTS "Application_email_idx"
  ON "Application"("email");
