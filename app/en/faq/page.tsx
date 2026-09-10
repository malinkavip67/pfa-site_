import type { Metadata } from "next";
import AudienceFAQ from "@/components/home/AudienceFAQ";
import StructuredData from "@/components/layout/StructuredData";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData, faqStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Questions and answers",
  description: "Premier Football Agency answers common questions from players and parents about applications, assessment, cooperation and career support.",
  path: "/en/faq",
  keywords: ["football agent questions", "football agency application", "PFA FAQ", "football agent for young player"],
});

export default function EnglishFAQPage() {
  return <><StructuredData data={faqStructuredData.en} /><StructuredData data={breadcrumbStructuredData([["Home", "/en"], ["Questions and answers", "/en/faq"]])} /><AudienceFAQ locale="en" standalone /></>;
}
