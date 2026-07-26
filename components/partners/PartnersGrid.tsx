import Image from "next/image";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { Partner } from "@/types/partner";

interface Props { partners: Partner[]; }

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Card as="div" className="relative flex h-full min-h-[216px] flex-col justify-between overflow-hidden border-0 bg-[#09121f] p-7 max-sm:min-h-0 max-sm:p-6">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-pfa-accent/70" />
      <Typography as="span" variant="sectionSubtitle">{partner.id}</Typography>
      <div>
        <div className={`flex items-center ${partner.emblem ? "mb-3 h-20" : "mb-4 h-16"}`}>
          {partner.logo ? (
            <Image src={partner.logo} alt="" width={220} height={80} className={`${partner.emblem ? "max-h-20" : "max-h-16 max-w-[82%]"} w-auto object-contain object-left`} />
          ) : (
            <span aria-hidden="true" className="grid size-16 place-items-center border border-pfa-accent/60 text-xl font-extrabold tracking-[-.05em] text-pfa-accent">{partner.mark}</span>
          )}
        </div>
        <Typography as="h3" variant="sectionTitle" className={`${partner.emblem ? "text-[clamp(.92rem,1.1vw,1.08rem)] leading-[1.08]" : "text-[clamp(1.15rem,1.55vw,1.55rem)] leading-tight"} tracking-[-.035em] text-white/90`}>{partner.name}</Typography>
        <Typography as="span" variant="caption" className="mt-3 block text-slate-400">{partner.category}</Typography>
      </div>
    </Card>
  );
}

export default function PartnersGrid({ partners }: Props) {
  return (
    <div className="grid grid-cols-3 gap-px border border-white/10 bg-white/10 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {partners.map((partner) => (
        <div key={partner.id}>
          <PartnerCard partner={partner} />
        </div>
      ))}
    </div>
  );
}
