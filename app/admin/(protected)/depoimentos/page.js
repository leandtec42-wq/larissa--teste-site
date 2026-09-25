import Link from "next/link";
import { Plus } from "lucide-react";
import { listDepoimentos } from "@/lib/models/depoimentos";
import ItemRow from "@/components/admin/ItemRow";
import { excluirDepoimento } from "@/app/admin/actions/depoimentos";

export default async function DepoimentosListPage() {
  const depoimentos = await listDepoimentos();

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[1.3rem] font-semibold">Feedback dos clientes</h2>
        <Link href="/admin/depoimentos/novo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-5 py-3 text-sm font-semibold text-white shadow-sm">
          <Plus size={16} /> Adicionar feedback
        </Link>
      </div>
      <p className="mb-6 text-sm text-cocoa-soft">Cole a mensagem igual a cliente escreveu pra você — e, se tiver, anexe o print da conversa.</p>

      {!depoimentos.length ? (
        <p className="rounded-2xl bg-white p-8 text-center text-cocoa-soft shadow-sm">Nenhum depoimento cadastrado ainda.</p>
      ) : (
        <div className="grid gap-3">
          {depoimentos.map((d) => (
            <ItemRow
              key={d.id}
              thumb={d.foto}
              titulo={d.autor || "Depoimento"}
              subtitulo={d.descricao.length > 70 ? `${d.descricao.slice(0, 70)}…` : d.descricao}
              badge={d.ativo ? "Visível" : "Oculto"}
              badgeOn={d.ativo}
              editHref={`/admin/depoimentos/${d.id}`}
              deleteAction={excluirDepoimento.bind(null, d.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
