"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  parseCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

type AnalyticsCommand = (...args: unknown[]) => void;
type YandexCommand = AnalyticsCommand & { a?: unknown[][]; l?: number };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: AnalyticsCommand;
    ym?: YandexCommand;
    __pfaGoogleAnalyticsInitialized?: boolean;
    __pfaYandexMetricaInitialized?: boolean;
  }
}

interface Props {
  googleAnalyticsId?: string;
  yandexMetricaId?: string;
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isAnalyticsEnvironment() {
  return !LOCAL_HOSTS.has(window.location.hostname);
}

function initializeYandexMetrica(counterId: number) {
  if (window.__pfaYandexMetricaInitialized) return;

  if (!window.ym) {
    const ym: YandexCommand = (...args: unknown[]) => {
      (ym.a ??= []).push(args);
    };
    ym.l = Date.now();
    window.ym = ym;
  }

  if (!document.querySelector('script[data-pfa-analytics="yandex"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    script.dataset.pfaAnalytics = "yandex";
    document.head.appendChild(script);
  }

  window.ym(counterId, "init", {
    accurateTrackBounce: true,
    clickmap: true,
    defer: true,
    ecommerce: false,
    sendTitle: false,
    trackLinks: true,
    webvisor: false,
  });
  window.__pfaYandexMetricaInitialized = true;
}

function initializeGoogleAnalytics(measurementId: string) {
  if (window.__pfaGoogleAnalyticsInitialized) return;

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag("consent", "default", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    send_page_view: false,
  });

  if (!document.querySelector('script[data-pfa-analytics="google"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.pfaAnalytics = "google";
    document.head.appendChild(script);
  }

  window.__pfaGoogleAnalyticsInitialized = true;
}

export default function Analytics({ googleAnalyticsId, yandexMetricaId }: Props) {
  const pathname = usePathname();
  const [isAllowed, setIsAllowed] = useState(false);
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    const readConsent = () => {
      try {
        setIsAllowed(parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))?.analytics === true);
      } catch {
        setIsAllowed(false);
      }
    };
    const handleConsent = (event: Event) => {
      const consent = (event as CustomEvent<CookieConsent>).detail;
      setIsAllowed(consent?.analytics === true);
    };

    readConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsent);
  }, []);

  useEffect(() => {
    if (!isAllowed || pathname.startsWith("/admin") || !isAnalyticsEnvironment()) return;

    const yandexId = Number(yandexMetricaId);
    if (Number.isSafeInteger(yandexId) && yandexId > 0) initializeYandexMetrica(yandexId);
    if (googleAnalyticsId?.startsWith("G-")) initializeGoogleAnalytics(googleAnalyticsId);

    const currentUrl = window.location.href;
    if (lastTrackedUrl.current === currentUrl) return;

    if (Number.isSafeInteger(yandexId) && yandexId > 0) {
      window.ym?.(yandexId, "hit", currentUrl, {
        referer: lastTrackedUrl.current ?? document.referrer,
        title: document.title,
      });
    }
    if (googleAnalyticsId?.startsWith("G-")) {
      window.gtag?.("event", "page_view", {
        page_location: currentUrl,
        page_path: pathname,
        page_title: document.title,
      });
    }

    lastTrackedUrl.current = currentUrl;
  }, [googleAnalyticsId, isAllowed, pathname, yandexMetricaId]);

  return null;
}
