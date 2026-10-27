import { BayPlan } from "@/components/drawings";
import { Container } from "@/components/ui";

export function Posts() {
  return (
    <section id="posts" className="bg-accent text-accent-ink">
      <Container className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 data-reveal className="max-w-[9em] font-display text-h2 font-medium">
              Шесть постов, каждый день
            </h2>
            <p data-reveal className="mt-6 max-w-[34rem] text-body">
              Два подъёмника под ТО и тормоза, два поста ремонта подвески и двигателя, пост шиномонтажа с балансировкой и пост диагностики.
              С 9:00 до 21:00 без выходных: если позвонить до двух часов дня, машина чаще всего попадает на пост в тот же день.
            </p>
          </div>
          <div data-reveal className="lg:col-span-7">
            <BayPlan columns={6} className="hidden w-full sm:block" />
            <BayPlan columns={3} className="mx-auto w-full max-w-[26rem] sm:hidden" />
          </div>
        </div>
      </Container>
    </section>
  );
}
