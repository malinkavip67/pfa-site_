import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import PartnersGrid from "@/components/partners/PartnersGrid";
import type { Partner } from "@/types/partner";

interface Props { partners: Partner[]; }

export default function Partners({ partners }: Props) {
  return <section className="py-28"><Container><AnimatedReveal><SectionTitle index="04">Партнёры</SectionTitle><p className="mb-14 mt-5 max-w-lg text-sm leading-7 text-slate-500">Работаем с командами, которые разделяют наш стандарт точности, конфиденциальности и результата.</p><PartnersGrid partners={partners} /></AnimatedReveal></Container></section>;
}
