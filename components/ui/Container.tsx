import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: Props) {
  return <div className={`mx-auto w-[min(1280px,calc(100%-5rem))] max-md:w-[calc(100%-2.5rem)] ${className}`}>{children}</div>;
}
