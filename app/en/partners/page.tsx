import type { Metadata } from "next";
import PartnersGrid from "@/components/partners/PartnersGrid";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { englishPartners } from "@/data/english";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Partners", description: "PFA’s international network across law, analytics, media and performance.", path: "/en/partners", keywords: ["football agency partners", "sports law", "football analytics"] });

export default function EnglishPartnersPage() {
  return <><PageHero eyebrow="Ecosystem" title="Partners" description="An international network of experts, clubs and brands delivering solutions without compromise." /><Container className="py-24"><PartnersGrid partners={englishPartners} /></Container></>;
}
