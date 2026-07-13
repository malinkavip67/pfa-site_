"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAVIGATION } from "@/lib/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = (): void => setIsScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return <header className={`fixed inset-x-0 top-0 z-50 grid h-24 grid-cols-[1fr_auto_1fr] items-center px-12 transition-all duration-500 max-lg:grid-cols-[1fr_auto] max-lg:px-5 ${isScrolled ? "h-[76px] border-b border-white/10 bg-[#050B14]/85 backdrop-blur-xl" : ""}`}>
    <Link href="/" aria-label="PFA — на главную"><Image src="/images/logo/logo-white.png" width={860} height={190} className="h-auto w-36" alt="Premier Football Agency" priority /></Link>
    <nav className="flex gap-9 max-lg:hidden" aria-label="Основная навигация">{NAVIGATION.map((item) => <Link key={item.href} href={item.href} className="text-[11px] font-semibold uppercase tracking-[.13em] text-slate-300 transition hover:text-white">{item.label}</Link>)}</nav>
    <Link href="/contacts" className="justify-self-end border-b border-[#22C55E] pb-1 text-[11px] font-bold uppercase tracking-[.1em] max-lg:hidden">Начать разговор</Link>
    <button type="button" className="hidden rounded-full border border-white/15 p-3 max-lg:block" onClick={() => setIsOpen(true)} aria-label="Открыть меню"><Menu /></button>
    <AnimatePresence>{isOpen && <motion.div className="fixed inset-0 z-50 flex flex-col bg-[#050B14] p-8" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <button type="button" className="absolute right-7 top-7 rounded-full border border-white/15 p-3" onClick={() => setIsOpen(false)} aria-label="Закрыть меню"><X /></button>
      <span className="font-display text-4xl">PFA</span>
      <nav className="flex flex-1 flex-col justify-center gap-3">{NAVIGATION.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="font-display text-[clamp(3.5rem,15vw,6rem)] uppercase leading-none">{item.label}</Link>)}</nav>
    </motion.div>}</AnimatePresence>
  </header>;
}
