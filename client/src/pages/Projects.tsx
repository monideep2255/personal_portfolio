import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Search } from "lucide-react";
import type { Project } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useCallback } from "react";
import { ProjectPattern } from "@/components/ProjectPattern";
import LoadingFallback from "@/components/LoadingFallback";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showFeatured, setShowFeatured] = useState(false);

  // Memoize filter function
  const filteredProjects = useMemo(() => {
    return projects?.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFeatured = showFeatured ? project.featured : true;

      return matchesSearch && matchesFeatured;
    });
  }, [projects, searchQuery, showFeatured]);

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const toggleFeatured = useCallback(() => {
    setShowFeatured(prev => !prev);
  }, []);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!projects?.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          <p className="text-muted-foreground">Projects will be added soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" aria-label="Projects showcase">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8" role="search" aria-label="Project search">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
              aria-label="Search projects"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </div>
          <Button
            variant={showFeatured ? "default" : "outline"}
            onClick={toggleFeatured}
            className="md:w-auto w-full"
            aria-pressed={showFeatured}
            aria-label={showFeatured ? "Show all projects" : "Show featured projects only"}
          >
            {showFeatured ? "Show All" : "Featured Only"}
          </Button>
        </div>

        {filteredProjects?.length === 0 ? (
          <p className="text-muted-foreground" role="status">No projects match your search criteria.</p>
        ) : (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            role="list"
            aria-label="Projects grid"
          >
            {filteredProjects?.map((project) => (
              <motion.div
                key={project.id}
                className="bg-card rounded-lg p-6 border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                role="listitem"
                tabIndex={0}
              >
                <div className="mb-6 rounded-lg overflow-hidden">
                  <ProjectPattern
                    seed={project.id}
                    title={project.title}
                    className="w-full max-w-[120px] mx-auto"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      aria-label={`Visit live demo of ${project.title}`}
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}