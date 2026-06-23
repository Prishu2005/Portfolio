"use client";

import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";

const techGroups = [
  {
    category: "Core Languages",
    color: "#8B5CF6",
    items: [
      { name: "JavaScript ES6+", icon: "⚡" },
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: "C", icon: "⚙️" },
    ],
  },
  {
    category: "Frontend",
    color: "#3B82F6",
    items: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "HTML5 / CSS3", icon: "🎨" },
      { name: "SCSS", icon: "💅" },
      { name: "Tailwind CSS", icon: "🌊" },
    ],
  },
  {
    category: "Backend & Data",
    color: "#10B981",
    items: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🗃️" },
      { name: "REST APIs", icon: "🔌" },
    ],
  },
  {
    category: "AI / ML",
    color: "#F59E0B",
    items: [
      { name: "LLM Integration", icon: "🤖" },
      { name: "Prompt Engineering", icon: "✍️" },
      { name: "Groq API", icon: "⚡" },
      { name: "LLaMA 3", icon: "🦙" },
      { name: "Scikit-learn", icon: "📊" },
    ],
  },
  {
    category: "Tools & DevOps",
    color: "#EC4899",
    items: [
      { name: "Git / GitHub", icon: "🐙" },
      { name: "Socket.io", icon: "🔄" },
      { name: "JWT Auth", icon: "🔐" },
      { name: "VS Code", icon: "💻" },
    ],
  },
];

// Flatten all tech into a marquee row for visual effect
const allTech = techGroups.flatMap((g) =>
  g.items.map((item) => ({ ...item, color: g.color }))
);

function TechBadge({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/[0.06] text-sm text-[#a1a1aa] whitespace-nowrap hover:text-[#f4f4f5] hover:border-white/[0.12] transition-all duration-200 cursor-default group"
      style={{
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.borderColor = color + "44";
        (e.currentTarget as HTMLSpanElement).style.boxShadow = `0 0 20px ${color}12`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLSpanElement).style.boxShadow = "none";
      }}
    >
      <span className="text-base leading-none">{icon}</span>
      {name}
    </span>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(59,130,246,0.4), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <SectionLabel text="Technical Stack" />
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-gradient mb-4">
            Tools of the Trade
          </h2>
          <p className="text-[#52525b] text-base max-w-md mx-auto">
            From language model pipelines to real-time backends — here&apos;s
            what I work with.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="rounded-2xl glass border border-white/[0.06] p-6 hover:border-white/[0.1] transition-all duration-300"
              style={{
                borderTopColor: group.color + "28",
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: group.color }}
                />
                <span
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{ color: group.color + "cc" }}
                >
                  {group.category}
                </span>
              </div>

              {/* Tech items */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a1a1aa] border border-white/[0.05] bg-white/[0.02] hover:text-[#f4f4f5] transition-colors duration-200"
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative w-full overflow-hidden py-4">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #050505 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, #050505 0%, transparent 100%)",
          }}
        />
        <div className="flex animate-marquee gap-4 w-max">
          {[...allTech, ...allTech].map((tech, i) => (
            <TechBadge key={i} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
