import { ContactForm } from "@/components/ContactForm";
import { Wrench } from "@/components/drawings";
import { Section } from "@/components/ui";
import { SERVICE_OPTIONS } from "@/lib/services";
import { SITE } from "@/lib/site";

export function Booking() {
  return (
    <Section id="booking" className="py-20 sm:py-30">
      <div data-reveal className="relative mx-auto w-full bg-accent text-accent-ink lg:w-[83%]">
        <div className="grid lg:grid-cols-[46fr_auto_54fr]">
          <div className="relative flex flex-col justify-between gap-10 p-6 sm:p-12">
            <h2 className="max-w-[7em] font-display text-h2 font-medium uppercase">Запись на сегодня</h2>
            <Wrench className="mx-auto h-52 w-52 sm:h-72 sm:w-72" />
            <p className="max-w-[30rem] text-body">
              {SITE.address}, {SITE.district.split(",")[0]}. {SITE.hours}.{" "}
              <a href={SITE.phoneHref} className="font-semibold transition duration-200 hover:opacity-70">
                {SITE.phone}
              </a>
              . Перезвоним в течение 15 минут в рабочее время.
            </p>
          </div>
          <div aria-hidden className="relative mx-6 h-0 border-t-[5px] border-dotted border-ground sm:mx-12 lg:mx-0 lg:my-12 lg:h-auto lg:w-0 lg:border-t-0 lg:border-l-[5px]">
            <span className="absolute top-1/2 -left-6 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ground sm:-left-12 lg:top-0 lg:left-1/2 lg:-translate-y-[calc(50%+3rem)]" />
            <span className="absolute top-1/2 -right-6 h-7 w-7 translate-x-1/2 -translate-y-1/2 rounded-full bg-ground sm:-right-12 lg:top-auto lg:right-auto lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-[calc(50%+3rem)]" />
          </div>
          <div className="p-6 sm:p-12">
            <ContactForm services={SERVICE_OPTIONS} />
          </div>
        </div>
      </div>
    </Section>
  );
}
