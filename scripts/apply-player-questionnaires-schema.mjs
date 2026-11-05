import { readFile } from "node:fs/promises";
import { Client } from "pg";

const connectionString = process.env.DIRECT_URL;
if (!connectionString) throw new Error("DIRECT_URL is not configured.");
const sql = await readFile("prisma/player-questionnaires-init.sql", "utf8");
if (/\b(DROP|TRUNCATE)\b/i.test(sql)) throw new Error("Unsafe SQL statement detected.");

const client = new Client({ connectionString, connectionTimeoutMillis: 15_000, query_timeout: 30_000, keepAlive: true });
try {
  await client.connect();
  await client.query("BEGIN");
  await client.query(sql);
  await client.query("COMMIT");
  const result = await client.query(`SELECT to_regclass('public."PlayerQuestionnaire"') AS table_name`);
  console.log(`questionnaire_schema=${result.rows[0]?.table_name ? "ready" : "missing"}`);
} catch (error) {
  await client.query("ROLLBACK").catch(() => undefined);
  console.log(`questionnaire_schema=failed error_code=${error.code ?? error.name ?? "unknown"}`);
  throw error;
} finally {
  await client.end().catch(() => undefined);
}
