"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface Props {
  locale: Locale;
  compact?: boolean;
  mobile?: boolean;
}

const copy = {
  ru: {
    label: "PFA App",
    mobileLabel: "Установить приложение",
    ariaLabel: "Установить приложение PFA",
    iosHelp: "На iPhone нажмите «Поделиться», затем выберите «На экран Домой».",
    browserHelp: "Откройте меню браузера и выберите «Установить приложение» или «Добавить на главный экран».",
    close: "Закрыть подсказку",
  },
  en: {
    label: "PFA App",
    mobileLabel: "Install the app",
    ariaLabel: "Install the PFA app",
    iosHelp: "On iPhone, tap Share and then choose Add to Home Screen.",
    browserHelp: "Open the browser menu and choose Install app or Add to Home screen.",
    close: "Close instructions",
  },
} as const;

function subscribeToDisplayMode(callback: () => void) {
  const mediaQuery = window.matchMedia("(display-mode: standalone)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getDisplayModeSnapshot() {
  return window.matchMedia("(display-mode: standalone)").matches
    || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

function getServerDisplayModeSnapshot() {
  return false;
}

export default function InstallAppButton({ locale, compact = false, mobile = false }: Props) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [helpText, setHelpText] = useState("");
  const isStandalone = useSyncExternalStore(
    subscribeToDisplayMode,
    getDisplayModeSnapshot,
    getServerDisplayModeSnapshot,
  );
  const content = copy[locale];

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setHelpText("");
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (!isVisible || isStandalone) return null;

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") setIsVisible(false);
      setInstallPrompt(null);
      return;
    }

    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setHelpText(isIos ? content.iosHelp : content.browserHelp);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstall}
        aria-label={content.ariaLabel}
        title={content.ariaLabel}
        className={mobile
          ? "mb-4 flex min-h-12 w-full items-center justify-center gap-3 rounded-sm border border-pfa-accent/70 bg-pfa-accent/10 px-5 text-[11px] font-bold uppercase tracking-[.12em] text-pfa-accent transition-colors hover:bg-pfa-accent hover:text-pfa-accent-contrast"
          : "flex min-h-11 items-center justify-center gap-2 rounded-sm border border-pfa-accent/60 bg-pfa-accent/5 px-3 text-[10px] font-bold uppercase tracking-[.1em] text-pfa-accent transition-colors hover:bg-pfa-accent hover:text-pfa-accent-contrast"
        }
      >
        <Download aria-hidden="true" size={compact ? 15 : 17} />
        <span className={mobile ? "" : "max-xl:hidden"}>{mobile ? content.mobileLabel : content.label}</span>
      </button>

      {helpText && (
        <div role="status" className="fixed bottom-5 right-5 z-[110] w-[min(390px,calc(100%-2rem))] border border-pfa-accent/40 bg-[#08111d] p-5 shadow-[0_20px_70px_rgba(0,0,0,.65)]">
          <button
            type="button"
            aria-label={content.close}
            onClick={() => setHelpText("")}
            className="absolute right-3 top-3 text-slate-400 transition-colors hover:text-white"
          >
            <X aria-hidden="true" size={18} />
          </button>
          <p className="pr-7 text-sm font-semibold leading-6 text-white">{helpText}</p>
        </div>
      )}
    </>
  );
}
