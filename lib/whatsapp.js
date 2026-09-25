export function onlyDigits(str) {
  return (str || "").replace(/\D/g, "");
}

export function buildWhatsappLink(numero, mensagem) {
  const n = onlyDigits(numero);
  return `https://wa.me/${n}?text=${encodeURIComponent(mensagem)}`;
}

export function fillTemplate(tpl, vars) {
  return (tpl || "").replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? vars[k] : ""));
}
