interface Props {
  index: string;
  children: string;
  className?: string;
}

export default function SectionTitle({ index, children, className = "" }: Props) {
  return <div className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-slate-300 ${className}`}><span className="text-[#22C55E]">{index}</span>{children}</div>;
}
