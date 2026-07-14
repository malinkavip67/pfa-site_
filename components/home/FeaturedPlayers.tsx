import PlayersGrid from "@/components/players/PlayersGrid";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { Player } from "@/types/player";

interface Props { players: Player[]; }

export default function FeaturedPlayers({ players }: Props) {
  return (
    <section aria-labelledby="players-title" className="bg-[#08111d] py-32 max-md:py-20">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1.15fr_.85fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <SectionHeading index="04">Игроки</SectionHeading>
            <Typography id="players-title" as="h2" variant="sectionTitle" className="mt-8 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">
              Талант. Характер.<br /><span className="text-pfa-accent">Будущее.</span>
            </Typography>
          </div>
          <div className="max-w-[560px] border-l border-pfa-accent/60 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
            <Typography variant="bodyLarge" className="text-white">Представляем игроков, готовых к следующему профессиональному шагу.</Typography>
          </div>
        </AnimatedReveal>

        <AnimatedReveal className="mt-16">
          <PlayersGrid players={players.slice(0, 3)} />
        </AnimatedReveal>

        <div className="mt-10 flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
          <Typography variant="caption" className="max-w-lg leading-5 text-slate-400">Ограниченная выборка портфолио. Полный состав предоставляется клубам и партнёрам по запросу.</Typography>
          <Button href="/players" shape="square" size="compact">Все игроки</Button>
        </div>
      </Container>
    </section>
  );
}
