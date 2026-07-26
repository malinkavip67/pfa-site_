"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { AdminNewsRecord } from "@/types/admin-content";

interface Props { item?: AdminNewsRecord; }
const transliteration: Record<string, string> = {а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya"};
const makeSlug = (value: string) => value.toLowerCase().split("").map((c) => transliteration[c] ?? c).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function NewsEditor({ item }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(item?.title ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(item));
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fieldClass = "h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent";
  const areaClass = "min-h-36 w-full border border-white/15 bg-[#050b14] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-pfa-accent";

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setIsSaving(true); setMessage("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...data, title, slug, imageUrl, publishedAt: data.publishedAt || null, isPublished: data.isPublished === "on" };
    try {
      const response = await fetch(item ? `/api/admin/news/${item.id}` : "/api/admin/news", { method: item ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось сохранить новость.");
      setMessage("Новость сохранена."); router.replace(`/admin/news/${result.item.id}`); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось сохранить новость."); }
    finally { setIsSaving(false); }
  };
  const remove = async () => {
    if (!item || !window.confirm("Удалить новость без возможности восстановления?")) return;
    const response = await fetch(`/api/admin/news/${item.id}`, { method: "DELETE" });
    if (response.ok) { router.replace("/admin/news"); router.refresh(); } else setMessage("Не удалось удалить новость.");
  };

  return (
    <form onSubmit={save}>
      <Card as="div" className="grid grid-cols-2 gap-5 bg-[#081321] p-7 max-md:grid-cols-1 max-sm:p-5">
        <Field label="Заголовок"><input required name="title" value={title} onChange={(e) => { setTitle(e.target.value); if (!slugEdited) setSlug(makeSlug(e.target.value)); }} className={fieldClass} /></Field>
        <Field label="Slug"><input required name="slug" value={slug} onChange={(e) => { setSlugEdited(true); setSlug(e.target.value.toLowerCase()); }} className={fieldClass} /></Field>
        <div className="col-span-2 max-md:col-span-1"><Field label="Краткое описание"><textarea name="excerpt" defaultValue={item?.excerpt ?? ""} className={areaClass} /></Field></div>
        <div className="col-span-2 max-md:col-span-1"><Field label="Полный текст"><textarea required name="content" defaultValue={item?.content ?? ""} className={`${areaClass} min-h-64`} /></Field></div>
        <div className="col-span-2 max-md:col-span-1"><Field label="URL главного изображения"><input name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/images/news/photo.jpg или https://…" className={fieldClass} /></Field></div>
        {imageUrl && <div className="col-span-2 max-md:col-span-1">
          {/* Admin previews accept both local paths and arbitrary external URLs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Предпросмотр" className="max-h-72 max-w-full border border-white/10 object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        </div>}
        <Field label="Дата публикации"><input name="publishedAt" type="datetime-local" defaultValue={item?.publishedAt?.slice(0, 16) ?? ""} className={fieldClass} /></Field>
        <label className="flex items-center gap-3 self-end pb-4 text-sm text-white"><input name="isPublished" type="checkbox" defaultChecked={item?.isPublished ?? false} className="size-4 accent-[#00EB52]" />Опубликована</label>
      </Card>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button type="submit" shape="square" size="compact" disabled={isSaving}>{isSaving ? "Сохраняем" : "Сохранить"}</Button>
        {item && <Button href={`/news/${item.slug}`} variant="secondary" shape="square" size="compact">Предпросмотр</Button>}
        {item && <button type="button" onClick={remove} className="min-h-14 border border-red-400/40 px-6 text-xs font-bold uppercase tracking-[.1em] text-red-300 hover:bg-red-950/30">Удалить</button>}
        <Typography variant="caption" className="normal-case tracking-normal text-pfa-accent">{message}</Typography>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">{label}</span>{children}</label>;
}
