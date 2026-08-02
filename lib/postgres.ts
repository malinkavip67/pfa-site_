import "server-only";

import { randomUUID } from "node:crypto";
import { Pool, type QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const globalForPostgres = globalThis as unknown as {
  postgresPool: Pool | undefined;
};

const postgresPool = globalForPostgres.postgresPool ?? new Pool({
  connectionString,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10_000,
});

postgresPool?.on("error", () => {
  console.error("PostgreSQL pool connection error.");
});

if (postgresPool && process.env.NODE_ENV !== "production") {
  globalForPostgres.postgresPool = postgresPool;
}

export async function databaseQuery<T extends QueryResultRow>(
  query: string,
  params: unknown[] = [],
) {
  try {
    const result = await postgresPool.query<T>(query, params);
    return result.rows;
  } catch (error) {
    if (!isReadOnlyQuery(query) || !isTransientConnectionError(error)) {
      throw error;
    }

    const result = await postgresPool.query<T>(query, params);
    return result.rows;
  }
}

export function createDatabaseId() {
  return `c${randomUUID().replaceAll("-", "")}`;
}

function isReadOnlyQuery(query: string) {
  return /^\s*SELECT\b/i.test(query);
}

function isTransientConnectionError(error: unknown) {
  if (!error || typeof error !== "object" || !("code" in error)) {
    return false;
  }

  return new Set([
    "ECONNRESET",
    "ECONNREFUSED",
    "EPIPE",
    "ETIMEDOUT",
    "57P01",
    "57P02",
    "57P03",
  ]).has(String(error.code));
}
