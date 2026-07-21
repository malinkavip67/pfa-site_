"use client";

import { ShieldCheck, Trophy } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import ApplicationButton, { APPLICATION_FORM_EVENT, type ApplicationAudience } from "@/components/forms/ApplicationButton";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import { CONTACT_EMAIL } from "@/lib/constants";
import { localizePath, type Locale } from "@/lib/i18n";

interface Props { locale?: Locale; }

const content = {
  ru: {
    eyebrow: "Ваш следующий шаг",
    title: <>Один путь.<br /><span className="text-pfa-accent">Две точки зрения.</span></>,
    intro: "Игроку важно увидеть возможность. Родителю — понимать, кто и как будет сопровождать карьеру. Мы говорим с каждым напрямую.",
    player: {
      label: "Я игрок",
      title: "Покажи, на что способен",
      description: "Расскажи о себе, игровом опыте и целях. Мы оценим ситуацию и честно обозначим возможный следующий шаг.",
      points: ["Оценка перспектив", "Карьерный маршрут", "Новые возможности"],
      action: "Стать игроком PFA",
    },
    parent: {
      label: "Я родитель",
      title: "Понимать каждый шаг",
      description: "Обсудим потенциал игрока, принципы нашей работы, документы и решения, которые влияют на его будущее.",
      points: ["Прозрачные условия", "Защита интересов", "Личная связь"],
      action: "Обсудить карьеру",
    },
    form: {
      eyebrow: "Заявка игрока",
      title: "Начнём знакомство",
      description: "Оставьте контактные данные. Мы подготовим письмо в PFA, чтобы команда могла лично продолжить разговор.",
      surname: "Фамилия",
      name: "Имя",
      phone: "Телефон",
      email: "Почта",
      playerStory: "Кратко о себе и футбольном опыте",
      parentStory: "Кратко расскажите об игроке",
      storyPlaceholder: "Команда, позиция, опыт, цели и другая важная информация",
      submit: "Написать в PFA",
      close: "Закрыть форму",
      note: "После нажатия откроется ваше почтовое приложение с готовым письмом.",
      parentEyebrow: "Обращение родителя",
      parentTitle: "Обсудим карьеру игрока",
      parentDescription: "Оставьте контактные данные. Мы подготовим письмо в PFA, чтобы команда могла лично ответить на ваши вопросы.",
      consentBeforeLink: "Я даю согласие PFA на обработку указанных данных для рассмотрения заявки и ответа в соответствии с",
      privacyLink: "политикой конфиденциальности",
      playerConfirmation: "Мне исполнилось 18 лет. Если нет, форму должен заполнить родитель или законный представитель.",
      parentConfirmation: "Я являюсь родителем или законным представителем игрока и имею право передавать его данные.",
    },
  },
  en: {
    eyebrow: "Your next step",
    title: <>One journey.<br /><span className="text-pfa-accent">Two perspectives.</span></>,
    intro: "A player needs to see the opportunity. A parent needs to understand who will guide the career and how. We speak directly to both.",
    player: {
      label: "I am a player",
      title: "Show what you can do",
      description: "Tell us about your experience and goals. We will assess your situation and honestly outline the strongest next step.",
      points: ["Potential assessment", "Career pathway", "New opportunities"],
      action: "Join PFA",
    },
    parent: {
      label: "I am a parent",
      title: "Understand every step",
      description: "Let’s discuss the player’s potential, our working principles, documentation and the decisions shaping their future.",
      points: ["Transparent terms", "Protected interests", "Personal contact"],
      action: "Discuss the career",
    },
    form: {
      eyebrow: "Player application",
      title: "Let’s get acquainted",
      description: "Leave your contact details. We will prepare an email to PFA so the team can continue the conversation personally.",
      surname: "Last name",
      name: "First name",
      phone: "Phone",
      email: "Email",
      playerStory: "Tell us briefly about yourself and your football experience",
      parentStory: "Tell us briefly about the player",
      storyPlaceholder: "Team, position, experience, goals and any other important information",
      submit: "Write to PFA",
      close: "Close form",
      note: "Your email application will open with a ready-to-send message.",
      parentEyebrow: "Parent enquiry",
      parentTitle: "Let’s discuss the player’s career",
      parentDescription: "Leave your contact details. We will prepare an email to PFA so the team can personally answer your questions.",
      consentBeforeLink: "I consent to PFA processing the submitted data to review and respond to this enquiry in accordance with the",
      privacyLink: "privacy policy",
      playerConfirmation: "I am at least 18 years old. Otherwise, this form must be completed by a parent or legal representative.",
      parentConfirmation: "I am the player’s parent or legal representative and have the right to provide their data.",
    },
  },
} as const;

