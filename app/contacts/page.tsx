import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Контакты", description: "Свяжитесь с Premier Football Agency, чтобы обсудить карьеру футболиста, трансфер или профессиональное партнёрство.", path: "/contacts", keywords: ["контакты футбольного агента", "связаться с PFA", "представительство футболиста", "футбольное партнёрство"] });

export default function ContactsPage() {
  return <><PageHero eyebrow="Личный разговор" title="Контакты" description="Карьера, трансфер или партнёрство начинается с доверия. Расскажите нам о своей задаче." /><Container className="grid grid-cols-2 gap-16 py-24 max-md:grid-cols-1"><div><span className="text-[10px] uppercase tracking-wider text-slate-400">Email</span><a className="font-display mt-3 block break-all text-[clamp(1.8rem,5vw,5rem)] uppercase" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div><div className="self-end"><p className="mb-8 max-w-md text-sm leading-7 text-slate-400">Мы бережно относимся к конфиденциальности. Каждое обращение рассматривает команда PFA лично.</p><Button href={`mailto:${CONTACT_EMAIL}`}>Начать разговор</Button></div></Container></>;
}
