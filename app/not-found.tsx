import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return <section className="flex min-h-screen items-center text-center"><Container><span className="font-display text-pfa-accent text-[14rem] leading-none max-md:text-9xl">404</span><h1 className="font-display mt-2 text-6xl uppercase">За пределами поля</h1><p className="mt-5 text-sm text-slate-400">Такой страницы нет или она была перемещена.</p><Link className="border-pfa-accent mt-8 inline-block border-b pb-2 text-xs font-bold uppercase tracking-wider" href="/">Вернуться на главную</Link></Container></section>;
}
