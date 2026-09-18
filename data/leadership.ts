import "server-only";

import { databaseQuery } from "@/lib/postgres";
import type { LeadershipMember } from "@/types/leadership";

interface Row {
  id: string;
  firstName: string | null;
  lastName: string | null;
  position: string | null;
  description: string | null;
  photoUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
}

export const leadershipPlaceholders: LeadershipMember[] = [
  {
    id: "leadership-1",
    firstName: "Роман Николаевич",
    lastName: "Семченков",
    position: "Футбольный агент",
    photoUrl: "/images/leadership/roman-semchenkov-aligned.webp",
    sortOrder: 1,
  },
  {
    id: "leadership-2",
    firstName: "Сергей Александрович",
    lastName: "Гладников",
    position: "Футбольный агент",
    photoUrl: "/images/leadership/sergey-gladnikov-aligned.webp",
    sortOrder: 2,
  },
  {
    id: "leadership-3",
    firstName: "Сергей Леонидович",
    lastName: "Марков",
    position: "Футбольный агент",
    photoUrl: "/images/leadership/sergey-markov-preview.webp",
    sortOrder: 3,
  },
];

export async function getLeadership(): Promise<LeadershipMember[]> {
  try {
    const rows = await databaseQuery<Row>(`SELECT "id","firstName","lastName","position","description","photoUrl","isPublished","sortOrder" FROM "LeadershipMember" ORDER BY "sortOrder" ASC`);
    if (rows.length === 0) return leadershipPlaceholders;

    const rowsById = new Map(rows.map((row) => [row.id, row]));
    return leadershipPlaceholders.flatMap((profile) => {
      const row = rowsById.get(profile.id);
      if (!row) return [profile];
      if (!row.isPublished) return [];

      return [{
        ...profile,
        firstName: row.firstName || profile.firstName,
        lastName: row.lastName || profile.lastName,
        position: row.position || profile.position,
        description: row.description ?? profile.description,
        photoUrl: row.photoUrl || profile.photoUrl,
        sortOrder: row.sortOrder,
      }];
    });
  } catch {
    console.warn("Leadership profiles are temporarily unavailable; placeholders are used.");
    return leadershipPlaceholders;
  }
}
