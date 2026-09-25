import Link from "next/link";
import { CalendarDays, CakeSlice, MessageSquareHeart, Newspaper, Plus } from "lucide-react";
import { listEventos, listEventosFuturosAtivos } from "@/lib/models/eventos";
import { listSabores } from "@/lib/models/sabores";
import { listDepoimentos } from "@/lib/models/depoimentos";
import { listPublicacoes } from "@/lib/models/publicacoes";
import { formatDataCurta } from "@/lib/format";

export default async function DashboardPage() {
  const [eventos, futuros, sabores, depoimentos, publicacoes] = await Promise.all([
    listEventos(),
    listEventosFuturosAtivos(),
    listSabores(),
    listDepoimentos(),
    listPublicacoes(),
  ]);

  const proximo = futuros[0];
  const cards = [
    { label: "Próximo evento", value: proximo ? `${formatDataCurta(proximo.data).dia} ${formatDataCurta(proximo.data).mes}` : "—" },
    { label: "Eventos cadastrados", value: eventos.length },
    { label: "Sabores ativos", value: sabores.filter((s) => s.disponivel).length },
    { label: "Depoimentos", value: depoimentos.length },
    { label: "Publicações", value: publicacoes.length },
  ];

  const atalhos = [
    { href: "/admin/agenda/novo", label: "Novo evento", icon: CalendarDays },
    { href: "/admin/sabores/novo", label: "Novo sabor", icon: CakeSlice },
    { href: "/admin/depoimentos/novo", label: "Novo depoimento", icon: MessageSquareHeart },
    { href: "/admin/publicacoes/novo", label: "Nova publicação", icon: Newspaper },
  ];

  return (
    <div>
      <div className="mb-8 rounded-2xl bg-rose-soft/50 p-5 text-[.9rem] text-rose-dark">
        Este painel salva tudo direto no banco de dados do site — o que você altera aqui aparece pra qualquer visitante, na hora.
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-1 text-[.78rem] text-cocoa-soft">{c.label}</div>
            <div className="font-display text-2xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-[1.05rem] font-semibold">Atalhos rápidos</h2>
      <div className="flex flex-wrap gap-3">
        {atalhos.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Plus size={16} /> {a.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
