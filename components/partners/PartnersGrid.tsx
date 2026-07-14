import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { Partner } from "@/types/partner";

interface Props { partners: Partner[]; }

export default function PartnersGrid({ partners }: Props) {
  return (
    <div className="grid grid-cols-4 gap-px border border-white/10 bg-white/10 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {partners.map((partner) => (
        <Card as="div" className="group relative flex min-h-[200px] flex-col justify-between overflow-hidden border-0 bg-[#09121f] p-7 transition-colors duration-300 hover:bg-[#0c1929] max-sm:min-h-[170px] max-sm:p-6" key={partner.id}>
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-pfa-accent transition-transform duration-300 group-hover:scale-x-100" />
          <div className="flex items-center justify-between gap-4">
            <Typography as="span" variant="sectionSubtitle">{partner.id}</Typography>
            <span aria-hidden="true" className="size-2 border-r border-t border-white/35 transition-colors group-hover:border-pfa-accent" />
          </div>
          <div>
            <Typography as="h3" variant="sectionTitle" className="text-[clamp(1.4rem,2vw,2rem)] leading-none tracking-[-.035em] text-white/90">{partner.name}</Typography>
            <Typography as="span" variant="caption" className="mt-3 block text-slate-400">{partner.category}</Typography>
          </div>
        </Card>
      ))}
    </div>
  );
}
