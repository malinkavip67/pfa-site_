import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/layout/StructuredData";
import { organizationStructuredData } from "@/lib/structured-data";
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
  metadataBase: new URL("https://pfa.agency"),
  title: { default: "Premier Football Agency — Мы создаём чемпионов", template: "%s — PFA" },
  description: "Международное футбольное агентство. Стратегическое управление карьерой профессиональных футболистов.",
  applicationName: "PFA",
  category: "sports",
  icons: { icon: [{ url: "/images/logo/logo-white.jpg", type: "image/jpeg" }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport: Viewport = { themeColor: "#050B14", width: "device-width", initialScale: 1 };

interface Props { children: React.ReactNode; }

export default function RootLayout({ children }: Readonly<Props>) {
  return <html lang="ru"><body className={`${manropeCyrillic.variable} ${manropeLatin.variable}`}><a className="skip-link" href="#main-content">Перейти к содержимому</a><StructuredData data={organizationStructuredData} /><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}
