import PlayerCard from "@/components/players/PlayerCard";
import type { Player } from "@/types/player";
import type { Locale } from "@/lib/i18n";

interface Props { players: Player[]; locale?: Locale; }

export default function PlayersGrid({ players, locale = "ru" }: Props) {
  if (players.length === 0) return <div className="border border-white/10 bg-[#08111d] p-10 text-center text-sm text-slate-300">{locale === "ru" ? "Опубликованных игроков пока нет." : "No published players yet."}</div>;
  return <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">{players.map((player) => <PlayerCard key={player.id} player={player} locale={locale} />)}</div>;
}
