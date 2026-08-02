import { Client } from "pg";

const connections = [
  ["pooled", process.env.DATABASE_URL],
  ["direct", process.env.DIRECT_URL],
];

if (connections.some(([, value]) => !value)) {
  console.log("configuration=missing");
  process.exit(2);
}

try {
  for (const [label, value] of connections) {
    const parsed = new URL(value);
    if (!/^postgres(ql)?:$/.test(parsed.protocol)) {
      throw new Error("invalid_protocol");
    }
    console.log(`${label}_has_hostname=${Boolean(parsed.hostname)}`);
    console.log(`${label}_has_username=${Boolean(parsed.username)}`);
    console.log(`${label}_has_password=${Boolean(parsed.password)}`);
    console.log(`${label}_has_database=${parsed.pathname.length > 1}`);
    console.log(
      `${label}_has_scheme_slashes=${/^postgres(?:ql)?:\/\//i.test(value)}`,
    );
    console.log(`${label}_has_at_sign=${value.includes("@")}`);
  }
} catch {
  console.log("configuration=invalid_format");
  process.exit(2);
}

const results = [];

for (const [label, connectionString] of connections) {
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 12_000,
    query_timeout: 12_000,
    keepAlive: true,
  });

  try {
    await client.connect();
    const identity = await client.query("SELECT current_database() AS db");
    const tables = await client.query(
      `SELECT COUNT(table_name)::int AS count
       FROM information_schema.tables
       WHERE table_schema = 'public'`,
    );
    console.log(`${label}=success`);
    results.push({
      label,
      database: identity.rows[0].db,
      tableCount: tables.rows[0].count,
    });
  } catch (error) {
    console.log(`${label}=failed`);
    console.log(`${label}_error_code=${error.code ?? error.name ?? "unknown"}`);
    console.log(`${label}_error_message=${sanitizeError(error.message)}`);
  } finally {
    await client.end().catch(() => undefined);
  }
}

console.log(
  `urls_distinct=${process.env.DATABASE_URL !== process.env.DIRECT_URL}`,
);
console.log(
  `same_database=${results.length === 2 && results[0].database === results[1].database}`,
);

if (results[0]) {
  console.log(`public_tables=${results[0].tableCount}`);
}

if (results.length !== 2 || results[0].database !== results[1].database) {
  process.exitCode = 1;
}

function sanitizeError(message) {
  let sanitized = String(message ?? "Connection failed").replace(
    /postgres(?:ql)?:\/\/[^\s]+/gi,
    "[connection hidden]",
  );

  for (const [, value] of connections) {
    try {
      const parsed = new URL(value);
      for (const secret of [
        parsed.hostname,
        parsed.username,
        parsed.password,
        parsed.pathname.slice(1),
      ]) {
        if (secret) sanitized = sanitized.replaceAll(secret, "[hidden]");
      }
    } catch {
      // The structural validation above reports malformed values.
    }
  }

  return sanitized;
}
