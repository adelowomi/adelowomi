"use client";

import React, { useState } from "react";

const ROLES = [
  "Video Editing",
  "Animation / Motion Graphics",
  "Graphics Design",
  "Content Research",
  "Social Media Management",
  "Scriptwriting",
  "Camera / Production",
  "Other",
];

const NYSC_BATCHES = ["Batch A", "Batch B", "Batch C", "Awaiting deployment"];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceState: string;
  batch: string;
  primaryRole: string;
  otherRole: string;
  portfolio: string;
  experience: string;
  why: string;
  availability: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "submitting" | "success" | "error";

export default function CorperApplicationForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    serviceState: "",
    batch: "",
    primaryRole: "",
    otherRole: "",
    portfolio: "",
    experience: "",
    why: "",
    availability: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^[0-9+\-\s()]{10,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.serviceState.trim()) e.serviceState = "Required";
    if (!form.batch) e.batch = "Required";
    if (!form.primaryRole) e.primaryRole = "Pick a role";
    if (form.primaryRole === "Other" && !form.otherRole.trim()) e.otherRole = "Tell us your skill";
    if (!form.why.trim()) e.why = "Required";
    else if (form.why.trim().length < 30) e.why = "Say a bit more (30+ characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitApplication(payload: FormData) {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Submission failed");
  }

  async function handleSubmit() {
    if (!validate()) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitApplication(form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  function reset() {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      serviceState: "",
      batch: "",
      primaryRole: "",
      otherRole: "",
      portfolio: "",
      experience: "",
      why: "",
      availability: "",
    });
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="caf-wrap">
        <Styles />
        <div className="caf-card caf-success">
          <div className="caf-success-icon">✓</div>
          <h2>Application received</h2>
          <p>
            Thank you, <strong>{form.fullName.split(" ")[0] || "Corper"}</strong>. We&apos;ll review
            your application and reach out within a few working days. Keep creating in the meantime.
          </p>
          <button className="caf-btn-ghost" onClick={reset}>
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="caf-wrap">
      <Styles />
      <div className="caf-card">
        <div className="caf-header">
          <div className="caf-kicker">&gt; CORPER APPLICATION</div>
          <h1 className="caf-title">
            Join the <span className="caf-accent">studio.</span>
          </h1>
          <p className="caf-sub">
            Fill this out honestly. We care more about hunger and taste than years of experience.
          </p>
        </div>

        <div className="caf-section">
          <div className="caf-section-label">01 / About you</div>

          <Field label="Full name" error={errors.fullName} required>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Adaeze Okafor"
            />
          </Field>

          <div className="caf-row">
            <Field label="Email" error={errors.email} required>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@email.com"
              />
            </Field>

            <Field label="Phone / WhatsApp" error={errors.phone} required>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="0801 234 5678"
              />
            </Field>
          </div>
        </div>

        <div className="caf-section">
          <div className="caf-section-label">02 / Your service</div>

          <div className="caf-row">
            <Field label="State of deployment" error={errors.serviceState} required>
              <input
                type="text"
                value={form.serviceState}
                onChange={(e) => update("serviceState", e.target.value)}
                placeholder="Lagos"
              />
            </Field>

            <Field label="NYSC Batch" error={errors.batch} required>
              <select value={form.batch} onChange={(e) => update("batch", e.target.value)}>
                <option value="">Select batch</option>
                {NYSC_BATCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <div className="caf-section">
          <div className="caf-section-label">03 / What you bring</div>

          <Field label="Primary skill" error={errors.primaryRole} required>
            <div className="caf-pills">
              {ROLES.map((role) => (
                <button
                  type="button"
                  key={role}
                  className={`caf-pill ${form.primaryRole === role ? "caf-pill-active" : ""}`}
                  onClick={() => update("primaryRole", role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </Field>

          {form.primaryRole === "Other" && (
            <Field label="Your skill" error={errors.otherRole} required>
              <input
                type="text"
                value={form.otherRole}
                onChange={(e) => update("otherRole", e.target.value)}
                placeholder="Tell us what you do"
              />
            </Field>
          )}

          <Field
            label="Portfolio / showreel / socials"
            hint="Link to anything that shows your work — drive folder, IG, YouTube, Behance, anything."
          >
            <input
              type="url"
              value={form.portfolio}
              onChange={(e) => update("portfolio", e.target.value)}
              placeholder="https://..."
            />
          </Field>

          <Field
            label="Briefly, your experience"
            hint="A few lines is fine. No portfolio? Tell us what you've taught yourself."
          >
            <textarea
              rows={3}
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
              placeholder="I've been editing for 2 years using Premiere Pro..."
            />
          </Field>
        </div>

        <div className="caf-section">
          <div className="caf-section-label">04 / The important part</div>

          <Field
            label="Why do you want this?"
            error={errors.why}
            hint="Be real with us."
            required
          >
            <textarea
              rows={4}
              value={form.why}
              onChange={(e) => update("why", e.target.value)}
              placeholder="What about tech content excites you? Why our studio?"
            />
            <div className="caf-count">{form.why.length} characters</div>
          </Field>

          <Field
            label="When can you start? Any constraints?"
            hint="Optional — but useful for us to know."
          >
            <input
              type="text"
              value={form.availability}
              onChange={(e) => update("availability", e.target.value)}
              placeholder="Immediately / next month / etc."
            />
          </Field>
        </div>

        {status === "error" && <div className="caf-error-banner">{errorMsg}</div>}

        <div className="caf-submit-row">
          <button
            className="caf-btn-primary"
            onClick={handleSubmit}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Submit application →"}
          </button>
          <p className="caf-disclaimer">
            By submitting, you agree we may contact you about this opportunity. We won&apos;t share
            your details.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`caf-field ${error ? "caf-field-error" : ""}`}>
      <label className="caf-label">
        {label}
        {required && <span className="caf-req">*</span>}
      </label>
      {children}
      {hint && !error && <div className="caf-hint">{hint}</div>}
      {error && <div className="caf-err">{error}</div>}
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .caf-wrap {
        --caf-bg: #0a0612;
        --caf-card: #14091f;
        --caf-card-2: #1c0f2a;
        --caf-ink: #f5f0ff;
        --caf-muted: #9b8eb0;
        --caf-border: rgba(185, 117, 255, 0.18);
        --caf-border-soft: rgba(185, 117, 255, 0.08);
        --caf-accent: #b975ff;
        --caf-accent-glow: rgba(185, 117, 255, 0.25);
        --caf-error: #ff6b8a;

        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: var(--caf-ink);
        background: var(--caf-bg);
        min-height: 100vh;
        padding: 48px 20px;
        display: flex;
        justify-content: center;
        line-height: 1.5;
      }

      .caf-card {
        width: 100%;
        max-width: 680px;
        background: linear-gradient(180deg, var(--caf-card) 0%, var(--caf-bg) 100%);
        border: 1px solid var(--caf-border);
        border-radius: 20px;
        padding: 48px;
        position: relative;
      }

      @media (max-width: 600px) {
        .caf-card { padding: 28px 22px; border-radius: 16px; }
        .caf-wrap { padding: 24px 12px; }
      }

      .caf-header { margin-bottom: 40px; }

      .caf-kicker {
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
        font-size: 13px;
        color: var(--caf-accent);
        letter-spacing: 0.15em;
        margin-bottom: 16px;
      }

      .caf-title {
        font-size: 44px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.03em;
        margin: 0 0 14px;
      }
      @media (max-width: 600px) { .caf-title { font-size: 34px; } }

      .caf-accent { color: var(--caf-accent); font-style: italic; font-weight: 600; }

      .caf-sub {
        color: var(--caf-muted);
        font-size: 16px;
        margin: 0;
        max-width: 460px;
      }

      .caf-section {
        margin-bottom: 36px;
        padding-top: 28px;
        border-top: 1px solid var(--caf-border-soft);
      }
      .caf-section:first-of-type { border-top: none; padding-top: 0; }

      .caf-section-label {
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
        font-size: 12px;
        color: var(--caf-muted);
        letter-spacing: 0.15em;
        margin-bottom: 20px;
        text-transform: uppercase;
      }

      .caf-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      @media (max-width: 600px) { .caf-row { grid-template-columns: 1fr; } }

      .caf-field { margin-bottom: 20px; }
      .caf-field:last-child { margin-bottom: 0; }

      .caf-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: var(--caf-ink);
        margin-bottom: 8px;
      }

      .caf-req { color: var(--caf-accent); margin-left: 4px; }

      .caf-wrap input,
      .caf-wrap textarea,
      .caf-wrap select {
        width: 100%;
        background: var(--caf-card-2);
        border: 1px solid var(--caf-border-soft);
        border-radius: 10px;
        padding: 13px 14px;
        font-size: 15px;
        color: var(--caf-ink);
        font-family: inherit;
        transition: border-color 0.15s, box-shadow 0.15s;
        outline: none;
      }

      .caf-wrap input:focus,
      .caf-wrap textarea:focus,
      .caf-wrap select:focus {
        border-color: var(--caf-accent);
        box-shadow: 0 0 0 3px var(--caf-accent-glow);
      }

      .caf-wrap input::placeholder,
      .caf-wrap textarea::placeholder {
        color: rgba(155, 142, 176, 0.5);
      }

      .caf-wrap textarea { resize: vertical; min-height: 90px; }

      .caf-wrap select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239b8eb0' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
        padding-right: 38px;
      }

      .caf-field-error input,
      .caf-field-error textarea,
      .caf-field-error select {
        border-color: var(--caf-error);
      }

      .caf-hint {
        font-size: 13px;
        color: var(--caf-muted);
        margin-top: 6px;
      }

      .caf-err {
        font-size: 13px;
        color: var(--caf-error);
        margin-top: 6px;
      }

      .caf-count {
        font-size: 12px;
        color: var(--caf-muted);
        margin-top: 6px;
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
      }

      .caf-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .caf-pill {
        background: var(--caf-card-2);
        border: 1px solid var(--caf-border-soft);
        color: var(--caf-ink);
        padding: 10px 16px;
        border-radius: 999px;
        font-size: 14px;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.15s;
      }

      .caf-pill:hover {
        border-color: var(--caf-accent);
        color: var(--caf-accent);
      }

      .caf-pill-active {
        background: var(--caf-accent);
        border-color: var(--caf-accent);
        color: #14091f;
        font-weight: 600;
      }
      .caf-pill-active:hover { color: #14091f; }

      .caf-submit-row {
        margin-top: 36px;
        padding-top: 28px;
        border-top: 1px solid var(--caf-border-soft);
      }

      .caf-btn-primary {
        background: var(--caf-accent);
        color: #14091f;
        border: none;
        padding: 16px 28px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        font-family: inherit;
        transition: transform 0.1s, box-shadow 0.2s;
        box-shadow: 0 8px 24px var(--caf-accent-glow);
      }

      .caf-btn-primary:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 12px 32px var(--caf-accent-glow);
      }

      .caf-btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .caf-disclaimer {
        font-size: 12px;
        color: var(--caf-muted);
        margin: 14px 0 0;
        text-align: center;
      }

      .caf-error-banner {
        background: rgba(255, 107, 138, 0.1);
        border: 1px solid rgba(255, 107, 138, 0.3);
        color: var(--caf-error);
        padding: 14px 18px;
        border-radius: 10px;
        font-size: 14px;
        margin-top: 24px;
      }

      .caf-success {
        text-align: center;
        padding: 60px 40px;
      }

      .caf-success-icon {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--caf-accent);
        color: #14091f;
        font-size: 36px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
        box-shadow: 0 10px 40px var(--caf-accent-glow);
      }

      .caf-success h2 {
        font-size: 32px;
        margin: 0 0 12px;
        letter-spacing: -0.02em;
      }

      .caf-success p {
        color: var(--caf-muted);
        margin: 0 auto 28px;
        max-width: 420px;
      }

      .caf-btn-ghost {
        background: transparent;
        color: var(--caf-accent);
        border: 1px solid var(--caf-border);
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        font-family: inherit;
        transition: background 0.15s;
      }
      .caf-btn-ghost:hover { background: var(--caf-card-2); }
    `}</style>
  );
}
