"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
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
    title: "Мы используем cookies",
    text: "Cookies помогают сайту работать и улучшать качество сервиса.",
    privacyPolicy: "Подробнее в Политике конфиденциальности.",
    necessary: "Только необходимые",
    analytics: "Принять",
  },
  en: {
    title: "We use cookies",
    text: "Cookies help the website work and improve the quality of our service.",
    privacyPolicy: "Learn more in our Privacy Policy.",
    necessary: "Essential only",
    analytics: "Accept",
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
    let previousConsent: CookieConsent | null = null;
    try {
      previousConsent = parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
    } catch {
      // Storage may be unavailable.
    }
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

    if (previousConsent?.analytics === true && !analytics) {
      window.location.reload();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] p-5 max-sm:p-3">
      <Card
        as="div"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-settings-title"
        className="pointer-events-auto mr-auto max-w-[470px] rounded-xl border-white/15 !bg-[#08111d]/95 p-4 shadow-[0_20px_70px_rgba(0,0,0,.65)] backdrop-blur-xl max-sm:p-3.5"
      >
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-slate-300">
            <Cookie aria-hidden="true" size={18} />
          </div>
          <div>
            <Typography id="cookie-settings-title" as="h2" variant="bodyLarge" className="text-base leading-6 text-white">
              {copy.title}
            </Typography>
            <Typography variant="bodyMedium" className="mt-1 text-xs leading-[1.55] text-slate-300">
              {copy.text}{" "}
              <Link
                className="font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-pfa-accent"
                href={localizePath("/privacy", locale)}
              >
                {copy.privacyPolicy}
              </Link>
            </Typography>
            <div className="mt-3 flex items-center gap-4 max-sm:flex-col max-sm:items-stretch max-sm:gap-2.5">
              <Button
                onClick={() => saveConsent(true)}
                shape="square"
                size="compact"
                showIcon={false}
                className="min-h-9 px-5 max-sm:w-full"
              >
                {copy.analytics}
              </Button>
              <button
                type="button"
                className="text-left text-[11px] font-bold uppercase tracking-[.1em] text-slate-400 transition-colors hover:text-white max-sm:text-center"
                onClick={() => saveConsent(false)}
              >
                {copy.necessary}
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
