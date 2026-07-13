import type { Stat } from "@/types/stat";

interface Props {
  stats: Stat[];
}

function getBorderStyles(index: number): string {
  const mobileColumnBorder = index % 2 === 1 ? "border-l border-white/10" : "";
  const mobileRowBorder = index < 2 ? "border-b border-white/10 md:border-b-0" : "";
  const desktopBorder = index > 0 ? "md:border-l md:border-white/10" : "md:border-l-0";
  return `${mobileColumnBorder} ${mobileRowBorder} ${desktopBorder}`;
}

export default function HeroStats({ stats }: Props) {
  return (
    <dl className="grid grid-cols-2 border-y border-white/15 bg-pfa-background/30 backdrop-blur-sm md:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.label} className={`flex min-h-20 items-center gap-3 px-4 py-3 md:min-h-24 md:justify-center md:px-6 ${getBorderStyles(index)}`}>
          <dt className="order-2 max-w-20 text-[9px] font-semibold uppercase leading-4 tracking-[.12em] text-pfa-muted md:text-[10px]">{stat.label}</dt>
          <dd className="order-1 font-display text-4xl leading-none text-pfa-accent md:text-5xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
