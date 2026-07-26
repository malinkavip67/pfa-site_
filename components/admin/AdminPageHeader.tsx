import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export default function AdminPageHeader({ eyebrow, title, description, actionHref, actionLabel }: Props) {
  return (
    <Container className="pb-10 pt-14 max-md:pt-10">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <SectionHeading index="ADMIN">{eyebrow}</SectionHeading>
          <Typography as="h1" variant="sectionTitle" className="mt-6 text-[clamp(2rem,5vw,4.5rem)] leading-[.92] tracking-[-.05em]">{title}</Typography>
          <Typography variant="bodyMedium" className="mt-5 max-w-2xl text-slate-300">{description}</Typography>
        </div>
        {actionHref && actionLabel && <Button href={actionHref} shape="square" size="compact">{actionLabel}</Button>}
      </div>
    </Container>
  );
}
