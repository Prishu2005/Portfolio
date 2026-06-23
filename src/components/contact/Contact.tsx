"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";

const contactLinks = [
  {
    label: "Email",
    value: "kumarprishu8@gmail.com",
    href: "mailto:kumarprishu8@gmail.com",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/prishu-kumar-3550b7305",
    href: "https://www.linkedin.com/in/prishu-kumar-3550b7305",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Prishu2005",
    href: "https://github.com/Prishu2005",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message is too short (min 10 characters)";
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<FormState>("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as user types
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setServerError("Network error — please try again.");
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-[#f4f4f5] placeholder-[#3f3f46] outline-none transition-all duration-200 focus:bg-white/[0.05] resize-none";

  return (
    <section id="contact" className="relative py-28 px-6">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #8B5CF6, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel text="Contact" />
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-gradient mb-5">
            Let&apos;s Build Something
          </h2>
          <p className="text-[#52525b] text-base max-w-md mx-auto leading-relaxed">
            Open to full-time roles, freelance projects, and interesting
            collaborations. Drop me a message — I respond fast.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl glass border border-white/[0.06] p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(59,130,246,0.5), transparent)",
            }}
          />

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* ── Left: contact links ── */}
            <div>
              <h3 className="text-xl font-light text-[#f4f4f5] mb-2 tracking-tight">
                Available for opportunities
              </h3>
              <p className="text-sm text-[#71717a] leading-relaxed mb-8">
                Whether it&apos;s a startup building AI-powered products, an
                enterprise modernizing their stack, or a team looking for a
                full-stack developer who thinks in systems — I&apos;d love to
                connect.
              </p>

              <div className="space-y-3">
                {contactLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl glass border border-white/[0.04] hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-200 group"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <span className="p-2 rounded-lg text-[#8B5CF6] bg-purple-500/10">
                      {link.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs text-[#52525b] uppercase tracking-wider mb-0.5">
                        {link.label}
                      </div>
                      <div className="text-sm text-[#a1a1aa] group-hover:text-[#f4f4f5] transition-colors duration-200 truncate">
                        {link.value}
                      </div>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 ml-auto shrink-0 text-[#3f3f46] group-hover:text-[#8B5CF6] transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ── Right: contact form ── */}
            <div>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center h-full min-h-[300px] gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-[#f4f4f5] mb-1">
                        Message sent!
                      </h4>
                      <p className="text-sm text-[#71717a]">
                        I&apos;ll get back to you within 24 hours. Check your inbox for a confirmation.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-xs text-[#52525b] hover:text-[#a1a1aa] underline underline-offset-4 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        maxLength={100}
                        autoComplete="name"
                        className={`${inputBase} ${
                          fieldErrors.name
                            ? "border-red-500/50 focus:border-red-500/80"
                            : "border-white/[0.06] focus:border-purple-500/40"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        maxLength={254}
                        autoComplete="email"
                        className={`${inputBase} ${
                          fieldErrors.email
                            ? "border-red-500/50 focus:border-red-500/80"
                            : "border-white/[0.06] focus:border-purple-500/40"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-[#71717a] mb-1.5 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        maxLength={2000}
                        className={`${inputBase} ${
                          fieldErrors.message
                            ? "border-red-500/50 focus:border-red-500/80"
                            : "border-white/[0.06] focus:border-purple-500/40"
                        }`}
                      />
                      <div className="flex justify-between items-start mt-1.5">
                        {fieldErrors.message ? (
                          <p className="text-xs text-red-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="text-[10px] text-[#3f3f46] shrink-0 ml-auto">
                          {form.message.length}/2000
                        </span>
                      </div>
                    </div>

                    {/* Server error */}
                    {status === "error" && serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-sm text-red-400"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {serverError}
                      </motion.div>
                    )}

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                      whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                      className="relative w-full py-3.5 rounded-xl text-sm font-medium text-white overflow-hidden transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                      }}
                    >
                      {/* Shimmer on hover */}
                      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                      <span className="relative flex items-center justify-center gap-2">
                        {status === "loading" ? (
                          <>
                            <svg
                              className="w-4 h-4 animate-spin"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                              />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </>
                        )}
                      </span>
                    </motion.button>

                    <p className="text-center text-xs text-[#3f3f46]">
                      Usually replies within 24 hours · You&apos;ll get a confirmation email
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
