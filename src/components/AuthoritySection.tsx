import { useState, useRef } from "react";

export default function AuthoritySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPosition, setSplitPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPosition(Math.max(25, Math.min(75, x)));
  };

  const handleMouseLeave = () => setSplitPosition(50);

  return (
    <section className="py-32 bg-background" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="font-body text-sm tracking-[0.3em] uppercase text-accent font-medium">
            The Dual Advantage
          </span>
          <h2 className="font-heading text-5xl md:text-6xl uppercase mt-4 text-foreground">
            Two Disciplines.<br />One Vision.
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] overflow-hidden cursor-ew-resize"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Engineering side (Blue) */}
          <div
            className="absolute inset-0 bg-primary flex items-center justify-center transition-all duration-300 ease-out"
            style={{ clipPath: `inset(0 ${100 - splitPosition}% 0 0)` }}
          >
            <div className="text-center max-w-md px-8">
              <div className="text-7xl mb-6">⛑</div>
              <h3 className="font-heading text-4xl uppercase text-primary-foreground mb-4">
                Engineering
              </h3>
              <p className="font-body text-primary-foreground/80 leading-relaxed">
                B.E. qualified structural expertise ensuring every beam, column, 
                and foundation meets exacting standards. Precision that protects 
                your investment for generations.
              </p>
              <div className="mt-6 font-heading text-accent text-lg uppercase tracking-wider">
                Er.T.Balraj — B.E.
              </div>
            </div>
          </div>

          {/* Law side (Orange tinted) */}
          <div
            className="absolute inset-0 bg-accent flex items-center justify-center transition-all duration-300 ease-out"
            style={{ clipPath: `inset(0 0 0 ${splitPosition}%)` }}
          >
            <div className="text-center max-w-md px-8">
              <div className="text-7xl mb-6">⚖</div>
              <h3 className="font-heading text-4xl uppercase text-accent-foreground mb-4">
                Law
              </h3>
              <p className="font-body text-accent-foreground/80 leading-relaxed">
                L.L.B. legal expertise navigating construction law, land 
                acquisition, and regulatory compliance. Your project stays 
                protected from groundbreaking to handover.
              </p>
              <div className="mt-6 font-heading text-primary text-lg uppercase tracking-wider">
                Er.T.Balraj — LLB
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-background/50 z-10 transition-all duration-300 ease-out"
            style={{ left: `${splitPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border-2 border-foreground/20 flex items-center justify-center">
              <span className="text-foreground text-xs">↔</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
