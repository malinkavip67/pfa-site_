import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function ButtonLink({ href, children, variant = "primary", className = "" }: Props) {
  const variantStyles = variant === "primary"
    ? "bg-[#22C55E] text-[#031008] shadow-[0_16px_40px_rgba(34,197,94,.16)] hover:bg-[#45D878]"
    : "border border-white/30 bg-white/5 text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-[#050B14]";

  return <Link href={href} className={`inline-flex min-h-16 items-center justify-center gap-5 rounded-full px-8 text-xs font-bold uppercase tracking-[.11em] transition duration-300 hover:-translate-y-1 ${variantStyles} ${className}`}>{children}<ArrowUpRight size={19} /></Link>;
}
