import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { NAVIGATION } from "@/lib/constants";

export default function Footer() {
  return <footer className="border-t border-white/10 py-16"><Container className="grid grid-cols-2 gap-12 max-md:grid-cols-1">
    <div><Image src="/images/logo/logo-white.png" width={860} height={190} className="h-auto w-44" alt="Premier Football Agency" /><p className="mt-4 text-xs text-slate-500">Строим карьеру чемпионов.</p></div>
    <nav className="grid grid-cols-2 gap-4 justify-self-end text-xs max-md:justify-self-start">{NAVIGATION.map((item) => <Link className="transition hover:text-[#22C55E]" key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <div className="col-span-2 flex justify-between border-t border-white/10 pt-8 text-[10px] uppercase tracking-wider text-slate-500 max-md:col-span-1"><span>© 2026 PFA</span><Link href="#top">Наверх ↑</Link></div>
  </Container></footer>;
}
