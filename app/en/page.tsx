import type { Metadata } from "next";
import About from "@/components/home/About";
import AudiencePaths from "@/components/home/AudiencePaths";
import CTA from "@/components/home/CTA";
import FeaturedPlayers from "@/components/home/FeaturedPlayers";
import FeatureStatement from "@/components/home/FeatureStatement";
import Hero from "@/components/home/Hero";
import HeroStats from "@/components/home/HeroStats";
import Partners from "@/components/home/Partners";
import PlayerJourney from "@/components/home/PlayerJourney";
import Services from "@/components/home/Services";
import { englishAboutDirections, englishPartners, englishPlayers, englishServices, englishStats } from "@/data/english";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "We create champions",
  description: "International football agency providing career strategy, transfers, personal branding and professional player support.",
  path: "/en",
  keywords: ["football agency", "football agent", "player transfers", "football career management", "PFA"],
});

interface EnglishHomePageProps {
  searchParams: Promise<{ application?: string | string[] }>;
}

export default async function EnglishHomePage({ searchParams }: EnglishHomePageProps) {
  const requestedApplication = (await searchParams).application;
  const initialAudience = requestedApplication === "parent" ? "parent" : requestedApplication === "player" ? "player" : null;

  return <><Hero locale="en" /><HeroStats stats={englishStats} locale="en" /><About directions={englishAboutDirections} locale="en" /><FeatureStatement locale="en" /><PlayerJourney locale="en" /><AudiencePaths key={initialAudience ?? "closed"} locale="en" initialAudience={initialAudience} /><Services services={englishServices} locale="en" /><FeaturedPlayers players={englishPlayers} locale="en" /><Partners partners={englishPartners} locale="en" /><CTA locale="en" /></>;
}
