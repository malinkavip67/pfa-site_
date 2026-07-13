import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/constants";

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: SITE_NAME,
  alternateName: "PFA",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo-white.jpg`,
  email: CONTACT_EMAIL,
  description: "Международное футбольное агентство полного цикла.",
  sport: "Football",
};
