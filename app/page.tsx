import About from "@/components/home/About";
import CallToAction from "@/components/home/CallToAction";
import FeaturedPlayers from "@/components/home/FeaturedPlayers";
import FeatureStatement from "@/components/home/FeatureStatement";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import Services from "@/components/home/Services";
import { partners } from "@/data/partners";
import { getPlayers } from "@/data/players";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Мы создаём чемпионов",
  description: "Международное футбольное агентство: стратегия карьеры, трансферы, персональный бренд и профессиональная поддержка игроков.",
  path: "/",
  keywords: ["футбольное агентство", "футбольный агент", "трансферы футболистов", "карьера футболиста", "PFA"],
});

export default async function HomePage() {
  const players = await getPlayers();
  return <><Hero /><About /><FeatureStatement /><Services services={services} /><FeaturedPlayers players={players} /><Partners partners={partners} /><CallToAction /></>;
}
import type { Metadata } from "next";
