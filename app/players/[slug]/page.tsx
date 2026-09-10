import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlayerProfile from "@/components/players/PlayerProfile";
import StructuredData from "@/components/layout/StructuredData";
import { getPlayerBySlug } from "@/data/players";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData, playerProfileStructuredData } from "@/lib/structured-data";
interface Props { params: Promise<{ slug: string }>; }
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> { const player = await getPlayerBySlug((await params).slug); return player ? createPageMetadata({ title: player.name, description: `${player.name} — ${player.position ?? "игрок"}, ${player.country ?? "PFA"}. Профиль игрока Премьер Футбольного Агентства.`, path: `/players/${player.slug}`, image: player.image, keywords: [player.name, player.position ?? "футболист", player.country ?? "PFA"] }) : { title: "Игрок" }; }
export default async function PlayerPage({ params }: Props) { const player = await getPlayerBySlug((await params).slug); if (!player) notFound(); return <><StructuredData data={playerProfileStructuredData(player, "ru")} /><StructuredData data={breadcrumbStructuredData([["Главная", "/"], ["Игроки", "/players"], [player.name, `/players/${player.slug}`]])} /><PlayerProfile player={player} /></>; }
