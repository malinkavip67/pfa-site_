import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { CONTACT_PHONE_NUMBERS, INSTAGRAM_URL } from "@/lib/contact-details";
import { LEGAL_ENTITY } from "@/lib/legal-details";
import type { JsonValue } from "@/components/layout/StructuredData";
import { services } from "@/data/services";
import { englishServices } from "@/data/english";
import type { NewsItem } from "@/types/news";
import type { Player } from "@/types/player";

export const organizationStructuredData: { [key: string]: JsonValue } = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: LEGAL_ENTITY.fullName,
      alternateName: "PFA",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/logo-white.jpg`,
      description: "Международное футбольное агентство: трансферы, контракты, скаутинг и сопровождение карьеры профессиональных футболистов.",
      sport: "Football",
      telephone: CONTACT_PHONE_NUMBERS.map((contact) => contact.href.replace("tel:", "")),
      address: {
        "@type": "PostalAddress",
        streetAddress: LEGAL_ENTITY.address,
        addressCountry: "RU",
      },
      sameAs: ["https://t.me/PFA_AGENCY", INSTAGRAM_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["ru-RU", "en-US"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

const faqItems = {
  ru: [
    ["Что подготовить перед обращением?", "Укажите имя, возраст, позицию, текущую команду или футбольную школу. Если есть игровое видео, статистика или спортивное резюме, подготовьте ссылки на эти материалы."],
    ["Может ли заявку оставить родитель?", "Да. Если игрок несовершеннолетний, участие родителя или законного представителя особенно важно. Основные решения и условия сотрудничества обсуждаются вместе."],
    ["Гарантирует ли PFA контракт с клубом?", "Нет. Профессиональное агентство не может гарантировать контракт. Сначала мы оцениваем ситуацию игрока, затем определяем реалистичные возможности и возможный карьерный маршрут."],
    ["Можно обратиться из другого города или страны?", "Да. Первичное знакомство и обсуждение материалов можно провести дистанционно. Формат следующих шагов определяется индивидуально."],
    ["Как обсуждаются условия сотрудничества?", "Условия обсуждаются после знакомства и оценки ситуации. Все договорённости должны быть понятны игроку и родителям и фиксируются до начала совместной работы."],
    ["Что произойдёт после заполнения формы?", "После отправки заявка поступит команде PFA на рассмотрение. Если мы увидим возможность помочь, представитель агентства свяжется с вами по указанному телефону или электронной почте."],
  ],
  en: [
    ["What should we prepare before applying?", "Provide the player’s name, age, position and current team or football school. If available, prepare links to match footage, statistics or a sporting résumé."],
    ["Can a parent submit the application?", "Yes. When the player is a minor, the participation of a parent or legal guardian is especially important. Key decisions and terms are discussed together."],
    ["Does PFA guarantee a club contract?", "No. A professional agency cannot guarantee a contract. We first assess the player’s situation, then identify realistic opportunities and a possible career pathway."],
    ["Can we apply from another city or country?", "Yes. The initial conversation and review of materials can take place remotely. The format of the next steps is determined individually."],
    ["How are the terms of cooperation discussed?", "Terms are discussed after the introduction and assessment. Every arrangement should be clear to the player and parents and documented before cooperation begins."],
    ["What happens after the form is completed?", "After submission, the application is sent to the PFA team for review. If we see a way to help, an agency representative will contact you using the phone number or email address provided."],
  ],
} as const;

function makeFaqStructuredData(items: ReadonlyArray<readonly [string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
}

export const faqStructuredData = {
  ru: makeFaqStructuredData(faqItems.ru),
  en: makeFaqStructuredData(faqItems.en),
};

function makeServiceCatalogStructuredData(locale: "ru" | "en") {
  const items = locale === "ru" ? services : englishServices;
  const path = locale === "ru" ? "/services" : "/en/services";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "ru" ? "Услуги Премьер Футбольного Агентства" : "Premier Football Agency services",
    url: `${SITE_URL}${path}`,
    itemListElement: items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
}

export const serviceCatalogStructuredData = {
  ru: makeServiceCatalogStructuredData("ru"),
  en: makeServiceCatalogStructuredData("en"),
};

function absoluteUrl(path: string) {
  return path.startsWith("http://") || path.startsWith("https://") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbStructuredData(items: ReadonlyArray<readonly [string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

export function newsArticleStructuredData(item: NewsItem, locale: "ru" | "en") {
  const path = `${locale === "en" ? "/en" : ""}/news/${item.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.excerpt ?? item.content?.slice(0, 220) ?? "",
    image: absoluteUrl(item.image),
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    ...(item.publishedAt ? { datePublished: item.publishedAt, dateModified: item.publishedAt } : {}),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: locale === "ru" ? "ru-RU" : "en-US",
  };
}

export function playerProfileStructuredData(player: Player, locale: "ru" | "en") {
  const path = `${locale === "en" ? "/en" : ""}/players/${player.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    inLanguage: locale === "ru" ? "ru-RU" : "en-US",
    mainEntity: {
      "@type": "Person",
      name: player.name,
      image: absoluteUrl(player.image),
      description: player.summary ?? `${player.name} — ${player.position ?? (locale === "ru" ? "футболист" : "football player")}`,
      ...(player.position ? { jobTitle: player.position } : {}),
      ...(player.country ? { nationality: player.country } : {}),
      ...(player.height ? { height: { "@type": "QuantitativeValue", value: player.height, unitCode: "CMT" } } : {}),
      affiliation: { "@id": `${SITE_URL}/#organization` },
    },
  };
}
