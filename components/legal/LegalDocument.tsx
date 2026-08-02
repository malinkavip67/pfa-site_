import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import PageHero from '@/components/ui/PageHero';
import Typography from '@/components/ui/Typography';

export interface LegalSection {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
}
interface Props {
  eyebrow: string;
  title: string;
  description: string;
  introduction: string;
  updatedLabel: string;
  sections: readonly LegalSection[];
  notice?: string;
}

export default function LegalDocument({
  eyebrow,
  title,
  description,
  introduction,
  updatedLabel,
  sections,
  notice,
}: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Container className="py-20 max-md:py-14">
        <Card as="div" className="mx-auto max-w-5xl border-white/10 bg-[#08111d] p-10 max-sm:p-6">
          <Typography variant="bodyLarge" className="max-w-3xl text-white">
            {introduction}
          </Typography>
          <Typography variant="caption" className="mt-4 text-slate-500">
            {updatedLabel}
          </Typography>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {sections.map((section, index) => (
              <section
                className="grid grid-cols-[56px_1fr] gap-6 py-8 max-sm:grid-cols-1 max-sm:gap-3"
                key={section.title}
              >
                <Typography as="span" variant="sectionSubtitle">
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <div>
                  <Typography
                    as="h2"
                    variant="sectionTitle"
                    className="text-xl leading-tight tracking-[-.025em]"
                  >
                    {section.title}
                  </Typography>
                  {section.paragraphs?.map((paragraph) => (
                    <Typography
                      variant="bodyMedium"
                      className="mt-4 text-base leading-8 text-slate-300"
                      key={paragraph}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                  {section.items && (
                    <ul className="mt-4 grid gap-3 pl-5 text-slate-300 marker:text-pfa-accent">
                      {section.items.map((item) => (
                        <li className="list-disc pl-1" key={item}>
                          <Typography variant="bodyMedium" className="text-base leading-7 text-slate-300">
                            {item}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          {notice && (
            <div className="mt-10 border-l border-pfa-accent/60 pl-6">
              <Typography variant="bodyMedium" className="text-base leading-7 text-slate-300">
                {notice}
              </Typography>
            </div>
          )}
        </Card>
      </Container>
    </>
  );
}
