import Link from "next/link";
import { Plus } from "lucide-react";
import { listEventos } from "@/lib/models/eventos";
import { formatDataExtensa, isEventoPast } from "@/lib/format";
import ItemRow from "@/components/admin/ItemRow";
import { excluirEvento } from "@/app/admin/actions/agenda";

export default async function AgendaListPage() {
  const eventos = await listEventos();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="mb-1 text-[1.3rem] font-semibold">Minha agenda</h2>
          <p className="text-sm text-cocoa-soft">Eventos com a data já passada somem sozinhos do site (mas continuam aqui, na sua lista).</p>
        </div>
        <Link href="/admin/agenda/novo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-5 py-3 text-sm font-semibold text-white shadow-sm">
          <Plus size={16} /> Adicionar evento
        </Link>
      </div>

      {!eventos.length ? (
        <p className="rounded-2xl bg-white p-8 text-center text-cocoa-soft shadow-sm">Nenhum evento cadastrado ainda.</p>
      ) : (
        <div className="grid gap-3">
          {eventos.map((ev) => {
            const passou = isEventoPast(ev.data);
            return (
              <ItemRow
                key={ev.id}
                thumb={ev.imagem}
                titulo={ev.nome}
                subtitulo={`${formatDataExtensa(ev.data)} · ${ev.horario} · ${ev.cidade}`}
                badge={passou ? "Já passou" : ev.ativo ? "Ativo" : "Oculto"}
                badgeOn={!passou && ev.ativo}
                editHref={`/admin/agenda/${ev.id}`}
                deleteAction={excluirEvento.bind(null, ev.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
