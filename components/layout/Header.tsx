"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { NAVIGATION } from "@/lib/constants";
import { getLocaleFromPathname, localizePath, NAVIGATION_LABELS, type Locale } from "@/lib/i18n";

const FOCUSABLE_ELEMENTS = "a[href], button:not([disabled])";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeader = (): void => setIsScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const updateHash = (): void => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = mobileNavigationRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isOpen]);

  const closeMenu = (): void => setIsOpen(false);

  const isCurrentPage = (href: string): boolean => {
    const localizedHref = localizePath(href, locale);
    const [localizedPathname, localizedHash] = localizedHref.split("#");
    if (href === "/") return pathname === localizedPathname && currentHash !== "#services";
    if (localizedHash) return pathname === localizedPathname && currentHash === `#${localizedHash}`;
    return pathname === localizedPathname || pathname.startsWith(`${localizedPathname}/`);
  };

  const alternateLocale: Locale = locale === "ru" ? "en" : "ru";
  const alternateHref = localizePath(`${pathname}${currentHash}`, alternateLocale);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 grid h-[72px] grid-cols-[auto_1fr_auto] items-center border-b border-white/10 bg-[#03070d]/95 px-[clamp(1.25rem,3.5vw,3rem)] transition-[height,background-color] duration-300 ${isScrolled ? "h-16 bg-[#03070d]/98 backdrop-blur-sm" : ""}`}>
      <Link href={localizePath("/", locale)} className="flex h-16 w-28 items-center" aria-label={locale === "ru" ? "PFA — на главную" : "PFA — home"}>
        <Image src="/images/logo/logo-white.jpg" width={1366} height={768} sizes="112px" loading="eager" className="h-full w-full object-contain" alt="Premier Football Agency" />
      </Link>

      <nav className="flex items-center justify-center gap-7 max-xl:gap-5 max-lg:hidden" aria-label="Основная навигация">
        {NAVIGATION.map((item) => (
          <Link
            key={item.href}
            href={localizePath(item.href, locale)}
            aria-current={isCurrentPage(item.href) ? "page" : undefined}
            className="relative py-3 text-[10px] font-bold uppercase tracking-[.1em] text-slate-200 transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-pfa-accent after:transition-transform hover:text-pfa-accent aria-[current=page]:text-pfa-accent aria-[current=page]:after:scale-x-100"
          >
            {NAVIGATION_LABELS[locale][item.href]}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 max-lg:hidden">
        <Button href={localizePath("/contacts", locale)} shape="square" size="compact" className="min-h-11 border border-white/30 bg-transparent px-5 text-[10px] text-white shadow-none hover:border-pfa-accent hover:bg-transparent hover:text-pfa-accent max-xl:px-4">{locale === "ru" ? "Связаться с нами" : "Contact us"}</Button>
        <label className="relative flex items-center" aria-label={locale === "ru" ? "Язык сайта" : "Website language"}>
          <select className="h-11 appearance-none bg-transparent pl-2 pr-6 text-[10px] font-bold text-white outline-none" value={locale} onChange={(event) => { window.location.href = localizePath(`${pathname}${currentHash}`, event.target.value as Locale); }}>
            <option className="bg-pfa-background" value="ru">RU</option>
            <option className="bg-pfa-background" value="en">EN</option>
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-0 text-slate-400" size={13} />
        </label>
      </div>

      <button
        ref={menuButtonRef}
        type="button"
        className="hidden justify-self-end rounded-sm border border-white/20 p-2.5 transition-colors hover:border-pfa-accent max-lg:block"
        onClick={() => setIsOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <Menu aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileNavigationRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильная навигация"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#03070d] px-6 py-6"
            initial={shouldReduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0)" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between">
              <Image src="/images/logo/logo-white.jpg" width={1366} height={768} sizes="112px" className="h-14 w-28 object-contain" alt="Premier Football Agency" />
              <button ref={closeButtonRef} type="button" className="rounded-sm border border-white/20 p-2.5 transition-colors hover:border-pfa-accent" onClick={closeMenu} aria-label="Закрыть меню">
                <X aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 py-8" aria-label="Мобильная навигация">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={localizePath(item.href, locale)}
                  aria-current={isCurrentPage(item.href) ? "page" : undefined}
                  onClick={closeMenu}
                  className="font-display text-[clamp(2.8rem,13vw,5.5rem)] uppercase leading-[.92] transition-colors hover:text-pfa-accent aria-[current=page]:text-pfa-accent"
                >
                  {NAVIGATION_LABELS[locale][item.href]}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button href={localizePath("/contacts", locale)} shape="square" size="compact" className="flex-1" onClick={closeMenu}>{locale === "ru" ? "Связаться с нами" : "Contact us"}</Button>
              <Link href={alternateHref} onClick={closeMenu} className="text-xs font-bold text-white transition-colors hover:text-pfa-accent">{alternateLocale.toUpperCase()}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
