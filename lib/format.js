const DIAS_SEMANA = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const MESES_CURTOS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGOS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function formatPreco(preco) {
  return `R$ ${Number(preco).toFixed(2).replace(".", ",")}`;
}

export function formatDiaSemana(date) {
  return DIAS_SEMANA[new Date(date).getDay()];
}

export function formatDataCurta(date) {
  const d = new Date(date);
  return { dia: d.getDate(), mes: MESES_CURTOS[d.getMonth()] };
}

export function formatDataExtensa(date) {
  const d = new Date(date);
  return `${d.getDate()} de ${MESES_LONGOS[d.getMonth()]} de ${d.getFullYear()}`;
}

export function isEventoPast(date) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d < hoje;
}

export function toDateInputValue(date) {
  return new Date(date).toISOString().slice(0, 10);
}
