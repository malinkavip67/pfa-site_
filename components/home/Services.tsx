import ServiceCard from "@/components/home/ServiceCard";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { Service } from "@/types/service";

interface Props {
  services: Service[];
}

export default function Services({ services }: Props) {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24 bg-[#050b14] py-32 max-md:py-20">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1.15fr_.85fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <SectionHeading index="02">Экспертиза</SectionHeading>
            <Typography id="services-title" as="h2" variant="sectionTitle" className="mt-8 text-[clamp(3.25rem,5.2vw,5.5rem)] leading-[.94] tracking-[-.05em] max-sm:text-[2.55rem]">
              Всё, что нужно<br /><span className="text-pfa-accent">для большого пути</span>
            </Typography>
          </div>
          <div className="max-w-[560px] border-l border-pfa-accent/60 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
            <Typography variant="bodyLarge" className="text-white">Комплексная поддержка позволяет игроку сосредоточиться на футболе, пока команда PFA отвечает за стратегию, переговоры и развитие.</Typography>
          </div>
        </AnimatedReveal>

        <div className="mt-16 grid grid-cols-3 gap-px border border-white/10 bg-white/10 max-lg:grid-cols-2 max-sm:grid-cols-1">
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
