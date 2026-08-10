import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import PartnersGrid from "@/components/partners/PartnersGrid";
import type { Partner } from "@/types/partner";
import type { Locale } from "@/lib/i18n";

interface Props { partners: Partner[]; locale?: Locale; }

export default function Partners({ partners, locale = "ru" }: Props) {
  return (
    <section aria-labelledby="partners-title" className="bg-[#050b14] py-28 max-md:py-20">
      <Container>
        <AnimatedReveal className="grid grid-cols-[1.15fr_.85fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <SectionHeading index="05">{locale === "ru" ? "Партнёры" : "Partners"}</SectionHeading>
            <Typography id="partners-title" as="h2" variant="sectionTitle" className="mt-8 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">
              {locale === "ru" ? <>Надёжные связи.<br /><span className="text-pfa-accent">Сильные решения.</span></> : <>Trusted connections.<br /><span className="text-pfa-accent">Strong solutions.</span></>}
            </Typography>
          </div>
          <div className="max-w-[560px] border-l border-pfa-accent/60 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
            <Typography variant="bodyLarge" className="text-white">{locale === "ru" ? "Работаем с командами, которые разделяют наш стандарт точности, конфиденциальности и результата." : "We work with teams that share our standards of precision, confidentiality and results."}</Typography>
          </div>
        </AnimatedReveal>

        <AnimatedReveal className="mt-16">
          <PartnersGrid partners={partners} />
        </AnimatedReveal>
      </Container>
    </section>
  );
}
