import { DriftImage } from "@/components/DriftImage";
import { ButtonLink } from "@/components/ui";
import type { Photo } from "@/lib/photos";

export function Warranty({ photo }: { photo: Photo }) {
  return (
    <section id="warranty" className="scroll-mt-18 px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative mx-auto w-full max-w-[1736px] overflow-hidden bg-surface lg:min-h-[100svh]">
        <div className="grid gap-12 p-6 sm:p-12 lg:grid-cols-12 lg:gap-8 lg:p-14">
          <div className="lg:col-span-7">
            <h2 data-reveal className="max-w-[8.5em] font-display text-h2 font-medium text-ink">
              Шесть месяцев гарантии на работы
            </h2>
          </div>
          <div className="grid content-start gap-10 lg:col-span-4 lg:col-start-9 lg:gap-14">
            <div data-reveal>
              <h3 className="font-display text-h3 font-medium text-ink">Запчасти на выбор</h3>
              <p className="mt-3 text-body text-ink">
                К каждой позиции подбираем оригинальную деталь и один-два проверенных аналога, показываем цены и сроки поставки. Решение за
                вами, разницу объясняем словами, а не каталожными номерами.
              </p>
            </div>
            <div data-reveal>
              <h3 className="font-display text-h3 font-medium text-ink">Что покрывает гарантия</h3>
              <p className="mt-3 text-body text-ink">
                Шесть месяцев на выполненные работы без ограничения пробега. Если установленная нами деталь откажет по нашей вине, заменим
                бесплатно. На сами запчасти действует гарантия производителя или поставщика.
              </p>
            </div>
            <div data-reveal>
              <ButtonLink href="#booking">Записаться</ButtonLink>
            </div>
          </div>
        </div>
        <div data-reveal className="mx-auto -mb-[22vw] mt-4 w-[86vw] lg:absolute lg:bottom-[-8vw] lg:left-[4%] lg:m-0 lg:w-[38vw]">
          <DriftImage {...photo} className="h-[86vw] w-[86vw] lg:h-[38vw] lg:w-[38vw]" travel={5} />
        </div>
      </div>
    </section>
  );
}
