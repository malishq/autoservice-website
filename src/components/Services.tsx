import { BrakeDisc, Tyre } from "@/components/drawings";
import { Section } from "@/components/ui";
import { formatFrom } from "@/lib/format";
import { SERVICES } from "@/lib/services";

const plural = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} позиция`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} позиции`;
  return `${n} позиций`;
};

export function Services() {
  return (
    <Section id="services">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 data-reveal className="font-display text-h2 font-medium text-ink">
            Услуги и цены
          </h2>
          <p data-reveal className="mt-6 max-w-[40rem] text-h3 text-ink">
            Цены на работы без стоимости запчастей и жидкостей: детали подбираем после диагностики, оригинал или аналог на ваш выбор.
            Точную сумму согласуем до начала работ.
          </p>
        </div>
        <div data-reveal className="relative h-[64vw] w-full sm:h-[44vw] lg:col-span-5 lg:h-[26vw]">
          <BrakeDisc className="absolute top-0 left-0 h-[46vw] w-[46vw] sm:h-[32vw] sm:w-[32vw] lg:h-[19vw] lg:w-[19vw]" />
          <Tyre className="absolute right-0 bottom-0 h-[52vw] w-[52vw] sm:h-[36vw] sm:w-[36vw] lg:h-[22vw] lg:w-[22vw]" />
        </div>
      </div>

      <div className="mt-6 sm:mt-10">
        {SERVICES.map((category) => (
          <div key={category.id} className="pt-16 first:pt-10 sm:pt-20 sm:first:pt-14">
            <div data-reveal className="flex items-baseline justify-between gap-6">
              <h3 className="font-display text-h2 font-medium text-ink">{category.name}</h3>
              <span className="shrink-0 text-body text-muted">{plural(category.items.length)}</span>
            </div>
            <ul data-reveal-group className="mt-8 grid gap-x-12 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item) => (
                <li key={item.name} className="grid grid-cols-[auto_1fr] gap-x-5">
                  <span aria-hidden className="mt-2 block h-3 w-3 rounded-full bg-surface-3" />
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-body font-semibold text-ink">{item.name}</span>
                      <span className="tabular shrink-0 text-body font-semibold text-ink">{formatFrom(item.price)}</span>
                    </div>
                    {item.text && <p className="mt-1 max-w-[46ch] text-small text-muted">{item.text}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
