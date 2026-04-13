import { useRef, useState } from "react";

const projects = [
  { title: "Lakeside Residences", type: "Residential", year: "2024", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75&fm=webp" },
  { title: "Metro Commerce Hub", type: "Commercial", year: "2023", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=75&fm=webp" },
  { title: "Heritage Court", type: "Institutional", year: "2023", image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&q=75&fm=webp" },
  { title: "Green Valley Villas", type: "Residential", year: "2022", image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=800&q=75&fm=webp" },
  { title: "Skyline Tower", type: "Commercial", year: "2022", image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&q=75&fm=webp" },
  { title: "Coastal Complex", type: "Mixed Use", year: "2021", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&q=75&fm=webp" },
];


function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[350px] md:w-[450px] h-[500px] relative overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={project.image}
        alt={project.title}
        width={800}
        height={500}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-all duration-700 ${
          isHovered ? "grayscale-0 scale-105" : "grayscale"
        }`}
      />

      
      {/* Overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isHovered ? "bg-primary/20" : "bg-foreground/10"
      }`} />
      
      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className={`transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground font-body text-xs uppercase tracking-wider mb-3">
            {project.type}
          </span>
        </div>
        <h3 className="font-heading text-3xl uppercase text-primary-foreground drop-shadow-lg">
          {project.title}
        </h3>
        <span className="font-body text-sm text-primary-foreground/70 drop-shadow">{project.year}</span>
        
        {/* Explore button */}
        <div className={`mt-4 transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <button className="px-6 py-2 bg-accent text-accent-foreground font-heading uppercase text-sm tracking-wider transition-colors hover:bg-accent/90">
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-foreground" id="projects">
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <span className="font-body text-sm tracking-[0.3em] uppercase text-accent font-medium">
          Portfolio
        </span>
        <div className="flex items-end justify-between mt-4">
          <h2 className="font-heading text-5xl md:text-6xl uppercase text-background">
            150+ Projects
          </h2>
          <span className="hidden md:block font-body text-background/50 text-sm">
            Drag to explore →
          </span>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 lg:px-12 pb-8 scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
