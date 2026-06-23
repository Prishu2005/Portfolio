"use client";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/[0.06] mb-6 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] animate-pulse-glow" />
      <span className="text-xs font-medium text-[#a1a1aa] tracking-widest uppercase">
        {text}
      </span>
    </div>
  );
}
