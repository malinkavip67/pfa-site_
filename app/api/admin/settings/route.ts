import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { validateSettingsPayload } from "@/lib/admin-content-validation";
import { neonQuery } from "@/lib/neon";
import type { SiteSettingsRecord } from "@/types/admin-content";

export const runtime = "nodejs";

const settingsFields = `"id","updatedAt","siteName","heroTitle","heroSubtitle","heroButtonText","heroButtonLink","phone","email","telegram","whatsapp","address","footerText"`;

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const rows = await neonQuery<SiteSettingsRecord>(
      `INSERT INTO "SiteSettings" ("id","updatedAt")
       VALUES ('main',CURRENT_TIMESTAMP)
       ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id"
       RETURNING ${settingsFields}`,
    );
    return NextResponse.json({ ok: true, settings: rows[0] });
  } catch {
    return NextResponse.json({ ok: false, message: "Не удалось загрузить настройки." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const validated = validateSettingsPayload(await request.json());
    if (!("data" in validated)) return NextResponse.json({ ok: false, message: validated.error }, { status: 400 });
    const data = validated.data;
    const rows = await neonQuery<SiteSettingsRecord>(
      `INSERT INTO "SiteSettings"
       ("id","updatedAt","siteName","heroTitle","heroSubtitle","heroButtonText","heroButtonLink","phone","email","telegram","whatsapp","address","footerText")
       VALUES ('main',CURRENT_TIMESTAMP,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       ON CONFLICT ("id") DO UPDATE SET
       "updatedAt"=CURRENT_TIMESTAMP,"siteName"=EXCLUDED."siteName","heroTitle"=EXCLUDED."heroTitle",
       "heroSubtitle"=EXCLUDED."heroSubtitle","heroButtonText"=EXCLUDED."heroButtonText",
       "heroButtonLink"=EXCLUDED."heroButtonLink","phone"=EXCLUDED."phone","email"=EXCLUDED."email",
       "telegram"=EXCLUDED."telegram","whatsapp"=EXCLUDED."whatsapp","address"=EXCLUDED."address",
       "footerText"=EXCLUDED."footerText"
       RETURNING ${settingsFields}`,
      [data.siteName, data.heroTitle, data.heroSubtitle, data.heroButtonText, data.heroButtonLink, data.phone, data.email, data.telegram, data.whatsapp, data.address, data.footerText],
    );
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, settings: rows[0] });
  } catch {
    return NextResponse.json({ ok: false, message: "Не удалось сохранить настройки." }, { status: 500 });
  }
}
