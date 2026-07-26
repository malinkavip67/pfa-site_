import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NewsEditor from "@/components/admin/NewsEditor";
import Container from "@/components/ui/Container";
export default function NewNewsPage() { return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Новости" title="Новая публикация" description="Создайте черновик и опубликуйте его после проверки." /><Container><NewsEditor /></Container></section>; }
