import type { Player } from "@/types/player";

export const players: Player[] = [
  {
    id: "01", name: "Алекс Марин", position: "Полузащитник", club: "Madrid", country: "Испания", age: 24, height: 184, weight: 78, image: "/images/players/player-card.webp", slug: "alex-marin",
    summary: "Техничный центральный полузащитник с высоким объёмом работы, точным первым пасом и умением подключаться к атаке.",
    highlights: ["Лучший бомбардир молодёжного турнира сезона 2024/25.", "Забил 10 мячей и сделал 8 результативных передач за сезон.", "Прошёл подготовку в футбольной академии Madrid Football School."],
  },
  {
    id: "02", name: "Марк Беннет", position: "Нападающий", club: "London", country: "Англия", age: 22, height: 188, weight: 82, image: "/images/players/player-card.webp", slug: "mark-bennet",
    summary: "Мощный центральный нападающий, уверенно играющий в штрафной площади и создающий пространство для партнёров.",
    highlights: ["Лучший бомбардир регионального чемпионата сезона 2025/26.", "Оформил хет-трик в матче против Westbridge FC.", "Воспитанник London Elite Football Academy."],
  },
  {
    id: "03", name: "Лука Вольф", position: "Защитник", club: "Berlin", country: "Германия", age: 25, height: 191, weight: 86, image: "/images/players/player-card.webp", slug: "luka-wolf",
    summary: "Центральный защитник с сильной игрой в воздухе, качественным первым пасом и лидерскими качествами.",
    highlights: ["Вошёл в символическую сборную чемпионата сезона 2025/26.", "Провёл 14 матчей без пропущенных мячей.", "Прошёл подготовку в Berlin Professional Football School."],
  },
];

export async function getPlayers(): Promise<Player[]> {
  return players;
}
