"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { SiteSettingsRecord } from "@/types/admin-content";

interface Props { settings: SiteSettingsRecord; }

export default function SettingsEditor({ settings }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setIsSaving(true); setMessage("");
    try {
      const response = await fetch("/api/admin/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось сохранить настройки.");
      setMessage("Настройки сохранены и применены.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось сохранить настройки."); }
    finally { setIsSaving(false); }
  };
  const fieldClass = "h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent";
  const areaClass = "min-h-28 w-full border border-white/15 bg-[#050b14] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-pfa-accent";
  const fields = [
    ["siteName","Название сайта","text"],["heroTitle","Заголовок первого экрана","text"],["heroButtonText","Текст главной кнопки","text"],["heroButtonLink","Ссылка главной кнопки","text"],["phone","Телефон","tel"],["email","Email","email"],["telegram","Telegram","url"],["whatsapp","WhatsApp","url"],["address","Адрес","text"],
  ] as const;
  return (
    <form onSubmit={save}>
      <Card as="div" className="grid grid-cols-2 gap-5 bg-[#081321] p-7 max-md:grid-cols-1 max-sm:p-5">
        {fields.map(([name,label,type]) => <Field label={label} key={name}><input name={name} type={type} defaultValue={settings[name] ?? ""} className={fieldClass} /></Field>)}
        <div className="col-span-2 max-md:col-span-1"><Field label="Подзаголовок первого экрана"><textarea name="heroSubtitle" defaultValue={settings.heroSubtitle ?? ""} className={areaClass} /></Field></div>
        <div className="col-span-2 max-md:col-span-1"><Field label="Текст в подвале"><textarea name="footerText" defaultValue={settings.footerText ?? ""} className={areaClass} /></Field></div>
      </Card>
      <div className="mt-5 flex flex-wrap items-center gap-4"><Button type="submit" shape="square" size="compact" disabled={isSaving}>{isSaving ? "Сохраняем" : "Сохранить"}</Button><Typography variant="caption" className="normal-case tracking-normal text-pfa-accent">{message}</Typography></div>
    </form>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">{label}</span>{children}</label>; }
