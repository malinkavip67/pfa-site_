import { ArrowUpRight } from "lucide-react";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Service } from "@/types/service";

interface Props { services: Service[]; }

export default function Services({ services }: Props) {
  return <section className="py-36 max-md:py-24"><Container>
    <AnimatedReveal className="grid grid-cols-[1fr_2fr] max-lg:grid-cols-1 max-lg:gap-10"><SectionTitle index="02">Экспертиза</SectionTitle><h2 className="font-display text-[clamp(5rem,8vw,8rem)] uppercase leading-[.82]">Всё, что нужно<br /><span className="text-outline">для большого пути</span></h2></AnimatedReveal>
    <div className="mt-24 border-t border-white/10 max-md:mt-14">{services.map((service, index) => <AnimatedReveal delay={index * 0.06} key={service.id} className="group grid min-h-40 grid-cols-[5rem_1fr_1.15fr_2rem] items-center gap-6 border-b border-white/10 transition hover:bg-[#0C1726]/50 hover:px-5 max-md:grid-cols-[2.5rem_1fr_1.5rem] max-md:gap-3 max-md:py-6"><span className="text-[11px] text-[#22C55E]">{service.id}</span><h3 className="font-display text-5xl uppercase max-md:text-4xl">{service.title}</h3><p className="text-sm leading-7 text-slate-500 max-md:col-span-2 max-md:col-start-2">{service.description}</p><ArrowUpRight className="text-[#22C55E] max-md:col-start-3 max-md:row-start-1" /></AnimatedReveal>)}</div>
  </Container></section>;
}
