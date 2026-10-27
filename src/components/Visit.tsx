import { DriftImage } from "@/components/DriftImage";
import { FlowDiagram } from "@/components/drawings";
import { Section } from "@/components/ui";
import type { Photo } from "@/lib/photos";

const STEPS = [
  {
    title: "Приёмка",
    text: "Записываетесь по телефону или через форму и подъезжаете к назначенному времени. Мастер осматривает машину вместе с вами и записывает всё, что беспокоит.",
  },
  {
    title: "Смета",
    text: "Диагностика на посту, затем один список: что нужно сейчас, что можно отложить, цена каждой позиции и запчасти на выбор. Работы начинаются после вашего согласия.",
  },
  {
    title: "Работы и выдача",
    text: "Каждый этап фотографируем и отправляем в мессенджер по ходу работ. При выдаче отдаём заказ-наряд, снятые детали по запросу и гарантию на работы шесть месяцев.",
  },
];

export function Visit({ photo }: { photo: Photo }) {
  return (
    <Section id="visit">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-5">
          <h2 data-reveal className="max-w-[8em] font-display text-h2 font-medium text-ink">
            Как проходит визит
          </h2>
          <p data-reveal className="mt-6 max-w-[32rem] text-body text-ink">
            Машину от звонка до выдачи ведёт один мастер-приёмщик. Вы видите каждый этап в чате и ничего не платите, пока не согласовали
            смету.
          </p>
        </div>
        <div data-reveal className="lg:col-span-7 lg:justify-self-end">
          <DriftImage {...photo} className="h-[72vw] w-[72vw] sm:h-[48vw] sm:w-[48vw] lg:h-[26vw] lg:w-[26vw]" />
        </div>
      </div>

      <div data-reveal className="mt-16 hidden sm:block">
        <FlowDiagram className="w-full" />
      </div>
      <div data-reveal-group className="mt-8 hidden gap-10 sm:grid sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.title}>
            <h3 className="font-display text-h3 font-medium text-ink">{step.title}</h3>
            <p className="mt-3 text-body text-ink">{step.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-[1fr_44vw] gap-5 sm:hidden">
        <div data-reveal>
          <FlowDiagram vertical className="h-full w-full" />
        </div>
        <div data-reveal-group className="flex flex-col justify-between gap-8">
          {STEPS.map((step) => (
            <div key={step.title}>
              <h3 className="font-display text-h3 font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-small text-ink">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
