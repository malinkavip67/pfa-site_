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
  "id", "createdAt", "updatedAt", "isPublished", "sortOrder"
)
VALUES
  ('leadership-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 1),
  ('leadership-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 2),
  ('leadership-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 3)
ON CONFLICT ("id") DO NOTHING;
