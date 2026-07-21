"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";

export type ApplicationAudience = "player" | "parent";
export const APPLICATION_FORM_EVENT = "pfa:open-application";

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

  const openApplication = () => {
    onClick?.();

    const isHomePage = pathname === "/" || pathname === "/en";
    if (!isHomePage) {
      window.location.assign(`${localizePath("/", locale)}?application=${audience}`);
      return;
    }

    window.dispatchEvent(new CustomEvent<ApplicationAudience>(APPLICATION_FORM_EVENT, { detail: audience }));
  };

  return <Button {...buttonProps} onClick={openApplication}>{children}</Button>;
}
