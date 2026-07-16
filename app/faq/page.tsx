import type { Metadata } from "next";
import AudienceFAQ from "@/components/home/AudienceFAQ";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Вопросы и ответы",
  description: "Ответы Premier Football Agency на частые вопросы игроков и родителей о заявке, оценке, сотрудничестве и карьерном сопровождении.",
  path: "/faq",
  keywords: ["вопросы футбольному агенту", "заявка в футбольное агентство", "PFA вопросы", "футбольный агент для подростка"],
});

export default function FAQPage() {
  return <AudienceFAQ standalone />;
}
