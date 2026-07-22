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
import { partners } from "@/data/partners";
import { getPlayers } from "@/data/players";
import { aboutDirections, services } from "@/data/services";
import { stats } from "@/data/stats";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Мы создаём чемпионов",
  description: "Международное футбольное агентство: стратегия карьеры, трансферы, персональный бренд и профессиональная поддержка игроков.",
  path: "/",
  keywords: ["футбольное агентство", "футбольный агент", "трансферы футболистов", "карьера футболиста", "PFA"],
});

interface HomePageProps {
  searchParams: Promise<{ application?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const requestedApplication = (await searchParams).application;
  const initialAudience = requestedApplication === "parent" ? "parent" : requestedApplication === "player" ? "player" : null;
  const players = await getPlayers();
  return <><Hero /><HeroStats stats={stats} /><About directions={aboutDirections} /><FeatureStatement /><PlayerJourney /><AudiencePaths key={initialAudience ?? "closed"} initialAudience={initialAudience} /><Services services={services} /><FeaturedPlayers players={players} /><Partners partners={partners} /><CTA /></>;
}
