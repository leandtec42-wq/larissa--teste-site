import SaborForm from "@/components/admin/SaborForm";
import { criarSabor } from "@/app/admin/actions/sabores";

export default async function NovoSaborPage({ searchParams }) {
  const { erro } = (await searchParams) || {};
  return (
    <div>
      <h2 className="mb-6 text-[1.3rem] font-semibold">Adicionar sabor</h2>
      {erro ? <p className="mb-5 max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}
      <SaborForm action={criarSabor} />
    </div>
  );
}
