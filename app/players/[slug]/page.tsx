import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { players } from "@/data/players";

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams(): { slug: string }[] { return players.map((player) => ({ slug: player.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = players.find((item) => item.slug === slug);
  return { title: player?.name ?? "Игрок" };
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = players.find((item) => item.slug === slug);
  if (!player) notFound();
  return <section className="min-h-screen pb-24 pt-32"><Container className="grid grid-cols-[1fr_1.1fr] gap-20 max-lg:grid-cols-1"><div className="relative min-h-[72vh] overflow-hidden"><Image src={player.image} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" alt={player.name} /></div><div className="flex flex-col justify-end pb-10"><span className="text-[10px] uppercase tracking-[.2em] text-[#22C55E]">{player.position}</span><h1 className="font-display mt-5 text-[clamp(6rem,11vw,10rem)] uppercase leading-[.8] max-sm:text-[5rem]">{player.name}</h1><dl className="mt-12 grid grid-cols-2 gap-y-7 border-t border-white/10 pt-8 text-sm"><div><dt className="text-slate-500">Страна</dt><dd className="mt-1">{player.country}</dd></div><div><dt className="text-slate-500">Возраст</dt><dd className="mt-1">{player.age}</dd></div><div><dt className="text-slate-500">Рост</dt><dd className="mt-1">{player.height} см</dd></div><div><dt className="text-slate-500">Вес</dt><dd className="mt-1">{player.weight} кг</dd></div></dl></div></Container></section>;
}
