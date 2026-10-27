const NBSP = " ";

export function formatNumber(value: number) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

export function formatRub(value: number) {
  return `${formatNumber(value)}${NBSP}₽`;
}

export function formatFrom(value: number) {
  return `от ${formatRub(value)}`;
}

export function formatKm(value: number) {
  return `${formatNumber(value)}${NBSP}км`;
}
