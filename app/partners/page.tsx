import type { Metadata } from "next";
import PartnersGrid from "@/components/partners/PartnersGrid";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { partners } from "@/data/partners";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Партнёры", description: "Международная партнёрская экосистема PFA в области права, аналитики, медиа и спортивной подготовки.", path: "/partners", keywords: ["партнёры футбольного агентства", "спортивное право", "футбольная аналитика", "спортивные партнёрства"] });

export default function PartnersPage() {
  return <><PageHero eyebrow="Экосистема" title="Партнёры" description="Международная сеть экспертов, клубов и брендов для решений без компромиссов." /><Container className="py-24"><PartnersGrid partners={partners} /></Container></>;
}
