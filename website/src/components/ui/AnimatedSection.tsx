"use client";

import { useInView } from "@/hooks/useAnimations";

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "fade-in" | "scale-in";
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);

  const animationClass = {
    "fade-up": "animate-fade-up",
    "fade-left": "animate-fade-left",
    "fade-right": "animate-fade-right",
    "fade-in": "animate-fade-in",
    "scale-in": "animate-scale-in",
  }[animation];

  return (
    <div
      ref={ref}
      className={`${className} ${
        isInView ? animationClass : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
