"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ApplicationButton from "@/components/forms/ApplicationButton";
import Container from "@/components/ui/Container";
import SocialLink from "@/components/ui/SocialLink";
import Typography from "@/components/ui/Typography";
import { CONTACT_PHONE_NUMBERS, INSTAGRAM_URL } from "@/lib/contact-details";
import { NAVIGATION, SITE_NAME } from "@/lib/constants";
import { COOKIE_SETTINGS_EVENT } from "@/lib/cookie-consent";
import { getLocaleFromPathname, localizePath, NAVIGATION_LABELS } from "@/lib/i18n";
import type { ResolvedSiteSettings } from "@/lib/site-settings";

interface FooterProps { settings: ResolvedSiteSettings; }

export default function Footer({ settings }: FooterProps) {
  const locale = getLocaleFromPathname(usePathname());

  return (
    <footer className="relative border-t border-white/10 bg-[#03070d] py-16 max-md:py-12">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pfa-accent/50 to-transparent" />
      <Container>
        <div className="grid grid-cols-[1.1fr_.8fr_1.1fr] gap-16 max-lg:grid-cols-2 max-lg:gap-12 max-md:grid-cols-1 max-md:gap-10">
          <div>
            <Link href={localizePath("/", locale)} className="inline-flex bg-black shadow-[0_0_42px_24px_rgba(0,0,0,.72)]" aria-label={locale === "ru" ? "PFA — на главную" : "PFA — home"}>
              <Image src="/images/logo/logo-white.jpg" width={1366} height={768} sizes="160px" loading="lazy" className="h-20 w-40 object-contain brightness-90" alt={locale === "ru" ? "Премьер Футбольное Агентство" : SITE_NAME} />
            </Link>
            <Typography variant="bodyLarge" className="mt-5 max-w-sm text-white">{settings.footerText}</Typography>
            <Typography variant="bodyMedium" className="mt-4 max-w-sm text-slate-400">{locale === "ru" ? "Стратегия, представительство и поддержка игрока на каждом этапе профессионального пути." : "Strategy, representation and player support throughout every stage of the professional journey."}</Typography>
          </div>

          <nav aria-label="Навигация в подвале">
            <Typography as="span" variant="sectionSubtitle">{locale === "ru" ? "Навигация" : "Navigation"}</Typography>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 max-sm:max-w-xs">
              {NAVIGATION.map((item) => (
                <Link className="text-sm font-semibold text-slate-300 transition-colors hover:text-pfa-accent" key={item.href} href={localizePath(item.href, locale)}>{NAVIGATION_LABELS[locale][item.href]}</Link>
              ))}
            </div>
          </nav>

          <div className="max-lg:col-span-2 max-md:col-span-1">
            <Typography as="span" variant="sectionSubtitle">{locale === "ru" ? "Контакты" : "Contacts"}</Typography>
            <Typography variant="bodyMedium" className="mt-6 max-w-md text-slate-300">{locale === "ru" ? "Обсудим карьеру, трансфер, сотрудничество или партнёрство." : "Let’s discuss a career, transfer, collaboration or partnership."}</Typography>
            <div className="mt-5 space-y-2.5">
              {CONTACT_PHONE_NUMBERS.map((contact) => (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1" key={contact.href}>
                  <Typography as="span" variant="caption" className="min-w-14 font-bold text-pfa-accent">
                    {locale === "ru" ? contact.name : contact.nameEn}
                  </Typography>
                  <a className="text-base font-bold text-white transition-colors hover:text-pfa-accent" href={contact.href}>
                    {contact.display}
                  </a>
                </div>
              ))}
            </div>
            <Typography as="p" variant="sectionSubtitle" className="mt-6">
              {locale === "ru" ? "Мы в соцсетях:" : "Follow us:"}
            </Typography>
            <div className="mt-4 flex items-center gap-3">
              <SocialLink href={settings.telegram} label={locale === "ru" ? "PFA в Telegram" : "PFA on Telegram"} network="telegram" />
              <SocialLink href={INSTAGRAM_URL} label={locale === "ru" ? "PFA в Instagram" : "PFA on Instagram"} network="instagram" />
              <SocialLink label={locale === "ru" ? "PFA во ВКонтакте — ссылка появится позже" : "PFA on VK — link coming soon"} network="vk" />
            </div>
            <ApplicationButton shape="square" size="compact" className="mt-7">{locale === "ru" ? "Оставить заявку" : "Leave an application"}</ApplicationButton>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-6 border-t border-white/10 pt-7 max-sm:flex-col max-sm:items-start">
          <Typography variant="caption" className="text-slate-500">© 2026 {locale === "ru" ? "Премьер Футбольное Агентство" : "Premier Football Agency"}</Typography>
          <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-3 max-sm:flex-col max-sm:items-start">
            <Link className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 transition-colors hover:text-pfa-accent" href={localizePath("/privacy", locale)}>{locale === "ru" ? "Политика обработки данных" : "Personal data policy"}</Link>
            <Link className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 transition-colors hover:text-pfa-accent" href={localizePath("/personal-data-consent", locale)}>{locale === "ru" ? "Согласие на обработку данных" : "Data processing consent"}</Link>
            <Link className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 transition-colors hover:text-pfa-accent" href={localizePath("/cookies", locale)}>{locale === "ru" ? "Политика cookies" : "Cookie policy"}</Link>
            <button
              type="button"
              className="text-left text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 transition-colors hover:text-pfa-accent"
              onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
            >
              {locale === "ru" ? "Настройки cookies" : "Cookie settings"}
            </button>
            <Link className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 transition-colors hover:text-pfa-accent" href="/admin/login">{locale === "ru" ? "Вход для администратора" : "Administrator login"}</Link>
            <Link className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 transition-colors hover:text-pfa-accent" href="#top">{locale === "ru" ? "Наверх ↑" : "Back to top ↑"}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
