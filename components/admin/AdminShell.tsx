"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import Typography from "@/components/ui/Typography";

interface Props {
  children: ReactNode;
  administratorName: string;
}

const ITEMS = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/applications", label: "Заявки" },
  { href: "/admin/players", label: "Игроки" },
  { href: "/admin/news", label: "Новости" },
  { href: "/admin/settings", label: "Настройки сайта" },
  { href: "/admin/change-password", label: "Безопасность" },
] as const;

export default function AdminShell({ children, administratorName }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = [...ITEMS]
    .reverse()
    .find((item) => pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`)));

  return (
    <div className="min-h-screen bg-[#050b14] lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] border-r border-white/10 bg-[#07111e] p-6 lg:flex lg:flex-col">
        <Typography as="span" variant="sectionSubtitle">PFA Admin</Typography>
        <Typography as="span" variant="caption" className="mt-3 normal-case tracking-normal text-slate-400">
          {administratorName}
        </Typography>
        <nav className="mt-8 grid gap-2" aria-label="Административная панель">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border px-4 py-3 text-sm font-bold transition-colors ${
                activeItem?.href === item.href
                  ? "border-pfa-accent bg-pfa-accent/10 text-pfa-accent"
                  : "border-transparent text-slate-300 hover:border-white/15 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="sticky top-[72px] z-30 flex items-center justify-between border-b border-white/10 bg-[#07111e]/95 px-5 py-4 backdrop-blur lg:hidden">
          <div>
            <Typography as="span" variant="caption">PFA Admin</Typography>
            <Typography as="span" variant="sectionSubtitle" className="mt-1 block">
              {activeItem?.label ?? "Панель"}
            </Typography>
            <Typography as="span" variant="caption" className="mt-1 block normal-case tracking-normal text-slate-400">
              {administratorName}
            </Typography>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center border border-white/15 text-white"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <nav className="sticky top-[137px] z-20 grid gap-2 border-b border-white/10 bg-[#07111e] p-5 lg:hidden">
            {ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`border px-4 py-3 text-sm font-bold ${
                  activeItem?.href === item.href
                    ? "border-pfa-accent text-pfa-accent"
                    : "border-white/10 text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <AdminLogoutButton />
          </nav>
        )}

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
