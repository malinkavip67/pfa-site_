import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CTA() {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden border-t border-white/10 py-24 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,.14),transparent_52%)]" />
      <div className="absolute inset-x-[12%] top-1/2 h-px bg-gradient-to-r from-transparent via-pfa-accent/40 to-transparent" />
      <Container className="relative">
        <AnimatedReveal>
          <SectionHeading className="justify-center" index="05">Следующий шаг</SectionHeading>
          <h2 className="font-display mx-auto mt-7 max-w-6xl text-[clamp(4.5rem,10vw,9.5rem)] uppercase leading-[.82] max-sm:text-[3rem]">Готовы к новому<br /><span className="text-outline">этапу карьеры?</span></h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-pfa-muted">Расскажите о своей задаче — команда PFA свяжется с вами и предложит следующий профессиональный шаг.</p>
          <Button className="mt-10" href="/contacts">Связаться</Button>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
