import PlayerCard from "@/components/players/PlayerCard";
import type { Player } from "@/types/player";

interface Props { players: Player[]; }

export default function PlayersGrid({ players }: Props) {
  return <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">{players.map((player) => <PlayerCard key={player.id} player={player} />)}</div>;
}
