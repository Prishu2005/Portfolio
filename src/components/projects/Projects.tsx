"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SectionLabel from "../ui/SectionLabel";

const projects = [
  {
    title: "AI Resume Analyzer",
    description:
      "An intelligent resume analysis platform that leverages Groq's LLaMA 3 API to provide real-time, prompt-engineered feedback — scoring resumes against job descriptions and suggesting targeted improvements.",
    highlights: [
      "Groq API (LLaMA 3) integration with custom prompt engineering pipeline",
      "Node.js/Express backend with async AI feedback loop",
      "Structured JSON response parsing for actionable, section-level insights",
      "React frontend with real-time analysis progress and diff highlights",
    ],
    tags: [
      { label: "Groq API", color: "purple" as const },
      { label: "LLaMA 3", color: "purple" as const },
      { label: "Node.js", color: "blue" as const },
      { label: "React", color: "blue" as const },
      { label: "Prompt Engineering", color: "orange" as const },
    ],
    accent: "#8B5CF6",
    links: { github: "https://github.com/Prishu2005/ai-resume-analyzer" },
  },
  {
    title: "Real-Time Restaurant Ordering System",
    description:
      "A full-stack digital ordering platform with QR-code-based menus, live order tracking, and kitchen dashboard — eliminating paper menus and streamlining restaurant operations end-to-end.",
    highlights: [
      "Bidirectional WebSocket architecture via Socket.io for live order updates",
      "Dynamic QR-code generation mapped to table-specific digital menus",
      "Kitchen dashboard with real-time order queue and status management",
      "MongoDB Atlas for flexible menu CRUD and order persistence",
    ],
    tags: [
      { label: "Socket.io", color: "emerald" as const },
      { label: "WebSockets", color: "emerald" as const },
      { label: "MongoDB", color: "blue" as const },
      { label: "QR Code", color: "orange" as const },
      { label: "MERN", color: "purple" as const },
    ],
    accent: "#10B981",
    links: { github: "https://github.com/Prishu2005/restaurant-ordering-system" },
  },
  {
    title: "SafeTrail",
    description:
      "A secure location-sharing and trail safety platform with role-based access control — enabling hikers, guides, and administrators to manage trail data and emergency contacts with enterprise-grade security.",
    highlights: [
      "JWT authentication with refresh token rotation and secure httpOnly cookies",
      "Role-based access control (Hiker / Guide / Admin) with middleware guards",
      "RESTful API design following security-first principles (OWASP)",
      "Encrypted user data handling and rate-limited endpoints",
    ],
    tags: [
      { label: "JWT Auth", color: "blue" as const },
      { label: "RBAC", color: "blue" as const },
      { label: "REST API", color: "purple" as const },
      { label: "Security", color: "orange" as const },
      { label: "Node.js", color: "emerald" as const },
    ],
    accent: "#3B82F6",
    links: { github: "https://github.com/Prishu2005/safetrail-app" },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      {/* Section glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #8B5CF6, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionLabel text="Projects" />
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-gradient mb-4">
            Things I&apos;ve Built
          </h2>
          <p className="text-[#52525b] text-base max-w-lg">
            A selection of projects spanning AI-powered tools, real-time systems,
            and secure full-stack applications.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Prishu2005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View all repositories on GitHub
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
