import type { Partner } from "@/types/partner";

interface Props { partners: Partner[]; }

export default function PartnersGrid({ partners }: Props) {
  return <div className="grid grid-cols-4 border-y border-white/10 max-md:grid-cols-2">{partners.map((partner) => <div className="flex min-h-44 flex-col items-center justify-center border-r border-white/10 last:border-r-0 max-md:border-b" key={partner.id}><strong className="font-display text-4xl font-normal uppercase tracking-wider text-white/75">{partner.name}</strong><span className="mt-2 text-[9px] uppercase tracking-[.2em] text-slate-600">{partner.category}</span></div>)}</div>;
}
