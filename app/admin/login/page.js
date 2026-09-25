import { redirect } from "next/navigation";
import { LockKeyhole, TriangleAlert } from "lucide-react";
import { getSession } from "@/lib/session";
import { login } from "@/app/admin/actions/auth";

export const metadata = { title: "Entrar — Painel Larissa Oliveira", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }) {
  const session = await getSession();
  if (session) redirect("/admin");

  const params = await searchParams;
  const erro = params?.erro;

  return (
    <div className="flex min-h-svh items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-[400px] rounded-[28px] bg-white p-9 shadow-lg">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rose-deep text-white">
          <LockKeyhole size={22} />
        </div>
        <h1 className="font-display mb-1 text-2xl font-semibold">Olá, Larissa</h1>
        <p className="mb-6 text-sm text-cocoa-soft">Entre para gerenciar seu site.</p>

        {erro ? (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">
            <TriangleAlert size={18} className="mt-0.5 flex-shrink-0" />
            <span>{erro}</span>
          </div>
        ) : null}

        <form action={login} className="grid gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="usuario" className="text-[.85rem] font-medium text-cocoa-soft">Usuário</label>
            <input id="usuario" name="usuario" type="text" required autoComplete="username" className="rounded-xl border border-cream-deep bg-cream px-4 py-3 outline-none focus:border-rose-deep" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="senha" className="text-[.85rem] font-medium text-cocoa-soft">Senha</label>
            <input id="senha" name="senha" type="password" required autoComplete="current-password" className="rounded-xl border border-cream-deep bg-cream px-4 py-3 outline-none focus:border-rose-deep" />
          </div>
          <button type="submit" className="mt-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark py-3.5 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5">
            Entrar
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-cream p-4 text-[.82rem] leading-relaxed text-cocoa-soft">
          <strong className="text-cocoa">Acesso de demonstração:</strong>
          <br />
          Usuário: <code className="rounded bg-white px-1.5 py-0.5">larissa</code> · Senha: <code className="rounded bg-white px-1.5 py-0.5">doces2026</code>
          <br />
          Você pode trocar isso em <em>Meu Perfil → Acesso</em> depois de entrar.
        </div>
      </div>
    </div>
  );
}
