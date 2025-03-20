import { motion } from "framer-motion";
import { SiReact, SiNodedotjs, SiTypescript, SiPostgresql } from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "PostgreSQL", icon: SiPostgresql },
  // Add more skills as needed
];

export default function About() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">About Me</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-8">
              I'm a Product Manager with expertise in AI/ML technologies and search analytics. Currently working at NCBI, NIH, 
              where I lead comprehensive search analytics projects and develop innovative solutions for biomedical research.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Product Management</h3>
                <p className="text-sm text-muted-foreground">Jira, Confluence, Trello, Agile</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">AI & Search</h3>
                <p className="text-sm text-muted-foreground">LangChain, RAG, LLMs</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Data Analytics</h3>
                <p className="text-sm text-muted-foreground">SQL, GA4, Power BI</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Product Manager</h3>
                <p className="text-muted-foreground">NCBI, National Institutes of Health • Aug 2024 - Present</p>
                <p className="mt-2">
                  Leading search analytics projects across 30+ databases, implementing standardized analytics frameworks, 
                  and driving the Next Generation Search transformation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Product Manager</h3>
                <p className="text-muted-foreground">Happy Prime • Jul 2023 - Aug 2024</p>
                <p className="mt-2">
                  Led the development of an AI/ML-enabled mobile app for atypical speech communication, 
                  managing cross-functional teams and conducting market research.
                </p>
              </div>
              {/* Add more experience items as needed */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
