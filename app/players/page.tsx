import type { Metadata } from "next";
import PlayersGrid from "@/components/players/PlayersGrid";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getPlayers } from "@/data/players";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Игроки", description: "Профессиональные футболисты Premier Football Agency: талант, характер и долгосрочная стратегия карьеры.", path: "/players", keywords: ["футболисты PFA", "профессиональные футболисты", "футбольные таланты", "представительство игроков"] });

export default async function PlayersPage() {
  const players = await getPlayers();
  return <><PageHero eyebrow="Команда PFA" title="Игроки" description="Представляем талант, характер и амбиции. Каждое решение подчинено одной цели — долгой карьере на высшем уровне." /><Container className="py-24"><PlayersGrid players={players} /></Container></>;
}
