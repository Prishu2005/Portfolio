"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import TypewriterText from "./TypewriterText";
import GlassButton from "../ui/GlassButton";

// Lazy-load the 3D canvas — no SSR
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/10 animate-pulse" />
    </div>
  ),
});

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background gradient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          {/* Left — Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col order-2 lg:order-1"
          >
            {/* Status badge */}
            <motion.div variants={item} className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-[#a1a1aa] tracking-widest uppercase">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-4 leading-[1.05]"
            >
              <span className="text-gradient">Prishu</span>
              <br />
              <span className="text-gradient">Kumar.</span>
            </motion.h1>

            {/* Typewriter terminal */}
            <motion.div
              variants={item}
              className="mb-6 px-4 py-3 rounded-xl glass border border-white/[0.06] font-mono w-fit"
            >
              <TypewriterText />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-[#71717a] text-base leading-relaxed max-w-md mb-10"
            >
              I build intelligent web applications at the intersection of modern
              full-stack engineering and Generative AI — turning complex problems
              into clean, scalable solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <GlassButton variant="primary" href="#projects">
                View Projects
              </GlassButton>
              <GlassButton variant="secondary" href="#contact">
                Contact Me
              </GlassButton>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={item}
              className="mt-12 pt-8 border-t border-white/[0.04] grid grid-cols-3 gap-6"
            >
              {[
                { val: "3+", label: "Projects Shipped" },
                { val: "8.47", label: "CGPA" },
                { val: "AI/ML", label: "Primary Focus" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-gradient-accent mb-1">
                    {stat.val}
                  </div>
                  <div className="text-xs text-[#52525b] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.3 }}
            className="w-full h-[400px] lg:h-[560px] order-1 lg:order-2 relative"
          >
            {/* Glow ring behind the 3D shape */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-purple-500/10 animate-pulse-glow" />
              <div className="absolute w-80 h-80 rounded-full border border-purple-500/[0.05]" />
            </div>
            <HeroScene />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[#3f3f46] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#52525b] to-transparent" />
      </motion.div>
    </section>
  );
}
