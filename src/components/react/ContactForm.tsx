import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const inputCls =
  "mt-2 w-full bg-transparent border-b border-line2 focus:border-accent outline-none py-2 text-[15px] text-paper placeholder:text-mute transition-colors";

const TO_ADDRESS = "hello@layerlogic.se";

// Web3Forms public access key — keys are designed to be embedded client-side.
const WEB3FORMS_KEY = "8818d2a8-194d-4579-b185-cbc609780007";

/**
 * Posts the contact enquiry to Web3Forms, which relays it to TO_ADDRESS.
 * No backend needed, so it works on any static host. The honeypot field is
 * dropped client-side; Web3Forms adds its own spam filtering on top.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — silently drop bot submissions
    if (data.get("hp")) return;
    data.delete("hp");

    const company = (data.get("company") as string | null) ?? "";
    data.append("access_key", WEB3FORMS_KEY);
    data.append("from_name", "LayerLogic website");
    data.append(
      "subject",
      company ? `Demo request from ${company}` : "Demo request",
    );

    setStatus("sending");
    setMessage("Sending…");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        setStatus("ok");
        setMessage("Thanks, we'll be in touch shortly.");
      } else {
        setStatus("error");
        setMessage(
          json.message ?? `Something went wrong. Email ${TO_ADDRESS} directly.`,
        );
      }
    } catch {
      setStatus("error");
      setMessage(`Couldn't send. Please email ${TO_ADDRESS} directly.`);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="lg:col-span-5 self-start border border-line p-6 lg:p-8 bg-ink2/60 backdrop-blur-sm"
      noValidate
    >
      <div className="flex items-center justify-between mb-2">
        <span className="label">Request a demo</span>
      </div>
      <p className="text-[12.5px] text-mute2 mb-8 leading-snug">
        Tell us what you're testing for. We'll reply to the email you
        provide.
      </p>

      <div className="space-y-6">
        <label className="block">
          <span className="label">Name</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={inputCls}
            placeholder="Anna Lindqvist"
          />
        </label>
        <label className="block">
          <span className="label">Company</span>
          <input
            required
            name="company"
            type="text"
            autoComplete="organization"
            className={inputCls}
            placeholder="Nordic Dairy AB"
          />
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls}
            placeholder="anna@nordicdairy.se"
          />
        </label>
        <label className="block">
          <span className="label">What are you trying to detect?</span>
          <textarea
            name="message"
            rows={3}
            className={`${inputCls} resize-none`}
            placeholder="Pathogens, matrices, throughput, current method…"
          />
        </label>

        {/* Honeypot — bots fill, humans don't see. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label>
            Leave this empty
            <input
              tabIndex={-1}
              autoComplete="off"
              name="hp"
              type="text"
              defaultValue=""
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="lb-btn lb-btn--primary lb-btn--block mt-8 disabled:opacity-60"
        disabled={status === "sending"}
      >
        <span className="lb-label">
          {status === "sending" ? "Sending…" : "Request a demo"}
        </span>
        <span className="lb-chip">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path
              d="M2 7h9M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <p
        className={`mt-4 text-[12px] ${
          status === "ok"
            ? "text-accent"
            : status === "error"
              ? "text-red-400"
              : "text-mute"
        }`}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
