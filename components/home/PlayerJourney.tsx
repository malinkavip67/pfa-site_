import Image from "next/image";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import type { Locale } from "@/lib/i18n";

interface Props { locale?: Locale; }

const content = {
  ru: {
    eyebrow: "Маршрут игрока",
    title: <>От заявки<br /><span className="text-pfa-accent">к следующему шагу</span></>,
    intro: "Понятный процесс без скрытых этапов. Мы сначала изучаем ситуацию, затем честно определяем, чем PFA может быть полезно игроку.",
    steps: [
      { title: "Заявка", description: "Игрок или родитель оставляет контакты и кратко рассказывает о текущей ситуации." },
      { title: "Оценка", description: "Изучаем позицию, игровой опыт, цели и доступные видеоматериалы." },
      { title: "Знакомство", description: "Проводим личный разговор с игроком и родителями, отвечаем на вопросы." },
      { title: "Стратегия", description: "Определяем приоритеты развития и реалистичный карьерный маршрут." },
      { title: "Возможность", description: "Работаем с подходящими клубами, просмотрами и спортивными решениями." },
      { title: "Сопровождение", description: "Помогаем в переговорах, документах и важных карьерных решениях." },
    ],
  },
  en: {
    eyebrow: "Player journey",
    title: <>From application<br /><span className="text-pfa-accent">to the next step</span></>,
    intro: "A clear process with no hidden stages. We first understand the situation, then honestly determine how PFA can help the player.",
    steps: [
      { title: "Application", description: "The player or parent shares their contact details and current situation." },
      { title: "Assessment", description: "We review the position, playing experience, goals and available footage." },
      { title: "Introduction", description: "We speak personally with the player and parents and answer their questions." },
      { title: "Strategy", description: "We define development priorities and a realistic career pathway." },
      { title: "Opportunity", description: "We work with suitable clubs, trials and sporting solutions." },
      { title: "Support", description: "We assist with negotiations, documentation and key career decisions." },
    ],
  },
} as const;

export default function PlayerJourney({ locale = "ru" }: Props) {
  const copy = content[locale];

  return (
    <section id="player-journey" aria-labelledby="player-journey-title" className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-pfa-background pb-8 pt-24 max-md:pb-8 max-md:pt-16">
      <Image
        fill
        priority={false}
        sizes="100vw"
        src="/images/journey/player-journey-preview.png"
        alt=""
        aria-hidden="true"
        className="object-cover object-[center_30%] opacity-90 max-md:object-[62%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#050b14]/28" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#050b14]/55 via-[#050b14]/14 to-[#050b14]/25" />
      <div aria-hidden="true" className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-pfa-accent/[.035] blur-3xl" />

      <Container className="relative z-10 !w-[min(1120px,calc(100%-5rem))] max-md:!w-[calc(100%-2.5rem)]">
        <AnimatedReveal className="grid grid-cols-[.9fr_1.1fr] items-end gap-14 max-lg:grid-cols-1 max-lg:gap-7">
          <div>
            <Typography as="span" variant="sectionSubtitle">{copy.eyebrow}</Typography>
            <Typography id="player-journey-title" as="h2" variant="sectionTitle" className="mt-6 text-[clamp(1.65rem,2.7vw,2.8rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.45rem]">
              {copy.title}
            </Typography>
          </div>
          <Typography variant="bodyMedium" className="max-w-[580px] border-l border-pfa-accent/60 pl-7 font-semibold text-white max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-6">
            {copy.intro}
          </Typography>
        </AnimatedReveal>

        <div role="list" className="relative mt-12 grid grid-cols-6 gap-3 max-xl:grid-cols-3 max-xl:gap-4 max-md:grid-cols-1">
          <div aria-hidden="true" className="absolute left-[7%] right-[7%] top-7 h-px bg-gradient-to-r from-pfa-accent/20 via-pfa-accent to-pfa-accent/20 max-xl:hidden" />

          {copy.steps.map((step, index) => (
            <AnimatedReveal key={step.title} delay={index * 0.05} className="relative h-full">
              <div role="listitem" className="flex h-full flex-col max-md:grid max-md:grid-cols-[48px_1fr] max-md:items-stretch max-md:gap-4">
                <div className="relative z-10 grid size-14 place-items-center border border-pfa-accent/60 bg-pfa-background text-[11px] font-bold tracking-[.14em] text-pfa-accent max-md:size-12">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <Card as="div" className="mt-5 h-full min-h-[178px] border-white/10 bg-[#0a1523] p-5 transition-colors hover:border-pfa-accent/45 max-md:mt-0 max-md:min-h-0">
                  <Typography as="h3" variant="sectionTitle" className="text-[1rem] leading-tight tracking-[-.025em]">{step.title}</Typography>
                  <Typography variant="bodyMedium" className="mt-4 text-[13px] leading-6 text-slate-300">{step.description}</Typography>
                </Card>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
