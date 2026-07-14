import ServiceCard from "@/components/home/ServiceCard";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { Service } from "@/types/service";
import type { Locale } from "@/lib/i18n";

interface Props {
  services: Service[];
  locale?: Locale;
}

export default function Services({ services, locale = "ru" }: Props) {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24 bg-[#050b14] py-32 max-md:py-20">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1.15fr_.85fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <SectionHeading index="03">{locale === "ru" ? "Экспертиза" : "Expertise"}</SectionHeading>
            <Typography id="services-title" as="h2" variant="sectionTitle" className="mt-8 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">
              {locale === "ru" ? <>Всё, что нужно<br /><span className="text-pfa-accent">для большого пути</span></> : <>Everything needed<br /><span className="text-pfa-accent">for the journey</span></>}
            </Typography>
          </div>
          <div className="max-w-[560px] border-l border-pfa-accent/60 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
            <Typography variant="bodyLarge" className="text-white">{locale === "ru" ? "Комплексная поддержка позволяет игроку сосредоточиться на футболе, пока команда PFA отвечает за стратегию, переговоры и развитие." : "Comprehensive support lets the player focus on football while PFA handles strategy, negotiations and development."}</Typography>
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
