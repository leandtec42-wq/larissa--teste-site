import EventoForm from "@/components/admin/EventoForm";
import { criarEvento } from "@/app/admin/actions/agenda";

export default async function NovoEventoPage({ searchParams }) {
  const { erro } = (await searchParams) || {};
  return (
    <div>
      <h2 className="mb-6 text-[1.3rem] font-semibold">Adicionar evento</h2>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <EventoForm action={criarEvento} />
    </div>
  );
}
