import "server-only";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requiredString(value: unknown, label: string, maxLength: number) {
  if (typeof value !== "string") return { error: `${label}: обязательное поле.` };
  const normalized = value.trim();
  if (!normalized) return { error: `${label}: обязательное поле.` };
  if (normalized.length > maxLength) return { error: `${label}: превышена допустимая длина.` };
  return { value: normalized };
}

function optionalString(value: unknown, label: string, maxLength: number) {
  if (value === null || value === undefined || value === "") return { value: null };
  if (typeof value !== "string") return { error: `${label}: некорректное значение.` };
  const normalized = value.trim();
  if (!normalized) return { value: null };
  if (normalized.length > maxLength) return { error: `${label}: превышена допустимая длина.` };
  return { value: normalized };
}

function optionalUrl(value: unknown, label: string, allowRelative = false) {
  const text = optionalString(value, label, 2_000);
  if ("error" in text || text.value === null) return text;
  if (allowRelative && text.value.startsWith("/")) return text;

  try {
    const parsed = new URL(text.value);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return { error: `${label}: разрешены только HTTP/HTTPS ссылки.` };
    }
    return text;
  } catch {
    return { error: `${label}: укажите корректную ссылку.` };
  }
}

function optionalPositiveInteger(value: unknown, label: string) {
  if (value === null || value === undefined || value === "") return { value: null };
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 999) {
    return { error: `${label}: укажите положительное целое число.` };
  }
  return { value: parsed };
}

