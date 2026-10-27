"use client";

import { useId, useState } from "react";
import { useLenis } from "lenis/react";
import { DriftImage } from "@/components/DriftImage";
import { Button, Section } from "@/components/ui";
import { formatKm, formatNumber, formatRub } from "@/lib/format";
import { CAR_CLASSES, DEFAULT_KM, MAX_KM, MIN_KM, STEP_KM, WORKS, isDue, plan, priceFor, type CarClassId } from "@/lib/maintenance";
import { sendPrefill } from "@/lib/prefill";

const SLIDER_STEP = 5000;

export function Calculator({ image }: { image: { src: string; alt: string; width: number; height: number; position?: string } }) {
  const [classId, setClassId] = useState<CarClassId>("ab");
  const [mileage, setMileage] = useState(DEFAULT_KM);
  const [field, setField] = useState(String(DEFAULT_KM));
  const lenis = useLenis();
  const id = useId();

  const result = plan(classId, mileage);
  const digits = String(Math.min(mileage, 999999)).padStart(6, "0").split("");

  const commit = (value: number) => {
    const next = Math.min(MAX_KM * 3, Math.max(0, Math.round(value)));
    setMileage(next);
    setField(String(next));
  };

  const book = () => {
    const list = result.items.map((i) => i.work.name.toLowerCase()).join(", ");
    sendPrefill({
      service: "ТО по регламенту",
      comment: `${result.label} на ${formatKm(result.km)}, ${result.carClass.label}: ${list}. Работы от ${formatRub(result.total)}.`,
    });
    const target = document.getElementById("booking");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -72 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="calculator" className="overflow-x-clip bg-surface" full>
      <div className="mx-auto grid w-full max-w-[1800px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <DriftImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              position={image.position}
              className="-ml-[14vw] h-[82vw] w-[82vw] sm:-ml-[8vw] sm:h-[60vw] sm:w-[60vw] lg:-ml-[12%] lg:h-[min(78svh,44vw)] lg:w-[min(78svh,44vw)]"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <h2 data-reveal className="font-display text-h2 font-medium text-ink">
            Калькулятор ТО
          </h2>
          <p data-reveal className="mt-6 max-w-[40rem] text-body text-ink">
            Выберите класс автомобиля и пробег. Покажем работы, которые регламент производителя предписывает на ближайшем интервале, и
            посчитаем стоимость работ.
          </p>

          <fieldset data-reveal className="mt-10">
            <legend className="text-small font-medium text-muted">Класс автомобиля</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CAR_CLASSES.map((c) => (
                <label key={c.id} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name={`${id}-class`}
                    value={c.id}
                    checked={classId === c.id}
                    onChange={() => setClassId(c.id)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-12 items-center rounded-full bg-surface-2 px-5 py-2.5 text-body font-medium text-ink transition duration-200 peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:bg-surface-3 peer-checked:hover:bg-accent-strong active:scale-[0.97]">
                    {c.label}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-small text-muted">{CAR_CLASSES.find((c) => c.id === classId)?.hint}</p>
          </fieldset>

          <div data-reveal className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="pb-1 text-body font-medium text-ink">Пробег</span>
                <span aria-hidden className="flex gap-1">
                  {digits.map((d, i) => (
                    <span key={i} className="tabular grid h-[1.35em] w-[0.72em] place-items-center bg-surface-2 font-display text-h2 font-medium text-ink">
                      {d}
                    </span>
                  ))}
                  <span className="self-end pb-1 pl-2 font-display text-h3 text-muted">км</span>
                </span>
              </div>
              <label className="grid gap-1.5">
                <span className="text-small font-medium text-muted">Или введите точно</span>
                <span className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={MAX_KM * 3}
                    step={1000}
                    value={field}
                    onChange={(e) => {
                      setField(e.target.value);
                      const n = Number(e.target.value);
                      if (Number.isFinite(n) && e.target.value !== "") setMileage(Math.max(0, Math.round(n)));
                    }}
                    onBlur={() => commit(Number(field) || 0)}
                    className="tabular h-12 w-36 rounded-full bg-surface-2 px-5 text-body text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                  <span className="text-body text-muted">км</span>
                </span>
              </label>
            </div>
            <input
              type="range"
              min={MIN_KM}
              max={MAX_KM}
              step={SLIDER_STEP}
              value={Math.min(MAX_KM, Math.max(MIN_KM, Math.round(mileage / SLIDER_STEP) * SLIDER_STEP))}
              onChange={(e) => commit(Number(e.target.value))}
              aria-label="Пробег"
              aria-valuetext={formatKm(mileage)}
              className="odometer-range mt-5"
            />
            <div className="flex justify-between text-small text-muted">
              <span>{formatNumber(MIN_KM)}</span>
              <span>{formatNumber(MAX_KM)} км</span>
            </div>
          </div>

          <div data-reveal className="mt-12">
            <p className="font-display text-h3 text-ink">
              {result.label} на {formatKm(result.km)}
            </p>
            <p className="mt-1 text-small text-muted">Ближайший интервал регламента с шагом {formatKm(STEP_KM)}. Отмечено то, что входит в это ТО.</p>
          </div>

          <ul data-reveal-group className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {WORKS.map((work) => {
              const due = isDue(work, result.km);
              const price = priceFor(work, result.carClass);
              return (
                <li key={work.id} className="grid grid-cols-[auto_1fr] gap-x-3">
                  <span
                    aria-hidden
                    className={`mt-[0.3em] block h-[0.7em] w-[0.7em] rounded-full transition duration-300 ${due ? "bg-accent" : "bg-surface-3"}`}
                  />
                  <div>
                    <p className={`text-body font-medium ${due ? "text-ink" : "text-muted"}`}>
                      {work.name}
                      <span className="sr-only">{due ? ", входит" : ", не входит"}</span>
                    </p>
                    <p className="text-small text-muted">
                      каждые {formatKm(work.every)}
                      <br />
                      {work.included ? "входит в ТО" : due ? <span className="text-ink">{formatRub(price)}</span> : formatRub(price)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div data-reveal className="mt-12 flex flex-wrap items-center justify-between gap-6 bg-surface-2 px-6 py-6 sm:px-8">
            <div>
              <p className="font-display text-h2 font-medium text-ink">
                от {formatRub(result.total)}
              </p>
              <p className="mt-1 max-w-[36ch] text-small text-muted">
                Работы по регламенту для класса {result.carClass.label}. Запчасти и жидкости считаем отдельно после подбора по VIN.
              </p>
            </div>
            <Button type="button" onClick={book}>
              Записаться с этим набором
            </Button>
          </div>
          <noscript>
            <p className="mt-4 text-small text-muted">Без JavaScript показан регламент для класса A/B на {formatKm(DEFAULT_KM)}. Позвоните, посчитаем для вашей машины.</p>
          </noscript>
        </div>
      </div>
    </Section>
  );
}
