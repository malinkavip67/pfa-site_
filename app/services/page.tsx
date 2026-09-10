import type { Metadata } from "next";
import Services from "@/components/home/Services";
import ServiceDetails from "@/components/services/ServiceDetails";
import CTA from "@/components/home/CTA";
import StructuredData from "@/components/layout/StructuredData";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData, serviceCatalogStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Услуги футбольного агентства для игроков",
  description: "Сопровождение футболистов: трансферы, переговоры с клубами, контракты, скаутинг, юридическая защита, личный бренд и маркетинг.",
  path: "/services",
  keywords: ["услуги футбольного агентства", "трансферы футболистов", "футбольный скаутинг", "сопровождение футболистов", "PFA"],
});

export default function ServicesPage() {
  return <><StructuredData data={serviceCatalogStructuredData.ru} /><StructuredData data={breadcrumbStructuredData([["Главная", "/"], ["Услуги", "/services"]])} /><Services services={services} /><ServiceDetails /><CTA /></>;
}
