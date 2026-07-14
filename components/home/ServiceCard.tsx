import { ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { Service } from "@/types/service";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <Card className="group relative h-full min-h-[270px] overflow-hidden border-0 bg-[#09121f] p-8 transition-colors duration-300 hover:bg-[#0c1929] max-sm:min-h-0 max-sm:p-6">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-pfa-accent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-6">
        <Typography as="span" variant="sectionSubtitle">{service.id}</Typography>
        <ArrowUpRight aria-hidden="true" className="text-slate-500 transition-colors duration-300 group-hover:text-pfa-accent" size={21} strokeWidth={1.7} />
      </div>
      <div className="mt-12">
        <Typography as="h3" variant="sectionTitle" className="break-words hyphens-auto text-[clamp(1.2rem,1.7vw,1.7rem)] leading-tight tracking-[-.035em]">{service.title}</Typography>
        <Typography variant="bodyMedium" className="mt-5 max-w-sm text-slate-300">{service.description}</Typography>
      </div>
    </Card>
  );
}
