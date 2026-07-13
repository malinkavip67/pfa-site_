import Image from "next/image";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";

export default function FeatureStatement() {
  return <section className="relative flex min-h-[82vh] items-end overflow-hidden"><Image src="/images/players/player-feature.webp" fill loading="lazy" sizes="100vw" className="object-cover object-center" alt="Футболист перед выходом на поле" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,20,.45),rgba(5,11,20,.1)),linear-gradient(0deg,rgba(5,11,20,.92),transparent_58%)]" /><Container className="relative pb-20"><AnimatedReveal><span className="text-[10px] uppercase tracking-[.2em] text-[#22C55E]">Наша философия</span><h2 className="font-display mt-4 text-[clamp(4rem,8vw,7.5rem)] uppercase leading-[.84] max-sm:text-[3.4rem]">Каждая карьера —<br />долгосрочный проект.</h2></AnimatedReveal></Container></section>;
}
