import Image from "next/image";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import type { Locale } from "@/lib/i18n";
import type { LeadershipMember } from "@/types/leadership";

interface Props {
  members: LeadershipMember[];
  locale?: Locale;
}

export default function Leadership({ members, locale = "ru" }: Props) {
  const placeholder = locale === "ru" ? "Материал в редакции" : "Profile in preparation";

  return (
    <section id="leadership" aria-labelledby="leadership-title" className="scroll-mt-24 bg-[#070e18] py-16 max-md:py-12">
      <Container>
        <AnimatedReveal className="grid grid-cols-[.8fr_1.2fr] items-end gap-12 max-lg:grid-cols-1 max-lg:gap-6">
          <div>
            <SectionHeading index="03">{locale === "ru" ? "Руководство" : "Leadership"}</SectionHeading>
            <Typography id="leadership-title" as="h2" variant="sectionTitle" className="mt-7 text-[clamp(1.75rem,3vw,3rem)] leading-[.96] tracking-[-.045em]">
              {locale === "ru" ? <>Люди, которые<br /><span className="text-pfa-accent">ведут команду вперёд</span></> : <>The people who<br /><span className="text-pfa-accent">lead the team forward</span></>}
            </Typography>
          </div>
          <Typography variant="bodyLarge" className="max-w-2xl border-l border-pfa-accent/60 pl-8 text-slate-300 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-6">
            {locale === "ru" ? "Стратегию агентства формирует команда руководителей с персональной ответственностью за результат." : "The agency is guided by leaders who take personal responsibility for every result."}
          </Typography>
        </AnimatedReveal>

        <div className="mt-12 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {members.slice(0, 3).map((member, index) => {
            const fullName = [member.firstName, member.lastName].filter(Boolean).join(" ");
            const isDraft = !fullName && !member.position && !member.description && !member.photoUrl;
            return (
              <AnimatedReveal key={member.id} delay={index * 0.08} className="h-full">
                <Card className="group h-full overflow-hidden bg-[#09121f]">
                  <div className="relative aspect-[4/4.5] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(0,235,82,.12),transparent_42%),linear-gradient(145deg,#0c1928,#060c14)]">
                    {member.photoUrl ? (
                      <Image src={member.photoUrl} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.025]" alt={fullName || placeholder} />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center p-8 text-center">
                        <div>
                          <Typography as="span" variant="sectionSubtitle">{String(index + 1).padStart(2, "0")}</Typography>
                          <Typography variant="bodyMedium" className="mt-4 text-slate-400">{placeholder}</Typography>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="min-h-44 p-6">
                    <Typography as="h3" variant="bodyLarge" className="text-white">{fullName || placeholder}</Typography>
                    <Typography variant="sectionSubtitle" className="mt-3">{member.position || (isDraft ? (locale === "ru" ? "Информация готовится" : "Information is being prepared") : placeholder)}</Typography>
                    {member.description && <Typography variant="bodyMedium" className="mt-4 text-slate-300">{member.description}</Typography>}
                  </div>
                </Card>
              </AnimatedReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
