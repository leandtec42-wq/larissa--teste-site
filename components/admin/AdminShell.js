"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  CakeSlice,
  MessageSquareHeart,
  Newspaper,
  UserRound,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logout } from "@/app/admin/actions/auth";

const NAV = [
  { href: "/admin", label: "Início", icon: LayoutDashboard, exact: true },
  { href: "/admin/agenda", label: "Minha agenda", icon: CalendarDays },
  { href: "/admin/sabores", label: "Meus sabores", icon: CakeSlice },
  { href: "/admin/depoimentos", label: "Feedback dos clientes", icon: MessageSquareHeart },
  { href: "/admin/publicacoes", label: "Minhas publicações", icon: Newspaper },
  { href: "/admin/perfil", label: "Meu perfil", icon: UserRound },
];

const TITLES = {
  "/admin": "Início",
  "/admin/agenda": "Minha agenda",
  "/admin/sabores": "Meus sabores",
  "/admin/depoimentos": "Feedback dos clientes",
  "/admin/publicacoes": "Minhas publicações",
  "/admin/perfil": "Meu perfil",
};

function tituloPara(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  const base = "/" + pathname.split("/").slice(1, 3).join("/");
  return TITLES[base] || "Painel";
}

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh bg-cream">
      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-cocoa/40 md:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col gap-1 bg-white p-5 shadow-lg transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center gap-2 px-2 font-display text-lg font-semibold text-cocoa">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-deep text-sm text-white">L</span>
          Painel da Larissa
        </div>

        {NAV.map((item) => {
          const ativo = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[.92rem] font-medium transition-colors ${
                ativo ? "bg-rose-soft text-rose-dark" : "text-cocoa-soft hover:bg-cream"
              }`}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          );
        })}

        <div className="mt-auto flex flex-col gap-1 border-t border-cream-deep pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[.92rem] font-medium text-cocoa-soft hover:bg-cream"
          >
            <ExternalLink size={18} /> Ver meu site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[.92rem] font-medium text-cocoa-soft hover:bg-cream"
            >
              <LogOut size={18} /> Sair
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-cream-deep bg-white px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-cocoa md:hidden"
            >
              <Menu size={20} />
            </button>
            <span className="text-[1.05rem] font-semibold">{tituloPara(pathname)}</span>
          </div>
        </div>

        <div className="flex-1 p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
