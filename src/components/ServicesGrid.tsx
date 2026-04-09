import { useRef, useState } from "react";

const services = [
  {
    title: "Structural Engineering",
    description: "Load-bearing designs with seismic resilience and mathematical precision.",
    icon: "⬡",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Vasthu Consultation",
    description: "Ancient spatial wisdom integrated with modern structural requirements.",
    icon: "◎",
    span: "md:col-span-1",
  },
  {
    title: "Legal Consultation",
    description: "Construction law, land disputes, and regulatory compliance with L.L.B. expertise.",
    icon: "§",
    span: "md:col-span-1",
  },
  {
    title: "Architectural Planning",
    description: "From concept to blueprint—spaces that inspire and endure.",
    icon: "△",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Project Management",
    description: "On-time, on-budget delivery with transparent milestone tracking.",
    icon: "◇",
    span: "md:col-span-1",
  },
  {
    title: "Quality Assurance",
    description: "Multi-stage inspection protocols ensuring structural perfection.",
    icon: "✧",
    span: "md:col-span-1",
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`${service.span} relative overflow-hidden cursor-pointer transition-all duration-500 ${
        isHovered ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
      } border border-border hover:border-accent p-8 flex flex-col justify-between min-h-[200px]`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out, background-color 0.4s, color 0.4s, border-color 0.4s",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`text-4xl mb-4 block transition-colors duration-400 ${
          isHovered ? "text-accent" : "text-primary"
        }`}
      >
        {service.icon}
      </span>
      <div>
        <h3 className="font-heading text-2xl uppercase tracking-wide mb-2">
          {service.title}
        </h3>
        <p className={`font-body text-sm leading-relaxed transition-colors duration-400 ${
          isHovered ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}>
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <section className="py-32 bg-background" id="services">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="font-body text-sm tracking-[0.3em] uppercase text-accent font-medium">
            What We Do
          </span>
          <h2 className="font-heading text-5xl md:text-6xl uppercase mt-4 text-foreground">
            Services
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
