"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Tag {
  label: string;
  color?: "purple" | "blue" | "emerald" | "orange";
}

interface ProjectCardProps {
  title: string;
  description: string;
  highlights: string[];
  tags: Tag[];
  accent?: string;
  index: number;
  links?: { github?: string; live?: string };
}

const tagColors: Record<string, string> = {
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function ProjectCard({
  title,
  description,
  highlights,
  tags,
  accent = "#8B5CF6",
  index,
  links,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -8;
    const tiltY = ((x - cx) / cx) * 8;
    setTilt({ x: tiltX, y: tiltY });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: index * 0.1,
      }}
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative rounded-2xl glass border border-white/[0.06] p-7 overflow-hidden cursor-default"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Radial glow that follows cursor */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, ${accent}0d, transparent 70%)`,
            }}
          />
        )}

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: `${accent}18`, border: `1px solid ${accent}28` }}
          >
            {index === 0 ? "🤖" : index === 1 ? "🍽️" : "🔐"}
          </div>
          <div className="flex items-center gap-2">
            {links?.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#52525b] hover:text-[#f4f4f5] glass transition-all duration-200"
                aria-label="GitHub repository"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {links?.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#52525b] hover:text-[#f4f4f5] glass transition-all duration-200"
                aria-label="Live demo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#f4f4f5] mb-2 tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#71717a] leading-relaxed mb-5">
          {description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-6">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#a1a1aa]">
              <svg
                className="w-3 h-3 mt-0.5 shrink-0"
                fill="none"
                stroke={accent}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide border ${
                tagColors[tag.color ?? "purple"]
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
