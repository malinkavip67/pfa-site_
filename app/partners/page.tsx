import type { Metadata } from "next";
import PartnersGrid from "@/components/partners/PartnersGrid";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { partners } from "@/data/partners";

export const metadata: Metadata = { title: "Партнёры" };

export default function PartnersPage() {
  return <><PageHero eyebrow="Экосистема" title="Партнёры" description="Международная сеть экспертов, клубов и брендов для решений без компромиссов." /><Container className="py-24"><PartnersGrid partners={partners} /></Container></>;
}
