import AnimatedReveal from "@/components/ui/AnimatedReveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CallToAction() {
  return <section className="relative flex min-h-[78vh] items-center overflow-hidden text-center"><div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,197,94,.12),transparent_55%)]" /><Container className="relative"><AnimatedReveal><SectionTitle className="justify-center" index="05">Контакты</SectionTitle><h2 className="font-display mt-6 text-[clamp(5.5rem,11vw,10rem)] uppercase leading-[.8] max-sm:text-[3.5rem]">Ваш следующий<br /><span className="text-outline">большой шаг</span></h2><p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-slate-300">Готовы обсудить карьеру, трансфер или партнёрство?<br />Начнём с личного разговора.</p><ButtonLink className="mt-9" href="mailto:hello@pfa.agency">hello@pfa.agency</ButtonLink></AnimatedReveal></Container></section>;
}
