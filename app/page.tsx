import About from "@/components/home/About";
import CallToAction from "@/components/home/CallToAction";
import FeaturedPlayers from "@/components/home/FeaturedPlayers";
import FeatureStatement from "@/components/home/FeatureStatement";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import { partners } from "@/data/partners";
import { getPlayers } from "@/data/players";
import { services } from "@/data/services";

export default async function HomePage() {
  const players = await getPlayers();
  return <><Hero /><About /><Stats /><FeatureStatement /><Services services={services} /><FeaturedPlayers players={players} /><Partners partners={partners} /><CallToAction /></>;
}
