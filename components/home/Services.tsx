import ServiceCard from "@/components/home/ServiceCard";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/types/service";

interface Props {
  services: Service[];
}

export default function Services({ services }: Props) {
  return (
    <section id="services" className="scroll-mt-24 bg-pfa-surface/20 py-36 max-md:py-24">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1fr_2fr] max-lg:grid-cols-1 max-lg:gap-10">
          <SectionHeading index="02">Экспертиза</SectionHeading>
          <div>
            <h2 className="font-display text-[clamp(4.5rem,8vw,8rem)] uppercase leading-[.82] max-sm:text-[3rem]">Всё, что нужно<br /><span className="text-outline">для большого пути</span></h2>
            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-400">Комплексная поддержка позволяет игроку сосредоточиться на футболе, пока команда PFA отвечает за стратегию, переговоры и развитие.</p>
          </div>
        </AnimatedReveal>

        <div className="mt-20 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {services.map((service, index) => (
            <AnimatedReveal key={service.id} delay={index * 0.06} className="h-full">
              <ServiceCard service={service} />
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
