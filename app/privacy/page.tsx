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
    title: "Какие данные могут обрабатываться",
    text: "Если вы связываетесь с PFA по электронной почте, мы получаем сведения, которые вы указываете самостоятельно: имя, контактные данные и содержание обращения. Хостинг-провайдер также может автоматически фиксировать ограниченные технические данные, необходимые для безопасности и стабильной работы сайта.",
  },
  {
    title: "Для чего используются данные",
    text: "Данные используются только для ответа на обращение, обсуждения возможного сотрудничества, защиты сайта от злоупотреблений и выполнения применимых правовых обязанностей. PFA не продаёт персональные данные третьим лицам.",
  },
  {
    title: "Хранение и передача",
    text: "Информация хранится только в течение срока, необходимого для работы с обращением или выполнения обязательных требований. Доступ может предоставляться техническим поставщикам услуг в объёме, необходимом для работы сайта и электронной почты.",
  },
  {
    title: "Ваши права",
    text: "Вы можете запросить информацию об обработке своих данных, их уточнение, ограничение обработки или удаление, если иное не требуется законом. Для этого направьте обращение на контактный адрес PFA.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Правовая информация" title="Конфиденциальность" description="Мы бережно относимся к информации, которую вы передаёте Premier Football Agency." />
      <Container className="py-20 max-md:py-14">
        <Card as="div" className="mx-auto max-w-4xl border-white/10 bg-[#08111d] p-10 max-sm:p-6">
          <Typography variant="bodyLarge" className="text-white">Настоящая политика описывает общий подход Premier Football Agency к обработке персональных данных посетителей сайта.</Typography>
          <Typography variant="caption" className="mt-4 text-slate-500">Последнее обновление: 14 июля 2026 года</Typography>

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
