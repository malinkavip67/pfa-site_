"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "pfa-cookie-notice-v1";

const content = {
  ru: {
    title: "Технические cookies",
    text: "Сайт использует только необходимые технические данные и локальное хранилище для корректной работы. Аналитические и рекламные cookies не подключены.",
    link: "Подробнее",
    button: "Понятно",
  },
  en: {
    title: "Technical cookies",
    text: "This website uses only essential technical data and local storage to work correctly. Analytics and advertising cookies are not enabled.",
    link: "Learn more",
    button: "Got it",
  },
} as const;

export default function CookieNotice() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = content[locale];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visibilityTimer = window.setTimeout(() => {
      try {
        setIsVisible(window.localStorage.getItem(STORAGE_KEY) !== "dismissed");
      } catch {
        setIsVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(visibilityTimer);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // The notice can still be dismissed for the current page view.
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4 max-sm:p-3">
      <Card
        as="div"
        className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 border-pfa-accent/30 !bg-[#08111d]/95 px-6 py-5 shadow-[0_-18px_60px_rgba(0,0,0,.45)] backdrop-blur-xl max-sm:flex-col max-sm:items-stretch max-sm:gap-4 max-sm:px-5"
      >
        <div className="max-w-[820px]">
          <Typography as="h2" variant="sectionSubtitle">{copy.title}</Typography>
          <Typography variant="bodyMedium" className="mt-2 leading-6 text-slate-300">
            {copy.text}{" "}
            <Link
              className="font-bold text-white underline decoration-pfa-accent/70 underline-offset-4 transition-colors hover:text-pfa-accent"
              href={localizePath("/privacy", locale)}
            >
              {copy.link}
            </Link>
          </Typography>
        </div>
        <Button
          onClick={dismiss}
          shape="square"
          size="compact"
          className="min-h-11 shrink-0 px-6 max-sm:w-full"
        >
          {copy.button}
        </Button>
      </Card>
    </div>
  );
}
