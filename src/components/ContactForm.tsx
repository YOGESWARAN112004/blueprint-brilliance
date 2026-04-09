import { useState } from "react";

export default function ContactForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section className="py-32 bg-background" id="contact">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="font-body text-sm tracking-[0.3em] uppercase text-accent font-medium">
              Get Started
            </span>
            <h2 className="font-heading text-5xl md:text-6xl uppercase mt-4 text-foreground">
              Start Your<br />Blueprint
            </h2>
            <p className="mt-6 font-body text-muted-foreground leading-relaxed max-w-md">
              Every great structure begins with a conversation. Tell us about your 
              vision and we'll engineer the path to reality.
            </p>
            
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-lg">📍</span>
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Location</p>
                  <p className="font-body text-foreground">Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-lg">✉</span>
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Email</p>
                  <p className="font-body text-foreground">contact@rathnabuilders.com</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {[
              { name: "name", label: "Your Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "phone", label: "Phone Number", type: "tel" },
              { name: "project", label: "Project Type", type: "text" },
            ].map((field) => (
              <div key={field.name} className="line-illuminate">
                <label className={`block font-body text-xs uppercase tracking-[0.2em] mb-2 transition-colors duration-300 ${
                  focusedField === field.name ? "text-accent" : "text-muted-foreground"
                }`}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="w-full bg-transparent border-0 border-b-2 border-border px-0 py-3 font-body text-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            ))}

            <div className="line-illuminate">
              <label className={`block font-body text-xs uppercase tracking-[0.2em] mb-2 transition-colors duration-300 ${
                focusedField === "message" ? "text-accent" : "text-muted-foreground"
              }`}>
                Tell Us About Your Vision
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-0 border-b-2 border-border px-0 py-3 font-body text-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                placeholder="Describe your project..."
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-primary text-primary-foreground font-heading text-lg uppercase tracking-[0.2em] transition-all duration-400 hover:bg-accent hover:text-accent-foreground"
            >
              Start Your Blueprint
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
