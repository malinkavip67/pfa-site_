import PlayersGrid from "@/components/players/PlayersGrid";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { Player } from "@/types/player";
import { localizePath, type Locale } from "@/lib/i18n";

interface Props { players: Player[]; locale?: Locale; }

export default function FeaturedPlayers({ players, locale = "ru" }: Props) {
  return (
    <section aria-labelledby="players-title" className="bg-[#08111d] py-32 max-md:py-20">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1.15fr_.85fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <SectionHeading index="04">{locale === "ru" ? "Игроки" : "Players"}</SectionHeading>
            <Typography id="players-title" as="h2" variant="sectionTitle" className="mt-8 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">
              {locale === "ru" ? <>Талант. Характер.<br /><span className="text-pfa-accent">Будущее.</span></> : <>Talent. Character.<br /><span className="text-pfa-accent">Future.</span></>}
            </Typography>
          </div>
          <div className="max-w-[560px] border-l border-pfa-accent/60 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
            <Typography variant="bodyLarge" className="text-white">{locale === "ru" ? "Представляем игроков, готовых к следующему профессиональному шагу." : "Representing players ready for the next professional step."}</Typography>
          </div>
        </AnimatedReveal>

        <AnimatedReveal className="mt-16">
          <PlayersGrid players={players.slice(0, 3)} locale={locale} />
        </AnimatedReveal>

        <div className="mt-10 flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
          <Typography variant="caption" className="max-w-lg leading-5 text-slate-400">{locale === "ru" ? "Ограниченная выборка портфолио. Полный состав предоставляется клубам и партнёрам по запросу." : "A selected portfolio. The full roster is available to clubs and partners upon request."}</Typography>
          <Button href={localizePath("/players", locale)} shape="square" size="compact">{locale === "ru" ? "Все игроки" : "All players"}</Button>
        </div>
      </Container>
    </section>
  );
}
