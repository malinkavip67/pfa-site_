import type { ReactNode } from "react";

interface Props {
  index: string;
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ index, children, className = "" }: Props) {
  return <div className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-slate-300 ${className}`}><span className="text-pfa-accent">{index}</span>{children}</div>;
}
