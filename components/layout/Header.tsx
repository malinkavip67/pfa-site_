"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { NAVIGATION } from "@/lib/constants";

const FOCUSABLE_ELEMENTS = "a[href], button:not([disabled])";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();
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
    if (href === "/") return pathname === "/" && currentHash !== "#services";
    if (href.startsWith("/#")) return pathname === "/" && currentHash === href.slice(1);
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 grid h-24 grid-cols-[1fr_auto_1fr] items-center px-[clamp(1.25rem,3.5vw,3rem)] transition-[height,background-color,border-color] duration-500 max-lg:grid-cols-[1fr_auto] ${isScrolled ? "h-[76px] border-b border-white/10 bg-pfa-background/90 backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}>
      <Link href="/" className="flex h-20 w-32 items-center max-lg:h-16 max-lg:w-28" aria-label="PFA — на главную">
        <Image src="/images/logo/logo-white.jpg" width={1366} height={768} sizes="(max-width: 1024px) 112px, 128px" loading="eager" className="h-full w-full object-contain" alt="Premier Football Agency" />
      </Link>

      <nav className="flex items-center gap-7 max-xl:gap-5 max-lg:hidden" aria-label="Основная навигация">
        {NAVIGATION.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrentPage(item.href) ? "page" : undefined}
            className="relative py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-300 transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-pfa-accent after:transition-transform hover:text-white aria-[current=page]:text-white aria-[current=page]:after:scale-x-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Button href="/contacts" className="min-h-12 justify-self-end px-5 max-xl:px-4 max-lg:hidden">Связаться</Button>

      <button
        ref={menuButtonRef}
        type="button"
        className="hidden rounded-full border border-white/20 p-3 transition-colors hover:border-pfa-accent max-lg:block"
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
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-pfa-background px-6 py-7"
            initial={shouldReduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0)" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between">
              <Image src="/images/logo/logo-white.jpg" width={1366} height={768} sizes="112px" className="h-16 w-28 object-contain" alt="Premier Football Agency" />
              <button ref={closeButtonRef} type="button" className="rounded-full border border-white/20 p-3 transition-colors hover:border-pfa-accent" onClick={closeMenu} aria-label="Закрыть меню">
                <X aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 py-8" aria-label="Мобильная навигация">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrentPage(item.href) ? "page" : undefined}
                  onClick={closeMenu}
                  className="font-display text-[clamp(2.8rem,13vw,5.5rem)] uppercase leading-[.92] transition-colors hover:text-pfa-accent aria-[current=page]:text-pfa-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button href="/contacts" className="w-full shrink-0" onClick={closeMenu}>Связаться</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
