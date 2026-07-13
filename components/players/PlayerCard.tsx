import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Player } from "@/types/player";

interface Props { player: Player; priority?: boolean; }

export default function PlayerCard({ player, priority = false }: Props) {
  return <article className="group relative min-h-[31rem] overflow-hidden border border-white/10 bg-[#0C1726]"><Image src={player.image} alt={player.name} fill priority={priority} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-[#07111e] via-transparent to-transparent" /><div className="absolute bottom-7 left-7"><span className="text-[10px] uppercase tracking-[.14em] text-slate-300">{player.position}</span><h3 className="font-display mt-1 text-4xl uppercase">{player.name}</h3><p className="text-[10px] uppercase tracking-wider text-slate-500">{player.country} · {player.age}</p></div><Link href={`/players/${player.slug}`} aria-label={`Подробнее: ${player.name}`} className="absolute bottom-6 right-6 grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition group-hover:border-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-[#050B14]"><ArrowUpRight /></Link></article>;
}
