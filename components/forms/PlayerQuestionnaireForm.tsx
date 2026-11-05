"use client";

import { Check, FileImage, Link2, LoaderCircle, Plus, Send, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { PlayerQuestionnaireRecord } from "@/types/player-questionnaire";

const POSITIONS = ["ФРВ", "ЛВ", "ПВ", "ЦАП", "ЦП", "ЦОП", "ПФЗ", "ЛФЗ", "ЦЗ", "ВРТ"];
const MAX_PHOTO_BYTES = 320 * 1024;

interface Props { token: string; initial: Omit<PlayerQuestionnaireRecord, "id" | "token" | "linkedPlayerId">; }

export default function PlayerQuestionnaireForm({ token, initial }: Props) {
  const isLocked = initial.status === "CONFIRMED";
  const [positions, setPositions] = useState(initial.positions);
  const [videoLinks, setVideoLinks] = useState(initial.videoLinks.length ? initial.videoLinks : [""]);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState("");
  const [photoSize, setPhotoSize] = useState<number | null>(initial.photoSize);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const progress = useMemo(() => {
    const base = [initial.fullName, initial.birthDate, initial.citizenship, initial.height, initial.weight, initial.preferredFoot, initial.clubs, initial.individualFeatures, initial.contact];
    return Math.min(100, Math.round(((base.filter(Boolean).length + (positions.length ? 1 : 0) + (photoSize ? 1 : 0)) / 11) * 100));
  }, [initial, photoSize, positions.length]);

  const togglePosition = (position: string) => setPositions((current) => current.includes(position) ? current.filter((item) => item !== position) : [...current, position]);

  const onPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoBusy(true); setMessage("");
    try {
      const compressed = await compressPhoto(file);
      setPhotoDataUrl(compressed.dataUrl);
      setPhotoFileName(compressed.fileName);
      setPhotoSize(compressed.size);
      setPhotoPreview(compressed.dataUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось обработать фотографию.");
      event.target.value = "";
    } finally { setPhotoBusy(false); }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLocked) return;
    setSubmitting(true); setMessage(""); setSuccess(false);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(`/api/player-questionnaires/${encodeURIComponent(token)}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, positions, videoLinks, consent: values.consent === "on", photoDataUrl, photoFileName }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось отправить анкету.");
      setSuccess(true); setMessage("Анкета отправлена. Сотрудник PFA проверит данные перед подтверждением.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) { setMessage(error instanceof Error ? error.message : "Не удалось отправить анкету."); }
    finally { setSubmitting(false); }
  };

  if (isLocked) return <StatusPanel title="Анкета подтверждена" text="Данные уже перенесены в CRM PFA. Для изменений запросите у агента новую ссылку." />;
  if (success) return <StatusPanel title="Спасибо, анкета получена" text={message} />;

  return <form onSubmit={submit} className="mx-auto max-w-5xl pb-24">
    <div className="mb-8 bg-[#0c1726] p-5 md:flex md:items-center md:justify-between">
      <div><p className="text-sm font-bold text-white">Заполнение анкеты</p><p className="mt-1 text-sm text-slate-400">Можно отправить повторно, пока PFA не подтвердило данные.</p></div>
      <div className="mt-4 min-w-56 md:mt-0"><div className="flex justify-between text-xs text-slate-400"><span>Готовность</span><span>{progress}%</span></div><div className="mt-2 h-1.5 bg-white/10"><div className="h-full bg-[#00b846] transition-[width]" style={{ width: `${progress}%` }} /></div></div>
    </div>

    <QuestionSection title="Основные данные" description="Укажите данные точно так, как они должны отображаться в CRM.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="ФИО" wide><input className="crm-input" required name="fullName" maxLength={240} defaultValue={initial.fullName ?? initial.linkedPlayerName ?? ""} placeholder="Фамилия Имя Отчество" /></Field>
        <Field label="Дата рождения"><input className="crm-input" required name="birthDate" type="date" defaultValue={initial.birthDate?.slice(0, 10) ?? ""} /></Field>
        <Field label="Гражданство"><input className="crm-input" required name="citizenship" maxLength={120} defaultValue={initial.citizenship ?? ""} /></Field>
        <Field label="Рост, см"><input className="crm-input" required name="height" type="number" min={120} max={230} defaultValue={initial.height ?? ""} /></Field>
        <Field label="Вес, кг"><input className="crm-input" required name="weight" type="number" min={35} max={180} defaultValue={initial.weight ?? ""} /></Field>
        <Field label="Рабочая нога"><select className="crm-input" required name="preferredFoot" defaultValue={initial.preferredFoot ?? ""}><option value="" disabled>Выберите</option><option>Правая</option><option>Левая</option><option>Обе</option></select></Field>
        <Field label="Телефон или Telegram"><input className="crm-input" required name="contact" maxLength={180} defaultValue={initial.contact ?? ""} placeholder="+7… или @username" /></Field>
      </div>
    </QuestionSection>

    <QuestionSection title="Фотография" description="Одна портретная фотография. Мы автоматически уменьшим её размер перед отправкой.">
      <div className="grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
        <div className="aspect-[4/5] overflow-hidden bg-[#050b14]">{photoPreview ? <Image unoptimized width={220} height={275} src={photoPreview} alt="Предпросмотр фотографии" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-center text-slate-500"><FileImage className="mx-auto" size={34} /><span className="mt-3 block text-xs">Предпросмотр</span></div>}</div>
        <div><label className="inline-flex min-h-12 cursor-pointer items-center gap-2 bg-white px-5 text-sm font-extrabold text-[#050b14] hover:bg-slate-100"><FileImage size={18} />{photoBusy ? "Сжимаем…" : photoSize ? "Заменить фотографию" : "Выбрать фотографию"}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={onPhoto} disabled={photoBusy} /></label><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">JPEG, PNG или WebP. На сервер уйдёт WebP не больше 320 КБ — оригинал не загружается.{photoSize ? ` Подготовлено: ${Math.ceil(photoSize / 1024)} КБ.` : initial.hasPhoto ? " Ранее загруженная фотография сохранена." : ""}</p></div>
      </div>
    </QuestionSection>

    <QuestionSection title="Игровой профиль" description="Выберите все позиции, на которых вы готовы играть.">
      <div className="flex flex-wrap gap-2">{POSITIONS.map((position) => <button key={position} type="button" onClick={() => togglePosition(position)} className={`min-h-11 px-4 text-sm font-bold ${positions.includes(position) ? "bg-[#00b846] text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{positions.includes(position) && <Check className="mr-2 inline" size={15} />}{position}</button>)}</div>
      <Field label="Игра за клубы" wide className="mt-6"><textarea required name="clubs" rows={5} maxLength={8000} defaultValue={initial.clubs ?? ""} className="crm-input min-h-36 resize-y py-3" placeholder="Клуб, город, страна, период выступления — каждый клуб с новой строки" /></Field>
    </QuestionSection>

    <QuestionSection title="Материалы и достижения" description="Добавляйте ссылки, сами видео на сайт не загружаются.">
      <div className="space-y-3">{videoLinks.map((link, index) => <div className="flex gap-2" key={index}><label className="relative flex-1"><span className="sr-only">Ссылка на видео {index + 1}</span><Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} /><input type="url" value={link} onChange={(event) => setVideoLinks((current) => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} className="crm-input pl-11" placeholder="https://youtube.com/…" /></label>{videoLinks.length > 1 && <button type="button" aria-label="Удалить ссылку" onClick={() => setVideoLinks((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="grid size-12 place-items-center bg-white/5 text-slate-400 hover:text-white"><Trash2 size={18} /></button>}</div>)}</div>
      {videoLinks.length < 8 && <button type="button" onClick={() => setVideoLinks((current) => [...current, ""])} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#39d873]"><Plus size={17} />Добавить ссылку</button>}
      <div className="mt-6 grid gap-5">
        <Field label="Ссылка на Transfermarkt"><input type="url" name="transfermarktUrl" defaultValue={initial.transfermarktUrl ?? ""} className="crm-input" placeholder="https://www.transfermarkt…" /></Field>
        <Field label="Достижения"><textarea name="achievements" rows={4} maxLength={10000} defaultValue={initial.achievements ?? ""} className="crm-input min-h-32 resize-y py-3" /></Field>
        <Field label="Индивидуальные особенности"><textarea required name="individualFeatures" rows={5} maxLength={10000} defaultValue={initial.individualFeatures ?? ""} className="crm-input min-h-36 resize-y py-3" placeholder="Сильные стороны, стиль игры, скорость, видение поля, лидерские качества…" /></Field>
      </div>
    </QuestionSection>

    <div className="mt-6 bg-[#0c1726] p-6"><label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-300"><input required name="consent" type="checkbox" defaultChecked={initial.consent} className="mt-1 size-4 accent-[#00b846]" /><span>Я подтверждаю достоверность данных и даю согласие на обработку персональных данных для работы PFA с моей анкетой.</span></label>{message && <p className="mt-4 text-sm font-semibold text-red-300">{message}</p>}<button type="submit" disabled={submitting || photoBusy} className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 bg-[#00b846] px-7 text-sm font-extrabold text-white hover:bg-[#00a63e] disabled:opacity-50 md:w-auto">{submitting ? <LoaderCircle className="animate-spin" size={19} /> : <Send size={19} />}{submitting ? "Отправляем…" : "Отправить анкету"}</button></div>
  </form>;
}

function QuestionSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <section className="mb-6 bg-[#0c1726] p-6 md:p-8"><header className="mb-6"><h2 className="text-2xl font-extrabold tracking-[-.03em] text-white">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p></header>{children}</section>; }
function Field({ label, children, wide = false, className = "" }: { label: string; children: React.ReactNode; wide?: boolean; className?: string }) { return <label className={`block ${wide ? "md:col-span-2" : ""} ${className}`}><span className="mb-2 block text-sm font-bold text-slate-200">{label}</span>{children}</label>; }
function StatusPanel({ title, text }: { title: string; text: string }) { return <div className="mx-auto my-12 max-w-2xl bg-[#0c1726] p-8 text-center md:p-12"><span className="mx-auto grid size-14 place-items-center rounded-full bg-[#00b846] text-white"><Check size={26} /></span><h1 className="mt-6 text-3xl font-extrabold tracking-[-.04em] text-white">{title}</h1><p className="mx-auto mt-3 max-w-lg text-base leading-7 text-slate-400">{text}</p></div>; }

async function compressPhoto(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Выберите фотографию в формате JPEG, PNG или WebP.");
  if (file.size > 15 * 1024 * 1024) throw new Error("Исходная фотография слишком большая. Максимум 15 МБ.");
  const bitmap = await createImageBitmap(file);
  let scale = Math.min(1, 1400 / bitmap.width, 1800 / bitmap.height);
  let quality = 0.78;
  let blob: Blob | null = null;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const width = Math.max(320, Math.round(bitmap.width * scale));
    const height = Math.max(400, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Браузер не смог обработать фотографию.");
    context.fillStyle = "#ffffff"; context.fillRect(0, 0, width, height); context.drawImage(bitmap, 0, 0, width, height);
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
    if (blob && blob.size <= MAX_PHOTO_BYTES) break;
    scale *= 0.82; quality = Math.max(0.58, quality - 0.05);
  }
  bitmap.close();
  if (!blob || blob.size > MAX_PHOTO_BYTES) throw new Error("Не удалось сжать фотографию до 320 КБ. Выберите другое изображение.");
  const dataUrl = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(new Error("Не удалось прочитать фотографию.")); reader.readAsDataURL(blob); });
  return { dataUrl, size: blob.size, fileName: `${file.name.replace(/\.[^.]+$/, "").slice(0, 120) || "player"}.webp` };
}
