import type { ReactNode } from "react";

interface Props {
  href: string;
  label: string;
  children: ReactNode;
}

export default function SocialLink({ href, label, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:border-pfa-accent hover:bg-pfa-accent hover:text-pfa-background"
    >
      {children}
    </a>
  );
}
