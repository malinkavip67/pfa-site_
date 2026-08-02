import { readdir, readFile } from "node:fs/promises";
import { Client } from "pg";

const connectionString = process.env.DIRECT_URL;
if (!connectionString) {
  throw new Error("DIRECT_URL is not configured.");
}

const columns = {
  Application: [
    "id", "createdAt", "updatedAt", "type", "firstName", "lastName",
    "phone", "email", "story", "isAdult", "consent", "status",
    "internalNote",
  ],
  Player: [
    "id", "createdAt", "updatedAt", "firstName", "lastName", "slug",
    "birthDate", "nationality", "city", "position", "club", "height",
    "weight", "preferredFoot", "description", "achievements", "photoUrl",
    "videoUrl", "isPublished", "sortOrder",
  ],
  News: [
    "id", "createdAt", "updatedAt", "title", "slug", "excerpt",
    "content", "imageUrl", "publishedAt", "isPublished",
  ],
  SiteSettings: [
    "id", "updatedAt", "siteName", "heroTitle", "heroSubtitle",
    "heroButtonText", "heroButtonLink", "phone", "email", "telegram",
    "whatsapp", "address", "footerText",
  ],
  AdminCredential: [
    "adminId", "passwordHash", "resetTokenHash", "resetExpiresAt", "updatedAt",
  ],
};

const backupFiles = (await readdir(".local-backups"))
  .filter((name) => /^neon-.*\.json$/.test(name))
  .sort()
  .reverse();
if (!backupFiles[0]) {
  throw new Error("A Neon backup was not found.");
}

const backup = JSON.parse(
  await readFile(`.local-backups/${backupFiles[0]}`, "utf8"),
);
if (backup.formatVersion !== 1 || backup.source !== "neon") {
  throw new Error("Unsupported backup format.");
}

const client = new Client({
  connectionString,
  connectionTimeoutMillis: 15_000,
  query_timeout: 30_000,
  keepAlive: true,
});

try {
  await client.connect();
  await client.query("BEGIN");
  await client.query("SET LOCAL TIME ZONE 'UTC'");

  for (const table of Object.keys(columns)) {
    const count = await client.query(
      `SELECT COUNT(*)::int AS count FROM "${table}"`,
    );
    if (count.rows[0].count !== 0) {
      throw new Error(`Target table ${table} is not empty.`);
    }
  }

  for (const [table, tableColumns] of Object.entries(columns)) {
    const rows = backup.tables?.[table];
    if (!Array.isArray(rows)) {
      throw new Error(`Backup table ${table} is missing.`);
    }

    const identifiers = tableColumns.map((column) => `"${column}"`).join(", ");
    const placeholders = tableColumns.map((_, index) => `$${index + 1}`).join(", ");
    const query = `INSERT INTO "${table}" (${identifiers}) VALUES (${placeholders})`;

    for (const row of rows) {
      await client.query(query, tableColumns.map((column) => row[column] ?? null));
    }
  }

  await client.query("COMMIT");
  console.log(`backup_imported=${backupFiles[0]}`);
  for (const table of Object.keys(columns)) {
    console.log(`${table}_rows=${backup.tables[table].length}`);
  }
} catch (error) {
  await client.query("ROLLBACK").catch(() => undefined);
  console.log("backup_import=rolled_back");
  console.log(`error_code=${error.code ?? error.name ?? "unknown"}`);
  throw error;
} finally {
  await client.end().catch(() => undefined);
}
