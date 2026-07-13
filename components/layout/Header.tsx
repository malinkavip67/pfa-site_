"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAVIGATION } from "@/lib/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHeader = (): void => setIsScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = (): void => {
    setIsOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const isCurrentPage = (href: string): boolean => href === "/#agency" ? pathname === "/" : pathname.startsWith(href);

  return <header className={`fixed inset-x-0 top-0 z-50 grid h-24 grid-cols-[1fr_auto_1fr] items-center px-12 transition-all duration-500 max-lg:grid-cols-[1fr_auto] max-lg:px-5 ${isScrolled ? "h-[76px] border-b border-white/10 bg-pfa-background/85 backdrop-blur-xl" : ""}`}>
    <Link href="/" className="flex h-20 w-36 items-center max-lg:h-16 max-lg:w-28" aria-label="PFA — на главную"><Image src="/images/logo/logo-white.jpg" width={1366} height={768} className="h-full w-full object-contain" alt="Premier Football Agency" priority /></Link>
    <nav className="flex gap-9 max-lg:hidden" aria-label="Основная навигация">{NAVIGATION.map((item) => <Link key={item.href} href={item.href} aria-current={isCurrentPage(item.href) ? "page" : undefined} className="text-[11px] font-semibold uppercase tracking-[.13em] text-slate-300 transition hover:text-white aria-[current=page]:text-white">{item.label}</Link>)}</nav>
    <Link href="/contacts" className="justify-self-end border-b border-pfa-accent pb-1 text-[11px] font-bold uppercase tracking-[.1em] max-lg:hidden">Начать разговор</Link>
    <button ref={menuButtonRef} type="button" className="hidden rounded-full border border-white/15 p-3 max-lg:block" onClick={() => setIsOpen(true)} aria-label="Открыть меню" aria-expanded={isOpen} aria-controls="mobile-navigation"><Menu /></button>
    <AnimatePresence>{isOpen && <motion.div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Мобильная навигация" className="fixed inset-0 z-50 flex flex-col bg-pfa-background p-8" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <button ref={closeButtonRef} type="button" className="absolute right-7 top-7 rounded-full border border-white/15 p-3" onClick={closeMenu} aria-label="Закрыть меню"><X /></button>
      <span className="font-display text-4xl">PFA</span>
      <nav className="flex flex-1 flex-col justify-center gap-3" aria-label="Мобильная навигация">{NAVIGATION.map((item) => <Link key={item.href} href={item.href} aria-current={isCurrentPage(item.href) ? "page" : undefined} onClick={closeMenu} className="font-display text-[clamp(3.5rem,15vw,6rem)] uppercase leading-none aria-[current=page]:text-pfa-accent">{item.label}</Link>)}</nav>
    </motion.div>}</AnimatePresence>
  </header>;
}
