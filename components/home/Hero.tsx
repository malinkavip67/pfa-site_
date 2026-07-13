"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 100]);

  return <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
    <motion.div className="absolute -inset-y-24 inset-x-0 -z-30 will-change-transform" style={{ y: imageY }}><Image src="/images/hero/hero-stadium.png" fill priority sizes="100vw" className="object-cover" alt="Ночной футбольный стадион" /></motion.div>
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,11,20,.98)_0%,rgba(5,11,20,.82)_38%,rgba(5,11,20,.22)_75%),linear-gradient(0deg,rgba(5,11,20,.78),transparent_50%)]" />
    <Container className="pt-24 max-md:pb-24 max-md:pt-48">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-slate-300"><span className="h-px w-10 bg-[#22C55E]" />Premier Football Agency</motion.div>
      <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="font-display mt-6 text-[clamp(6rem,11vw,11.5rem)] uppercase leading-[.78] tracking-[-.015em]">Мы создаём<br /><span className="text-outline">чемпионов</span></motion.h1>
      <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }} className="mt-7 max-w-xl text-sm leading-7 text-slate-300">Международное футбольное агентство.<br />Стратегия, переговоры и поддержка на каждом этапе карьеры.</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8 }} className="mt-10 flex gap-4 max-sm:flex-col"><ButtonLink href="/players">Наши игроки</ButtonLink><ButtonLink href="/contacts" variant="secondary">Связаться</ButtonLink></motion.div>
    </Container>
    <a href="#agency" className="absolute bottom-9 left-12 flex items-center gap-4 text-[9px] uppercase tracking-[.18em] text-slate-300 max-md:hidden">Подробнее <ArrowDown className="text-[#22C55E]" size={18} /></a>
    <span className="absolute bottom-9 right-12 text-[9px] tracking-[.2em] text-white/50">PFA / 01</span>
  </section>;
}
