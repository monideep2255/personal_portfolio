import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Github, ExternalLink, Globe, Bot, Search, Network, MessageSquare, Wallet, Brain, Workflow, Database, Code,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project } from "@shared/schema";
import { useMemo, useState } from "react";
import LoadingFallback from "@/components/LoadingFallback";

// Pick a card icon from the project title first, then from its first category.
const TITLE_ICONS: [RegExp, LucideIcon][] = [
  [/portfolio/i, Globe],
  [/chief of staff/i, Bot],
  [/knowledge graph/i, Network],
  [/search/i, Search],
  [/prompt/i, MessageSquare],
  [/finbuddy|fin buddy/i, Wallet],
];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "AI/ML": Brain,
  "Automation": Workflow,
  "Data Engineering": Database,
  "FinTech": Wallet,
  "Web Development": Globe,
};

function projectIcon(project: Project): LucideIcon {
  const match = TITLE_ICONS.find(([pattern]) => pattern.test(project.title));
  if (match) return match[1];
  return CATEGORY_ICONS[project.categories?.[0] ?? ""] ?? Code;
}

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const [category, setCategory] = useState("All");

  // Drafts stay in the database for the admin panel but never show publicly.
  const published = useMemo(
    () => projects?.filter((project) => project.status !== "draft") ?? [],
    [projects],
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(published.flatMap((project) => project.categories ?? [])))],
    [published],
  );

  const visible = category === "All"
    ? published
    : published.filter((project) => project.categories?.includes(category));

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!published.length) {
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
        <h1 className="text-4xl font-bold mb-6">Projects</h1>

        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by category">
          {categories.map((name) => (
            <Button
              key={name}
              size="sm"
              variant={name === category ? "default" : "outline"}
              className="rounded-full"
              aria-pressed={name === category}
              onClick={() => setCategory(name)}
            >
              {name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Projects grid">
          {visible.map((project, index) => {
            const Icon = projectIcon(project);
            return (
              <motion.article
                key={project.id}
                role="listitem"
                className="bg-card rounded-lg border p-6 flex flex-col hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-semibold leading-tight">{project.title}</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

                {project.tags?.length ? (
                  <ul className="flex flex-wrap gap-1.5 mb-5" aria-label="Tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <li key={tag} className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-auto flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title} on GitHub`}
                      >
                        <Github className="mr-1.5 h-4 w-4" aria-hidden="true" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live demo of ${project.title}`}
                      >
                        <ExternalLink className="mr-1.5 h-4 w-4" aria-hidden="true" />
                        Live demo
                      </a>
                    </Button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
