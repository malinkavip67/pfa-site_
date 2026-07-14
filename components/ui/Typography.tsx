import type { ReactNode } from "react";

type TypographyTag = "h1" | "h2" | "h3" | "p" | "span" | "dt" | "dd";
type TypographyVariant = "heroTitle" | "sectionTitle" | "sectionSubtitle" | "bodyLarge" | "bodyMedium" | "caption" | "statValue";

interface Props {
  as?: TypographyTag;
  id?: string;
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<TypographyVariant, string> = {
  heroTitle: "font-sans font-extrabold uppercase leading-[.94] tracking-[-.055em] text-pfa-text",
  sectionTitle: "font-display font-bold uppercase leading-[.88] tracking-[.01em] text-pfa-text",
  sectionSubtitle: "text-[10px] font-bold uppercase tracking-[.18em] text-pfa-accent",
  bodyLarge: "text-lg font-semibold leading-8 text-pfa-muted",
  bodyMedium: "text-sm leading-7 text-pfa-muted",
  caption: "text-[10px] font-semibold uppercase tracking-[.14em] text-pfa-muted",
  statValue: "font-display font-bold leading-none tracking-[.01em] text-pfa-text",
};

export default function Typography({ as: Component = "p", id, variant, children, className = "" }: Props) {
  return <Component id={id} className={`${VARIANT_STYLES[variant]} ${className}`}>{children}</Component>;
}
