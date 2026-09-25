import Link from "next/link";
import { Plus } from "lucide-react";
import { listPublicacoes } from "@/lib/models/publicacoes";
import { toDateInputValue } from "@/lib/format";
import ItemRow from "@/components/admin/ItemRow";
import { excluirPublicacao } from "@/app/admin/actions/publicacoes";

export default async function PublicacoesListPage() {
  const publicacoes = await listPublicacoes();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[1.3rem] font-semibold">Minhas publicações</h2>
        <Link href="/admin/publicacoes/novo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-5 py-3 text-sm font-semibold text-white shadow-sm">
          <Plus size={16} /> Nova publicação
        </Link>
      </div>

      {!publicacoes.length ? (
        <p className="rounded-2xl bg-white p-8 text-center text-cocoa-soft shadow-sm">Nenhuma publicação ainda.</p>
      ) : (
        <div className="grid gap-3">
          {publicacoes.map((p) => (
            <ItemRow
              key={p.id}
              thumb={p.foto}
              titulo={p.titulo}
              subtitulo={`${toDateInputValue(p.data)}${p.categoria ? " · " + p.categoria : ""}`}
              badge={p.status === "publicado" ? "Publicado" : "Rascunho"}
              badgeOn={p.status === "publicado"}
              editHref={`/admin/publicacoes/${p.id}`}
              deleteAction={excluirPublicacao.bind(null, p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
