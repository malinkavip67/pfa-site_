import type { Metadata } from "next";
import Services from "@/components/home/Services";
import { englishServices } from "@/data/english";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Premier Football Agency expertise across transfers, contracts, scouting, legal support, personal branding and marketing.",
  path: "/en/services",
  keywords: ["football agency services", "football transfers", "football scouting", "player representation", "PFA"],
});

export default function EnglishServicesPage() {
  return <Services services={englishServices} locale="en" />;
}
