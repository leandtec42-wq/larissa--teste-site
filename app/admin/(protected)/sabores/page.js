import Link from "next/link";
import { Plus } from "lucide-react";
import { listSabores } from "@/lib/models/sabores";
import { formatPreco } from "@/lib/format";
import ItemRow from "@/components/admin/ItemRow";
import { excluirSabor } from "@/app/admin/actions/sabores";

export default async function SaboresListPage() {
  const sabores = await listSabores();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[1.3rem] font-semibold">Meus sabores</h2>
        <Link href="/admin/sabores/novo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-5 py-3 text-sm font-semibold text-white shadow-sm">
          <Plus size={16} /> Adicionar sabor
        </Link>
      </div>

      {!sabores.length ? (
        <p className="rounded-2xl bg-white p-8 text-center text-cocoa-soft shadow-sm">Nenhum sabor cadastrado ainda.</p>
      ) : (
        <div className="grid gap-3">
          {sabores.map((s) => (
            <ItemRow
              key={s.id}
              thumb={s.foto}
              titulo={s.nome}
              subtitulo={formatPreco(s.preco)}
              badge={s.disponivel ? "Disponível" : "Oculto"}
              badgeOn={s.disponivel}
              editHref={`/admin/sabores/${s.id}`}
              deleteAction={excluirSabor.bind(null, s.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
