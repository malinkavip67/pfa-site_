import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  shape?: "pill" | "square";
  size?: "default" | "compact";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const BASE_STYLES = "inline-flex items-center justify-center text-xs font-bold uppercase tracking-[.11em] transition duration-300 hover:-translate-y-0.5";

const VARIANT_STYLES = {
  primary: "bg-pfa-accent text-pfa-accent-contrast shadow-[0_16px_40px_rgba(34,197,94,.16)] hover:bg-pfa-accent-hover",
  secondary: "border border-white/30 bg-white/5 text-pfa-text backdrop-blur-md hover:border-white hover:bg-white hover:text-pfa-background",
} as const;

const SHAPE_STYLES = {
  pill: "rounded-full",
  square: "rounded-sm",
} as const;

const SIZE_STYLES = {
  default: "min-h-16 gap-5 px-8",
  compact: "min-h-14 gap-4 px-7",
} as const;

export default function Button({ children, href, variant = "primary", shape = "pill", size = "default", className = "", type = "button", disabled = false, onClick }: Props) {
  const styles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${SHAPE_STYLES[shape]} ${SIZE_STYLES[size]} ${className}`;
  const content = <>{children}<ArrowUpRight aria-hidden="true" size={19} /></>;

  if (href) {
    return <Link href={href} className={styles} onClick={onClick}>{content}</Link>;
  }

  return <button type={type} className={`${styles} disabled:pointer-events-none disabled:opacity-50`} disabled={disabled} onClick={onClick}>{content}</button>;
}
