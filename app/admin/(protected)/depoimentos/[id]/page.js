import { notFound } from "next/navigation";
import { getDepoimento } from "@/lib/models/depoimentos";
import DepoimentoForm from "@/components/admin/DepoimentoForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { editarDepoimento, excluirDepoimento } from "@/app/admin/actions/depoimentos";

export default async function EditarDepoimentoPage({ params, searchParams }) {
  const { id } = await params;
  const { erro } = (await searchParams) || {};
  const depoimento = await getDepoimento(id);
  if (!depoimento) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[1.3rem] font-semibold">Editar depoimento</h2>
        <DeleteButton action={excluirDepoimento.bind(null, id)} confirmText="Excluir este depoimento?" />
      </div>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <DepoimentoForm depoimento={depoimento} action={editarDepoimento.bind(null, id)} />
    </div>
  );
}
