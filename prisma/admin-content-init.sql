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

INSERT INTO "SiteSettings" ("id", "updatedAt")
VALUES ('main', CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
