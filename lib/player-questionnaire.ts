import "server-only";

import type { PlayerQuestionnaireRecord } from "@/types/player-questionnaire";

export const QUESTIONNAIRE_PHOTO_MAX_BYTES = 320 * 1024;
export const QUESTIONNAIRE_VIDEO_MAX = 8;

const HTTP_URL = /^https?:\/\//i;
const POSITIONS = new Set(["ФРВ", "ЛВ", "ПВ", "ЦАП", "ЦП", "ЦОП", "ПФЗ", "ЛФЗ", "ЦЗ", "ВРТ"]);

function requiredText(value: unknown, label: string, max: number) {
  if (typeof value !== "string") return { error: `${label}: обязательное поле.` };
  const text = value.trim();
  if (!text) return { error: `${label}: обязательное поле.` };
  if (text.length > max) return { error: `${label}: слишком длинное значение.` };
  return { value: text };
}

function optionalText(value: unknown, label: string, max: number) {
  if (value === null || value === undefined || value === "") return { value: null };
  if (typeof value !== "string") return { error: `${label}: некорректное значение.` };
  const text = value.trim();
  if (text.length > max) return { error: `${label}: слишком длинное значение.` };
  return { value: text || null };
}

function requiredInteger(value: unknown, label: string, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    return { error: `${label}: укажите число от ${min} до ${max}.` };
  }
  return { value: parsed };
}

function requiredDate(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { error: "Дата рождения: укажите корректную дату." };
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  const now = new Date();
  if (Number.isNaN(date.getTime()) || date > now || date.getUTCFullYear() < 1940) {
    return { error: "Дата рождения: укажите корректную дату." };
  }
  return { value: date };
}

function optionalHttpUrl(value: unknown, label: string) {
  const field = optionalText(value, label, 2_000);
  if ("error" in field || !field.value) return field;
  try {
    const url = new URL(field.value);
    if (!HTTP_URL.test(url.href)) throw new Error();
    return { value: url.href };
  } catch {
    return { error: `${label}: укажите ссылку, начинающуюся с http:// или https://.` };
  }
}

function photoFromDataUrl(value: unknown, fileName: unknown) {
  if (value === null || value === undefined || value === "") {
    return { value: null };
  }
  if (typeof value !== "string") return { error: "Фотография: некорректный файл." };
  const match = /^data:(image\/(?:webp|jpeg));base64,([A-Za-z0-9+/=]+)$/.exec(value);
  if (!match) return { error: "Фотография: поддерживаются WebP и JPEG." };
  const data = Buffer.from(match[2], "base64");
  if (!data.length || data.length > QUESTIONNAIRE_PHOTO_MAX_BYTES) {
    return { error: "Фотография: после сжатия файл должен быть не больше 320 КБ." };
  }
  const isWebp = data.length > 12 && data.subarray(0, 4).toString("ascii") === "RIFF" && data.subarray(8, 12).toString("ascii") === "WEBP";
  const isJpeg = data.length > 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  if ((!isWebp && match[1] === "image/webp") || (!isJpeg && match[1] === "image/jpeg")) {
    return { error: "Фотография: содержимое файла не соответствует формату." };
  }
  const normalizedName = typeof fileName === "string" ? fileName.trim().slice(0, 180) : "player-photo.webp";
  return { value: { data, mimeType: match[1], fileName: normalizedName || "player-photo.webp", size: data.length } };
}

