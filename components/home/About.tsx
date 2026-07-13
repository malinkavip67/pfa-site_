import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { AboutDirection } from "@/types/service";

interface Props {
  directions: AboutDirection[];
}

export default function About({ directions }: Props) {
  return (
    <section id="agency" className="scroll-mt-24 py-36 max-md:py-24">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1.1fr_.9fr] items-end gap-20 max-lg:grid-cols-1 max-lg:gap-10">
          <div>
            <SectionHeading index="01">Агентство</SectionHeading>
            <h2 className="font-display mt-10 text-[clamp(4.5rem,8vw,8rem)] uppercase leading-[.82] max-sm:text-[3rem]">
              Строим карьеру<br /><span className="text-outline">на годы вперёд</span>
            </h2>
          </div>
          <div className="max-w-xl pb-1">
            <p className="text-xl leading-relaxed text-pfa-text">PFA сопровождает футболиста как долгосрочный профессиональный проект.</p>
            <p className="mt-6 text-sm leading-7 text-slate-400">Мы объединяем спортивную стратегию, международные связи и персональную ответственность, чтобы каждое решение усиливало карьеру игрока.</p>
          </div>
        </AnimatedReveal>

        <div className="mt-20 grid grid-cols-3 border-y border-white/10 max-md:grid-cols-1">
          {directions.map((direction, index) => (
            <AnimatedReveal key={direction.id} delay={index * 0.08} className="border-white/10 px-8 py-9 first:pl-0 last:pr-0 md:border-l md:first:border-l-0 max-md:border-b max-md:px-0 max-md:last:border-b-0">
              <span className="text-[10px] font-semibold tracking-[.16em] text-pfa-accent">{direction.id}</span>
              <h3 className="font-display mt-7 text-4xl uppercase">{direction.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">{direction.description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
