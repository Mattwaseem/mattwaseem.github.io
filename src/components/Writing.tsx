import { ArrowRight } from "lucide-react";

export default function Writing() {
  return (
    <section id="writing" className="py-24 md:py-32 scroll-mt-16 mb-24">
      <div className="section-label">04 / Writing</div>
      
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden group">
        {/* Subtle background glow */}
        <div className="absolute -inset-24 bg-amber/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-display font-medium text-foreground mb-6">
            Lab Notes & Field Reports
          </h3>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            I write about the intersection of computation and biology — covering bioinformatics, the pre-med journey, and building software for scientific research.
          </p>
          
          <a 
            href="#" 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-background border border-border text-foreground hover:text-amber hover:border-amber transition-all group/btn shadow-sm"
          >
            <span className="font-medium">Read on Substack</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
