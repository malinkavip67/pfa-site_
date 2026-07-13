import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BASE_STYLES = "inline-flex min-h-16 items-center justify-center gap-5 rounded-full px-8 text-xs font-bold uppercase tracking-[.11em] transition duration-300 hover:-translate-y-1";

const VARIANT_STYLES = {
  primary: "bg-pfa-accent text-pfa-accent-contrast shadow-[0_16px_40px_rgba(34,197,94,.16)] hover:bg-pfa-accent-hover",
  secondary: "border border-white/30 bg-white/5 text-pfa-text backdrop-blur-md hover:border-white hover:bg-white hover:text-pfa-background",
} as const;

export default function Button({ children, href, variant = "primary", className = "", type = "button", disabled = false, onClick }: Props) {
  const styles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`;
  const content = <>{children}<ArrowUpRight aria-hidden="true" size={19} /></>;

  if (href) {
    return <Link href={href} className={styles}>{content}</Link>;
  }

  return <button type={type} className={`${styles} disabled:pointer-events-none disabled:opacity-50`} disabled={disabled} onClick={onClick}>{content}</button>;
}
