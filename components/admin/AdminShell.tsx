"use client";

import {
  FileText,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
  ShieldCheck,
  UserRoundCog,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
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
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Заявки", icon: FileText },
  { href: "/admin/players", label: "Наши игроки", icon: Users },
  { href: "/admin/leadership", label: "Руководство", icon: UserRoundCog },
  { href: "/admin/news", label: "Новости", icon: Newspaper },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
] as const;

export default function AdminShell({ children, administratorName }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = [...ITEMS]
    .reverse()
    .find((item) => pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`)));

  return (
    <div className="min-h-screen bg-[#050b14] lg:grid lg:grid-cols-[276px_minmax(0,1fr)]">
      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] border-r border-white/10 bg-[#061b3a] p-5 lg:flex lg:flex-col">
        <Link href="/admin" className="flex items-center gap-3 border-b border-white/10 pb-5">
          <Image src="/images/logo/logo-white.jpg" width={112} height={64} className="h-12 w-20 rounded-md object-contain" alt="PFA" />
          <span>
            <span className="block text-lg font-extrabold text-white">PFA CRM</span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[.14em] text-emerald-400">Football agency</span>
          </span>
        </Link>
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><ShieldCheck size={18} /></span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">Администратор</span>
            <span className="mt-0.5 block truncate text-xs font-semibold text-white">{administratorName}</span>
          </span>
        </div>
        <nav className="mt-6 grid gap-2" aria-label="Административная панель">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-bold transition-colors ${
                activeItem?.href === item.href
                  ? "border-emerald-400/20 bg-[#00b846] text-white shadow-[0_10px_24px_rgba(0,0,0,.12)]"
                  : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon aria-hidden="true" size={19} />
              {item.label}
            </Link>
          );})}
        </nav>
        <div className="mt-auto pt-8">
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="sticky top-[72px] z-30 flex items-center justify-between border-b border-white/10 bg-[#061b3a]/95 px-5 py-4 backdrop-blur lg:hidden">
          <div>
            <Typography as="span" variant="caption">PFA CRM</Typography>
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
          <nav className="sticky top-[137px] z-20 grid gap-2 border-b border-white/10 bg-[#061b3a] p-5 lg:hidden">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold ${
                  activeItem?.href === item.href
                    ? "border-emerald-400/20 bg-[#00b846] text-white"
                    : "border-white/10 text-slate-300"
                }`}
              >
                <Icon aria-hidden="true" size={18} />
                {item.label}
              </Link>
            );})}
            <AdminLogoutButton />
          </nav>
        )}

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
