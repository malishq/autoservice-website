"use client";

import { useId, useState } from "react";
import { DriftImage } from "@/components/DriftImage";
import { Section } from "@/components/ui";
import { FAQ } from "@/lib/faq";
import type { Photo } from "@/lib/photos";

const TONES = ["bg-surface", "bg-surface-2", "bg-surface-3"];

export function Faq({ photo }: { photo: Photo }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-6 lg:col-start-3">
          <h2 data-reveal className="font-display text-h2 font-medium text-ink">
            Вопросы и ответы
          </h2>
          <p data-reveal className="mt-6 max-w-[30rem] text-body text-ink">
            То, что чаще всего спрашивают по телефону. Не нашли свой вопрос: задайте его в комментарии к заявке, ответим при звонке.
          </p>
        </div>
        <div data-reveal className="lg:col-span-4 lg:justify-self-end">
          <DriftImage {...photo} zoom={1.9} className="h-[60vw] w-[60vw] sm:h-[40vw] sm:w-[40vw] lg:h-[22vw] lg:w-[22vw]" travel={4} />
        </div>
      </div>

      <ul data-reveal-group className="mt-16 lg:mx-[16.666%]">
        {FAQ.map((item, index) => {
          const isOpen = open === index;
          const tone = TONES[index % TONES.length];
          return (
            <li key={item.question} className={`relative ${index > 0 ? "-mt-19" : ""}`} style={{ zIndex: index + 1 }}>
              <div className={`${tone} mt-9 ${index === FAQ.length - 1 ? "pb-6" : "pb-19"}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-a${index}`}
                  className="group relative block w-full px-6 pt-5 pb-5 text-left sm:px-8"
                >
                  <span
                    aria-hidden
                    className={`${tone} absolute -top-9 flex h-9 w-30 items-center rounded-t-full px-5 font-display text-body text-muted transition duration-200 group-hover:text-ink sm:w-50`}
                    style={{ left: `min(${index * 150}px, calc(100% - 200px))` }}
                  >
                    {item.topic}
                  </span>
                  <span className="block pr-12 font-display text-h3 font-medium text-ink transition duration-200 group-hover:translate-x-1">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`absolute top-5 right-6 grid h-8 w-8 place-items-center rounded-full bg-ground text-ink transition duration-300 sm:right-8 ${isOpen ? "rotate-45" : ""}`}
                  >
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div id={`${id}-a${index}`} hidden={!isOpen} className="px-6 pb-2 sm:px-8">
                  <p className="max-w-[50ch] text-body text-ink">{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
