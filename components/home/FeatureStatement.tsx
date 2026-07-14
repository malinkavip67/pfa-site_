import Image from "next/image";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";

export default function FeatureStatement() {
  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden border-y border-white/10 py-28 max-md:py-20">
      <Image
        src="/images/players/player-feature.webp"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center max-sm:object-[58%_center]"
        alt="Футболист перед выходом на поле"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,20,.97)_0%,rgba(5,11,20,.88)_44%,rgba(5,11,20,.18)_100%),linear-gradient(0deg,rgba(5,11,20,.7)_0%,rgba(5,11,20,.08)_72%)]" />
      <div className="absolute inset-0 hidden bg-[#050b14]/65 max-lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pfa-accent/60 to-transparent" />

      <Container className="relative">
        <SectionHeading index="02">О нас</SectionHeading>
        <div className="mt-8 grid grid-cols-[1.08fr_.92fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-10">
          <AnimatedReveal className="max-lg:order-2">
            <Card className="border-white/15 bg-[#07111ee8] p-10 shadow-2xl shadow-black/30 backdrop-blur-sm max-sm:p-6">
              <Typography variant="bodyLarge" className="text-xl leading-9 text-white max-sm:text-lg max-sm:leading-8">
                Premier Football Agency — международное агентство, которое представляет интересы профессиональных футболистов и сопровождает их на каждом этапе карьеры.
              </Typography>

              <div className="my-7 h-px bg-gradient-to-r from-pfa-accent/70 via-white/15 to-transparent" />

              <div className="space-y-6">
                <Typography variant="bodyMedium" className="text-xl font-medium leading-9 text-white max-sm:text-lg max-sm:leading-8">
                  Мы разрабатываем индивидуальную стратегию, ведём переговоры с клубами, организуем трансферы и сопровождаем заключение контрактов. Каждое решение должно усиливать карьеру игрока сегодня и в перспективе.
                </Typography>
                <Typography variant="bodyMedium" className="text-xl font-medium leading-9 text-white max-sm:text-lg max-sm:leading-8">
                  Для нас каждый футболист — долгосрочный проект. Мы помогаем раскрывать потенциал, развивать личный бренд, находить сильные возможности и уверенно выходить на международный уровень.
                </Typography>
              </div>
            </Card>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1} className="self-end pb-8 max-lg:order-1 max-lg:pb-0">
            <Typography id="about-title" as="h2" variant="sectionTitle" className="text-[clamp(2.25rem,3.5vw,3.8rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.8rem]">
              Каждая карьера<br /><span className="text-pfa-accent">долгосрочный проект</span>
            </Typography>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
