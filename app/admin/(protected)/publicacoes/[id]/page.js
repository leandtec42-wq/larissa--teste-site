import { notFound } from "next/navigation";
import { getPublicacao } from "@/lib/models/publicacoes";
import PublicacaoForm from "@/components/admin/PublicacaoForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { editarPublicacao, excluirPublicacao } from "@/app/admin/actions/publicacoes";

export default async function EditarPublicacaoPage({ params, searchParams }) {
  const { id } = await params;
  const { erro } = (await searchParams) || {};
  const publicacao = await getPublicacao(id);
  if (!publicacao) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[1.3rem] font-semibold">Editar publicação</h2>
        <DeleteButton action={excluirPublicacao.bind(null, id)} confirmText="Excluir esta publicação?" />
      </div>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <PublicacaoForm publicacao={publicacao} action={editarPublicacao.bind(null, id)} />
    </div>
  );
}
