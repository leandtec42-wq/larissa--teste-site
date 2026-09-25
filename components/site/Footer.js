import Link from "next/link";
import InstagramIcon from "./InstagramIcon";
import WhatsIcon from "./WhatsIcon";

export default function Footer({ perfil, whatsappLink }) {
  return (
    <footer className="bg-cocoa py-16 pb-7 text-white/82">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mb-10 grid gap-8 sm:grid-cols-3">
          <div>
            <div className="font-display mb-3 text-2xl text-white">Larissa Oliveira</div>
            <p className="max-w-[320px] text-sm">{perfil.frase} Feito à mão, com carinho, em {perfil.cidade}.</p>
            <div className="mt-4 flex gap-3">
              <a
                href={perfil.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-[background,transform] hover:-translate-y-0.5 hover:bg-rose-deep"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={whatsappLink}
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-[background,transform] hover:-translate-y-0.5 hover:bg-rose-deep"
              >
                <WhatsIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="mb-4 text-[.82rem] uppercase tracking-[.1em] text-white">Navegação</h5>
            <ul className="grid gap-2.5 text-sm">
              <li><a href="#evento" className="hover:text-rose-soft">Onde vou estar</a></li>
              <li><a href="#sabores" className="hover:text-rose-soft">Sabores</a></li>
              <li><a href="#depoimentos" className="hover:text-rose-soft">Depoimentos</a></li>
              <li><a href="#encomendas" className="hover:text-rose-soft">Encomendas</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-[.82rem] uppercase tracking-[.1em] text-white">Contato</h5>
            <ul className="grid gap-2.5 text-sm">
              <li>{perfil.cidade}</li>
              <li><a href={whatsappLink} className="hover:text-rose-soft">Chamar no WhatsApp</a></li>
              <li><a href={perfil.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-rose-soft">@larissaoliveiracakes</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-white/10 pt-6 text-[.8rem] text-white/55">
          <span>© {new Date().getFullYear()} Larissa Oliveira. Feito com carinho em {perfil.cidade}.</span>
          <Link href="/admin" className="text-white/70 hover:text-rose-soft">Painel administrativo</Link>
        </div>
      </div>
    </footer>
  );
}
