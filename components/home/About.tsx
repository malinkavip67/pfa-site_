import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return <section id="agency" className="py-36 max-md:py-24"><Container>
    <AnimatedReveal><SectionHeading index="01">Агентство</SectionHeading></AnimatedReveal>
    <AnimatedReveal className="mt-16 grid grid-cols-[1.35fr_.65fr] items-end gap-20 max-lg:grid-cols-1 max-lg:gap-12">
      <h2 className="font-display text-[clamp(5rem,8vw,8rem)] uppercase leading-[.82] max-sm:text-[2.5rem]">Не просто<br />представляем.<br /><span className="text-outline">Развиваем.</span></h2>
      <div className="max-w-lg"><p className="text-xl leading-relaxed">Талант открывает дверь. Система, характер и точные решения превращают потенциал в карьеру мирового уровня.</p><p className="mt-7 text-sm leading-7 text-slate-400">PFA объединяет спортивную экспертизу, международные связи и персональную ответственность за результат.</p></div>
    </AnimatedReveal>
  </Container></section>;
}
