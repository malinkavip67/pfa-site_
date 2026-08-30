"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { AdminPlayerRecord } from "@/types/admin-content";

interface Props { player?: AdminPlayerRecord; }

const transliteration: Record<string, string> = {
  а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
};
const makeSlug = (value: string) => value.toLowerCase().split("").map((character) => transliteration[character] ?? character).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function PlayerEditor({ player }: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState(player?.firstName ?? "");
  const [lastName, setLastName] = useState(player?.lastName ?? "");
  const [slug, setSlug] = useState(player?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(player));
  const [photoUrl, setPhotoUrl] = useState(player?.photoUrl ?? "");

  const updateName = (nextFirstName: string, nextLastName: string) => {
    setFirstName(nextFirstName); setLastName(nextLastName);
    if (!slugEdited) setSlug(makeSlug(`${nextFirstName} ${nextLastName}`));
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setIsSaving(true); setMessage("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      ...data, firstName, lastName, slug, photoUrl,
      height: data.height || null, weight: data.weight || null,
      clubContractUntil: data.clubContractUntil || null,
      agencyContractUntil: data.agencyContractUntil || null,
      sortOrder: data.sortOrder || 0,
      isPublished: data.isPublished === "on",
    };
    try {
      const response = await fetch(player ? `/api/admin/players/${player.id}` : "/api/admin/players", {
        method: player ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось сохранить игрока.");
      setMessage("Игрок сохранён.");
      router.replace(`/admin/players/${result.player.id}`);
      router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось сохранить игрока."); }
    finally { setIsSaving(false); }
  };

  const remove = async () => {
    if (!player || !window.confirm("Удалить игрока без возможности восстановления?")) return;
    const response = await fetch(`/api/admin/players/${player.id}`, { method: "DELETE" });
    if (response.ok) { router.replace("/admin/players"); router.refresh(); }
    else setMessage("Не удалось удалить игрока.");
  };

  const fieldClass = "h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent";
  const areaClass = "min-h-32 w-full border border-white/15 bg-[#050b14] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-pfa-accent";
  return (
    <form onSubmit={save}>
      <Card as="div" className="grid grid-cols-2 gap-5 bg-[#081321] p-7 max-md:grid-cols-1 max-sm:p-5">
        <Field label="Имя"><input required name="firstName" value={firstName} onChange={(e) => updateName(e.target.value, lastName)} className={fieldClass} /></Field>
        <Field label="Фамилия"><input required name="lastName" value={lastName} onChange={(e) => updateName(firstName, e.target.value)} className={fieldClass} /></Field>
        <Field label="Slug"><input required name="slug" value={slug} onChange={(e) => { setSlugEdited(true); setSlug(e.target.value.toLowerCase()); }} className={fieldClass} /></Field>
        <Field label="Дата рождения"><input name="birthDate" type="date" defaultValue={player?.birthDate?.slice(0, 10) ?? ""} className={fieldClass} /></Field>
        <Field label="Гражданство"><input name="nationality" defaultValue={player?.nationality ?? ""} className={fieldClass} /></Field>
        <Field label="Город"><input name="city" defaultValue={player?.city ?? ""} className={fieldClass} /></Field>
        <Field label="Позиция"><input name="position" defaultValue={player?.position ?? ""} className={fieldClass} /></Field>
        <Field label="Клуб"><input name="club" defaultValue={player?.club ?? ""} className={fieldClass} /></Field>
        <Field label="Контракт с клубом до"><input name="clubContractUntil" type="date" defaultValue={player?.clubContractUntil?.slice(0, 10) ?? ""} className={fieldClass} /></Field>
        <Field label="Договор с PFA до"><input name="agencyContractUntil" type="date" defaultValue={player?.agencyContractUntil?.slice(0, 10) ?? ""} className={fieldClass} /></Field>
        <Field label="Рост, см"><input name="height" type="number" min="1" defaultValue={player?.height ?? ""} className={fieldClass} /></Field>
        <Field label="Вес, кг"><input name="weight" type="number" min="1" defaultValue={player?.weight ?? ""} className={fieldClass} /></Field>
        <Field label="Рабочая нога"><input name="preferredFoot" defaultValue={player?.preferredFoot ?? ""} className={fieldClass} /></Field>
        <Field label="Порядок отображения"><input name="sortOrder" type="number" defaultValue={player?.sortOrder ?? 0} className={fieldClass} /></Field>
        <div className="col-span-2 max-md:col-span-1"><Field label="Описание"><textarea name="description" defaultValue={player?.description ?? ""} className={areaClass} /></Field></div>
        <div className="col-span-2 max-md:col-span-1"><Field label="Достижения — каждое с новой строки"><textarea name="achievements" defaultValue={player?.achievements ?? ""} className={areaClass} /></Field></div>
        <div className="col-span-2 max-md:col-span-1"><Field label="URL фотографии"><input name="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="/images/players/photo.jpg или https://…" className={fieldClass} /></Field></div>
        {photoUrl && <div className="col-span-2 max-md:col-span-1">
          {/* Admin previews accept both local paths and arbitrary external URLs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoUrl} alt="Предпросмотр" className="max-h-72 max-w-full border border-white/10 object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        </div>}
        <div className="col-span-2 max-md:col-span-1"><Field label="Ссылка на видео"><input name="videoUrl" type="url" defaultValue={player?.videoUrl ?? ""} className={fieldClass} /></Field></div>
        <label className="col-span-2 flex items-center gap-3 text-sm text-white max-md:col-span-1"><input name="isPublished" type="checkbox" defaultChecked={player?.isPublished ?? false} className="size-4 accent-[#00EB52]" />Опубликован на сайте</label>
      </Card>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button type="submit" shape="square" size="compact" disabled={isSaving}>{isSaving ? "Сохраняем" : "Сохранить"}</Button>
        {player && <Button href={`/players/${player.slug}`} variant="secondary" shape="square" size="compact">Предпросмотр</Button>}
        {player && <button type="button" onClick={remove} className="min-h-14 border border-red-400/40 px-6 text-xs font-bold uppercase tracking-[.1em] text-red-300 hover:bg-red-950/30">Удалить</button>}
        <Typography variant="caption" className="normal-case tracking-normal text-pfa-accent">{message}</Typography>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">{label}</span>{children}</label>;
}
