import WhatsIcon from "./WhatsIcon";

/** Botão flutuante do WhatsApp, fixo no canto inferior direito. */
export default function WhatsappFloat({ href }) {
  return (
    <div
      className="fixed right-4 z-[90] flex flex-col items-end gap-3 sm:right-6"
      style={{ bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Balão que aparece por alguns segundos logo no início e some */}
      <span
        aria-hidden="true"
        className="pointer-events-none hidden rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-[.85rem] font-semibold text-berry-900 opacity-0 shadow-[0_16px_40px_-10px_rgba(0,0,0,.35)] [animation:bubbleIn_9s_ease-out_3s_1_both] sm:block"
      >
        Fale comigo no WhatsApp!
      </span>

      <a
        href={href}
        aria-label="Falar no WhatsApp"
        className="group relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_14px_34px_rgba(37,211,102,.55)] transition-transform duration-300 hover:scale-110 active:scale-95 sm:h-[66px] sm:w-[66px]"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25d366] [animation:ring_2.4s_ease-out_infinite]" aria-hidden="true" />
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25d366] [animation:ring_2.4s_ease-out_1.2s_infinite]" aria-hidden="true" />
        <WhatsIcon size={34} className="[animation:wiggle_5s_ease-in-out_infinite]" />
      </a>
    </div>
  );
}
