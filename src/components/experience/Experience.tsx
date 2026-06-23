"use client";

import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";

const experiences = [
  {
    type: "work",
    title: "Virtual Technology Intern",
    org: "Deloitte Australia",
    via: "Forage",
    period: "2024",
    color: "#8B5CF6",
    icon: "🏢",
    description:
      "Completed a virtual simulation of Deloitte's technology consulting workflow, focusing on data-driven decision making and structured problem-solving frameworks used in real enterprise engagements.",
    highlights: [
      "Data visualization and insight extraction from structured datasets",
      "Applied structured problem-solving methodologies to technical case studies",
      "Produced professional-grade deliverables aligned with consulting standards",
    ],
  },
  {
    type: "community",
    title: "Student Contributor",
    org: "Google Developer Group",
    via: "GDG Ranchi",
    period: "2025",
    color: "#3B82F6",
    icon: "🌐",
    description:
      "Active contributor and participant in GDG Ranchi's open community events, hackathons, and collaborative projects — building with and for the local developer ecosystem.",
    highlights: [
      "Contributed to open community projects and collaborative codebases",
      "Participated in hackathons, ideating and building under time constraints",
      "Engaged with speaker sessions on Google Cloud, AI, and mobile development",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Computer Applications",
    org: "Usha Martin University",
    via: "Ranchi, Jharkhand",
    period: "2023 – 2026",
    color: "#10B981",
    icon: "🎓",
    description:
      "Successfully completed a Bachelor of Computer Applications with a strong foundation in software development, data structures, database management systems, computer networks, and software engineering. Developed multiple full-stack applications and explored AI/ML integration in modern web applications.",
    highlights: [
      "Academic Score: 8.47 CGPA",
      "Core subjects: DSA, DBMS, OS, Computer Networks, Software Engineering",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[500px] rounded-full blur-[160px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #3B82F6, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionLabel text="Experience & Education" />
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-gradient mb-4">
            The Journey So Far
          </h2>
          <p className="text-[#52525b] text-base max-w-lg">
            A timeline of professional experiences, community involvement, and
            academic milestones.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-blue-500/20 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                className="relative flex gap-8 sm:pl-16"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-0 top-5 w-10 h-10 rounded-xl flex items-center justify-center text-lg border border-white/[0.06] glass hidden sm:flex"
                  style={{
                    boxShadow: `0 0 20px ${exp.color}25`,
                    borderColor: exp.color + "30",
                  }}
                >
                  {exp.icon}
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl glass border border-white/[0.06] p-7 hover:border-white/[0.1] transition-all duration-300 group relative overflow-hidden">
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-50"
                    style={{
                      background: `linear-gradient(90deg, ${exp.color}80, transparent 60%)`,
                    }}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="sm:hidden text-lg">{exp.icon}</span>
                        <span
                          className="text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{
                            color: exp.color,
                            background: exp.color + "15",
                            border: `1px solid ${exp.color}25`,
                          }}
                        >
                          {exp.type === "work"
                            ? "Experience"
                            : exp.type === "community"
                            ? "Community"
                            : "Education"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#f4f4f5] tracking-tight">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-[#a1a1aa] mt-0.5">
                        {exp.org}{" "}
                        <span className="text-[#52525b]">· {exp.via}</span>
                      </p>
                    </div>
                    <span className="text-xs text-[#52525b] glass px-3 py-1.5 rounded-full border border-white/[0.04] shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-[#71717a] leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex items-start gap-2 text-xs text-[#a1a1aa]"
                      >
                        <svg
                          className="w-3 h-3 mt-0.5 shrink-0"
                          fill="none"
                          stroke={exp.color}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
