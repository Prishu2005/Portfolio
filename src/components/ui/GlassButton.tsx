"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export default function GlassButton({
  children,
  variant = "secondary",
  href,
  onClick,
  className = "",
  icon,
}: GlassButtonProps) {
  const baseClasses = `
    relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl
    text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer
    select-none overflow-hidden
  `;

  const variantClasses =
    variant === "primary"
      ? `
        bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]
        text-white shadow-lg shadow-purple-500/20
        hover:shadow-purple-500/40 hover:scale-[1.02]
        before:absolute before:inset-0 before:bg-white/10 before:opacity-0 
        hover:before:opacity-100 before:transition-opacity before:duration-300
      `
      : `
        glass text-[#f4f4f5] border border-white/[0.06]
        hover:border-purple-500/30 hover:bg-white/[0.06]
        hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02]
      `;

  const content = (
    <>
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${variantClasses} ${className}`}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
