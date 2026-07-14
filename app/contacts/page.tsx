import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SocialLink from "@/components/ui/SocialLink";
import Typography from "@/components/ui/Typography";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Контакты", description: "Свяжитесь с Premier Football Agency, чтобы обсудить карьеру футболиста, трансфер или профессиональное партнёрство.", path: "/contacts", keywords: ["контакты футбольного агента", "связаться с PFA", "представительство футболиста", "футбольное партнёрство"] });

export default function ContactsPage() {
  return (
    <>
      <PageHero eyebrow="Личный разговор" title="Контакты" description="Карьера, трансфер или партнёрство начинается с доверия. Расскажите нам о своей задаче." />
      <Container className="py-20 max-md:py-14">
        <Card as="div" className="grid grid-cols-[1.1fr_.9fr] gap-12 border-white/10 bg-[#08111d] p-10 max-lg:grid-cols-1 max-sm:p-6">
          <div>
            <Typography as="span" variant="sectionSubtitle">Email</Typography>
            <a className="mt-5 block break-all text-[clamp(1.35rem,2.4vw,2.5rem)] font-bold text-white transition-colors hover:text-pfa-accent" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <div className="mt-7 flex items-center gap-3">
              <SocialLink href="https://t.me/PFA_AGENCY" label="PFA в Telegram" network="telegram" />
            </div>
          </div>
          <div className="border-l border-pfa-accent/60 pl-10 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-8">
            <Typography variant="bodyLarge" className="text-white">Каждое обращение рассматривает команда PFA лично.</Typography>
            <Typography variant="bodyMedium" className="mt-4 text-slate-300">Мы бережно относимся к конфиденциальности и не передаём содержание обращения третьим лицам без необходимости.</Typography>
            <Button href={`mailto:${CONTACT_EMAIL}`} shape="square" size="compact" className="mt-8">Начать разговор</Button>
          </div>
        </Card>
      </Container>
    </>
  );
}
