export default function About() {
  const education = [
    {
      school: "UC Berkeley",
      degree: "Master of Software Engineering and Molecular Science",
      date: "May 2025"
    },
    {
      school: "UC Davis",
      degree: "BS Biochemistry & Molecular Biology, Minor IT & Business Management",
      date: "June 2022"
    },
    {
      school: "Las Positas College",
      degree: "AS Mathematics and Biology",
      date: "June 2020"
    }
  ];

  const skills = {
    languages: ["Python", "C++", "SQL"],
    libraries: ["Scikit-learn", "TensorFlow", "PyTorch", "Seaborn", "Pandas", "Keras"],
    lab: ["Flow cytometry (25-color spectral panels)", "Cell culturing", "AIM assay", "10x sequencing", "Confocal microscopy", "Aseptic technique"]
  };

  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-16">
      <div className="section-label">01 / Education & Skills</div>
      
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-display font-medium mb-8 text-foreground">Education</h3>
          <div className="space-y-8">
            {education.map((item, i) => (
              <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-violet before:rounded-full">
                <h4 className="text-lg font-medium text-foreground">{item.school}</h4>
                <p className="text-muted-foreground mt-1 leading-relaxed">{item.degree}</p>
                <div className="font-mono text-xs text-muted-foreground mt-2">{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-display font-medium mb-8 text-foreground">Technical Arsenal</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Languages & Libraries</h4>
              <div className="flex flex-wrap gap-2">
                {[...skills.languages, ...skills.libraries].map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full border border-border bg-card/50 text-sm text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Lab Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.lab.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full border border-border/50 bg-background text-sm text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
