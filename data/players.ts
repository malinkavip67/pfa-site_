import type { Player } from "@/types/player";

export const players: Player[] = [
  { id: "01", name: "Алекс Марин", position: "Полузащитник", club: "Madrid", country: "Испания", age: 24, height: 184, weight: 78, image: "/images/players/player-tunnel.png", slug: "alex-marin" },
  { id: "02", name: "Марк Беннет", position: "Нападающий", club: "London", country: "Англия", age: 22, height: 188, weight: 82, image: "/images/players/player-tunnel.png", slug: "mark-bennet" },
  { id: "03", name: "Лука Вольф", position: "Защитник", club: "Berlin", country: "Германия", age: 25, height: 191, weight: 86, image: "/images/players/player-tunnel.png", slug: "luka-wolf" },
];

export async function getPlayers(): Promise<Player[]> {
  return players;
}