function optionalDate(value: unknown, label: string) {
  if (value === null || value === undefined || value === "") return { value: null };
  if (typeof value !== "string") return { error: `${label}: некорректная дата.` };
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return { error: `${label}: некорректная дата.` };
  return { value: parsed };
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validatePlayerPayload(body: unknown) {
  if (!body || typeof body !== "object") return { error: "Некорректные данные игрока." };
  const payload = body as Record<string, unknown>;
  const firstName = requiredString(payload.firstName, "Имя", 100);
  const lastName = requiredString(payload.lastName, "Фамилия", 100);
  const slug = requiredString(payload.slug, "Slug", 160);
  const birthDate = optionalDate(payload.birthDate, "Дата рождения");
  const nationality = optionalString(payload.nationality, "Гражданство", 120);
  const city = optionalString(payload.city, "Город", 120);
  const position = optionalString(payload.position, "Позиция", 120);
  const club = optionalString(payload.club, "Клуб", 180);
  const height = optionalPositiveInteger(payload.height, "Рост");
  const weight = optionalPositiveInteger(payload.weight, "Вес");
  const preferredFoot = optionalString(payload.preferredFoot, "Рабочая нога", 50);
  const description = optionalString(payload.description, "Описание", 20_000);
  const achievements = optionalString(payload.achievements, "Достижения", 20_000);
  const photoUrl = optionalUrl(payload.photoUrl, "Фотография", true);
  const videoUrl = optionalUrl(payload.videoUrl, "Видео");
  const sortOrderValue = Number(payload.sortOrder ?? 0);

  const fields = [firstName, lastName, slug, birthDate, nationality, city, position, club, height, weight, preferredFoot, description, achievements, photoUrl, videoUrl];
  const invalid = fields.find((field) => "error" in field);
  if (invalid && "error" in invalid) return invalid;
  if (!SLUG_PATTERN.test(slug.value!)) {
    return { error: "Slug может содержать только латинские буквы, цифры и дефисы." };
  }
  if (!Number.isInteger(sortOrderValue) || Math.abs(sortOrderValue) > 1_000_000) {
    return { error: "Порядок отображения должен быть целым числом." };
  }

  return {
    data: {
      firstName: firstName.value!,
      lastName: lastName.value!,
      slug: slug.value!,
      birthDate: birthDate.value,
      nationality: nationality.value,
      city: city.value,
      position: position.value,
      club: club.value,
      height: height.value,
      weight: weight.value,
      preferredFoot: preferredFoot.value,
      description: description.value,
      achievements: achievements.value,
      photoUrl: photoUrl.value,
      videoUrl: videoUrl.value,
      isPublished: payload.isPublished === true,
      sortOrder: sortOrderValue,
    },
  };
}

export function validateNewsPayload(body: unknown) {
  if (!body || typeof body !== "object") return { error: "Некорректные данные новости." };
  const payload = body as Record<string, unknown>;
  const title = requiredString(payload.title, "Заголовок", 250);
  const slug = requiredString(payload.slug, "Slug", 160);
  const excerpt = optionalString(payload.excerpt, "Краткое описание", 1_000);
  const content = requiredString(payload.content, "Полный текст", 50_000);
  const imageUrl = optionalUrl(payload.imageUrl, "Изображение", true);
  const publishedAt = optionalDate(payload.publishedAt, "Дата публикации");
  const fields = [title, slug, excerpt, content, imageUrl, publishedAt];
  const invalid = fields.find((field) => "error" in field);
  if (invalid && "error" in invalid) return invalid;
  if (!SLUG_PATTERN.test(slug.value!)) {
    return { error: "Slug может содержать только латинские буквы, цифры и дефисы." };
  }

  return {
    data: {
      title: title.value!,
      slug: slug.value!,
      excerpt: excerpt.value,
      content: content.value!,
      imageUrl: imageUrl.value,
      publishedAt: publishedAt.value,
      isPublished: payload.isPublished === true,
    },
  };
}

export function validateLeadershipPayload(body: unknown) {
  if (!body || typeof body !== "object") return { error: "Некорректные данные руководителя." };
  const payload = body as Record<string, unknown>;
  const firstName = optionalString(payload.firstName, "Имя", 100);
  const lastName = optionalString(payload.lastName, "Фамилия", 100);
  const position = optionalString(payload.position, "Должность", 180);
  const description = optionalString(payload.description, "Описание", 2_000);
  const photoUrl = optionalUrl(payload.photoUrl, "Фотография", true);
  const sortOrderValue = Number(payload.sortOrder ?? 0);
  const fields = [firstName, lastName, position, description, photoUrl];
  const invalid = fields.find((field) => "error" in field);
  if (invalid && "error" in invalid) return invalid;
  if (!Number.isInteger(sortOrderValue) || sortOrderValue < 1 || sortOrderValue > 3) {
    return { error: "Порядок отображения должен быть числом от 1 до 3." };
  }

  return {
    data: {
      firstName: firstName.value,
      lastName: lastName.value,
      position: position.value,
      description: description.value,
      photoUrl: photoUrl.value,
      isPublished: payload.isPublished === true,
      sortOrder: sortOrderValue,
    },
  };
}

export function validateSettingsPayload(body: unknown) {
  if (!body || typeof body !== "object") return { error: "Некорректные настройки." };
  const payload = body as Record<string, unknown>;
  const siteName = optionalString(payload.siteName, "Название сайта", 200);
  const heroTitle = optionalString(payload.heroTitle, "Заголовок", 300);
  const heroSubtitle = optionalString(payload.heroSubtitle, "Подзаголовок", 2_000);
  const heroButtonText = optionalString(payload.heroButtonText, "Текст кнопки", 100);
  const heroButtonLink = optionalUrl(payload.heroButtonLink, "Ссылка кнопки", true);
  const phone = optionalString(payload.phone, "Телефон", 80);
  const email = optionalString(payload.email, "Email", 254);
  const telegram = optionalUrl(payload.telegram, "Telegram");
  const whatsapp = optionalUrl(payload.whatsapp, "WhatsApp");
  const address = optionalString(payload.address, "Адрес", 500);
  const footerText = optionalString(payload.footerText, "Текст подвала", 2_000);
  const fields = [siteName, heroTitle, heroSubtitle, heroButtonText, heroButtonLink, phone, email, telegram, whatsapp, address, footerText];
  const invalid = fields.find((field) => "error" in field);
  if (invalid && "error" in invalid) return invalid;
  if (email.value && !EMAIL_PATTERN.test(email.value)) return { error: "Укажите корректный email." };

  return {
    data: {
      siteName: siteName.value,
      heroTitle: heroTitle.value,
      heroSubtitle: heroSubtitle.value,
      heroButtonText: heroButtonText.value,
      heroButtonLink: heroButtonLink.value,
      phone: phone.value,
      email: email.value?.toLowerCase() ?? null,
      telegram: telegram.value,
      whatsapp: whatsapp.value,
      address: address.value,
      footerText: footerText.value,
    },
  };
}
