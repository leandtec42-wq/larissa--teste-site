// Ícone de marca do WhatsApp — não existe no lucide-react (que só cobre
// ícones genéricos), então mantemos este SVG de marca isolado aqui.
export default function WhatsIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.02 2C6.5 2 2 6.5 2 12.02c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.32a9.96 9.96 0 0 0 4.96 1.31h.01c5.52 0 10.02-4.5 10.02-10.02C22.05 6.5 17.55 2 12.02 2Zm5.08 12.6c-.28 0-1.03 1.3-1.42 1.3-.06 0-.13 0-.2-.05-.75-.38-1.4-.77-2.02-1.36-.5-.48-1.07-1.2-1.36-1.83a.4.4 0 0 1-.07-.2c0-.3.92-.88.92-1.39 0-.14-.68-1.95-.78-2.18-.13-.35-.2-.46-.56-.46-.17 0-.33-.04-.5-.04-.28 0-.5.1-.7.3-.64.6-.96 1.23-1 2.12v.1c-.01.93.44 1.85.95 2.6 1.15 1.73 2.34 3.27 4.24 4.2.58.3 1.68.77 2.32.8h.12c.58 0 1.13-.3 1.39-.8.23-.46.23-.88.23-.88s.04-.1-.08-.17Z" />
    </svg>
  );
}
