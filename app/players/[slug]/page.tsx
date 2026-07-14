import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import { players } from "@/data/players";
import { createPageMetadata } from "@/lib/metadata";

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams(): { slug: string }[] { return players.map((player) => ({ slug: player.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = players.find((item) => item.slug === slug);
  if (!player) return { title: "Игрок" };
  return createPageMetadata({ title: player.name, description: `${player.name} — ${player.position}, ${player.country}. Профиль игрока Premier Football Agency.`, path: `/players/${player.slug}`, image: player.image, keywords: [player.name, player.position, player.country, "футболист PFA"] });
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = players.find((item) => item.slug === slug);
  if (!player) notFound();
  return (
    <section className="min-h-screen pb-24 pt-32 max-md:pb-20 max-md:pt-24">
      <Container>
        <Card as="div" className="grid grid-cols-[.9fr_1.1fr] overflow-hidden border-white/10 bg-[#08111d] max-lg:grid-cols-1">
          <div className="relative min-h-[560px] overflow-hidden max-lg:min-h-[460px] max-sm:min-h-[350px]">
            <Image
              src={player.image}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
              alt={player.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08111d]/55 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="flex flex-col justify-center p-12 max-md:p-8 max-sm:p-6">
            <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
              <Typography as="span" variant="sectionSubtitle">{player.position}</Typography>
              <Typography as="span" variant="caption" className="text-slate-300">{player.club}</Typography>
            </div>

            <Typography as="h1" variant="sectionTitle" className="mt-8 text-[clamp(2.6rem,5vw,4.5rem)] leading-[.9] tracking-[-.05em] max-sm:text-[2.25rem]">
              {player.name}
            </Typography>

            <dl className="mt-10 grid grid-cols-2 border-l border-t border-white/10 max-sm:mt-8">
              <div className="border-b border-r border-white/10 p-5 max-sm:p-4">
                <Typography as="dt" variant="caption" className="text-slate-400">Страна</Typography>
                <Typography as="dd" variant="bodyLarge" className="mt-2 text-white">{player.country}</Typography>
              </div>
              <div className="border-b border-r border-white/10 p-5 max-sm:p-4">
                <Typography as="dt" variant="caption" className="text-slate-400">Возраст</Typography>
                <Typography as="dd" variant="bodyLarge" className="mt-2 text-white">{player.age}</Typography>
              </div>
              <div className="border-b border-r border-white/10 p-5 max-sm:p-4">
                <Typography as="dt" variant="caption" className="text-slate-400">Рост</Typography>
                <Typography as="dd" variant="bodyLarge" className="mt-2 text-white">{player.height} см</Typography>
              </div>
              <div className="border-b border-r border-white/10 p-5 max-sm:p-4">
                <Typography as="dt" variant="caption" className="text-slate-400">Вес</Typography>
                <Typography as="dd" variant="bodyLarge" className="mt-2 text-white">{player.weight} кг</Typography>
              </div>
            </dl>

            <Button href="/players" variant="secondary" shape="square" size="compact" className="mt-10 self-start">Все игроки</Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
