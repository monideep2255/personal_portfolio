import { ProjectCard } from "@/components/ProjectCard";

const projects = [
  {
    title: "Project 1",
    description: "A full-stack web application built with React and Node.js",
    technologies: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/username/project1",
    liveUrl: "https://project1.com",
  },
  {
    title: "Project 2",
    description: "An e-commerce platform with payment integration",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    githubUrl: "https://github.com/username/project2",
    liveUrl: "https://project2.com",
  },
  // Add more projects as needed
];

export default function Projects() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Here are some of the projects I've worked on. Each project represents unique
          challenges and learning experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
