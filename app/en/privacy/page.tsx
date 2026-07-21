import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Typography from "@/components/ui/Typography";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy policy",
  description: "Information about personal data processing and protection on the Premier Football Agency website.",
  path: "/en/privacy",
  keywords: ["PFA privacy policy", "personal data processing"],
});

const sections = [
  ["Data we receive", "When a player or parent submits a form, PFA receives the last name, first name, phone number, email address and brief introduction they provide. The hosting provider may also automatically record limited technical information, including IP address, browser type, access time and date, required for website security and stability."],
  ["Purpose and legal basis", "Data is used to review and respond to enquiries, discuss possible cooperation, protect the website against abuse and meet applicable legal obligations. When submitting a form, you separately confirm your consent to processing the provided data for these purposes. PFA does not sell personal data or use it for automated decision-making."],
  ["Minors’ data", "The player form is intended for people aged 18 or older. If the player is a minor, their parent or legal representative must submit the parent form and confirm that they have the right to provide the player’s information."],
  ["Cookies and local storage", "No analytics or advertising cookies are currently enabled. The website uses only essential local storage to remember that the cookie notice has been dismissed. Technical providers may process service logs and other strictly necessary data to deliver pages, prevent attacks and resolve errors."],
  ["Retention and disclosure", "Information is retained only for as long as necessary to handle the enquiry or meet mandatory requirements. Hosting and email providers may receive limited access required to provide their services. We take reasonable organisational and technical measures to protect the data."],
  ["Your rights and withdrawal", "You may request information about your data, correction, restriction or deletion where this is not prevented by law, and you may withdraw your consent. Contact PFA at the address below. After receiving the request, we will stop processing based on consent unless another lawful basis applies."],
] as const;

export default function EnglishPrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal information" title="Privacy" description="We treat the information you share with Premier Football Agency with care." />
      <Container className="py-20 max-md:py-14">
        <Card as="div" className="mx-auto max-w-4xl border-white/10 bg-[#08111d] p-10 max-sm:p-6">
          <Typography variant="bodyLarge" className="text-white">This policy describes Premier Football Agency’s approach to processing the personal data of website visitors and contact-form users.</Typography>
          <Typography variant="caption" className="mt-4 text-slate-500">Last updated: 16 July 2026</Typography>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {sections.map(([title, text], index) => (
              <section className="grid grid-cols-[56px_1fr] gap-6 py-8 max-sm:grid-cols-1 max-sm:gap-3" key={title}>
                <Typography as="span" variant="sectionSubtitle">{String(index + 1).padStart(2, "0")}</Typography>
                <div>
                  <Typography as="h2" variant="sectionTitle" className="text-xl leading-tight tracking-[-.025em]">{title}</Typography>
                  <Typography variant="bodyMedium" className="mt-4 text-base leading-8 text-slate-300">{text}</Typography>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 border-l border-pfa-accent/60 pl-6">
            <Typography variant="bodyMedium" className="text-slate-300">Personal data enquiries:</Typography>
            <a className="mt-2 block break-all text-lg font-bold text-white transition-colors hover:text-pfa-accent" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </Card>
      </Container>
    </>
  );
}
