import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Player } from "@/types/player";

interface Props { player: Player; locale?: Locale; }

export default function PlayerProfile({ player, locale = "ru" }: Props) {
  const labels = locale === "ru"
    ? { country: "Страна", age: "Возраст", height: "Рост", weight: "Вес", years: "", cm: "см", kg: "кг", back: "Все игроки" }
    : { country: "Country", age: "Age", height: "Height", weight: "Weight", years: "", cm: "cm", kg: "kg", back: "All players" };

  return (
    <section className="min-h-screen pb-24 pt-32 max-md:pb-20 max-md:pt-24">
      <Container>
        <Card as="div" className="grid grid-cols-[.9fr_1.1fr] overflow-hidden border-white/10 bg-[#08111d] max-lg:grid-cols-1">
          <div className="relative min-h-[560px] overflow-hidden max-lg:min-h-[460px] max-sm:min-h-[350px]">
            <Image src={player.image} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-center" alt={player.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08111d]/55 via-transparent to-transparent lg:hidden" />
          </div>
          <div className="flex flex-col justify-center p-12 max-md:p-8 max-sm:p-6">
            <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
              <Typography as="span" variant="sectionSubtitle">{player.position}</Typography>
              <Typography as="span" variant="caption" className="text-slate-300">{player.club}</Typography>
            </div>
            <Typography as="h1" variant="sectionTitle" className="mt-8 text-[clamp(2.6rem,5vw,4.5rem)] leading-[.9] tracking-[-.05em] max-sm:text-[2.25rem]">{player.name}</Typography>
            <dl className="mt-10 grid grid-cols-2 border-l border-t border-white/10 max-sm:mt-8">
              {[
                [labels.country, player.country],
                [labels.age, `${player.age}${labels.years}`],
                [labels.height, `${player.height} ${labels.cm}`],
                [labels.weight, `${player.weight} ${labels.kg}`],
              ].map(([label, value]) => (
                <div className="border-b border-r border-white/10 p-5 max-sm:p-4" key={label}>
                  <Typography as="dt" variant="caption" className="text-slate-400">{label}</Typography>
                  <Typography as="dd" variant="bodyLarge" className="mt-2 text-white">{value}</Typography>
                </div>
              ))}
            </dl>
            <Button href={localizePath("/players", locale)} variant="secondary" shape="square" size="compact" className="mt-10 self-start">{labels.back}</Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
