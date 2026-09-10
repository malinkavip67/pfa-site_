import type { Metadata } from "next";
import Services from "@/components/home/Services";
import ServiceDetails from "@/components/services/ServiceDetails";
import CTA from "@/components/home/CTA";
import StructuredData from "@/components/layout/StructuredData";
import { englishServices } from "@/data/english";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData, serviceCatalogStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Premier Football Agency expertise across transfers, contracts, scouting, legal support, personal branding and marketing.",
  path: "/en/services",
  keywords: ["football agency services", "football transfers", "football scouting", "player representation", "PFA"],
});

export default function EnglishServicesPage() {
  return <><StructuredData data={serviceCatalogStructuredData.en} /><StructuredData data={breadcrumbStructuredData([["Home", "/en"], ["Services", "/en/services"]])} /><Services services={englishServices} locale="en" /><ServiceDetails locale="en" /><CTA locale="en" /></>;
}
