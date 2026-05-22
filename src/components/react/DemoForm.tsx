import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const inputCls =
  "mt-2 w-full bg-transparent border-b border-line2 focus:border-accent outline-none py-2 text-[15px] text-paper placeholder:text-mute transition-colors";

export default function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // NOTE: static-demo stub. The real fetch to /api/lead is restored when the
  // site moves back to Vercel — see comment in astro.config.mjs.
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("> Transmitting…");
    const form = e.currentTarget;
    await new Promise((r) => setTimeout(r, 700));
    setStatus("ok");
    setMessage("> Received. A team member will reply within 48h.");
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="lg:col-span-5 self-start border border-line p-6 lg:p-8 bg-ink2/60 backdrop-blur-sm"
      noValidate
    >
      <div className="flex items-center justify-between mb-8">
        <span className="label">Request a demo</span>
      </div>

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

        {/* Honeypot — bots fill, humans don't see.
            NOTE: when restoring the Vercel API (src/_disabled/api-lead.ts),
            the server route MUST reject requests where `hp !== ""`. The
            client field alone does nothing; the original handler already
            does this. Confirm before re-deploying. */}
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
          {status === "sending" ? "Sending…" : "Send request"}
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
        className={`mt-4 font-mono text-[11px] ${
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
