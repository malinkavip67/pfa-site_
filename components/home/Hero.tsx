"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import HeroStats from "@/components/home/HeroStats";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { stats } from "@/data/stats";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={heroRef} id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div className="absolute -inset-y-24 inset-x-0 z-0 will-change-transform" style={shouldReduceMotion ? undefined : { y: imageY }}>
        <Image
          src="/images/hero/hero-stadium.webp"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-center"
          alt="Футболист с мячом на ночном стадионе"
        />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,11,20,.98)_0%,rgba(5,11,20,.84)_42%,rgba(5,11,20,.24)_78%),linear-gradient(0deg,rgba(5,11,20,.9)_0%,transparent_52%)] max-md:bg-[linear-gradient(90deg,rgba(5,11,20,.96),rgba(5,11,20,.62)),linear-gradient(0deg,rgba(5,11,20,.94),transparent_55%)]" />

      <Container className="relative z-20 flex min-h-[100svh] flex-col pb-6 pt-28 md:pb-8 md:pt-32">
        <div className="flex flex-1 items-center py-10 md:py-14">
          <div className="max-w-4xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-pfa-muted md:text-[11px]"
            >
              <span className="h-px w-10 bg-pfa-accent" />Premier Football Agency
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, delay: shouldReduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-6 text-[clamp(5rem,11vw,11.5rem)] uppercase leading-[.78] tracking-[-.015em] max-sm:text-[3.25rem]"
            >
              МЫ СОЗДАЁМ<br /><span className="text-outline">ЧЕМПИОНОВ</span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, delay: shouldReduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-2xl text-[13px] leading-6 text-pfa-muted md:text-sm md:leading-7"
            >
              Premier Football Agency — международное футбольное агентство, которое сопровождает профессиональных футболистов на каждом этапе карьеры. Мы организуем трансферы, ведём переговоры с клубами и защищаем интересы игроков.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex gap-4 max-sm:grid max-sm:grid-cols-1"
            >
              <Button href="/players">Наши игроки</Button>
              <Button href="/contacts" variant="secondary">Связаться</Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroStats stats={stats} />
        </motion.div>
      </Container>
    </section>
  );
}
