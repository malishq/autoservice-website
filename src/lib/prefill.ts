export const PREFILL_EVENT = "os:prefill";

export type Prefill = { service: string; comment: string };

export function sendPrefill(detail: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail }));
}
