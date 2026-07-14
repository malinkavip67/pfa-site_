import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";

interface Props { eyebrow: string; title: string; description: string; }

export default function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="flex min-h-[460px] items-end border-b border-white/10 pb-16 pt-32 max-md:min-h-[400px] max-md:pb-12 max-md:pt-28">
      <Container>
        <Typography as="span" variant="sectionSubtitle">{eyebrow}</Typography>
        <Typography as="h1" variant="sectionTitle" className="mt-6 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">{title}</Typography>
        <Typography variant="bodyLarge" className="mt-7 max-w-2xl text-slate-300">{description}</Typography>
      </Container>
    </section>
  );
}
