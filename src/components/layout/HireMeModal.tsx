"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  budget: string;
  details: string;
}

interface FieldError {
  name?: string;
  email?: string;
  details?: string;
}

const ROLE_OPTIONS = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "AI / ML Integration",
  "Freelance Project",
  "Internship",
  "Open Source Collaboration",
  "Other",
];

const BUDGET_OPTIONS = [
  "< ₹5L",
  "₹5L – ₹10L",
  "₹10L+",
  "Negotiable",
];

function validate(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!data.details.trim()) {
    errors.details = "Please describe the opportunity";
  } else if (data.details.trim().length < 20) {
    errors.details = "Please add a bit more detail (min 20 chars)";
  }
  return errors;
}

interface HireMeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function HireMeModal({ open, onClose }: HireMeModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: ROLE_OPTIONS[0],
    budget: BUDGET_OPTIONS[4],
    details: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first field when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 120);
    } else {
      // Reset on close
      setStatus("idle");
      setServerError("");
      setFieldErrors({});
      setForm({
        name: "",
        email: "",
        company: "",
        role: ROLE_OPTIONS[0],
        budget: BUDGET_OPTIONS[4],
        details: "",
      });
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldError]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("loading");

    const message = `
🏢 Company / Org: ${form.company || "—"}
💼 Role / Type: ${form.role}
💰 Budget / Compensation: ${form.budget}

📝 Details:
${form.details.trim()}
    `.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message,
          subject: `Hire Me inquiry from ${form.name} — ${form.role}`,
          isHireInquiry: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("Network error — please try again.");
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-[#f4f4f5] placeholder-[#3f3f46] outline-none transition-all duration-200 focus:bg-white/[0.05] focus:border-purple-500/40";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            aria-label="Hire Me inquiry form"
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl glass border border-white/[0.08] shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(59,130,246,0.6), transparent)",
                }}
              />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl">
                      🎉
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#f4f4f5] mb-2">
                        Inquiry received!
                      </h3>
                      <p className="text-sm text-[#71717a] leading-relaxed">
                        Thanks for reaching out. I'll review your inquiry and
                        get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="mt-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white"
                      style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Header */}
                    <div className="flex items-start justify-between p-6 pb-5 border-b border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-purple-500/20">
                          PK
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#f4f4f5] leading-tight">
                            Work with Prishu
                          </h3>
                          <p className="text-xs text-[#52525b] mt-0.5">
                            Fill in the details — I'll respond fast
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-[#52525b] hover:text-[#a1a1aa] hover:bg-white/[0.05] transition-all duration-150"
                        aria-label="Close modal"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Form body */}
                    <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-4">

                      {/* Name + Email row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                            Your Name <span className="text-purple-400">*</span>
                          </label>
                          <input
                            ref={firstInputRef}
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            maxLength={100}
                            autoComplete="name"
                            className={`${inputBase} ${fieldErrors.name ? "border-red-500/50" : ""}`}
                          />
                          {fieldErrors.name && (
                            <p className="text-[11px] text-red-400 mt-1">{fieldErrors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                            Email <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            maxLength={254}
                            autoComplete="email"
                            className={`${inputBase} ${fieldErrors.email ? "border-red-500/50" : ""}`}
                          />
                          {fieldErrors.email && (
                            <p className="text-[11px] text-red-400 mt-1">{fieldErrors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                          Company / Organisation
                          <span className="text-[#3f3f46] normal-case tracking-normal ml-1">(optional)</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          maxLength={100}
                          className={inputBase}
                        />
                      </div>

                      {/* Role + Budget row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                            Role / Type
                          </label>
                          <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className={`${inputBase} cursor-pointer`}
                          >
                            {ROLE_OPTIONS.map((r) => (
                              <option key={r} value={r} className="bg-[#0a0a0a]">
                                {r}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                            Budget / Compensation
                          </label>
                          <select
                            name="budget"
                            value={form.budget}
                            onChange={handleChange}
                            className={`${inputBase} cursor-pointer`}
                          >
                            {BUDGET_OPTIONS.map((b) => (
                              <option key={b} value={b} className="bg-[#0a0a0a]">
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Details */}
                      <div>
                        <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                          Tell me about the opportunity <span className="text-purple-400">*</span>
                        </label>
                        <textarea
                          name="details"
                          value={form.details}
                          onChange={handleChange}
                          placeholder="Describe the project, tech stack, timeline, what you're looking for..."
                          rows={4}
                          maxLength={2000}
                          className={`${inputBase} resize-none ${fieldErrors.details ? "border-red-500/50" : ""}`}
                        />
                        <div className="flex justify-between mt-1">
                          {fieldErrors.details ? (
                            <p className="text-[11px] text-red-400">{fieldErrors.details}</p>
                          ) : <span />}
                          <span className="text-[10px] text-[#3f3f46] ml-auto">
                            {form.details.length}/2000
                          </span>
                        </div>
                      </div>

                      {/* Server error */}
                      {status === "error" && serverError && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-sm text-red-400"
                        >
                          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {serverError}
                        </motion.div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex-1 py-3 rounded-xl text-sm text-[#71717a] glass border border-white/[0.06] hover:text-[#f4f4f5] hover:border-white/[0.1] transition-all duration-200"
                        >
                          Cancel
                        </button>
                        <motion.button
                          type="submit"
                          disabled={status === "loading"}
                          whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                          whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                          className="flex-[2] py-3 rounded-xl text-sm font-medium text-white relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
                        >
                          <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative flex items-center justify-center gap-2">
                            {status === "loading" ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Inquiry
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </>
                            )}
                          </span>
                        </motion.button>
                      </div>

                      <p className="text-center text-[11px] text-[#3f3f46]">
                        You'll receive a confirmation · Usually replies within 24 hours
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
