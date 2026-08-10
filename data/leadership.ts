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

export const leadershipPlaceholders: LeadershipMember[] = [1, 2, 3].map((sortOrder) => ({
  id: `leadership-${sortOrder}`,
  sortOrder,
}));

export async function getLeadership(): Promise<LeadershipMember[]> {
  try {
    const rows = await databaseQuery<Row>(`SELECT "id","firstName","lastName","position","description","photoUrl","isPublished","sortOrder" FROM "LeadershipMember" ORDER BY "sortOrder" ASC`);
    if (rows.length === 0) return leadershipPlaceholders;
    return rows.filter((row) => row.isPublished).map((row) => ({
      id: row.id,
      firstName: row.firstName ?? undefined,
      lastName: row.lastName ?? undefined,
      position: row.position ?? undefined,
      description: row.description ?? undefined,
      photoUrl: row.photoUrl ?? undefined,
      sortOrder: row.sortOrder,
    }));
  } catch {
    console.warn("Leadership profiles are temporarily unavailable; placeholders are used.");
    return leadershipPlaceholders;
  }
}
