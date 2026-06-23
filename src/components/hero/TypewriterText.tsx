"use client";

import { useEffect, useState, useRef } from "react";

const STRINGS = [
  "AI-Focused Full-Stack Developer",
  "MERN Stack Engineer",
  "Generative AI Integrator",
  "LLM Integration Specialist",
];

const TYPING_SPEED = 65;
const DELETE_SPEED = 35;
const PAUSE_DURATION = 2200;

export default function TypewriterText() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentString = STRINGS[currentIndex];

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, PAUSE_DURATION);
      return;
    }

    if (!isDeleting && displayText === currentString) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % STRINGS.length);
      return;
    }

    const speed = isDeleting ? DELETE_SPEED : TYPING_SPEED;

    timeoutRef.current = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentString.slice(0, prev.length + 1)
      );
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, currentIndex, isPaused]);

  return (
    <div className="flex items-center gap-0 font-mono text-sm sm:text-base text-[#8B5CF6]">
      <span className="text-[#52525b] mr-2 select-none">$</span>
      <span className="text-[#a1a1aa]">{displayText}</span>
      <span className="inline-block w-[2px] h-4 bg-[#8B5CF6] ml-0.5 animate-[blink_1s_step-end_infinite]" />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
