import { ExternalLink } from "lucide-react";

type ProjectType = "bio" | "comp";

interface Project {
  title: string;
  description: string;
  tags: string[];
  status: string;
  type: ProjectType;
  link?: string;
}

export default function Projects() {
  const currentProjects: Project[] = [
    {
      title: "T-Cell AIM Analysis Pipeline",
      description:
        "Flow cytometry pipeline for quantifying antigen-specific T-cell activation via Activation-Induced Markers (AIM assay)",
      tags: ["Python", "Flow Cytometry", "Pipeline", "Bioinformatics"],
      status: "Active @ La Jolla Institute of Immunology",
      type: "bio",
    },
    {
      title: "Viral Protein Conservation Pipeline",
      description:
        "Protein sequence alignment pipeline to identify conserved vs. variable regions across viral isolates for vaccine design",
      tags: ["Python", "Sequence Alignment", "Bioinformatics", "Virology"],
      status: "Active @ La Jolla Institute",
      type: "bio",
    },
    {
      title: "MCAT Prep Web App",
      description:
        "Full-stack web application to help pre-med students study for the MCAT — practice questions, progress tracking, and review schedules",
      tags: ["React", "Node.js", "Pre-Med", "EdTech"],
      status: "In Development",
      type: "comp",
    },
  ];

  const pastProjects: Project[] = [
    {
      title: "Isotope Enrichment MassSpec App",
      description:
        "Web application for isotope enrichment analysis from mass spectrometry raw data files (Agilent, Waters instruments) — normalization and enrichment analysis per Merck proprietary assays",
      tags: ["Python", "Mass Spectrometry", "Drug Discovery", "Web App"],
      status: "Merck Pharmaceuticals / UC Berkeley · Spring 2025",
      type: "comp",
    },
    {
      title: "Oaxacan Drivers' Health Research",
      description:
        "Public health research on taxi drivers in Oaxaca City — sedentary work, access to processed food, and chronic illness outcomes",
      tags: ["Public Health", "Research", "Epidemiology", "Field Research"],
      status: "UC Davis · Spring 2022",
      type: "bio",
    },
    {
      title: "Vector Control Field Experience",
      description:
        "Field work in vector control and public health surveillance in Puerto Escondido, Oaxaca",
      tags: ["Field Research", "Epidemiology", "Public Health"],
      status: "Puerto Escondido, Mexico",
      type: "bio",
    },
  ];

  const ProjectCard = ({ project }: { project: Project }) => {
    const isBio = project.type === "bio";
    const hoverClass = isBio ? "border-glow-hover" : "border-glow-violet-hover";
    const accentClass = isBio ? "group-hover:text-cyan" : "group-hover:text-violet";

    const inner = (
      <>
        <div className="flex justify-between items-start mb-4">
          <div className="font-mono text-xs text-muted-foreground">{project.status}</div>
          {project.link && (
            <ExternalLink
              className={`w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity ${accentClass}`}
            />
          )}
        </div>

        <h3 className="text-xl font-display font-medium text-foreground mb-3">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-border text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </>
    );

    if (project.link) {
      return (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`card-project-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
          className={`group block bg-card border border-border rounded-xl p-6 md:p-8 hover:-translate-y-1 transition-transform ${hoverClass}`}
        >
          {inner}
        </a>
      );
    }

    return (
      <div
        data-testid={`card-project-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
        className={`group bg-card border border-border rounded-xl p-6 md:p-8 hover:-translate-y-1 transition-transform ${hoverClass}`}
      >
        {inner}
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 md:py-32 scroll-mt-16">
      <div className="section-label">03 / Projects</div>

      <div className="space-y-16">
        <div>
          <h3 className="font-mono text-sm text-foreground uppercase tracking-widest mb-8 flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
            Current Endeavors
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {currentProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-8 flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-border"></span>
            Past Work
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {pastProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