export function validateQuestionnaireSubmission(body: unknown) {
  if (!body || typeof body !== "object") return { error: "Некорректные данные анкеты." };
  const payload = body as Record<string, unknown>;
  const fullName = requiredText(payload.fullName, "ФИО", 240);
  const birthDate = requiredDate(payload.birthDate);
  const citizenship = requiredText(payload.citizenship, "Гражданство", 120);
  const height = requiredInteger(payload.height, "Рост", 120, 230);
  const weight = requiredInteger(payload.weight, "Вес", 35, 180);
  const preferredFoot = requiredText(payload.preferredFoot, "Рабочая нога", 30);
  const clubs = requiredText(payload.clubs, "Игра за клубы", 8_000);
  const achievements = optionalText(payload.achievements, "Достижения", 10_000);
  const individualFeatures = requiredText(payload.individualFeatures, "Индивидуальные особенности", 10_000);
  const contact = requiredText(payload.contact, "Контакт", 180);
  const transfermarktUrl = optionalHttpUrl(payload.transfermarktUrl, "Transfermarkt");
  const photo = photoFromDataUrl(payload.photoDataUrl, payload.photoFileName);

  const positions = Array.isArray(payload.positions)
    ? [...new Set(payload.positions.filter((item): item is string => typeof item === "string" && POSITIONS.has(item)))].slice(0, 10)
    : [];
  const videoLinks = Array.isArray(payload.videoLinks)
    ? payload.videoLinks.filter((item): item is string => typeof item === "string" && item.trim() !== "").slice(0, QUESTIONNAIRE_VIDEO_MAX)
    : [];

  const invalid = [fullName, birthDate, citizenship, height, weight, preferredFoot, clubs, achievements, individualFeatures, contact, transfermarktUrl, photo]
    .find((field) => "error" in field);
  if (invalid && "error" in invalid) return invalid;
  if (positions.length === 0) return { error: "Выберите хотя бы одну позицию на поле." };
  for (const link of videoLinks) {
    const checked = optionalHttpUrl(link, "Видеоматериалы");
    if ("error" in checked) return checked;
  }
  if (!payload.consent) return { error: "Необходимо согласие на обработку персональных данных." };

  return {
    data: {
      fullName: fullName.value!,
      birthDate: birthDate.value!,
      citizenship: citizenship.value!,
      height: height.value!,
      weight: weight.value!,
      preferredFoot: preferredFoot.value!,
      positions,
      clubs: clubs.value!,
      videoLinks: videoLinks.map((link) => new URL(link.trim()).href),
      transfermarktUrl: transfermarktUrl.value,
      achievements: achievements.value,
      individualFeatures: individualFeatures.value!,
      contact: contact.value!,
      consent: true,
      photo: photo.value,
    },
  };
}

export function toQuestionnaireRecord(row: Record<string, unknown>): PlayerQuestionnaireRecord {
  return {
    id: String(row.id),
    token: String(row.token),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt),
    submittedAt: row.submittedAt ? String(row.submittedAt) : null,
    confirmedAt: row.confirmedAt ? String(row.confirmedAt) : null,
    status: row.status as PlayerQuestionnaireRecord["status"],
    fullName: typeof row.fullName === "string" ? row.fullName : null,
    birthDate: row.birthDate ? String(row.birthDate) : null,
    citizenship: typeof row.citizenship === "string" ? row.citizenship : null,
    height: typeof row.height === "number" ? row.height : null,
    weight: typeof row.weight === "number" ? row.weight : null,
    preferredFoot: typeof row.preferredFoot === "string" ? row.preferredFoot : null,
    positions: Array.isArray(row.positions) ? row.positions.map(String) : [],
    clubs: typeof row.clubs === "string" ? row.clubs : null,
    videoLinks: Array.isArray(row.videoLinks) ? row.videoLinks.map(String) : [],
    transfermarktUrl: typeof row.transfermarktUrl === "string" ? row.transfermarktUrl : null,
    achievements: typeof row.achievements === "string" ? row.achievements : null,
    individualFeatures: typeof row.individualFeatures === "string" ? row.individualFeatures : null,
    contact: typeof row.contact === "string" ? row.contact : null,
    consent: row.consent === true,
    photoMimeType: typeof row.photoMimeType === "string" ? row.photoMimeType : null,
    photoFileName: typeof row.photoFileName === "string" ? row.photoFileName : null,
    photoSize: typeof row.photoSize === "number" ? row.photoSize : null,
    linkedPlayerId: typeof row.linkedPlayerId === "string" ? row.linkedPlayerId : null,
    linkedPlayerName: typeof row.linkedPlayerName === "string" ? row.linkedPlayerName : null,
    hasPhoto: row.photoSize !== null && row.photoSize !== undefined,
  };
}

export const QUESTIONNAIRE_SELECT = `q."id",q."token",q."createdAt",q."updatedAt",q."submittedAt",q."confirmedAt",q."status",q."fullName",q."birthDate",q."citizenship",q."height",q."weight",q."preferredFoot",q."positions",q."clubs",q."videoLinks",q."transfermarktUrl",q."achievements",q."individualFeatures",q."contact",q."consent",q."photoMimeType",q."photoFileName",q."photoSize",q."linkedPlayerId"`;
