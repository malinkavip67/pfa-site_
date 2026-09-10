import type { Metadata } from "next";
import AudienceFAQ from "@/components/home/AudienceFAQ";
import StructuredData from "@/components/layout/StructuredData";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData, faqStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Как обратиться к футбольному агенту — вопросы и ответы",
  description: "Ответы Премьер Футбольного Агентства на частые вопросы игроков и родителей о заявке, оценке, сотрудничестве и карьерном сопровождении.",
  path: "/faq",
  keywords: ["вопросы футбольному агенту", "заявка в футбольное агентство", "PFA вопросы", "футбольный агент для подростка"],
});

export default function FAQPage() {
  return <><StructuredData data={faqStructuredData.ru} /><StructuredData data={breadcrumbStructuredData([["Главная", "/"], ["Вопросы и ответы", "/faq"]])} /><AudienceFAQ standalone /></>;
}
