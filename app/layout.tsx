import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DocumentLanguage from "@/components/layout/DocumentLanguage";
import StructuredData from "@/components/layout/StructuredData";
import CookieNotice from "@/components/layout/CookieNotice";
import Analytics from "@/components/analytics/Analytics";
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration";
import { organizationStructuredData } from "@/lib/structured-data";
import { getSiteSettings } from "@/lib/site-settings";
import "@/styles/globals.css";

const manropeCyrillic = localFont({
  src: "../styles/fonts/manrope-cyrillic.woff2",
  variable: "--font-manrope-cyrillic",
  display: "swap",
  weight: "200 800",
});

const manropeLatin = localFont({
  src: "../styles/fonts/manrope-latin.woff2",
  variable: "--font-manrope-latin",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pfa-agency.ru"),
  title: { default: "Премьер Футбольное Агентство — Мы создаём чемпионов", template: "%s — PFA" },
  description: "Международное футбольное агентство. Стратегическое управление карьерой профессиональных футболистов.",
  applicationName: "PFA",
  manifest: "/manifest.webmanifest",
  category: "sports",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "PFA" },
  icons: {
    icon: [{ url: "/icons/pwa-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/pwa-icon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport: Viewport = { themeColor: "#050B14", width: "device-width", initialScale: 1 };
export const dynamic = "force-dynamic";

interface Props { children: React.ReactNode; }

export default async function RootLayout({ children }: Readonly<Props>) {
  const settings = await getSiteSettings();
  return <html lang="ru" suppressHydrationWarning><body suppressHydrationWarning className={`${manropeCyrillic.variable} ${manropeLatin.variable}`}><DocumentLanguage /><ServiceWorkerRegistration /><a className="skip-link" href="#main-content">Перейти к содержимому</a><StructuredData data={organizationStructuredData} /><Header siteName={settings.siteName} /><main id="main-content">{children}</main><Footer settings={settings} /><Analytics googleAnalyticsId={process.env.GOOGLE_ANALYTICS_ID} yandexMetricaId={process.env.YANDEX_METRICA_ID} /><CookieNotice /></body></html>;
}
