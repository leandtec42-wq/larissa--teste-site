import DepoimentoForm from "@/components/admin/DepoimentoForm";
import { criarDepoimento } from "@/app/admin/actions/depoimentos";

export default async function NovoDepoimentoPage({ searchParams }) {
  const { erro } = (await searchParams) || {};
  return (
    <div>
      <h2 className="mb-6 text-[1.3rem] font-semibold">Adicionar depoimento</h2>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <DepoimentoForm action={criarDepoimento} />
    </div>
  );
}
