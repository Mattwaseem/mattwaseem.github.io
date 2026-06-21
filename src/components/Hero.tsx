import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
        // Cyan (#2DD4BF) or Violet (#8B7FFF)
        this.color = Math.random() > 0.5 ? "rgba(45, 212, 191, 0.25)" : "rgba(139, 127, 255, 0.25)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => p.update());
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => p.draw());
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-16">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" 
      />
      
      <div className="relative z-10 max-w-3xl">
        <div className="inline-block font-mono text-xs md:text-sm text-muted-foreground bg-card/50 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full mb-8">
          <span className="text-cyan animate-pulse">●</span> // currently: Associate Bioinformatic Specialist @ La Jolla Institute of Immunology
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6">
          Matt Waseem
        </h1>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
          Computational chemistry <span className="text-cyan">×</span> immunology <span className="text-violet">·</span> software engineering
        </h2>
        
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-12">
          My journey into science started in the back of an ambulance and ultimately led me to the intersection of molecular biology and software engineering. I find myself driven by the gap between frontline patient care and the computational research that makes new treatments possible. Currently, as an Associate Bioinformatics Specialist at the La Jolla Institute for Immunology, I develop analysis pipelines and tools to advance NIH-funded research. I approach complex biological data not just as code, but as the foundational stepping stone to future clinical breakthroughs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => scrollTo('projects')}
            className="h-12 px-6 rounded-xl bg-cyan text-background font-medium hover:bg-cyan/90 transition-colors shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
          >
            View Projects
          </button>
          <button 
            onClick={() => scrollTo('writing')}
            className="h-12 px-6 rounded-xl bg-transparent text-foreground border border-border hover:border-amber hover:text-amber transition-all"
          >
            Read My Writing
          </button>
        </div>
      </div>
    </section>
  );
}
