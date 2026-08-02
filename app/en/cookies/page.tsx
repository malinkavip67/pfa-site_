import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie policy",
  description: "Information about essential and analytics cookies used by the Premier Football Agency website.",
  path: "/en/cookies",
  keywords: ["PFA cookie policy", "Yandex Metrica", "Google Analytics"],
});

const sections: readonly LegalSection[] = [
  {
    title: "What cookies are",
    paragraphs: [
      "Cookies are small pieces of data stored by a website in the browser. Local browser storage may also be used to remember selected settings.",
      "We classify these technologies as essential or analytics. The website does not use advertising cookies.",
    ],
  },
  {
    title: "Essential data",
    paragraphs: [
      "Essential technologies provide security and core website functions. They are not used for advertising and cannot be disabled through the consent banner.",
    ],
    items: [
      "pfa_admin_session — a secure, limited-lifetime HttpOnly cookie for authorised administrator access to the CRM;",
      "pfa-cookie-consent-v2 — a local-storage record containing the visitor's cookie choice and the date of that choice.",
    ],
  },
  {
    title: "Yandex Metrica",
    paragraphs: [
      "After consent, Yandex Metrica may be enabled to provide aggregated statistics about visits, traffic sources, devices and interactions with website pages.",
      "Depending on the service configuration, data such as _ym_uid, _ym_d, _ym_isad, _ym_visorc_* and yandexuid may be used. The exact set and retention periods are determined by Yandex settings and documentation.",
      "Yandex Metrica code is not loaded and no analytics data is sent before the visitor selects “Allow analytics”.",
    ],
  },
  {
    title: "Google Analytics",
    paragraphs: [
      "After consent, Google Analytics may be enabled to measure traffic and improve website content and navigation.",
      "The service may use cookies including _ga and _ga_<identifier>. The exact set and retention periods depend on the configuration and Google documentation.",
      "The Google Analytics tag is not loaded before the visitor selects “Allow analytics”, including in a cookieless measurement mode.",
    ],
  },
  {
    title: "Managing your choice",
    paragraphs: [
      "Visitors can allow analytics or retain essential technologies only. Refusing analytics does not restrict access to the website or application form.",
      "The choice can be changed at any time through “Cookie settings” in the website footer. Cookies and local-storage data can also be removed in browser settings.",
    ],
  },
  {
    title: "Application data protection",
    paragraphs: [
      "Analytics services must not receive application-form content, applicants' personal data or CRM data. Form-field capture, session recording and advertising features will remain disabled when analytics counters are connected.",
    ],
  },
];

export default function EnglishCookiesPage() {
  return (
    <LegalDocument
      eyebrow="Legal information"
      title="Cookie policy"
      description="Storage technologies used by the website and ways to manage analytics."
      introduction="Essential technologies support website security and core functions. Yandex Metrica and Google Analytics may be enabled only after the visitor gives separate consent."
      updatedLabel="Version dated 2 August 2026"
      sections={sections}
      notice="Until analytics identifiers are added, the website does not load Yandex Metrica or Google Analytics."
    />
  );
}
