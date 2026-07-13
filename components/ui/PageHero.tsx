import Container from "@/components/ui/Container";

interface Props { eyebrow: string; title: string; description: string; }

export default function PageHero({ eyebrow, title, description }: Props) {
  return <section className="flex min-h-[62vh] items-end border-b border-white/10 pb-20 pt-40"><Container><span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#22C55E]">{eyebrow}</span><h1 className="font-display mt-5 text-[clamp(6rem,13vw,12rem)] uppercase leading-[.78]">{title}</h1><p className="mt-8 max-w-xl text-sm leading-7 text-slate-400">{description}</p></Container></section>;
}
