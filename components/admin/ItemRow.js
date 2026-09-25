import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteButton from "./DeleteButton";

export default function ItemRow({ thumb, titulo, subtitulo, badge, badgeOn, editHref, deleteAction }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-nowrap">
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-cream-deep">
        {thumb ? <img src={thumb} alt="" className="h-full w-full object-cover" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-semibold">{titulo}</h4>
        <div className="truncate text-[.82rem] text-cocoa-soft">{subtitulo}</div>
      </div>
      {badge ? (
        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-[.72rem] font-semibold ${badgeOn ? "bg-whatsapp/15 text-whatsapp-dark" : "bg-cocoa/10 text-cocoa-soft"}`}>
          {badge}
        </span>
      ) : null}
      <div className="flex items-center gap-2">
        <Link href={editHref} className="inline-flex items-center gap-1.5 rounded-full border border-cream-deep px-3.5 py-2 text-[.82rem] font-medium text-cocoa-soft transition-colors hover:bg-cream">
          <Pencil size={14} /> Editar
        </Link>
        {deleteAction ? <DeleteButton action={deleteAction} /> : null}
      </div>
    </div>
  );
}
