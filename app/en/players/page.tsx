import type { Metadata } from "next";
import PlayersGrid from "@/components/players/PlayersGrid";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { englishPlayers } from "@/data/english";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Players", description: "Professional footballers represented by Premier Football Agency.", path: "/en/players", keywords: ["PFA players", "professional footballers", "player representation"] });

export default function EnglishPlayersPage() {
  return <><PageHero eyebrow="PFA team" title="Players" description="Talent, character and ambition. Every decision serves one goal: a long career at the highest level." /><Container className="py-24"><PlayersGrid players={englishPlayers} locale="en" /></Container></>;
}
