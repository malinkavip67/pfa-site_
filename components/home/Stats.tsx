import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Container from "@/components/ui/Container";
import { stats } from "@/data/stats";

export default function Stats() {
  return <Container><AnimatedReveal className="grid grid-cols-3 border-t border-white/10 pb-36 max-md:grid-cols-1 max-md:pb-24">{stats.map((stat) => <div className="flex flex-col gap-2 pt-9 max-md:flex-row max-md:items-center max-md:justify-between max-md:border-b max-md:border-white/10 max-md:py-5" key={stat.value}><strong className="font-display text-6xl font-normal">{stat.value}</strong><span className="text-[11px] uppercase tracking-wider text-slate-400">{stat.label}</span></div>)}</AnimatedReveal></Container>;
}
