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
    id: "01", name: "Alex Marin", position: "Midfielder", club: "Madrid", country: "Spain", age: 24, height: 184, weight: 78, image: "/images/players/alex-marin.webp", slug: "alex-marin",
    summary: "A technical central midfielder with an exceptional work rate, precise first pass and ability to join the attack.",
    highlights: ["Top scorer at the 2024/25 youth tournament.", "Recorded 10 goals and 8 assists during the season.", "Developed at Madrid Football School."],
  },
  {
    id: "02", name: "Mark Bennet", position: "Forward", club: "London", country: "England", age: 22, height: 188, weight: 82, image: "/images/players/mark-bennet.webp", slug: "mark-bennet",
    summary: "A powerful centre-forward who is confident inside the box and creates space for his teammates.",
    highlights: ["Top scorer in the 2025/26 regional championship.", "Scored a hat-trick against Westbridge FC.", "A graduate of London Elite Football Academy."],
  },
  {
    id: "03", name: "Luka Wolf", position: "Defender", club: "Berlin", country: "Germany", age: 25, height: 191, weight: 86, image: "/images/players/luka-wolf.webp", slug: "luka-wolf",
    summary: "A central defender with dominant aerial ability, a reliable first pass and strong leadership qualities.",
    highlights: ["Named in the 2025/26 team of the season.", "Helped the team record 14 clean sheets.", "Developed at Berlin Professional Football School."],
  },
];

export const englishPartners: Partner[] = [
  { id: "01", name: "Northline", category: "Performance" },
  { id: "02", name: "Apex", category: "Legal" },
  { id: "03", name: "Elevate", category: "Media" },
  { id: "04", name: "Vector", category: "Analytics" },
];

export const englishNews: NewsItem[] = [
  { id: "01", title: "A new chapter in European football", excerpt: "A transfer strategy aligned with the player’s sporting ambitions.", date: "08.07.2026", image: "/images/hero/hero-stadium.webp", slug: "new-european-chapter" },
  { id: "02", title: "Beyond the playing field", excerpt: "How a strong personal brand creates long-term value.", date: "22.06.2026", image: "/images/players/player-feature.webp", slug: "beyond-the-pitch" },
  { id: "03", title: "Focused on long-term development", excerpt: "Why a consistent career strategy matters more than one headline decision.", date: "10.06.2026", image: "/images/hero/hero-pfa-player.webp", slug: "long-term-development" },
];