export default function AudiencePaths({ locale = "ru" }: Props) {
  const copy = content[locale];
  const [formAudience, setFormAudience] = useState<"player" | "parent" | null>(null);
  const isFormOpen = formAudience !== null;

  useEffect(() => {
    const openApplication = (event: Event) => {
      const audience = (event as CustomEvent<ApplicationAudience>).detail;
      setFormAudience(audience === "parent" ? "parent" : "player");
    };

    window.addEventListener(APPLICATION_FORM_EVENT, openApplication);

    const requestedAudience = new URLSearchParams(window.location.search).get("application");
    if (requestedAudience === "player" || requestedAudience === "parent") {
      queueMicrotask(() => setFormAudience(requestedAudience));
      window.history.replaceState({}, "", window.location.pathname + window.location.hash);
    }

    return () => window.removeEventListener(APPLICATION_FORM_EVENT, openApplication);
  }, []);

  useEffect(() => {
    if (!isFormOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFormAudience(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isFormOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = formAudience === "parent"
      ? (locale === "ru" ? "Обращение родителя с сайта PFA" : "Parent enquiry from the PFA website")
      : (locale === "ru" ? "Заявка игрока с сайта PFA" : "Player application from the PFA website");
    const audienceConfirmation = formAudience === "parent"
      ? (locale === "ru" ? "Статус: родитель или законный представитель" : "Status: parent or legal representative")
      : (locale === "ru" ? "Возраст: 18 лет или старше" : "Age: 18 or older");
    const body = locale === "ru"
      ? `Фамилия: ${formData.get("surname")}\nИмя: ${formData.get("name")}\nТелефон: ${formData.get("phone")}\nПочта: ${formData.get("email")}\n\nКраткий рассказ:\n${formData.get("story")}\n\nСогласие на обработку персональных данных: предоставлено\n${audienceConfirmation}`
      : `Last name: ${formData.get("surname")}\nFirst name: ${formData.get("name")}\nPhone: ${formData.get("phone")}\nEmail: ${formData.get("email")}\n\nBrief introduction:\n${formData.get("story")}\n\nConsent to personal data processing: granted\n${audienceConfirmation}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section id="choose-your-path" aria-labelledby="audience-paths-title" className="relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-[#070e18] pb-6 pt-12 max-md:pb-6 max-md:pt-10">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-px w-[min(1280px,calc(100%-5rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-pfa-accent/70 to-transparent max-md:w-[calc(100%-2.5rem)]" />
      <div aria-hidden="true" className="absolute -right-32 top-8 h-80 w-80 rounded-full bg-pfa-accent/[.045] blur-3xl" />

      <Container className="!w-[min(1120px,calc(100%-5rem))] max-md:!w-[calc(100%-2.5rem)]">
        <AnimatedReveal className="grid min-w-0 grid-cols-[.82fr_1.18fr] items-end gap-12 max-lg:grid-cols-1 max-lg:gap-7 max-sm:w-[calc(100vw-2.5rem)]">
          <div>
            <Typography as="span" variant="sectionSubtitle">{copy.eyebrow}</Typography>
            <Typography id="audience-paths-title" as="h2" variant="sectionTitle" className="mt-5 text-[clamp(1.65rem,2.7vw,2.8rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.45rem]">
              {copy.title}
            </Typography>
          </div>
          <Typography variant="bodyMedium" className="min-w-0 max-w-[560px] break-words border-l border-pfa-accent/60 pl-7 font-semibold text-white max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-6">
            {copy.intro}
          </Typography>
        </AnimatedReveal>

        <div className="mt-8 grid min-w-0 grid-cols-2 gap-4 max-md:grid-cols-1 max-sm:w-[calc(100vw-2.5rem)]">
          <AnimatedReveal className="h-full min-w-0">
            <Card as="div" className="group relative flex h-full min-h-[300px] min-w-0 max-w-full flex-col overflow-hidden border-white/15 bg-[#0a1523] p-6 max-sm:min-h-0 max-sm:p-5">
              <span aria-hidden="true" className="absolute -right-3 -top-10 text-[10.5rem] font-extrabold leading-none text-white/[.035] transition-transform duration-500 group-hover:-translate-y-2">01</span>
              <div className="relative flex items-center justify-between gap-5">
                <Typography as="span" variant="caption" className="text-white">{copy.player.label}</Typography>
                <Trophy aria-hidden="true" className="text-pfa-accent" size={25} strokeWidth={1.7} />
              </div>
              <Typography as="h3" variant="sectionTitle" className="relative mt-8 max-w-[480px] text-[clamp(1.1rem,1.55vw,1.55rem)] leading-tight tracking-[-.035em]">
                {copy.player.title}
              </Typography>
              <Typography variant="bodyMedium" className="relative mt-3 max-w-[500px] break-words text-slate-300">
                {copy.player.description}
              </Typography>
              <ul className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 max-sm:grid-cols-1">
                {copy.player.points.map((point, index) => (
                  <li className="min-w-0 text-[10px] font-bold uppercase tracking-[.1em] text-slate-200" key={point}>
                    <span className="mr-2 text-pfa-accent">{String(index + 1).padStart(2, "0")}</span>{point}
                  </li>
                ))}
              </ul>
              <ApplicationButton audience="player" variant="secondary" shape="square" size="compact" className="relative mt-4 min-h-[52px] self-start px-6 !border-white/20 !bg-black !text-white hover:!border-white hover:!bg-white hover:!text-pfa-background">
                {copy.player.action}
              </ApplicationButton>
            </Card>
          </AnimatedReveal>

          <AnimatedReveal delay={0.08} className="h-full min-w-0">
            <Card as="div" className="group relative flex h-full min-h-[300px] min-w-0 max-w-full flex-col overflow-hidden border-white/15 bg-[#0a1523] p-6 max-sm:min-h-0 max-sm:p-5">
              <span aria-hidden="true" className="absolute -right-3 -top-10 text-[10.5rem] font-extrabold leading-none text-white/[.035] transition-transform duration-500 group-hover:-translate-y-2">02</span>
              <div className="relative flex items-center justify-between gap-5">
                <Typography as="span" variant="caption" className="text-white">{copy.parent.label}</Typography>
                <ShieldCheck aria-hidden="true" className="text-pfa-accent" size={25} strokeWidth={1.7} />
              </div>
              <Typography as="h3" variant="sectionTitle" className="relative mt-8 max-w-[480px] text-[clamp(1.1rem,1.55vw,1.55rem)] leading-tight tracking-[-.035em]">
                {copy.parent.title}
              </Typography>
              <Typography variant="bodyMedium" className="relative mt-3 max-w-[500px] break-words text-slate-300">
                {copy.parent.description}
              </Typography>
              <ul className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 max-sm:grid-cols-1">
                {copy.parent.points.map((point, index) => (
                  <li className="min-w-0 text-[10px] font-bold uppercase tracking-[.1em] text-slate-200" key={point}>
                    <span className="mr-2 text-pfa-accent">{String(index + 1).padStart(2, "0")}</span>{point}
                  </li>
                ))}
              </ul>
              <ApplicationButton audience="parent" shape="square" size="compact" className="relative mt-4 min-h-[52px] self-start px-6">
                {copy.parent.action}
              </ApplicationButton>
            </Card>
          </AnimatedReveal>
        </div>
      </Container>
      </section>

      {isFormOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="player-form-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#02060c]/90 p-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFormAudience(null);
          }}
        >
          <Card as="div" className="relative my-auto w-full max-w-[680px] border-pfa-accent/30 !bg-[#08111d] p-10 shadow-[0_30px_100px_rgba(0,0,0,.6)] max-sm:p-6">
            <button
              type="button"
              aria-label={copy.form.close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/15 text-xl text-white transition-colors hover:border-pfa-accent hover:text-pfa-accent"
              onClick={() => setFormAudience(null)}
            >
              ×
            </button>

            <Typography as="span" variant="sectionSubtitle">{formAudience === "parent" ? copy.form.parentEyebrow : copy.form.eyebrow}</Typography>
            <Typography id="player-form-title" as="h2" variant="sectionTitle" className="mt-6 pr-14 text-[clamp(1.5rem,2.5vw,2.4rem)] leading-[.95] tracking-[-.04em]">
              {formAudience === "parent" ? copy.form.parentTitle : copy.form.title}
            </Typography>
            <Typography variant="bodyMedium" className="mt-5 max-w-[560px] text-slate-300">
              {formAudience === "parent" ? copy.form.parentDescription : copy.form.description}
            </Typography>

            <form className="mt-8 grid grid-cols-2 gap-4 max-sm:grid-cols-1" onSubmit={handleSubmit}>
              {[
                { name: "surname", label: copy.form.surname, type: "text", autoComplete: "family-name" },
                { name: "name", label: copy.form.name, type: "text", autoComplete: "given-name" },
                { name: "phone", label: copy.form.phone, type: "tel", autoComplete: "tel" },
                { name: "email", label: copy.form.email, type: "email", autoComplete: "email" },
              ].map((field) => (
                <label className="block" key={field.name}>
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">{field.label}</span>
                  <input
                    required
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    className="h-14 w-full rounded-none border border-white/15 bg-white/[.035] px-4 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-pfa-accent"
                  />
                </label>
              ))}

              <label className="col-span-2 block max-sm:col-span-1">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">
                  {formAudience === "parent" ? copy.form.parentStory : copy.form.playerStory}
                </span>
                <textarea
                  required
                  name="story"
                  rows={4}
                  placeholder={copy.form.storyPlaceholder}
                  className="min-h-28 w-full resize-y rounded-none border border-white/15 bg-white/[.035] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-pfa-accent"
                />
              </label>

              <div className="col-span-2 grid gap-3 border-t border-white/10 pt-5 max-sm:col-span-1">
                <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-300">
                  <input
                    required
                    name="privacyConsent"
                    type="checkbox"
                    value="granted"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#00EB52]"
                  />
                  <span>
                    {copy.form.consentBeforeLink}{" "}
                    <a
                      className="font-bold text-white underline decoration-pfa-accent/70 underline-offset-4 transition-colors hover:text-pfa-accent"
                      href={localizePath("/privacy", locale)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.form.privacyLink}
                    </a>.
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-300">
                  <input
                    required
                    name="audienceConfirmation"
                    type="checkbox"
                    value="confirmed"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#00EB52]"
                  />
                  <span>{formAudience === "parent" ? copy.form.parentConfirmation : copy.form.playerConfirmation}</span>
                </label>
              </div>

              <div className="col-span-2 mt-3 flex items-center justify-between gap-6 max-sm:col-span-1 max-sm:flex-col max-sm:items-stretch">
                <Typography variant="caption" className="max-w-[300px] normal-case tracking-normal text-slate-400">{copy.form.note}</Typography>
                <Button type="submit" shape="square" size="compact" className="shrink-0">{copy.form.submit}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
