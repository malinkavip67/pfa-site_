import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlayerProfile from "@/components/players/PlayerProfile";
import StructuredData from "@/components/layout/StructuredData";
import { getPlayerBySlug } from "@/data/players";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData, playerProfileStructuredData } from "@/lib/structured-data";
interface Props { params: Promise<{ slug: string }>; }
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> { const player = await getPlayerBySlug((await params).slug); return player ? createPageMetadata({ title: player.name, description: `${player.name} — ${player.position ?? "player"}, ${player.country ?? "PFA"}. Premier Football Agency player profile.`, path: `/en/players/${player.slug}`, image: player.image, keywords: [player.name, player.position ?? "player", player.country ?? "PFA"] }) : { title: "Player" }; }
export default async function EnglishPlayerPage({ params }: Props) { const player = await getPlayerBySlug((await params).slug); if (!player) notFound(); return <><StructuredData data={playerProfileStructuredData(player, "en")} /><StructuredData data={breadcrumbStructuredData([["Home", "/en"], ["Players", "/en/players"], [player.name, `/en/players/${player.slug}`]])} /><PlayerProfile player={player} locale="en" /></>; }
