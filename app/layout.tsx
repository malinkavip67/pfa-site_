import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pfa.agency"),
  title: { default: "Premier Football Agency — Мы создаём чемпионов", template: "%s — PFA" },
  description: "Международное футбольное агентство. Стратегическое управление карьерой профессиональных футболистов.",
  openGraph: { title: "Premier Football Agency", description: "Мы создаём чемпионов.", type: "website", locale: "ru_RU" },
};

export const viewport: Viewport = { themeColor: "#050B14", width: "device-width", initialScale: 1 };

interface Props { children: React.ReactNode; }

export default function RootLayout({ children }: Readonly<Props>) {
  return <html lang="ru"><body><Header /><main>{children}</main><Footer /></body></html>;
}
