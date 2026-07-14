import { ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { Service } from "@/types/service";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <Card className="group relative flex h-full min-h-[310px] flex-col overflow-hidden border-0 bg-[#09121f] p-8 transition-colors duration-300 hover:bg-[#0c1929] max-sm:min-h-[270px] max-sm:p-6">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-pfa-accent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-6">
        <Typography as="span" variant="sectionSubtitle">{service.id}</Typography>
        <ArrowUpRight aria-hidden="true" className="text-slate-500 transition-colors duration-300 group-hover:text-pfa-accent" size={21} strokeWidth={1.7} />
      </div>
      <div className="mt-auto pt-14">
        <Typography as="h3" variant="sectionTitle" className="break-words hyphens-auto text-[clamp(1.75rem,2.5vw,2.5rem)] leading-tight tracking-[-.035em]">{service.title}</Typography>
        <Typography variant="bodyMedium" className="mt-5 max-w-sm text-slate-300">{service.description}</Typography>
      </div>
    </Card>
  );
}
