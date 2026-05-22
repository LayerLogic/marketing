import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const inputCls =
  "mt-2 w-full bg-transparent border-b border-line2 focus:border-accent outline-none py-2 text-[15px] text-paper placeholder:text-mute transition-colors";

const TO_ADDRESS = "hello@layerlogic.se";

/**
 * Honest mailto fallback: until a backend endpoint is wired, submitting
 * the form opens the user's default mail client with a draft pre-filled
 * from the form fields. The user still has to send it — but no message
 * disappears into a stubbed endpoint, and the "we'll reply" wording is
 * replaced with a clear "compose email" affordance.
 */
export default function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — silently drop bot submissions
    if (data.get("hp")) return;

    const name = (data.get("name") as string | null) ?? "";
    const company = (data.get("company") as string | null) ?? "";
    const email = (data.get("email") as string | null) ?? "";
    const msg = (data.get("message") as string | null) ?? "";

    const subject = company ? `Demo request — ${company}` : "Demo request";
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      "",
      msg,
    ].join("\n");

    const href = `mailto:${TO_ADDRESS}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus("sending");
    setMessage("Opening your email app…");
    window.location.href = href;

    // Short delay before resetting status so the user sees the prompt
    setTimeout(() => {
      setStatus("ok");
      setMessage(`Draft opened. If nothing happened, email ${TO_ADDRESS} directly.`);
    }, 800);
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
        Opens a pre-filled draft in your email app to{" "}
        <span className="text-paper">{TO_ADDRESS}</span>.
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
          {status === "sending" ? "Opening…" : "Compose email"}
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
