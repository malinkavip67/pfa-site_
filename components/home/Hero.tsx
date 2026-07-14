"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 56]);

  return (
    <section ref={heroRef} id="top" className="relative isolate h-[78svh] min-h-[620px] max-h-[760px] overflow-hidden max-md:h-auto max-md:min-h-[720px]">
      <motion.div className="absolute -inset-y-16 inset-x-0 z-0 will-change-transform" style={shouldReduceMotion ? undefined : { y: imageY }}>
        <Image
          src="/images/hero/hero-pfa-player.webp"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[66%_center] brightness-[1.08] contrast-[1.08] saturate-[1.06] md:object-center"
          alt="Футболист с мячом на ночном стадионе"
        />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(2,6,12,.98)_0%,rgba(2,6,12,.9)_34%,rgba(2,6,12,.42)_62%,rgba(2,6,12,.12)_100%),linear-gradient(0deg,rgba(2,6,12,.62),transparent_50%)] max-md:bg-[linear-gradient(90deg,rgba(2,6,12,.96),rgba(2,6,12,.58)),linear-gradient(0deg,rgba(2,6,12,.72),transparent_55%)]" />

      <Container className="relative z-20 flex h-full min-h-[620px] items-center pb-12 pt-28 max-md:min-h-[720px] max-md:pb-16 max-md:pt-32">
        <div className="max-w-[620px]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography variant="bodyMedium" className="font-bold text-white">Premier Football Agency</Typography>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, delay: shouldReduceMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography as="h1" variant="heroTitle" className="mt-6 text-[clamp(2.75rem,4.25vw,4.7rem)] max-sm:text-[clamp(1.7rem,8.1vw,2.4rem)]">
              МЫ СОЗДАЁМ<br /><span className="text-pfa-accent">ЧЕМПИОНОВ</span>
            </Typography>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography variant="bodyMedium" className="mt-7 max-w-[560px] font-semibold leading-6 text-white/90">
              Premier Football Agency — международное футбольное агентство, которое сопровождает профессиональных футболистов на каждом этапе карьеры. Мы организуем трансферы, ведём переговоры с клубами и защищаем интересы игроков.
            </Typography>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, delay: shouldReduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex gap-4 max-sm:grid max-sm:grid-cols-1"
          >
            <Button href="/players" shape="square" size="compact">Наши игроки</Button>
            <Button href="/contacts" variant="secondary" shape="square" size="compact">Связаться с нами</Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
