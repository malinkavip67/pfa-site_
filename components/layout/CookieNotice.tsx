"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
  COOKIE_SETTINGS_EVENT,
  parseCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";

const content = {
  ru: {
    title: "Настройки cookies",
    text: "Необходимые данные обеспечивают работу сайта и CRM. Яндекс Метрика и Google Analytics будут включены только с вашего согласия.",
    link: "Подробнее",
    necessary: "Только необходимые",
    analytics: "Разрешить аналитику",
  },
  en: {
    title: "Cookie settings",
    text: "Essential data keeps the website and CRM working. Yandex Metrica and Google Analytics will be enabled only with your consent.",
    link: "Learn more",
    necessary: "Essential only",
    analytics: "Allow analytics",
  },
} as const;

export default function CookieNotice() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = content[locale];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showIfRequired = () => {
      try {
        setIsVisible(!parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)));
      } catch {
        setIsVisible(true);
      }
    };
    const openSettings = () => setIsVisible(true);

    const visibilityTimer = window.setTimeout(showIfRequired, 0);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);

    return () => {
      window.clearTimeout(visibilityTimer);
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const saveConsent = (analytics: boolean) => {
    const consent: CookieConsent = {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics,
      updatedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
    } catch {
      // The choice still applies to the current page view when storage is unavailable.
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4 max-sm:p-3">
      <Card
        as="div"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-settings-title"
        className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 border-pfa-accent/30 !bg-[#08111d]/95 px-6 py-5 shadow-[0_-18px_60px_rgba(0,0,0,.45)] backdrop-blur-xl max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:px-5"
      >
        <div className="max-w-[720px]">
          <Typography id="cookie-settings-title" as="h2" variant="sectionSubtitle">
            {copy.title}
          </Typography>
          <Typography variant="bodyMedium" className="mt-2 leading-6 text-slate-300">
            {copy.text}{" "}
            <Link
              className="font-bold text-white underline decoration-pfa-accent/70 underline-offset-4 transition-colors hover:text-pfa-accent"
              href={localizePath("/cookies", locale)}
            >
              {copy.link}
            </Link>
          </Typography>
        </div>
        <div className="flex shrink-0 gap-3 max-sm:flex-col">
          <Button
            onClick={() => saveConsent(false)}
            variant="secondary"
            shape="square"
            size="compact"
            className="min-h-11 px-5 max-sm:w-full"
          >
            {copy.necessary}
          </Button>
          <Button
            onClick={() => saveConsent(true)}
            shape="square"
            size="compact"
            className="min-h-11 px-5 max-sm:w-full"
          >
            {copy.analytics}
          </Button>
        </div>
      </Card>
    </div>
  );
}
