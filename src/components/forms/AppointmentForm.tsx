"use client";

import { useState, type FormEvent } from "react";
import { whatsappUrl, hasWhatsapp } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * APPOINTMENT FORM
 * ---------------------------------------------------------------------------
 * No backend is assumed. The submit path is decided at runtime:
 *
 *   1. If NEXT_PUBLIC_FORM_ENDPOINT is set, the form POSTs JSON to it. Any
 *      service that accepts a JSON body works — Formspree, a Route Handler,
 *      a CRM webhook — without touching this component.
 *   2. Otherwise it composes the same details into a WhatsApp message, which
 *      is how most enquiries in this market actually arrive anyway.
 *
 * Validation is native HTML. The browser's own messages are better localised
 * and better announced than anything reimplemented here.
 */

const SERVICES = [
  "Custom Suit",
  "Wedding Suit",
  "Three-Piece Suit",
  "Blazer",
  "Custom Shirt",
  "Trouser",
  "Alteration",
  "Other",
] as const;

const TIMES = [
  "Morning (11:00 – 13:00)",
  "Afternoon (13:00 – 16:00)",
  "Evening (16:00 – 20:00)",
] as const;

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() || null;

type Status = "idle" | "sending" | "sent" | "error";

export function AppointmentForm({
  defaultService,
}: {
  /** Pre-selects a service when arriving from a specific page. */
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const initialService =
    defaultService && SERVICES.includes(defaultService as (typeof SERVICES)[number])
      ? defaultService
      : SERVICES[0];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Honeypot: a field no human sees, so anything in it is automated.
    if (data.company) return;

    if (!ENDPOINT) {
      const url = whatsappUrl(composeMessage(data));
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        setStatus("sent");
        setMessage(
          "WhatsApp should have opened with your details. Send the message and we will confirm your slot.",
        );
        return;
      }
      setStatus("error");
      setMessage(
        "No booking channel is configured yet. Please call or email us instead.",
      );
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
      setMessage(
        "Thank you. We have your request and will confirm your appointment shortly.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "That did not send. Please try WhatsApp or give us a call and we will book you in.",
      );
    }
  }

  const waFallback = whatsappUrl("appointment");

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-5">
      {/* Honeypot. Hidden from sight and from assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          hint="We will call or message to confirm."
        />
      </div>

      <Field label="Email" name="email" type="email" autoComplete="email" optional />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" name="date" type="date" optional />
        <SelectField label="Preferred time" name="time" options={[...TIMES]} optional />
      </div>

      <SelectField
        label="Service"
        name="service"
        options={[...SERVICES]}
        defaultValue={initialService}
      />

      <div>
        <Label htmlFor="message" optional>
          Anything we should know
        </Label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className={inputClass}
          placeholder="The occasion, your dates, or a question."
        />
      </div>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center bg-ivory px-8 py-4 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-950 transition-colors duration-300 hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request an Appointment"}
        </button>

        {hasWhatsapp && waFallback ? (
          <a
            href={waFallback}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 border border-hairline-strong px-7 py-4 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book via WhatsApp
          </a>
        ) : null}
      </div>

      {/* Announced to screen readers without stealing focus. */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "font-sans text-[0.875rem]",
          status === "error" ? "text-[#d8a08a]" : "text-champagne",
          status === "idle" && "sr-only",
        )}
      >
        {message}
      </p>

      {!ENDPOINT ? (
        <p className="font-sans text-[0.75rem] leading-relaxed text-ash">
          This form composes a WhatsApp message with your details. To send
          submissions to an inbox or a CRM instead, set{" "}
          <code className="text-stone">NEXT_PUBLIC_FORM_ENDPOINT</code>.
        </p>
      ) : null}
    </form>
  );
}

/* ------------------------------------------------------------------ */

const inputClass =
  "mt-2 block w-full border border-hairline-strong bg-ink-900 px-4 py-3 font-sans text-[0.9375rem] text-ivory " +
  "transition-colors duration-300 placeholder:text-ash " +
  "focus:border-champagne focus:outline-2 focus:outline-offset-2 focus:outline-champagne";

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-stone"
    >
      {children}
      {optional ? (
        <span className="ml-2 tracking-normal text-ash normal-case">
          (optional)
        </span>
      ) : null}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
  inputMode,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  hint?: string;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <div>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-describedby={hintId}
        className={inputClass}
      />
      {hint ? (
        <p id={hintId} className="mt-2 font-sans text-[0.75rem] text-ash">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
  optional,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className={inputClass}
      >
        {optional ? <option value="">No preference</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Formats the submission as a readable WhatsApp message. */
function composeMessage(data: Record<string, string>): string {
  const lines = [
    "Appointment request",
    "",
    `Name: ${data.name || "—"}`,
    `Phone: ${data.phone || "—"}`,
    data.email ? `Email: ${data.email}` : null,
    `Service: ${data.service || "—"}`,
    data.date ? `Preferred date: ${data.date}` : null,
    data.time ? `Preferred time: ${data.time}` : null,
    data.message ? `\n${data.message}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}
