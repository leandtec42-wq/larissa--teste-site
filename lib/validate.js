// Validação/sanitização simples de formulários — Controller (Server
// Actions) chama isto antes de tocar no Model.
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export function requireString(value, label, { max = 500 } = {}) {
  const v = (value ?? "").toString().trim();
  if (!v) throw new ValidationError(`${label} é obrigatório.`);
  if (v.length > max) throw new ValidationError(`${label} deve ter no máximo ${max} caracteres.`);
  return v;
}

export function optionalString(value, { max = 2000 } = {}) {
  const v = (value ?? "").toString().trim();
  if (v.length > max) throw new ValidationError(`Texto muito longo (máximo ${max} caracteres).`);
  return v;
}

export function requireNumber(value, label, { min = 0 } = {}) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) throw new ValidationError(`${label} precisa ser um número.`);
  if (n < min) throw new ValidationError(`${label} não pode ser menor que ${min}.`);
  return n;
}

export function requireDate(value, label) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new ValidationError(`${label} inválida.`);
  return d;
}

export function checkboxValue(value) {
  return value === "on" || value === "true" || value === true;
}
