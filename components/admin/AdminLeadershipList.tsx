import Link from "next/link";
import Typography from "@/components/ui/Typography";
import type { AdminLeadershipRecord } from "@/types/admin-content";

export default function AdminLeadershipList({ members }: { members: AdminLeadershipRecord[] }) {
  return (
    <div className="grid gap-3">
      {members.sort((left, right) => left.sortOrder - right.sortOrder).map((member) => {
        const fullName = [member.firstName, member.lastName].filter(Boolean).join(" ");
        return (
          <Link href={`/admin/leadership/${member.id}`} key={member.id} className="grid grid-cols-[1fr_auto] items-center gap-5 border border-white/10 bg-[#081321] p-5 transition-colors hover:border-pfa-accent/60">
            <div className="min-w-0">
              <Typography as="h2" variant="bodyLarge" className="truncate text-white">{fullName || `Карточка ${member.sortOrder} — материал в редакции`}</Typography>
              <Typography variant="caption" className="mt-2">{member.position || "Должность не указана"}</Typography>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-[.12em] ${member.isPublished ? "text-pfa-accent" : "text-slate-400"}`}>{member.isPublished ? "На сайте" : "Скрыта"}</span>
          </Link>
        );
      })}
    </div>
  );
}
