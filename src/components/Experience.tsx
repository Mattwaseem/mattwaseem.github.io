export default function Experience() {
  const experiences = [
    {
      company: "La Jolla Institute of Immunology",
      role: "Associate Bioinformatic Specialist",
      date: "Sep 2024 – present",
      bullets: [
        "Designed 25-color spectral flow cytometry panel used across multiple NIH-funded projects",
        "Sorted antigen-specific AIM+ T-cells, performed 10x sequencing and analysis for immune profiling",
        "Improved data analysis time by developing an automation pipeline for colleagues",
        "Developed a protein conservation pipeline to identify specific variation across viral strain isolates"
      ]
    },
    {
      company: "Pfizer",
      role: "R&D, ML Intern",
      date: "June 2024 – Sep 2024, San Diego CA",
      bullets: [
        "High-throughput confocal microscopy assay with PC3 cell line, identified 2000+ potential compounds from 300k library for prostate cancer treatment",
        "Cell culturing with aseptic techniques, maintained cell lines and culture media",
        "Trained machine learning image recognition model to identify protein aggregation in microscopic 3D cell images"
      ]
    },
    {
      company: "Amazon",
      role: "Work and Health Safety Provider (Level 4)",
      date: "Aug 2022 – Jan 2023, Tracy CA",
      bullets: [
        "First aid and emergency care, OSHA compliance for warehouse associates"
      ]
    },
    {
      company: "Kaya17",
      role: "R&D Intern",
      date: "May 2021 – Aug 2021, Livermore CA",
      bullets: [
        "Optimized and validated 15-minute rapid Covid-19 saliva & antigen test",
        "Supported large-scale active Covid testing using developed assay"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-16">
      <div className="section-label">02 / Experience</div>
      
      <div className="relative border-l border-cyan/20 ml-2 md:ml-4 space-y-12">
        {experiences.map((exp, i) => (
          <div key={i} className="relative pl-8 md:pl-12">
            <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-cyan shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
              <h3 className="text-xl md:text-2xl font-display font-medium text-foreground">{exp.company}</h3>
              <div className="text-cyan text-sm md:text-base italic">{exp.role}</div>
            </div>
            
            <div className="font-mono text-xs text-muted-foreground mb-6">{exp.date}</div>
            
            <ul className="space-y-3">
              {exp.bullets.map((bullet, j) => (
                <li key={j} className="text-muted-foreground text-sm md:text-base leading-relaxed flex gap-3">
                  <span className="text-border mt-1">▹</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
