import type { Metadata } from "next";
import Services from "@/components/home/Services";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Услуги",
  description: "Экспертиза Премьер Футбольного Агентства: трансферы, контракты, скаутинг, юридическое сопровождение, личный бренд и маркетинг.",
  path: "/services",
  keywords: ["услуги футбольного агентства", "трансферы футболистов", "футбольный скаутинг", "сопровождение футболистов", "PFA"],
});

export default function ServicesPage() {
  return <Services services={services} />;
}
