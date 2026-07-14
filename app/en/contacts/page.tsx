import type { Metadata } from "next";
import ContactPanel from "@/components/contacts/ContactPanel";
import PageHero from "@/components/ui/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Contacts", description: "Contact Premier Football Agency to discuss a player’s career, transfer or professional partnership.", path: "/en/contacts", keywords: ["contact football agent", "contact PFA", "player representation"] });

export default function EnglishContactsPage() {
  return <><PageHero eyebrow="A personal conversation" title="Contacts" description="A career, transfer or partnership begins with trust. Tell us about your goals." /><ContactPanel locale="en" /></>;
}
