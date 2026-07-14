import PlayerCard from "@/components/players/PlayerCard";
import type { Player } from "@/types/player";
import type { Locale } from "@/lib/i18n";

interface Props { players: Player[]; locale?: Locale; }

export default function PlayersGrid({ players, locale = "ru" }: Props) {
  return <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">{players.map((player) => <PlayerCard key={player.id} player={player} locale={locale} />)}</div>;
}
