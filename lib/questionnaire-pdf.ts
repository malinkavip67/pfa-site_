import "server-only";

import path from "node:path";
import PDFDocument from "pdfkit";

interface QuestionnairePdfData {
  id: string;
  fullName: string | null;
  birthDate: Date | string | null;
  citizenship: string | null;
  height: number | null;
  weight: number | null;
  preferredFoot: string | null;
  positions: string[];
  clubs: string | null;
  videoLinks: string[];
  transfermarktUrl: string | null;
  achievements: string | null;
  individualFeatures: string | null;
  contact: string | null;
  confirmedAt: Date | string | null;
  photoData: Buffer | null;
}

const COLORS = { background: "#050B14", panel: "#0C1726", text: "#FFFFFF", muted: "#A9B7CA", accent: "#00B846" };

export async function createQuestionnairePdf(data: QuestionnairePdfData) {
  const doc = new PDFDocument({ size: "A4", margin: 42, bufferPages: true, info: { Title: `Анкета игрока - ${data.fullName ?? "PFA"}`, Author: "Premier Football Agency" } });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk: Buffer) => chunks.push(chunk));
  const completed = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  const fontPath = path.join(process.cwd(), "styles", "fonts", "Ubuntu-R.ttf");
  doc.registerFont("PfaPdf", fontPath);
  doc.font("PfaPdf");
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.background);

  const left = 42;
  const right = doc.page.width - 42;
  doc.fillColor(COLORS.accent).fontSize(13).text("PFA", left, 38, { continued: true });
  doc.fillColor(COLORS.muted).fontSize(9).text("  PREMIER FOOTBALL AGENCY");
  doc.fillColor(COLORS.text).fontSize(24).text("Анкета футболиста", left, 72);
  doc.fillColor(COLORS.muted).fontSize(9).text(`Подтверждена CRM · ${formatDate(data.confirmedAt)} · № ${data.id.slice(-8).toUpperCase()}`, left, 106);

  let contentTop = 136;
  if (data.photoData) {
    try {
      doc.image(data.photoData, right - 112, 70, { fit: [112, 138], align: "center", valign: "center" });
      contentTop = 222;
    } catch {
      // The PDF remains useful if an uncommon image codec cannot be embedded.
    }
  }

  const newPage = () => {
    doc.addPage({ size: "A4", margin: 42 });
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.background);
    doc.fillColor(COLORS.accent).fontSize(10).text("PFA · Анкета футболиста", left, 30);
    return 58;
  };
  const ensure = (height: number, currentY: number) => currentY + height > doc.page.height - 48 ? newPage() : currentY;
  const field = (label: string, value: string, x: number, y: number, width: number) => {
    doc.fillColor(COLORS.muted).fontSize(8).text(label, x, y, { width });
    doc.fillColor(COLORS.text).fontSize(11).text(value || "—", x, y + 14, { width, lineGap: 2 });
  };
  const section = (title: string, value: string, y: number) => {
    y = ensure(72, y);
    doc.fillColor(COLORS.accent).fontSize(10).text(title, left, y);
    const textTop = y + 18;
    doc.fillColor(COLORS.text).fontSize(10.5).text(value || "—", left, textTop, { width: right - left, lineGap: 4 });
    return doc.y + 18;
  };

  let y = contentTop;
  doc.roundedRect(left, y, right - left, 112, 6).fill(COLORS.panel);
  const col = (right - left - 36) / 3;
  field("ФИО", data.fullName ?? "—", left + 14, y + 14, col * 2);
  field("Дата рождения", formatDate(data.birthDate), left + 14, y + 64, col);
  field("Гражданство", data.citizenship ?? "—", left + 14 + col, y + 64, col);
  field("Контакт", data.contact ?? "—", left + 14 + col * 2, y + 64, col);
  y += 132;

  doc.roundedRect(left, y, right - left, 66, 6).fill(COLORS.panel);
  field("Рост", data.height ? `${data.height} см` : "—", left + 14, y + 12, col);
  field("Вес", data.weight ? `${data.weight} кг` : "—", left + 14 + col, y + 12, col);
  field("Рабочая нога", data.preferredFoot ?? "—", left + 14 + col * 2, y + 12, col);
  y += 86;

  y = section("Позиции на поле", data.positions.join(", "), y);
  y = section("Игра за клубы", data.clubs ?? "—", y);
  y = section("Достижения", data.achievements ?? "—", y);
  y = section("Индивидуальные особенности", data.individualFeatures ?? "—", y);

  y = ensure(80, y);
  doc.fillColor(COLORS.accent).fontSize(10).text("Видеоматериалы", left, y);
  y += 18;
  if (data.videoLinks.length === 0) {
    doc.fillColor(COLORS.text).fontSize(10.5).text("—", left, y);
    y = doc.y + 14;
  } else {
    data.videoLinks.forEach((link, index) => {
      y = ensure(28, y);
      doc.fillColor(COLORS.text).fontSize(9.5).text(`${index + 1}. ${link}`, left, y, { width: right - left, link, underline: true });
      y = doc.y + 9;
    });
  }
  if (data.transfermarktUrl) {
    y = ensure(44, y);
    doc.fillColor(COLORS.accent).fontSize(10).text("Transfermarkt", left, y);
    doc.fillColor(COLORS.text).fontSize(9.5).text(data.transfermarktUrl, left, y + 18, { width: right - left, link: data.transfermarktUrl, underline: true });
  }

  const range = doc.bufferedPageRange();
  for (let index = range.start; index < range.start + range.count; index += 1) {
    doc.switchToPage(index);
    doc.fillColor(COLORS.muted).fontSize(8).text(`PFA · Конфиденциально · ${index + 1}/${range.count}`, left, doc.page.height - 32, { width: right - left, align: "right" });
  }
  doc.end();
  return completed;
}

function formatDate(value: Date | string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Moscow" }).format(date);
}
