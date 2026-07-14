import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { AboutDirection } from "@/types/service";
import type { Locale } from "@/lib/i18n";

interface Props {
  directions: AboutDirection[];
  locale?: Locale;
}

export default function About({ directions, locale = "ru" }: Props) {
  return (
    <section id="agency" aria-labelledby="agency-title" className="scroll-mt-24 bg-[#070e18] py-32 max-md:py-20">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1.15fr_.85fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <SectionHeading index="01">{locale === "ru" ? "Агентство" : "Agency"}</SectionHeading>
            <Typography id="agency-title" as="h2" variant="sectionTitle" className="mt-8 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">
              {locale === "ru" ? <>Строим карьеру<br /><span className="text-pfa-accent">на годы вперёд</span></> : <>Building careers<br /><span className="text-pfa-accent">for the long term</span></>}
            </Typography>
          </div>
          <div className="max-w-[560px] border-l border-pfa-accent/60 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
            <Typography variant="bodyLarge" className="text-white">{locale === "ru" ? "PFA сопровождает футболиста как долгосрочный профессиональный проект." : "PFA approaches every player as a long-term professional project."}</Typography>
            <Typography variant="bodyMedium" className="mt-5 text-slate-300">{locale === "ru" ? "Мы объединяем спортивную стратегию, международные связи и персональную ответственность, чтобы каждое решение усиливало карьеру игрока." : "We combine sporting strategy, international connections and personal accountability so every decision strengthens the player’s career."}</Typography>
          </div>
        </AnimatedReveal>

        <div className="mt-16 grid grid-cols-3 gap-px border border-white/10 bg-white/10 max-md:grid-cols-1">
          {directions.map((direction, index) => (
            <AnimatedReveal key={direction.id} delay={index * 0.08} className="h-full">
              <Card className="group relative h-full min-h-[270px] overflow-hidden border-0 bg-[#09121f] p-8 transition-colors hover:bg-[#0c1929] max-sm:min-h-0 max-sm:p-6">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-pfa-accent transition-transform duration-300 group-hover:scale-x-100" />
                <Typography as="span" variant="sectionSubtitle">{direction.id}</Typography>
                <Typography as="h3" variant="sectionTitle" className={`${direction.id === "03" ? "mt-8" : "mt-12"} text-[clamp(1.2rem,1.7vw,1.7rem)] leading-tight tracking-[-.035em]`}>{direction.title}</Typography>
                <Typography variant="bodyMedium" className={`${direction.id === "03" ? "mt-3" : "mt-5"} max-w-sm text-slate-300`}>{direction.description}</Typography>
              </Card>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
