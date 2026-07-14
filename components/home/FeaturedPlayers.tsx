import Link from "next/link";
import PlayersGrid from "@/components/players/PlayersGrid";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { Player } from "@/types/player";

interface Props { players: Player[]; }

export default function FeaturedPlayers({ players }: Props) {
  return <section className="bg-[#08111D] py-36 max-md:py-24"><Container>
    <AnimatedReveal className="grid grid-cols-[1fr_2fr] max-lg:grid-cols-1 max-lg:gap-10"><SectionHeading index="03">Игроки</SectionHeading><Typography as="h2" variant="sectionTitle" className="text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">Талант.<br /><span className="text-outline">Характер. Будущее.</span></Typography></AnimatedReveal>
    <AnimatedReveal className="mt-20"><PlayersGrid players={players.slice(0, 3)} /></AnimatedReveal>
    <div className="mt-9 flex items-end justify-between gap-8 max-md:flex-col max-md:items-start"><p className="max-w-lg text-[11px] leading-5 text-slate-400">Ограниченная выборка портфолио. Полный состав предоставляется клубам и партнёрам по запросу.</p><Link className="border-pfa-accent border-b pb-2 text-[11px] font-bold uppercase tracking-wider" href="/players">Все игроки →</Link></div>
  </Container></section>;
}
