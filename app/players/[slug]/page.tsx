import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlayerProfile from "@/components/players/PlayerProfile";
import { players } from "@/data/players";
import { createPageMetadata } from "@/lib/metadata";

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams(): { slug: string }[] { return players.map((player) => ({ slug: player.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = players.find((item) => item.slug === slug);
  if (!player) return { title: "Игрок" };
  return createPageMetadata({ title: player.name, description: `${player.name} — ${player.position}, ${player.country}. Профиль игрока Premier Football Agency.`, path: `/players/${player.slug}`, image: player.image, keywords: [player.name, player.position, player.country, "футболист PFA"] });
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = players.find((item) => item.slug === slug);
  if (!player) notFound();
  return <PlayerProfile player={player} />;
}
