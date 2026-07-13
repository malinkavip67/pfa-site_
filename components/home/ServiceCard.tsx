import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/service";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <article className="group flex min-h-80 h-full flex-col border border-white/10 bg-pfa-surface/45 p-8 transition duration-300 hover:-translate-y-1 hover:border-pfa-accent/50 hover:bg-pfa-surface md:p-9 max-sm:p-6">
      <div className="flex items-start justify-between gap-6">
        <span className="text-[10px] font-semibold tracking-[.16em] text-pfa-accent">{service.id}</span>
        <ArrowUpRight aria-hidden="true" className="text-slate-500 transition duration-300 group-hover:text-pfa-accent" size={21} />
      </div>
      <div className="mt-auto pt-16">
        <h3 className="font-display break-words hyphens-auto text-[clamp(2.4rem,4vw,3.5rem)] uppercase leading-[.92] max-sm:text-[2rem]">{service.title}</h3>
        <p className="mt-5 text-sm leading-7 text-slate-400">{service.description}</p>
      </div>
    </article>
  );
}
