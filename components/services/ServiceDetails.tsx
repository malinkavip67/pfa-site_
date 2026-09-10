import Link from "next/link";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import { localizePath, type Locale } from "@/lib/i18n";

interface Props { locale?: Locale; }

const content = {
  ru: {
    heading: "Сопровождение футбольной карьеры",
    intro: "Каждое направление связано с общей карьерной стратегией игрока. Конкретный объём работы определяется после знакомства, оценки ситуации и обсуждения целей.",
    scope: "Что входит в работу",
    items: [
      { id: "transfers", title: "Трансферы футболистов", description: "Анализируем спортивные задачи и рассматриваем варианты продолжения карьеры, соответствующие уровню и целям игрока.", points: ["оценка текущей ситуации и приоритетов", "обсуждение подходящих спортивных вариантов", "сопровождение коммуникации и перехода"] },
      { id: "contracts", title: "Переговоры и контракты", description: "Участвуем в переговорах с клубами и помогаем игроку понимать условия до принятия решения.", points: ["обсуждение ключевых условий", "проверка понятности договорённостей", "сопровождение согласования документов"] },
      { id: "scouting", title: "Скаутинг и оценка игрока", description: "Изучаем доступные материалы и спортивную ситуацию, чтобы определить реалистичный следующий шаг.", points: ["профиль, позиция и игровой опыт", "видео, статистика и спортивное резюме", "возможные направления развития"] },
      { id: "legal", title: "Юридическое сопровождение", description: "Проверяем документы и помогаем снизить риски, связанные с агентскими, трудовыми и трансферными договорённостями.", points: ["анализ документов и условий", "разъяснение существенных положений", "защита интересов игрока в рамках сделки"] },
      { id: "brand", title: "Личный бренд футболиста", description: "Помогаем выстроить последовательный профессиональный образ, связанный с реальными достижениями и карьерными целями.", points: ["позиционирование и публичная подача", "структура профессиональных материалов", "репутационная последовательность"] },
      { id: "marketing", title: "Маркетинг и партнёрства", description: "Оцениваем коммерческий потенциал игрока и рассматриваем уместные возможности сотрудничества с брендами.", points: ["анализ аудитории и публичного образа", "подготовка материалов для партнёров", "сопровождение согласованных интеграций"] },
    ],
    linksTitle: "Узнайте больше перед обращением",
    links: [["Игроки PFA", "/players"], ["Новости и кейсы", "/news"], ["Вопросы и ответы", "/faq"], ["Контакты", "/contacts"]],
  },
  en: {
    heading: "Football career support",
    intro: "Each service forms part of the player’s wider career strategy. The scope is agreed after an introduction, an assessment of the situation and a discussion of objectives.",
    scope: "What the work covers",
    items: [
      { id: "transfers", title: "Football transfers", description: "We assess sporting objectives and consider career options suited to the player’s level and ambitions.", points: ["current situation and priorities", "discussion of suitable sporting options", "communication and transition support"] },
      { id: "contracts", title: "Negotiations and contracts", description: "We participate in club negotiations and help the player understand the terms before making a decision.", points: ["discussion of key terms", "clarity of the proposed arrangements", "support during document approval"] },
      { id: "scouting", title: "Scouting and player assessment", description: "We review available materials and the sporting context to identify a realistic next step.", points: ["profile, position and playing experience", "video, statistics and sporting résumé", "possible development routes"] },
      { id: "legal", title: "Legal support", description: "We review documents and help reduce risk in representation, employment and transfer arrangements.", points: ["review of documents and terms", "explanation of material provisions", "protection of the player’s interests"] },
      { id: "brand", title: "Player personal brand", description: "We help build a consistent professional profile grounded in real achievements and career objectives.", points: ["positioning and public presentation", "structure of professional materials", "consistent professional reputation"] },
      { id: "marketing", title: "Marketing and partnerships", description: "We assess the player’s commercial potential and consider relevant opportunities to work with brands.", points: ["audience and profile assessment", "partner-facing materials", "support for agreed collaborations"] },
    ],
    linksTitle: "Learn more before applying",
    links: [["PFA players", "/players"], ["News and cases", "/news"], ["Questions and answers", "/faq"], ["Contacts", "/contacts"]],
  },
} as const;

export default function ServiceDetails({ locale = "ru" }: Props) {
  const copy = content[locale];

  return (
    <section aria-labelledby="service-details-title" className="border-t border-white/10 bg-[#070e18] py-24 max-md:py-16">
      <Container>
        <AnimatedReveal className="grid grid-cols-[.8fr_1.2fr] gap-14 max-lg:grid-cols-1 max-lg:gap-7">
          <div>
            <SectionHeading index="04">{locale === "ru" ? "Направления" : "Services"}</SectionHeading>
            <Typography id="service-details-title" as="h2" variant="sectionTitle" className="mt-7 text-[clamp(1.65rem,2.7vw,2.8rem)] leading-[.96] tracking-[-.045em]">{copy.heading}</Typography>
          </div>
          <Typography variant="bodyLarge" className="max-w-2xl border-l border-pfa-accent/60 pl-8 text-slate-200 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-6">{copy.intro}</Typography>
        </AnimatedReveal>

        <div className="mt-14 grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {copy.items.map((item, index) => (
            <AnimatedReveal key={item.id} delay={(index % 2) * 0.05} className="h-full">
              <article id={item.id} className="h-full scroll-mt-24 border border-white/10 bg-[#091421] p-8 max-sm:p-6">
                <Typography as="span" variant="sectionSubtitle">{String(index + 1).padStart(2, "0")}</Typography>
                <Typography as="h3" variant="sectionTitle" className="mt-6 text-[clamp(1.25rem,1.8vw,1.75rem)] leading-tight tracking-[-.035em]">{item.title}</Typography>
                <Typography variant="bodyMedium" className="mt-5 text-slate-300">{item.description}</Typography>
                <Typography as="p" variant="caption" className="mt-7 font-bold uppercase tracking-[.12em] text-white">{copy.scope}</Typography>
                <ul className="mt-4 space-y-3">
                  {item.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-slate-300"><span aria-hidden="true" className="mt-[10px] size-1.5 shrink-0 bg-pfa-accent" />{point}</li>)}
                </ul>
              </article>
            </AnimatedReveal>
          ))}
        </div>

        <div className="mt-12 border border-white/10 bg-[#091421] p-8 max-sm:p-6">
          <Typography as="h2" variant="bodyLarge" className="font-bold text-white">{copy.linksTitle}</Typography>
          <nav aria-label={copy.linksTitle} className="mt-5 flex flex-wrap gap-x-7 gap-y-4">
            {copy.links.map(([label, href]) => <Link key={href} href={localizePath(href, locale)} className="text-sm font-bold text-pfa-accent underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">{label}</Link>)}
          </nav>
        </div>
      </Container>
    </section>
  );
}
