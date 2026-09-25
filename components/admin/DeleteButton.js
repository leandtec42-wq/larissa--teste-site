"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({ action, confirmText = "Tem certeza que quer excluir?" }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-deep/40 px-3.5 py-2 text-[.82rem] font-medium text-rose-dark transition-colors hover:bg-rose-soft"
      >
        <Trash2 size={14} /> Excluir
      </button>
    </form>
  );
}
