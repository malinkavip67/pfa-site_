import ApplicationButton from "@/components/forms/ApplicationButton";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SocialLink from "@/components/ui/SocialLink";
import Typography from "@/components/ui/Typography";
import { CONTACT_PHONE_NUMBERS, INSTAGRAM_URL } from "@/lib/contact-details";
import type { Locale } from "@/lib/i18n";
import type { ResolvedSiteSettings } from "@/lib/site-settings";

interface Props { locale?: Locale; settings: ResolvedSiteSettings; }

export default function ContactPanel({ locale = "ru", settings }: Props) {
  return (
    <Container className="py-20 max-md:py-14">
      <Card as="div" className="grid grid-cols-[1.1fr_.9fr] gap-12 border-white/10 bg-[#08111d] p-10 max-lg:grid-cols-1 max-sm:p-6">
        <div>
          <Typography as="span" variant="sectionSubtitle">{locale === "ru" ? "Телефоны" : "Phone numbers"}</Typography>
          <div className="mt-5 space-y-4">
            {CONTACT_PHONE_NUMBERS.map((contact) => (
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1" key={contact.href}>
                <Typography as="span" variant="bodyMedium" className="min-w-16 font-bold text-pfa-accent">
                  {locale === "ru" ? contact.name : contact.nameEn}
                </Typography>
                <a className="text-[clamp(1.25rem,2vw,2rem)] font-bold text-white transition-colors hover:text-pfa-accent" href={contact.href}>
                  {contact.display}
                </a>
              </div>
            ))}
          </div>

          <Typography as="p" variant="sectionSubtitle" className="mt-9">
            {locale === "ru" ? "Мы в соцсетях:" : "Follow us:"}
          </Typography>
          <div className="mt-4 flex items-center gap-3">
            <SocialLink href={settings.telegram} label={locale === "ru" ? "PFA в Telegram" : "PFA on Telegram"} network="telegram" />
            <SocialLink href={INSTAGRAM_URL} label={locale === "ru" ? "PFA в Instagram" : "PFA on Instagram"} network="instagram" />
            <SocialLink label={locale === "ru" ? "PFA во ВКонтакте — ссылка появится позже" : "PFA on VK — link coming soon"} network="vk" />
          </div>
        </div>
        <div className="border-l border-pfa-accent/60 pl-10 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-8">
          <Typography variant="bodyLarge" className="text-white">{locale === "ru" ? "Каждое обращение рассматривает команда PFA лично." : "Every enquiry is reviewed personally by the PFA team."}</Typography>
          <Typography variant="bodyMedium" className="mt-4 text-slate-300">{locale === "ru" ? "Мы бережно относимся к конфиденциальности и не передаём содержание обращения третьим лицам без необходимости." : "We treat every message as confidential and do not share its contents with third parties unless necessary."}</Typography>
          <ApplicationButton shape="square" size="compact" className="mt-8">{locale === "ru" ? "Оставить заявку" : "Leave an application"}</ApplicationButton>
        </div>
      </Card>
    </Container>
  );
}
