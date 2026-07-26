import "server-only";

import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const sql = neon(connectionString);

export async function neonQuery<T>(query: string, params: unknown[] = []) {
  return sql.query(query, params) as Promise<T[]>;
}

export function createDatabaseId() {
  return `c${randomUUID().replaceAll("-", "")}`;
}
