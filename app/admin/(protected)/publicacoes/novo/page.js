import PublicacaoForm from "@/components/admin/PublicacaoForm";
import { criarPublicacao } from "@/app/admin/actions/publicacoes";

export default async function NovaPublicacaoPage({ searchParams }) {
  const { erro } = (await searchParams) || {};
  return (
    <div>
      <h2 className="mb-6 text-[1.3rem] font-semibold">Nova publicação</h2>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <PublicacaoForm action={criarPublicacao} />
    </div>
  );
}
