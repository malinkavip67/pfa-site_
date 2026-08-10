"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { AdminLeadershipRecord } from "@/types/admin-content";

export default function LeadershipEditor({ member }: { member: AdminLeadershipRecord }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [photoUrl, setPhotoUrl] = useState(member.photoUrl ?? "");
  const fieldClass = "h-12 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent";
  const areaClass = "min-h-36 w-full border border-white/15 bg-[#050b14] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-pfa-accent";

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(`/api/admin/leadership/${member.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, photoUrl, isPublished: data.isPublished === "on" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось сохранить карточку.");
      setMessage("Карточка сохранена.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось сохранить карточку.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={save}>
      <Card as="div" className="grid grid-cols-2 gap-5 bg-[#081321] p-7 max-md:grid-cols-1 max-sm:p-5">
        <Field label="Имя"><input name="firstName" defaultValue={member.firstName ?? ""} className={fieldClass} /></Field>
        <Field label="Фамилия"><input name="lastName" defaultValue={member.lastName ?? ""} className={fieldClass} /></Field>
        <Field label="Должность"><input name="position" defaultValue={member.position ?? ""} className={fieldClass} /></Field>
        <Field label="Порядок отображения"><input name="sortOrder" type="number" min="1" max="3" defaultValue={member.sortOrder} className={fieldClass} /></Field>
        <div className="col-span-2 max-md:col-span-1"><Field label="Короткое описание"><textarea name="description" defaultValue={member.description ?? ""} className={areaClass} /></Field></div>
        <div className="col-span-2 max-md:col-span-1"><Field label="URL фотографии"><input name="photoUrl" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} placeholder="/images/leadership/photo.webp или https://…" className={fieldClass} /></Field></div>
        {photoUrl && <div className="col-span-2 max-md:col-span-1">
          {/* Admin preview supports local and remote image URLs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoUrl} alt="Предпросмотр" className="max-h-72 max-w-full border border-white/10 object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        </div>}
        <label className="col-span-2 flex items-center gap-3 text-sm text-white max-md:col-span-1"><input name="isPublished" type="checkbox" defaultChecked={member.isPublished} className="size-4 accent-[#00EB52]" />Показывать карточку на сайте</label>
      </Card>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button type="submit" shape="square" size="compact" disabled={isSaving}>{isSaving ? "Сохраняем" : "Сохранить"}</Button>
        <Button href="/#leadership" variant="secondary" shape="square" size="compact">Посмотреть на сайте</Button>
        <Typography variant="caption" className="normal-case tracking-normal text-pfa-accent">{message}</Typography>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">{label}</span>{children}</label>;
}
