import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale?: Locale;
  standalone?: boolean;
}

const content = {
  ru: {
    eyebrow: "Вопросы и ответы",
    title: <>Важное перед<br /><span className="text-pfa-accent">первым разговором</span></>,
    intro: "Коротко отвечаем на вопросы, которые чаще всего возникают у игроков и родителей перед обращением в PFA.",
    items: [
      {
        question: "Что подготовить перед обращением?",
        answer: "Укажите имя, возраст, позицию, текущую команду или футбольную школу. Если есть игровое видео, статистика или спортивное резюме, подготовьте ссылки на эти материалы.",
      },
      {
        question: "Может ли заявку оставить родитель?",
        answer: "Да. Если игрок несовершеннолетний, участие родителя или законного представителя особенно важно. Основные решения и условия сотрудничества обсуждаются вместе.",
      },
      {
        question: "Гарантирует ли PFA контракт с клубом?",
        answer: "Нет. Профессиональное агентство не может гарантировать контракт. Сначала мы оцениваем ситуацию игрока, затем определяем реалистичные возможности и возможный карьерный маршрут.",
      },
      {
        question: "Можно обратиться из другого города или страны?",
        answer: "Да. Первичное знакомство и обсуждение материалов можно провести дистанционно. Формат следующих шагов определяется индивидуально.",
      },
      {
        question: "Как обсуждаются условия сотрудничества?",
        answer: "Условия обсуждаются после знакомства и оценки ситуации. Все договорённости должны быть понятны игроку и родителям и фиксируются до начала совместной работы.",
      },
      {
        question: "Что произойдёт после заполнения формы?",
        answer: "После нажатия кнопки откроется ваше почтовое приложение с готовым письмом. Проверьте данные и отправьте письмо — после этого команда PFA сможет рассмотреть обращение и связаться с вами.",
      },
    ],
  },
  en: {
    eyebrow: "Questions and answers",
    title: <>Important before<br /><span className="text-pfa-accent">the first conversation</span></>,
    intro: "Clear answers to the questions players and parents most often ask before contacting PFA.",
    items: [
      {
        question: "What should we prepare before applying?",
        answer: "Provide the player’s name, age, position and current team or football school. If available, prepare links to match footage, statistics or a sporting résumé.",
      },
      {
        question: "Can a parent submit the application?",
        answer: "Yes. When the player is a minor, the participation of a parent or legal guardian is especially important. Key decisions and terms are discussed together.",
      },
      {
        question: "Does PFA guarantee a club contract?",
        answer: "No. A professional agency cannot guarantee a contract. We first assess the player’s situation, then identify realistic opportunities and a possible career pathway.",
      },
      {
        question: "Can we apply from another city or country?",
        answer: "Yes. The initial conversation and review of materials can take place remotely. The format of the next steps is determined individually.",
      },
      {
        question: "How are the terms of cooperation discussed?",
        answer: "Terms are discussed after the introduction and assessment. Every arrangement should be clear to the player and parents and documented before cooperation begins.",
      },
      {
        question: "What happens after the form is completed?",
        answer: "Your email application will open with a ready message. Review the details and send it so the PFA team can consider the enquiry and contact you.",
      },
    ],
  },
} as const;

export default function AudienceFAQ({ locale = "ru", standalone = false }: Props) {
  const copy = content[locale];

  return (
    <section
      id="questions"
      aria-labelledby="audience-faq-title"
      className={`scroll-mt-20 border-b border-white/10 bg-[#070e18] ${standalone ? "pb-24 pt-36 max-md:pb-16 max-md:pt-28" : "py-24 max-md:py-16"}`}
    >
      <Container className="!w-[min(1120px,calc(100%-5rem))] max-md:!w-[calc(100%-2.5rem)]">
        <AnimatedReveal className="grid grid-cols-[.9fr_1.1fr] items-end gap-14 max-lg:grid-cols-1 max-lg:gap-7">
          <div>
            <Typography as="span" variant="sectionSubtitle">{copy.eyebrow}</Typography>
            <Typography id="audience-faq-title" as={standalone ? "h1" : "h2"} variant="sectionTitle" className="mt-6 text-[clamp(1.65rem,2.7vw,2.8rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.45rem]">
              {copy.title}
            </Typography>
          </div>
          <Typography variant="bodyMedium" className="max-w-[580px] border-l border-pfa-accent/60 pl-7 font-semibold text-white max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-6">
            {copy.intro}
          </Typography>
        </AnimatedReveal>

        <div className="mt-12 grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {copy.items.map((item, index) => (
            <AnimatedReveal key={item.question} delay={(index % 2) * 0.05} className="h-full">
              <Card as="div" className="h-full border-white/10 bg-[#0a1523] transition-colors hover:border-white/20">
                <details className="group">
                  <summary className="flex min-h-24 cursor-pointer list-none items-center justify-between gap-5 p-6 [&::-webkit-details-marker]:hidden">
                    <span className="flex min-w-0 items-center gap-4">
                      <Typography as="span" variant="sectionSubtitle">{String(index + 1).padStart(2, "0")}</Typography>
                      <Typography as="span" variant="bodyMedium" className="font-bold text-white">{item.question}</Typography>
                    </span>
                    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center border border-white/15 text-lg text-pfa-accent transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-white/10 px-6 pb-6 pt-5">
                    <Typography variant="bodyMedium" className="text-slate-300">{item.answer}</Typography>
                  </div>
                </details>
              </Card>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
