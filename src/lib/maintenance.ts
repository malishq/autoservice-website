export type CarClassId = "ab" | "c" | "d" | "suv";

export type CarClass = {
  id: CarClassId;
  label: string;
  hint: string;
  factor: number;
};

export type Work = {
  id: string;
  name: string;
  every: number;
  base: number;
  note: string;
  included?: boolean;
};

export const STEP_KM = 15000;
export const MIN_KM = 5000;
export const MAX_KM = 300000;
export const DEFAULT_KM = 60000;

export const CAR_CLASSES: CarClass[] = [
  { id: "ab", label: "A/B", hint: "компактные хэтчбеки и седаны", factor: 1 },
  { id: "c", label: "C", hint: "гольф-класс", factor: 1.15 },
  { id: "d", label: "D и бизнес", hint: "большие седаны и универсалы", factor: 1.4 },
  { id: "suv", label: "Кроссовер и SUV", hint: "включая рамные внедорожники", factor: 1.3 },
];

export const WORKS: Work[] = [
  { id: "oil", name: "Масло и масляный фильтр", every: 15000, base: 1500, note: "с проверкой на течи и сбросом межсервисного интервала" },
  { id: "air", name: "Воздушный фильтр", every: 15000, base: 500, note: "осмотр корпуса и патрубков впуска" },
  { id: "cabin", name: "Салонный фильтр", every: 15000, base: 700, note: "с чисткой короба отопителя" },
  { id: "inspect", name: "Осмотр на подъёмнике", every: 15000, base: 800, note: "тормоза, подвеска, уровни жидкостей, давление в шинах" },
  { id: "diag", name: "Компьютерная диагностика", every: 15000, base: 0, note: "чтение ошибок всех блоков, входит в ТО", included: true },
  { id: "plugs", name: "Свечи зажигания", every: 30000, base: 1500, note: "с проверкой катушек и зазоров" },
  { id: "brakefluid", name: "Тормозная жидкость", every: 30000, base: 1900, note: "с прокачкой всех контуров" },
  { id: "fuel", name: "Топливный фильтр", every: 60000, base: 1800, note: "для бензиновых и дизельных двигателей" },
  { id: "atf", name: "Масло в АКПП", every: 60000, base: 3500, note: "частичная или аппаратная замена с фильтром" },
  { id: "coolant", name: "Антифриз", every: 60000, base: 2200, note: "с промывкой системы и проверкой термостата" },
  { id: "belt", name: "Приводной ремень", every: 60000, base: 1200, note: "с проверкой натяжителя и роликов" },
  { id: "timing", name: "Ремень ГРМ с роликами", every: 90000, base: 7900, note: "для двигателей с ремнём, помпу меняем в тот же заход" },
];

export function nextServiceKm(mileage: number) {
  const safe = Number.isFinite(mileage) ? Math.max(0, mileage) : 0;
  return Math.max(STEP_KM, Math.ceil(safe / STEP_KM) * STEP_KM);
}

export function isDue(work: Work, km: number) {
  return km % work.every === 0;
}

export function priceFor(work: Work, carClass: CarClass) {
  if (work.included) return 0;
  return Math.round((work.base * carClass.factor) / 100) * 100;
}

export function serviceLabel(km: number) {
  if (km % 60000 === 0) return "Большое ТО";
  return (km / STEP_KM) % 2 === 0 ? "ТО-2" : "ТО-1";
}

export function classById(id: CarClassId) {
  return CAR_CLASSES.find((c) => c.id === id) ?? CAR_CLASSES[0];
}

export function plan(classId: CarClassId, mileage: number) {
  const carClass = classById(classId);
  const km = nextServiceKm(mileage);
  const items = WORKS.filter((w) => isDue(w, km)).map((w) => ({ work: w, price: priceFor(w, carClass) }));
  const total = items.reduce((sum, i) => sum + i.price, 0);
  return { carClass, km, label: serviceLabel(km), items, total };
}

export function packagePrice(km: number, classId: CarClassId) {
  return plan(classId, km).total;
}
