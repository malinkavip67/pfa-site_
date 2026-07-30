import { LockKeyhole } from "lucide-react";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { Locale } from "@/lib/i18n";

interface Props {
  displayId: string;
  locale?: Locale;
}

export default function EditorialPlayerCard({ displayId, locale = "ru" }: Props) {
  const copy = locale === "ru"
    ? {
        status: "Профиль в редакции",
        title: "Новый игрок PFA",
        description: "Информация, статистика и карьерные данные скоро появятся на сайте.",
        label: "Профиль готовится",
      }
    : {
        status: "Profile in progress",
        title: "New PFA player",
        description: "Player information, statistics and career details will be published soon.",
        label: "Profile is being prepared",
      };

  return (
    <Card
      aria-label={`${displayId}. ${copy.label}`}
      className="relative min-h-[410px] overflow-hidden border-white/10 bg-[#07111e] max-sm:min-h-[350px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(0,235,82,.12),transparent_34%),linear-gradient(145deg,#0b1727_0%,#07111e_56%,#040a12_100%)]" />
      <div aria-hidden="true" className="absolute -bottom-24 right-[-4.5rem] size-80 rounded-full border border-white/[.035]" />
      <div aria-hidden="true" className="absolute -bottom-12 right-[-1rem] size-52 rounded-full border border-pfa-accent/10" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-7 max-sm:p-6">
        <Typography as="span" variant="sectionSubtitle">{displayId}</Typography>
        <span className="grid size-11 place-items-center border border-white/10 bg-white/[.025] text-pfa-accent">
          <LockKeyhole aria-hidden="true" size={18} strokeWidth={1.6} />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 max-sm:p-6">
        <Typography as="span" variant="caption" className="text-pfa-accent">
          {copy.status}
        </Typography>
        <Typography
          as="h3"
          variant="sectionTitle"
          className="mt-4 max-w-[85%] text-[clamp(1.75rem,2.4vw,2.5rem)] leading-[.94] tracking-[-.035em]"
        >
          {copy.title}
        </Typography>
        <Typography variant="caption" className="mt-4 max-w-[28rem] text-slate-300">
          {copy.description}
        </Typography>
      </div>
    </Card>
  );
}
