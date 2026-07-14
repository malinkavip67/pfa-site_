import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlayerProfile from "@/components/players/PlayerProfile";
import { englishPlayers } from "@/data/english";
import { createPageMetadata } from "@/lib/metadata";

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams(): { slug: string }[] { return englishPlayers.map((player) => ({ slug: player.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = englishPlayers.find((item) => item.slug === slug);
  if (!player) return { title: "Player" };
  return createPageMetadata({ title: player.name, description: `${player.name} — ${player.position}, ${player.country}. Premier Football Agency player profile.`, path: `/en/players/${player.slug}`, image: player.image, keywords: [player.name, player.position, player.country, "PFA player"] });
}

export default async function EnglishPlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = englishPlayers.find((item) => item.slug === slug);
  if (!player) notFound();
  return <PlayerProfile player={player} locale="en" />;
}
