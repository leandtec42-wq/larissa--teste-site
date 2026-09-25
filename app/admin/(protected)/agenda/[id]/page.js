import { notFound } from "next/navigation";
import { getEvento } from "@/lib/models/eventos";
import EventoForm from "@/components/admin/EventoForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { editarEvento, excluirEvento } from "@/app/admin/actions/agenda";

export default async function EditarEventoPage({ params, searchParams }) {
  const { id } = await params;
  const { erro } = (await searchParams) || {};
  const evento = await getEvento(id);
  if (!evento) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[1.3rem] font-semibold">Editar evento</h2>
        <DeleteButton action={excluirEvento.bind(null, id)} confirmText="Excluir este evento?" />
      </div>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <EventoForm evento={evento} action={editarEvento.bind(null, id)} />
    </div>
  );
}
