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
              I'm a passionate full-stack developer with experience in building modern web
              applications. I love solving complex problems and creating intuitive user
              experiences.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2 p-4 rounded-lg border"
                >
                  <skill.icon className="w-6 h-6 text-primary" />
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Senior Developer</h3>
                <p className="text-muted-foreground">Company Name • 2020 - Present</p>
                <p>
                  Led development of various web applications, mentored junior developers,
                  and implemented best practices.
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
