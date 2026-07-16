"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLocaleFromPathname } from "@/lib/i18n";

export default function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = getLocaleFromPathname(pathname);
  }, [pathname]);

  return null;
}
