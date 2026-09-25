import Reveal from "./Reveal";

/** Cabeçalho padrão das seções: etiqueta + título (aceita JSX) + subtítulo. */
export default function SectionHead({ eyebrow, title, subtitle, center = false, dark = false, className = "" }) {
  return (
    <Reveal className={`mb-12 max-w-[760px] md:mb-16 ${center ? "mx-auto text-center" : ""} ${className}`}>
      <span className={`eyebrow mb-4 ${center ? "justify-center" : ""} ${dark ? "!text-honey" : ""}`}>{eyebrow}</span>
      <h2 className={`font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold text-balance leading-[1.08] tracking-tight ${dark ? "text-white" : "text-berry-900"}`}>
        {title}
      </h2>
      {subtitle ? <p className={`mt-4 text-[1.05rem] leading-relaxed ${dark ? "text-white/70" : "text-cocoa-soft"}`}>{subtitle}</p> : null}
    </Reveal>
  );
}
