"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";

export type ApplicationAudience = "player" | "parent";

interface Props {
  children: ReactNode;
  audience?: ApplicationAudience;
  variant?: "primary" | "secondary";
  shape?: "pill" | "square";
  size?: "default" | "compact";
  className?: string;
  onClick?: () => void;
}

export default function ApplicationButton({ children, audience = "player", onClick, ...buttonProps }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const applicationHref = `${localizePath("/", locale)}?application=${audience}`;

  return <Button {...buttonProps} href={applicationHref} onClick={onClick}>{children}</Button>;
}
