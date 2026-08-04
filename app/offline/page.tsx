import { WifiOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";

export const metadata = {
  title: "Нет подключения",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <section className="flex min-h-[72vh] items-center py-28">
      <Container>
        <Card as="div" className="mx-auto max-w-2xl p-10 text-center max-sm:p-6">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-pfa-accent/10 text-pfa-accent">
            <WifiOff aria-hidden="true" size={26} />
          </span>
          <Typography as="h1" variant="sectionTitle" className="mt-6 text-[clamp(2rem,5vw,3.75rem)] tracking-[-.045em]">
            Нет подключения
          </Typography>
          <Typography variant="bodyLarge" className="mx-auto mt-5 max-w-lg text-slate-300">
            Проверьте интернет-соединение и попробуйте открыть сайт ещё раз.
          </Typography>
          <Button href="/" shape="square" size="compact" className="mt-8">
            Попробовать снова
          </Button>
        </Card>
      </Container>
    </section>
  );
}
