"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Gauge, IDLE_RPM, rpmToAngle } from "@/components/Gauge";
import { ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const needle = "[data-needle]";
        gsap.set(needle, { rotation: rpmToAngle(0), svgOrigin: "500 500" });

        const split = SplitText.create("[data-hero-title]", {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.045, delay: 0.1 }),
        });

        const load = gsap.timeline({
          onComplete: () => {
            gsap.fromTo(
              needle,
              { rotation: rpmToAngle(IDLE_RPM), svgOrigin: "500 500" },
              {
                rotation: rpmToAngle(6.4),
                ease: "none",
                svgOrigin: "500 500",
                scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.4 },
              },
            );
          },
        });
        load
          .from("[data-dial]", { scale: 0.9, autoAlpha: 0, duration: 1.1, ease: "expo.out", transformOrigin: "50% 50%" }, 0.05)
          .from("[data-hero-fade]", { y: 18, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 }, 0.4)
          .to(needle, { rotation: rpmToAngle(6.8), duration: 0.8, ease: "power2.out" }, 0.25)
          .to(needle, { rotation: rpmToAngle(IDLE_RPM), duration: 0.7, ease: "power2.inOut" }, 1.05);

        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 px-5 sm:px-8 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center pt-12 pb-6 sm:pt-16 lg:py-20">
          <h1
            data-hero-title
            className="max-w-[9.2em] font-display text-[clamp(2.55rem,6.5vw,4.5rem)] leading-[0.96] font-medium tracking-[-0.02em] text-ink [text-wrap:balance] lg:text-[min(calc((50vw_-_40px)/9),6rem)] lg:tracking-[-0.01em]"
          >
            Автосервис в Кунцево с записью на сегодня
          </h1>
          <p data-hero-fade className="mt-7 max-w-[34rem] text-body text-ink sm:mt-9 sm:text-h3">
            Шесть постов для легковых и кроссоверов любых марок. ТО по регламенту производителя, запчасти на выбор и фотоотчёт каждого
            этапа в мессенджер.
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap gap-3 sm:mt-11">
            <ButtonLink href="#booking">Записаться</ButtonLink>
            <ButtonLink href="#calculator" variant="ghost">
              Посчитать стоимость ТО
            </ButtonLink>
          </div>
          <p data-hero-fade className="mt-12 text-body text-muted lg:mt-auto lg:pt-16">
            <a href={SITE.phoneHref} className="font-display text-h3 text-ink transition duration-200 hover:text-accent">
              {SITE.phone}
            </a>
            <br />
            {SITE.hours}, {SITE.district}
          </p>
        </div>
        <div className="relative h-[92vw] sm:h-[70vw] lg:h-auto">
          <div
            data-dial
            className="absolute top-1/2 left-1/2 h-[92vw] w-[92vw] -translate-x-1/2 -translate-y-1/2 sm:h-[70vw] sm:w-[70vw] lg:left-[6%] lg:h-[100vh] lg:w-[100vh] lg:translate-x-0"
          >
            <Gauge className="block h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
