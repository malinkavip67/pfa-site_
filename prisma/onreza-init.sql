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

CREATE TABLE IF NOT EXISTS "Player" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "birthDate" TIMESTAMP(3),
  "nationality" TEXT,
  "city" TEXT,
  "position" TEXT,
  "club" TEXT,
  "height" INTEGER,
  "weight" INTEGER,
  "preferredFoot" TEXT,
  "description" TEXT,
  "achievements" TEXT,
  "photoUrl" TEXT,
  "videoUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Player_slug_key"
  ON "Player"("slug");
CREATE INDEX IF NOT EXISTS "Player_isPublished_idx"
  ON "Player"("isPublished");
CREATE INDEX IF NOT EXISTS "Player_sortOrder_idx"
  ON "Player"("sortOrder");
CREATE INDEX IF NOT EXISTS "Player_createdAt_idx"
  ON "Player"("createdAt");

CREATE TABLE IF NOT EXISTS "News" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT,
  "content" TEXT NOT NULL,
  "imageUrl" TEXT,
  "publishedAt" TIMESTAMP(3),
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "News_slug_key"
  ON "News"("slug");
CREATE INDEX IF NOT EXISTS "News_isPublished_idx"
  ON "News"("isPublished");
CREATE INDEX IF NOT EXISTS "News_publishedAt_idx"
  ON "News"("publishedAt");
CREATE INDEX IF NOT EXISTS "News_createdAt_idx"
  ON "News"("createdAt");

CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" TEXT NOT NULL DEFAULT 'main',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "siteName" TEXT,
  "heroTitle" TEXT,
  "heroSubtitle" TEXT,
  "heroButtonText" TEXT,
  "heroButtonLink" TEXT,
  "phone" TEXT,
  "email" TEXT,
  "telegram" TEXT,
  "whatsapp" TEXT,
  "address" TEXT,
  "footerText" TEXT,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AdminCredential" (
  "adminId" TEXT NOT NULL,
  "passwordHash" TEXT,
  "resetTokenHash" TEXT,
  "resetExpiresAt" TIMESTAMP(3),
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AdminCredential_pkey" PRIMARY KEY ("adminId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "AdminCredential_resetTokenHash_key"
  ON "AdminCredential"("resetTokenHash");
CREATE INDEX IF NOT EXISTS "AdminCredential_resetExpiresAt_idx"
  ON "AdminCredential"("resetExpiresAt");
