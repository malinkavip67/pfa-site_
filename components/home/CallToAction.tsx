import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CallToAction() {
  return <section className="relative flex min-h-[78vh] items-center overflow-hidden text-center"><div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,197,94,.12),transparent_55%)]" /><Container className="relative"><AnimatedReveal><SectionHeading className="justify-center" index="05">Контакты</SectionHeading><h2 className="font-display mt-6 text-[clamp(5.5rem,11vw,10rem)] uppercase leading-[.8] max-sm:text-[3.5rem]">Ваш следующий<br /><span className="text-outline">большой шаг</span></h2><p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-slate-300">Готовы обсудить карьеру, трансфер или партнёрство?<br />Начнём с личного разговора.</p><Button className="mt-9" href="mailto:hello@pfa.agency">hello@pfa.agency</Button></AnimatedReveal></Container></section>;
}
