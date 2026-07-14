import type { ReactNode } from "react";

type CardTag = "article" | "div" | "li";

interface Props {
  as?: CardTag;
  children: ReactNode;
  className?: string;
}

export default function Card({ as: Component = "article", children, className = "" }: Props) {
  return <Component className={`border border-white/10 bg-pfa-surface ${className}`}>{children}</Component>;
}
