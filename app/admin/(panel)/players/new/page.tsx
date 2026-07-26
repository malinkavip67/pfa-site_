import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PlayerEditor from "@/components/admin/PlayerEditor";
import Container from "@/components/ui/Container";
export default function NewPlayerPage() { return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Игроки" title="Новый игрок" description="Заполните профиль. По умолчанию новая запись скрыта с публичного сайта." /><Container><PlayerEditor /></Container></section>; }
