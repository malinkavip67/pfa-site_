import AnimatedReveal from "@/components/ui/AnimatedReveal";
import ApplicationButton from "@/components/forms/ApplicationButton";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { Locale } from "@/lib/i18n";

interface Props { locale?: Locale; }

export default function CTA({ locale = "ru" }: Props) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-white/10 bg-[#061018] py-28 max-md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(0,235,82,.11),transparent_42%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pfa-accent/50 to-transparent" />
      <Container className="relative">
        <AnimatedReveal className="grid grid-cols-[1.15fr_.85fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <SectionHeading index="06">{locale === "ru" ? "Следующий шаг" : "Next step"}</SectionHeading>
            <Typography id="cta-title" as="h2" variant="sectionTitle" className="mt-8 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">
              {locale === "ru" ? <>Готовы к новому<br /><span className="text-pfa-accent">этапу карьеры?</span></> : <>Ready for the next<br /><span className="text-pfa-accent">career chapter?</span></>}
            </Typography>
          </div>
          <div className="border-l border-pfa-accent/60 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
            <Typography variant="bodyLarge" className="max-w-xl text-white">{locale === "ru" ? "Расскажите о своей задаче — команда PFA свяжется с вами и предложит следующий профессиональный шаг." : "Tell us about your goals. The PFA team will contact you and propose the next professional step."}</Typography>
            <ApplicationButton className="mt-8" shape="square" size="compact">{locale === "ru" ? "Оставить заявку" : "Leave an application"}</ApplicationButton>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
