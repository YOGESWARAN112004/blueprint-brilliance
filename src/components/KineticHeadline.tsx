import { useEffect, useState } from "react";

interface KineticHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function KineticHeadline({ text, className = "", delay = 500 }: KineticHeadlineProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= words.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 120);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [words.length, delay]);

  return (
    <h1 className={`font-heading uppercase tracking-tight leading-[0.95] ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block mr-[0.3em] transition-all duration-500 ${
            i < visibleCount
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-12"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: `${i * 60}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}
