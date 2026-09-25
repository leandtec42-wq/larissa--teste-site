import WhatsIcon from "./WhatsIcon";

export default function WhatsappFloat({ href }) {
  return (
    <a
      href={href}
      aria-label="Falar no WhatsApp"
      className="animate-pulse-wa fixed right-5 z-[90] flex h-[62px] w-[62px] items-center justify-center rounded-full bg-whatsapp text-white transition-colors hover:bg-whatsapp-dark md:h-[66px] md:w-[66px]"
      style={{ bottom: "calc(20px + env(safe-area-inset-bottom, 0px))" }}
    >
      <WhatsIcon size={30} />
    </a>
  );
}
