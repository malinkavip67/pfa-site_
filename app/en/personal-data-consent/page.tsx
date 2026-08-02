import type { Metadata } from 'next';
import LegalDocument, { type LegalSection } from '@/components/legal/LegalDocument';
import { DATABASE_PROCESSOR, LEGAL_ENTITY } from '@/lib/legal-details';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Consent to personal data processing',
  description: 'Consent terms applicable when submitting an application to Premier Football Agency.',
  path: '/en/personal-data-consent',
  keywords: ['PFA consent to personal data processing'],
});

const sections: readonly LegalSection[] = [
  {
    title: 'Controller receiving consent',
    paragraphs: [
      `${LEGAL_ENTITY.fullName}, OGRN ${LEGAL_ENTITY.ogrn}, INN ${LEGAL_ENTITY.inn}, KPP ${LEGAL_ENTITY.kpp}, address: ${LEGAL_ENTITY.address}.`,
    ],
  },
  {
    title: 'Person giving consent',
    paragraphs: [
      'Consent is given by the person completing the application: an adult football player or a parent/legal representative of a minor football player.',
      'A parent or legal representative confirms their authority to provide the minor player’s information and consents to its processing under this document.',
    ],
  },
  {
    title: 'Personal data covered',
    items: [
      'the applicant’s first and last name;',
      'telephone number and email address;',
      'information about the applicant or player, football experience, team, position, goals and other information voluntarily entered in the form;',
      'confirmation of legal age or parental/legal representative authority;',
      'technical information concerning submission of the application required for security and verification.',
    ],
  },
  {
    title: 'Purposes',
    paragraphs: [
      'Receiving and reviewing the application, contacting the applicant, assessing possible cooperation, arranging further communication and protecting the form against abuse.',
    ],
  },
  {
    title: 'Permitted operations',
    paragraphs: [
      'Collection, recording, organisation, accumulation, storage, updating, retrieval, use, disclosure to a processor acting on the Controller’s instructions, restriction, erasure and destruction by automated and non-automated means.',
    ],
  },
  {
    title: 'Processing on instructions',
    paragraphs: [
      `The Controller instructs ${DATABASE_PROCESSOR.name}, address: ${DATABASE_PROCESSOR.address}, to provide and maintain the database infrastructure. Access is limited to what is necessary to provide and secure that infrastructure.`,
    ],
  },
  {
    title: 'Term and withdrawal',
    paragraphs: [
      'Consent remains valid until the purpose is achieved, but no longer than 12 months after the most recent interaction unless another lawful basis arises.',
      `Consent may be withdrawn by written notice sent to: ${LEGAL_ENTITY.address}. Data will then be erased or destroyed within the period required by Russian law unless another lawful basis permits its retention.`,
    ],
  },
  {
    title: 'Confirmation',
    paragraphs: [
      'By selecting the separate checkbox and submitting the form, the applicant confirms that consent is freely given, that this Consent and the Personal Data Processing Policy have been read, and that the information submitted is accurate.',
    ],
  },
];

export default function EnglishPersonalDataConsentPage() {
  return (
    <LegalDocument
      eyebrow="Legal information"
      title="Consent to personal data processing"
      description="Separate terms applying to personal data submitted through the application form."
      introduction="This document constitutes separate consent to personal data processing and applies only to information submitted through the website form."
      updatedLabel="Version dated 2 August 2026"
      sections={sections}
      notice="If you do not agree to these terms, do not select the consent checkbox or submit the form. The Russian-language version governs in the event of any discrepancy."
    />
  );
}
