import { ArrowLeftRight, Globe2, Trophy, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import type { Stat, StatIcon } from "@/types/stat";
import type { Locale } from "@/lib/i18n";

interface Props {
  stats: Stat[];
  locale?: Locale;
}

const STAT_ICONS: Record<StatIcon, LucideIcon> = {
  players: UsersRound,
  countries: Globe2,
  transfers: ArrowLeftRight,
  experience: Trophy,
};

function getBorderStyles(index: number): string {
  const mobileColumnBorder = index % 2 === 1 ? "border-l border-white/10" : "";
  const mobileRowBorder = index < 2 ? "border-b border-white/10 md:border-b-0" : "";
  const desktopBorder = index > 0 ? "md:border-l md:border-white/10" : "md:border-l-0";
  return `${mobileColumnBorder} ${mobileRowBorder} ${desktopBorder}`;
}

export default function HeroStats({ stats, locale = "ru" }: Props) {
  return (
    <section aria-label={locale === "ru" ? "Premier Football Agency в цифрах" : "Premier Football Agency in numbers"} className="border-y border-white/10 bg-[#03070d]">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = STAT_ICONS[stat.icon];

            return (
              <div key={stat.label} className={`flex min-h-28 min-w-0 items-center gap-2 px-2 py-5 sm:gap-4 sm:px-4 md:min-h-32 md:justify-center md:px-7 ${getBorderStyles(index)}`}>
                <Icon aria-hidden="true" className="h-7 w-7 shrink-0 text-pfa-accent sm:h-[34px] sm:w-[34px]" strokeWidth={1.7} />
                <div className="min-w-0">
                  <Typography as="dd" variant="statValue" className="text-3xl sm:text-4xl md:text-5xl">{stat.value}</Typography>
                  <Typography as="dt" variant="caption" className="mt-2 max-w-40 leading-4 text-slate-300">{stat.label}</Typography>
                </div>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
