import Image from "next/image";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { NewsItem } from "@/types/news";

interface Props { item: NewsItem; }

export default function NewsCard({ item }: Props) {
  return (
    <Card className="group h-full overflow-hidden border-white/10 bg-[#08111d]">
      <div className="relative aspect-[16/9] overflow-hidden bg-pfa-surface">
        <Image src={item.image} fill loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" alt={item.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08111d]/55 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <Typography as="span" variant="sectionSubtitle">{item.id}</Typography>
          <Typography as="span" variant="caption" className="text-slate-400">{item.date}</Typography>
        </div>
        <Typography as="h2" variant="sectionTitle" className="mt-6 text-[clamp(1.25rem,1.65vw,1.7rem)] leading-tight tracking-[-.035em]">{item.title}</Typography>
        <Typography variant="bodyMedium" className="mt-4 max-w-lg text-slate-300">{item.excerpt}</Typography>
      </div>
    </Card>
  );
}
