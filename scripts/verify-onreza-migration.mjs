import { readdir, readFile } from "node:fs/promises";
import { Client } from "pg";

const connectionString = process.env.DIRECT_URL;
if (!connectionString) throw new Error("DIRECT_URL is not configured.");

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
const primaryKeys = {
  Application: "id",
  Player: "id",
  News: "id",
  SiteSettings: "id",
  AdminCredential: "adminId",
};
const expectedIndexes = [
  "Application_createdAt_idx",
  "Application_email_idx",
  "Application_pkey",
  "Application_status_idx",
  "Player_createdAt_idx",
  "Player_isPublished_idx",
  "Player_pkey",
  "Player_slug_key",
  "Player_sortOrder_idx",
  "News_createdAt_idx",
  "News_isPublished_idx",
  "News_pkey",
  "News_publishedAt_idx",
  "News_slug_key",
  "SiteSettings_pkey",
  "AdminCredential_pkey",
  "AdminCredential_resetExpiresAt_idx",
  "AdminCredential_resetTokenHash_key",
].sort();

const backupFile = (await readdir(".local-backups"))
  .filter((name) => /^neon-.*\.json$/.test(name))
  .sort()
  .reverse()[0];
if (!backupFile) throw new Error("A Neon backup was not found.");
const backup = JSON.parse(await readFile(`.local-backups/${backupFile}`, "utf8"));

const client = new Client({
  connectionString,
  connectionTimeoutMillis: 15_000,
  query_timeout: 30_000,
  keepAlive: true,
});

let valid = true;
try {
  await client.connect();
  await client.query("SET TIME ZONE 'UTC'");

  const enumRows = await client.query(
    `SELECT t.typname AS name, e.enumlabel AS value
     FROM pg_type t
     JOIN pg_enum e ON e.enumtypid = t.oid
     WHERE t.typname IN ('ApplicationType', 'ApplicationStatus')
     ORDER BY t.typname, e.enumsortorder`,
  );
  const enums = Object.groupBy(enumRows.rows, (row) => row.name);
  const enumCheck = (
    JSON.stringify((enums.ApplicationType ?? []).map((row) => row.value))
      === JSON.stringify(["PLAYER", "PARENT"])
    && JSON.stringify((enums.ApplicationStatus ?? []).map((row) => row.value))
      === JSON.stringify(["NEW", "IN_PROGRESS", "COMPLETED", "ARCHIVED"])
  );
  console.log(`enums=${enumCheck ? "valid" : "invalid"}`);
  valid &&= enumCheck;

  const indexRows = await client.query(
    `SELECT indexname
     FROM pg_indexes
     WHERE schemaname = 'public'
       AND tablename = ANY($1::text[])
     ORDER BY indexname`,
    [Object.keys(columns)],
  );
  const actualIndexes = indexRows.rows.map((row) => row.indexname).sort();
  const indexCheck = JSON.stringify(actualIndexes) === JSON.stringify(expectedIndexes);
  console.log(`indexes=${indexCheck ? "valid" : "invalid"}`);
  valid &&= indexCheck;

  for (const [table, tableColumns] of Object.entries(columns)) {
    const identifiers = tableColumns.map((column) => `"${column}"`).join(", ");
    const target = await client.query(
      `SELECT ${identifiers} FROM "${table}" ORDER BY "${primaryKeys[table]}"`,
    );
    const source = [...backup.tables[table]].sort((left, right) =>
      String(left[primaryKeys[table]]).localeCompare(String(right[primaryKeys[table]])),
    );
    const differingColumns = compareRows(
      source,
      target.rows,
      tableColumns,
      primaryKeys[table],
    );
    const contentCheck = differingColumns.length === 0;
    console.log(`${table}_rows=${target.rows.length}`);
    console.log(`${table}_content=${contentCheck ? "matches" : "differs"}`);
    if (!contentCheck) {
      console.log(`${table}_differing_columns=${differingColumns.join(",")}`);
    }
    valid &&= contentCheck;
  }
} finally {
  await client.end().catch(() => undefined);
}

console.log(`migration_verification=${valid ? "success" : "failed"}`);
if (!valid) process.exitCode = 1;

function compareRows(source, target, tableColumns, primaryKey) {
  if (source.length !== target.length) return ["row_count"];

  const differingColumns = new Set();
  for (let index = 0; index < source.length; index += 1) {
    if (String(source[index][primaryKey]) !== String(target[index][primaryKey])) {
      differingColumns.add(primaryKey);
      continue;
    }

    for (const column of tableColumns) {
      const sourceValue = normalizeScalar(source[index][column], column);
      const targetValue = normalizeScalar(target[index][column], column);
      if (JSON.stringify(sourceValue) !== JSON.stringify(targetValue)) {
        differingColumns.add(column);
      }
    }
  }

  return [...differingColumns];
}

function normalizeScalar(value, column) {
  if (value == null) return null;
  if (
    column.endsWith("At")
    || column === "birthDate"
    || column === "publishedAt"
    || column === "resetExpiresAt"
  ) {
    return new Date(value).toISOString();
  }
  return value;
}
