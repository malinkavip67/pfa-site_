import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = { title: "Контакты" };

export default function ContactsPage() {
  return <><PageHero eyebrow="Личный разговор" title="Контакты" description="Карьера, трансфер или партнёрство начинается с доверия. Расскажите нам о своей задаче." /><Container className="grid grid-cols-2 gap-16 py-24 max-md:grid-cols-1"><div><span className="text-[10px] uppercase tracking-wider text-slate-500">Email</span><a className="font-display mt-3 block text-[clamp(2.5rem,5vw,5rem)] uppercase" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div><div className="self-end"><p className="mb-8 max-w-md text-sm leading-7 text-slate-400">Мы бережно относимся к конфиденциальности. Каждое обращение рассматривает команда PFA лично.</p><ButtonLink href={`mailto:${CONTACT_EMAIL}`}>Начать разговор</ButtonLink></div></Container></>;
}
