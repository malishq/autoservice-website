"use client";

import { useEffect, useState, type FormEvent } from "react";
import { PREFILL_EVENT, type Prefill } from "@/lib/prefill";

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const field =
  "h-13 w-full rounded-full bg-accent-soft px-6 text-body text-accent-ink placeholder:text-accent-ink/70 outline-none transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ground";

export function ContactForm({ services = [] as string[] }: { services?: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0] ?? "");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<Prefill>).detail;
      if (!detail) return;
      if (services.includes(detail.service)) setService(detail.service);
      setComment(detail.comment);
      setStatus("idle");
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [services]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Как к вам обращаться?";
    if (!/^\+?[\d\s()-]{10,18}$/.test(phone)) next.phone = "Введите номер телефона, например +7 999 000-00-00";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, service, comment }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("sent");
      setName("");
      setPhone("");
      setComment("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col justify-center">
        <p className="font-display text-h2 font-medium text-accent-ink">Заявка принята</p>
        <p className="mt-4 max-w-[34ch] text-body text-accent-ink">Перезвоним в течение 15 минут в рабочее время и подтвердим время приезда.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-ground px-6 text-body font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-surface active:translate-y-0 active:scale-[0.97]"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-2.5">
      <label className="grid gap-1">
        <span className="sr-only">Имя</span>
        <input
          name="name"
          autoComplete="name"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "err-name" : undefined}
          className={field}
        />
        {errors.name && (
          <span id="err-name" className="px-6 text-small font-semibold text-accent-ink">
            {errors.name}
          </span>
        )}
      </label>
      <label className="grid gap-1">
        <span className="sr-only">Телефон</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "err-phone" : undefined}
          className={field}
        />
        {errors.phone && (
          <span id="err-phone" className="px-6 text-small font-semibold text-accent-ink">
            {errors.phone}
          </span>
        )}
      </label>
      {services.length > 0 && (
        <label className="grid gap-1">
          <span className="sr-only">Услуга</span>
          <select name="service" value={service} onChange={(e) => setService(e.target.value)} className={`${field} appearance-none`}>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      )}
      <label className="grid gap-1">
        <span className="sr-only">Комментарий</span>
        <textarea
          name="comment"
          rows={4}
          placeholder="Что с машиной, марка и год, удобное время"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`${field} h-auto rounded-[1.65rem] py-4`}
        />
      </label>
      {status === "error" && (
        <p className="px-6 text-small font-semibold text-accent-ink" role="alert">
          Не удалось отправить. Позвоните нам или попробуйте ещё раз.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-full bg-ground px-6 text-body font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-surface active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      <p className="px-6 text-small text-accent-ink">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
    </form>
  );
}
