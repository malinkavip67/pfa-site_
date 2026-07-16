import type { Metadata } from "next";
import AudienceFAQ from "@/components/home/AudienceFAQ";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Questions and answers",
  description: "Premier Football Agency answers common questions from players and parents about applications, assessment, cooperation and career support.",
  path: "/en/faq",
  keywords: ["football agent questions", "football agency application", "PFA FAQ", "football agent for young player"],
});

export default function EnglishFAQPage() {
  return <AudienceFAQ locale="en" standalone />;
}
