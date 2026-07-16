import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { Player } from "@/types/player";
import { localizePath, type Locale } from "@/lib/i18n";

interface Props { player: Player; locale?: Locale; }

export default function PlayerCard({ player, locale = "ru" }: Props) {
  return (
    <Card className="group relative min-h-[410px] overflow-hidden border-white/10 bg-[#07111e] max-sm:min-h-[350px]">
      <Image
        src={player.image}
        alt={player.name}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center transition duration-700 group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,20,.58)_0%,transparent_34%,rgba(5,11,20,.96)_100%)]" />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-pfa-accent transition-transform duration-300 group-hover:scale-x-100" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-7 max-sm:p-6">
        <Typography as="span" variant="sectionSubtitle">{player.id}</Typography>
        <Typography as="span" variant="caption" className="text-white">{player.position}</Typography>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 max-sm:p-6">
        <Typography as="h3" variant="sectionTitle" className="max-w-[80%] text-[clamp(1.75rem,2.4vw,2.5rem)] leading-[.94] tracking-[-.035em]">{player.name}</Typography>
        <Typography variant="caption" className="mt-3 max-w-[calc(100%-4rem)] text-slate-300">{player.club} · {player.country} · {player.age} {locale === "ru" ? "лет" : "years"}</Typography>
      </div>

      <Link
        href={localizePath(`/players/${player.slug}`, locale)}
        aria-label={locale === "ru" ? `Подробнее: ${player.name}` : `View profile: ${player.name}`}
        className="absolute bottom-6 right-6 grid size-12 place-items-center border border-white/25 bg-[#07111e]/75 text-white backdrop-blur transition-colors duration-300 hover:border-pfa-accent hover:bg-pfa-accent hover:text-pfa-background focus-visible:border-pfa-accent max-sm:bottom-5 max-sm:right-5"
      >
        <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.8} />
      </Link>
    </Card>
  );
}
