import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";

export default function EnglishNotFound() {
  return <section className="flex min-h-screen items-center py-28 text-center"><Container><Typography as="span" variant="statValue" className="block text-[clamp(6rem,14vw,10rem)] text-pfa-accent">404</Typography><Typography as="h1" variant="sectionTitle" className="mt-4 text-[clamp(1.88rem,3vw,3.2rem)] leading-[.94] tracking-[-.05em] max-sm:text-[1.5rem]">Beyond the touchline</Typography><Typography variant="bodyLarge" className="mx-auto mt-6 max-w-lg text-slate-300">This page does not exist or has been moved.</Typography><Button href="/en" shape="square" size="compact" className="mt-9">Back to home</Button></Container></section>;
}
