import type { Metadata } from "next";
import ContactPanel from "@/components/contacts/ContactPanel";
import PageHero from "@/components/ui/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Контакты", description: "Свяжитесь с Premier Football Agency, чтобы обсудить карьеру футболиста, трансфер или профессиональное партнёрство.", path: "/contacts", keywords: ["контакты футбольного агента", "связаться с PFA", "представительство футболиста", "футбольное партнёрство"] });

export default function ContactsPage() {
  return (
    <>
      <PageHero eyebrow="Личный разговор" title="Контакты" description="Карьера, трансфер или партнёрство начинается с доверия. Расскажите нам о своей задаче." />
      <ContactPanel />
    </>
  );
}
