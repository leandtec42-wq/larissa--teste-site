"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";

/**
 * Campo de imagem do painel: mostra a foto atual (se houver), deixa trocar
 * por um arquivo novo e manda os dois campos no form — o arquivo (`name`)
 * e o caminho atual (`${name}Atual`), que a Server Action usa como
 * respaldo quando nenhum arquivo novo é escolhido.
 */
export default function ImagePicker({ name, label, valorAtual }) {
  const [preview, setPreview] = useState(valorAtual || "");

  function onChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div className="grid gap-1.5">
      <label className="text-[.85rem] font-medium text-cocoa-soft">{label}</label>
      <label className="group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-cream-deep bg-cream text-cocoa-soft transition-colors hover:border-rose-deep">
        {preview ? (
          <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-2 text-sm">
            <ImagePlus size={22} /> Clique para escolher uma imagem
          </span>
        )}
        <input type="file" name={name} accept="image/*" onChange={onChange} className="sr-only" />
      </label>
      <input type="hidden" name={`${name}Atual`} value={valorAtual || ""} />
    </div>
  );
}
