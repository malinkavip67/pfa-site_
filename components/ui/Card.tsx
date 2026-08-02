import type { HTMLAttributes, ReactNode } from "react";

type CardTag = "article" | "div" | "li";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "className" | "children"> {
  as?: CardTag;
  children: ReactNode;
  className?: string;
}

export default function Card({ as: Component = "article", children, className = "", ...props }: Props) {
  return <Component className={`border border-white/10 bg-pfa-surface ${className}`} {...props}>{children}</Component>;
}
