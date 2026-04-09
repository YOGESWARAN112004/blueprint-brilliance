import { Suspense } from "react";
import ParticleBuilding from "./ParticleBuilding";
import KineticHeadline from "./KineticHeadline";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <Suspense fallback={null}>
        <ParticleBuilding />
      </Suspense>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-block font-body text-sm tracking-[0.3em] uppercase text-accent font-medium opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Er. T. Balraj — B.E. & L.L.B. | Rathna Builders
            </span>
          </div>
          
          <KineticHeadline
            text="We Don't Just Build. We Engineer Trust."
            className="text-5xl md:text-7xl lg:text-8xl text-foreground"
            delay={800}
          />
          
          <p className="mt-8 max-w-xl text-lg text-muted-foreground font-body font-light leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "2s" }}>
            150+ projects delivered with precision engineering and legal expertise. 
            Where structural integrity meets legal certainty.
          </p>
          
          <div className="mt-12 flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "2.4s" }}>
            <a
              href="#contact"
              className="group inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-heading uppercase tracking-wider text-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Start Your Blueprint
              <svg className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-8 py-4 border border-foreground/20 text-foreground font-heading uppercase tracking-wider text-sm transition-all duration-300 hover:border-accent hover:text-accent"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0 animate-fade-up" style={{ animationDelay: "3s" }}>
        <span className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
