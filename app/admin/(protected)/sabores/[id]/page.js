import { notFound } from "next/navigation";
import { getSabor } from "@/lib/models/sabores";
import SaborForm from "@/components/admin/SaborForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { editarSabor, excluirSabor } from "@/app/admin/actions/sabores";

export default async function EditarSaborPage({ params, searchParams }) {
  const { id } = await params;
  const { erro } = (await searchParams) || {};
  const sabor = await getSabor(id);
  if (!sabor) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[1.3rem] font-semibold">Editar sabor</h2>
        <DeleteButton action={excluirSabor.bind(null, id)} confirmText="Excluir este sabor?" />
      </div>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <SaborForm sabor={sabor} action={editarSabor.bind(null, id)} />
    </div>
  );
}
