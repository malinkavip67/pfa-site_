import type { Metadata } from 'next';
import LegalDocument, { type LegalSection } from '@/components/legal/LegalDocument';
import { DATABASE_PROCESSOR, LEGAL_ENTITY } from '@/lib/legal-details';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Personal data processing policy',
  description: 'The personal data processing and protection policy of Premier Football Agency LLC.',
  path: '/en/privacy',
  keywords: ['PFA personal data policy', 'personal data protection'],
});

const sections: readonly LegalSection[] = [
  {
    title: 'Data controller',
    paragraphs: [
      `${LEGAL_ENTITY.fullName} (the Controller). OGRN ${LEGAL_ENTITY.ogrn}, INN ${LEGAL_ENTITY.inn}, KPP ${LEGAL_ENTITY.kpp}.`,
      `Registered address: ${LEGAL_ENTITY.address}. Website: ${LEGAL_ENTITY.website}.`,
      'This Policy applies to personal data submitted through the website, the application form and subsequent communication concerning an application.',
    ],
  },
  {
    title: 'Data subjects and data categories',
    paragraphs: [
      'The Controller processes data of adult football players and parents or legal representatives of minor football players who submit an application.',
    ],
    items: [
      'the applicant’s first and last name;',
      'telephone number and email address;',
      'football experience, team, position, goals and other information voluntarily provided in the free-text field;',
      'confirmation of legal age or parental/legal representative authority;',
      'limited technical information required for website operation and security, including IP address, request date and time, browser and device information and technical logs.',
    ],
  },
  {
    title: 'Purposes and legal basis',
    paragraphs: [
      'Data is processed to receive and review an application, contact the applicant, assess possible cooperation, continue communication, protect the website and comply with Russian law.',
      'Application data is processed on the basis of the data subject’s separate consent. If a contract is subsequently entered into, other lawful grounds applicable to that contract and statutory obligations may apply.',
    ],
  },
  {
    title: 'Processing operations',
    paragraphs: [
      'The Controller may collect, record, organise, accumulate, store, update, retrieve, use, disclose to an authorised processor, restrict, erase and destroy personal data by automated and non-automated means.',
      'No decision producing legal consequences is made solely by automated processing, and application data is not made publicly available.',
    ],
  },
  {
    title: 'Storage in the Russian Federation',
    paragraphs: [
      'Personal data of Russian citizens is recorded, organised, accumulated, stored, updated and retrieved using databases located in the Russian Federation. The application form does not involve cross-border data transfers.',
      `Database infrastructure is provided by ${DATABASE_PROCESSOR.name}, address: ${DATABASE_PROCESSOR.address}, acting on the Controller’s instructions solely to provide and protect the infrastructure.`,
    ],
  },
  {
    title: 'Retention and deletion',
    paragraphs: [
      'If cooperation does not begin, application data is retained until the purpose is achieved, but no longer than 12 months after the most recent interaction. A contract or a statutory obligation may require a different retention period.',
      'Data is erased or destroyed when the purpose is achieved, the retention period expires or consent is withdrawn, unless another lawful basis permits continued processing.',
    ],
  },
  {
    title: 'Disclosure and confidentiality',
    paragraphs: [
      'The Controller does not sell personal data. Access is limited to authorised personnel and infrastructure providers that require it to perform assigned functions and are bound by confidentiality and security obligations.',
      'Disclosure to clubs, sports organisations or other potential partners requires a separate lawful basis and is limited to the interaction agreed with the applicant.',
    ],
  },
  {
    title: 'Security measures',
    paragraphs: [
      'The Controller applies legal, organisational and technical safeguards, including access controls, secure connections, authentication, operation monitoring, software updates, recovery measures and incident response procedures.',
    ],
  },
  {
    title: 'Data subject rights',
    paragraphs: [
      'A data subject may request information, correction, restriction or deletion, withdraw consent, and lodge a complaint with Roskomnadzor or a court.',
      `A written request may be sent to the Controller at: ${LEGAL_ENTITY.address}. It should contain sufficient information to identify the applicant and locate the application, together with the requested action.`,
    ],
  },
  {
    title: 'Technical storage and updates',
    paragraphs: [
      'The website does not use advertising cookies. Yandex Metrica and Google Analytics may be enabled only after the visitor gives separate consent. Their code is not loaded and analytics data is not transmitted before consent. The selected settings are stored in local browser storage. The administration area uses an essential secure session cookie for authorised access. Further information is provided in the Cookie Policy.',
      'The Controller may update this Policy following changes to its processes or Russian law. The current version is always available on this page. The Russian-language version governs in the event of any discrepancy.',
    ],
  },
];

export default function EnglishPrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal information"
      title="Personal data processing policy"
      description="Rules governing personal data processing and protection for website visitors and applicants."
      introduction={`This Policy describes how ${LEGAL_ENTITY.shortName} processes personal data and keeps it secure.`}
      updatedLabel="Version dated 2 August 2026"
      sections={sections}
      notice="An application can be submitted only after separate consent to personal data processing has been confirmed."
    />
  );
}
