export default function Footer() {
  return (
    <footer className="py-16 bg-foreground border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <span className="font-heading text-3xl uppercase tracking-[0.15em] text-background">
              Rathna<span className="text-accent">.</span>
            </span>
            <p className="mt-4 font-body text-background/50 text-sm max-w-xs">
              Rathna Builders — Engineering trust through precision construction and legal expertise.
            </p>
            <p className="mt-2 font-body text-background/40 text-xs">
              3rd Cross Rd, Sengunthapuram, Jayankondam, Tamil Nadu 621802
            </p>
          </div>
          
          <div className="flex gap-16">
            <div>
              <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-accent mb-4">Navigate</h4>
              <div className="space-y-2">
                {["Services", "Projects", "About", "Contact"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block font-body text-sm text-background/60 hover:text-accent transition-colors">
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-accent mb-4">Contact</h4>
              <div className="space-y-2">
                <a href="tel:+919524482646" className="block font-body text-sm text-background/60 hover:text-accent transition-colors">
                  +91 95244 82646
                </a>
                <a href="mailto:tami.balaji@gmail.com" className="block font-body text-sm text-background/60 hover:text-accent transition-colors">
                  tami.balaji@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-background/40">
            © 2024 Rathna Builders. All rights reserved.
          </p>
          <p className="font-body text-xs text-background/40">
            Er.T.Balraj.BE.,LLB
          </p>
        </div>
      </div>
    </footer>
  );
}
