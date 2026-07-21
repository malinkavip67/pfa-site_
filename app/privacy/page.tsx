import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Typography from "@/components/ui/Typography";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description: "Информация о принципах обработки и защиты персональных данных на сайте Premier Football Agency.",
  path: "/privacy",
  keywords: ["политика конфиденциальности PFA", "обработка персональных данных"],
});

const sections = [
  {
    title: "Какие данные мы получаем",
    text: "При отправке заявки игрока или обращения родителя PFA получает фамилию, имя, телефон, адрес электронной почты и краткий рассказ, которые вы указываете самостоятельно. Хостинг-провайдер также может автоматически фиксировать ограниченные технические сведения, включая IP-адрес, тип браузера, дату и время обращения, необходимые для безопасности и стабильной работы сайта.",
  },
  {
    title: "Цели и основание обработки",
    text: "Данные используются для рассмотрения заявки, ответа на обращение, обсуждения возможного сотрудничества, защиты сайта от злоупотреблений и выполнения применимых правовых обязанностей. Отправляя форму, вы отдельно подтверждаете согласие на обработку указанных данных для этих целей. PFA не продаёт персональные данные и не использует их для автоматизированного принятия решений.",
  },
  {
    title: "Данные несовершеннолетних",
    text: "Форма игрока предназначена для лиц, достигших 18 лет. Если игрок несовершеннолетний, заявку должен заполнить его родитель или законный представитель через форму для родителей, подтвердив право передавать сведения об игроке.",
  },
  {
    title: "Cookies и локальное хранение",
    text: "Сейчас на сайте не подключены аналитические или рекламные cookies. Используется только необходимое локальное хранение, чтобы запомнить закрытие уведомления о cookies. Технические поставщики сайта могут обрабатывать служебные журналы и иные строго необходимые данные для доставки страниц, предотвращения атак и устранения ошибок.",
  },
  {
    title: "Хранение и передача",
    text: "Информация хранится не дольше, чем это необходимо для работы с обращением или выполнения обязательных требований. Ограниченный доступ может предоставляться поставщикам хостинга и электронной почты только в объёме, необходимом для оказания их услуг. Мы принимаем разумные организационные и технические меры для защиты данных.",
  },
  {
    title: "Ваши права и отзыв согласия",
    text: "Вы можете запросить сведения об обработке своих данных, их уточнение, ограничение обработки или удаление, если иное не требуется законом, а также отозвать согласие. Для этого направьте письмо на контактный адрес PFA. После получения обращения мы прекратим обработку, основанную на согласии, кроме случаев, когда закон допускает иное основание.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Правовая информация" title="Конфиденциальность" description="Мы бережно относимся к информации, которую вы передаёте Premier Football Agency." />
      <Container className="py-20 max-md:py-14">
        <Card as="div" className="mx-auto max-w-4xl border-white/10 bg-[#08111d] p-10 max-sm:p-6">
          <Typography variant="bodyLarge" className="text-white">Настоящая политика описывает подход Premier Football Agency к обработке персональных данных посетителей сайта и пользователей форм обратной связи.</Typography>
          <Typography variant="caption" className="mt-4 text-slate-500">Последнее обновление: 16 июля 2026 года</Typography>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {sections.map((section, index) => (
              <section className="grid grid-cols-[56px_1fr] gap-6 py-8 max-sm:grid-cols-1 max-sm:gap-3" key={section.title}>
                <Typography as="span" variant="sectionSubtitle">{String(index + 1).padStart(2, "0")}</Typography>
                <div>
                  <Typography as="h2" variant="sectionTitle" className="text-xl leading-tight tracking-[-.025em]">{section.title}</Typography>
                  <Typography variant="bodyMedium" className="mt-4 text-base leading-8 text-slate-300">{section.text}</Typography>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 border-l border-pfa-accent/60 pl-6">
            <Typography variant="bodyMedium" className="text-slate-300">По вопросам обработки персональных данных:</Typography>
            <a className="mt-2 block break-all text-lg font-bold text-white transition-colors hover:text-pfa-accent" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </Card>
      </Container>
    </>
  );
}
