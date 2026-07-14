import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Typography from "@/components/ui/Typography";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Privacy policy", description: "Information about personal data processing and protection on the Premier Football Agency website.", path: "/en/privacy", keywords: ["PFA privacy policy", "personal data processing"] });

const sections = [
  ["Data we may process", "When you contact PFA by email, we receive the information you provide, including your name, contact details and message. The hosting provider may also record limited technical data required for website security and stability."],
  ["How data is used", "Data is used only to respond to enquiries, discuss potential cooperation, protect the website against abuse and meet applicable legal obligations. PFA does not sell personal data."],
  ["Storage and disclosure", "Information is retained only for as long as necessary to handle the enquiry or meet mandatory requirements. Technical providers may receive limited access required to operate the website and email services."],
  ["Your rights", "You may request information about your data, correction, restriction or deletion where this is not prevented by law. Please contact PFA using the address below."],
] as const;

export default function EnglishPrivacyPage() {
  return <><PageHero eyebrow="Legal information" title="Privacy" description="We treat the information you share with Premier Football Agency with care." /><Container className="py-20 max-md:py-14"><Card as="div" className="mx-auto max-w-4xl border-white/10 bg-[#08111d] p-10 max-sm:p-6"><Typography variant="bodyLarge" className="text-white">This policy describes Premier Football Agency’s general approach to processing website visitors’ personal data.</Typography><Typography variant="caption" className="mt-4 text-slate-500">Last updated: 15 July 2026</Typography><div className="mt-10 divide-y divide-white/10 border-y border-white/10">{sections.map(([title, text], index) => <section className="grid grid-cols-[56px_1fr] gap-6 py-8 max-sm:grid-cols-1 max-sm:gap-3" key={title}><Typography as="span" variant="sectionSubtitle">{String(index + 1).padStart(2, "0")}</Typography><div><Typography as="h2" variant="sectionTitle" className="text-xl leading-tight tracking-[-.025em]">{title}</Typography><Typography variant="bodyMedium" className="mt-4 text-base leading-8 text-slate-300">{text}</Typography></div></section>)}</div><div className="mt-10 border-l border-pfa-accent/60 pl-6"><Typography variant="bodyMedium" className="text-slate-300">Personal data enquiries:</Typography><a className="mt-2 block break-all text-lg font-bold text-white transition-colors hover:text-pfa-accent" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div></Card></Container></>;
}
