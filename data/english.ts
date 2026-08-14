import type { NewsItem } from "@/types/news";
import type { Partner } from "@/types/partner";
import type { Player } from "@/types/player";
import type { Service, AboutDirection } from "@/types/service";
import type { Stat } from "@/types/stat";

export const englishStats: Stat[] = [
  { value: "25+", label: "Professional players", icon: "players" },
  { value: "12", label: "Countries worldwide", icon: "countries" },
  { value: "40+", label: "Successful transfers", icon: "transfers" },
  { value: "15+", label: "Years in football management", icon: "experience" },
];

export const englishAboutDirections: AboutDirection[] = [
  { id: "01", title: "Transfers", description: "We find sporting solutions aligned with the player’s potential and ambitions." },
  { id: "02", title: "Contracts", description: "We protect the player’s interests and secure transparent, sustainable terms." },
  { id: "03", title: "Career development", description: "We build a personal route for long-term professional growth." },
];

export const englishServices: Service[] = [
  { id: "01", title: "Transfers", description: "We arrange moves that match the player’s level, ambitions and long-term strategy." },
  { id: "02", title: "Contracts", description: "We negotiate with clubs and secure clear, beneficial and protected terms." },
  { id: "03", title: "Scouting", description: "We assess potential and identify opportunities for the next career step." },
  { id: "04", title: "Legal support", description: "We review documents, reduce risk and protect the player throughout every deal." },
  { id: "05", title: "Personal brand", description: "We shape a professional public image that strengthens the player’s reputation." },
  { id: "06", title: "Marketing", description: "We develop commercial potential and create relevant partnership opportunities." },
];

export const englishPlayers: Player[] = [
  {
    id: "01", name: "Roman Proshunin", position: "Midfielder", club: "A. Zhuravlev Football Academy", country: "Russia", city: "Moscow", age: 23, birthDate: "24.06.2003", height: 180, weight: 75, preferredFoot: "Left", image: "/images/players/roman-proshunin.jpg", slug: "roman-proshunin",
    summary: "A technical left-footed midfielder with strong football intelligence and an excellent first touch. He combines refined dribbling with a powerful long-range strike, contributes both in build-up play and finishing, and uses his acceleration and vision to play aggressive vertical passes and press consistently.",
    highlights: ["Refined dribbling technique and a powerful long-range strike with his left foot.", "Effective contribution in both build-up play and finishing attacks.", "Aggressive vertical passing and consistent participation in pressing."],
  },
  {
    id: "03", name: "Sergey Kudryavtsev", position: "Goalkeeper", country: "Russia", city: "Yaroslavl", age: 19, birthDate: "12.10.2006", height: 190, weight: 82, preferredFoot: "Right", image: "/images/players/sergey-kudryavtsev-v2.webp", slug: "sergey-kudryavtsev",
    summary: "A modern goalkeeper with sharp reactions, confident play on the line and quick positional decisions. He is reliable in one-on-one situations, commands his penalty area and starts attacks with accurate distribution.",
    highlights: ["Sharp reactions and confident play on the goal line.", "Reliable decision-making in one-on-one situations.", "Strong command of the penalty area and accurate distribution."],
  },
];

export const englishPartners: Partner[] = [
  { id: "01", name: "PIK", category: "Real estate development", logo: "/images/partners/pik.svg" },
  { id: "02", name: "Major Auto", category: "Automotive holding", logo: "/images/partners/major-auto.svg" },
  { id: "03", name: "Vkusno — i tochka", category: "Restaurant chain", logo: "/images/partners/vkusno-i-tochka.svg" },
  { id: "04", name: "Белый слон", category: "PFA partner", logo: "/images/partners/white-elephant.jpg" },
  { id: "05", name: "Opta by Stats Perform", category: "Sports analytics", logo: "/images/partners/opta-stats-perform.jpg" },
];

export const englishNews: NewsItem[] = [
  { id: "01", title: "A new chapter in European football", excerpt: "A transfer strategy aligned with the player’s sporting ambitions.", date: "08.07.2026", image: "/images/hero/hero-stadium.webp", slug: "new-european-chapter" },
  { id: "02", title: "Beyond the playing field", excerpt: "How a strong personal brand creates long-term value.", date: "22.06.2026", image: "/images/players/player-feature.webp", slug: "beyond-the-pitch" },
  { id: "03", title: "Focused on long-term development", excerpt: "Why a consistent career strategy matters more than one headline decision.", date: "10.06.2026", image: "/images/hero/hero-pfa-player.webp", slug: "long-term-development" },
];
