CREATE TABLE IF NOT EXISTS "LeadershipMember" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "position" TEXT,
  "description" TEXT,
  "photoUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "LeadershipMember_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "LeadershipMember_isPublished_idx"
  ON "LeadershipMember"("isPublished");

CREATE INDEX IF NOT EXISTS "LeadershipMember_sortOrder_idx"
  ON "LeadershipMember"("sortOrder");

INSERT INTO "LeadershipMember" (
  "id", "createdAt", "updatedAt", "firstName", "lastName", "position", "photoUrl", "isPublished", "sortOrder"
)
VALUES
  ('leadership-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Роман Николаевич', 'Семченков', 'Футбольный агент', '/images/leadership/roman-semchenkov-aligned.webp', true, 1),
  ('leadership-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Сергей Александрович', 'Гладников', 'Футбольный агент', '/images/leadership/sergey-gladnikov-aligned.webp', true, 2),
  ('leadership-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Сергей Леонидович', 'Марков', 'Футбольный агент', '/images/leadership/sergey-markov-preview.webp', true, 3)
ON CONFLICT ("id") DO UPDATE SET
  "updatedAt" = CURRENT_TIMESTAMP,
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  "position" = EXCLUDED."position",
  "photoUrl" = EXCLUDED."photoUrl",
  "isPublished" = true,
  "sortOrder" = EXCLUDED."sortOrder";
