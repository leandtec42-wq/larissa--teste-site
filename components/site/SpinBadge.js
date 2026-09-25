import { Heart } from "lucide-react";

/** Selo circular com texto girando — toque artesanal nos cantos das fotos. */
export default function SpinBadge({ text = "Feito à mão • Com muito carinho • ", size = 116, className = "" }) {
  const id = `spin-${text.length}-${size}`;
  return (
    <div className={className} style={{ width: size, height: size }} aria-hidden="true">
     <div className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text fill="currentColor" fontSize="10.6" fontWeight="600" letterSpacing="2.2" className="uppercase">
          <textPath href={`#${id}`}>{text.repeat(2)}</textPath>
        </text>
      </svg>
      <Heart size={size * 0.24} fill="currentColor" className="relative" />
     </div>
    </div>
  );
}
