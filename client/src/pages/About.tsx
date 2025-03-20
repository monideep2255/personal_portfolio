import { motion } from "framer-motion";
import { SiReact, SiNodedotjs, SiTypescript, SiPostgresql } from "react-icons/si";

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
              I'm a passionate software developer with expertise in full-stack development and machine learning. I focus on creating efficient, scalable solutions while continuously learning and adapting to new technologies.
            </p>

            <div className="space-y-12">
              <div className="border-l-4 border-primary pl-6">
                <h2 className="text-2xl font-bold mb-6">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Master of Science in Information Systems</h3>
                    <p className="text-muted-foreground">University of Maryland, Baltimore County • 2022 - 2024</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Bachelor of Technology in Computer Science</h3>
                    <p className="text-muted-foreground">Kalinga Institute of Industrial Technology • 2016 - 2020</p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Technical Lead</h3>
                    <p className="text-muted-foreground">Cognizant • Jul 2020 - Jul 2022</p>
                    <p className="mt-2">Led development teams in implementing enterprise solutions and mentored junior developers.</p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h2 className="text-2xl font-bold mb-6">Leadership</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Graduate Assistant</h3>
                    <p className="text-muted-foreground">UMBC • Sep 2022 - May 2024</p>
                    <p className="mt-2">Leading research initiatives in Natural Language Processing and managing academic projects.</p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">Product & Project Management</h3>
                  </div>
                </div>
              </div>
                <p className="text-sm text-muted-foreground">Jira, Confluence, Trello, Scrum, Kanban, Agile Release Management</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">AI & Search Technologies</h3>
                <p className="text-sm text-muted-foreground">LangChain, RAG, LLMs, Search Analytics</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Data & Analytics</h3>
                <p className="text-sm text-muted-foreground">SQL, GA4, Looker Studio, Google Search Console, Excel, Power BI</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Product Manager</h3>
                <p className="text-muted-foreground">NCBI, National Institutes of Health • Aug 2024 - Present</p>
                <p className="mt-2">
                  Led a comprehensive search analytics project across 30+ databases to uncover user search patterns and inefficiencies, 
                  delivering key insights that informed the data-driven prioritization for NCBI's Next Generation Search transformation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Product Manager</h3>
                <p className="text-muted-foreground">Happy Prime • Jul 2023 - Aug 2024</p>
                <p className="mt-2">
                  Led the development of a 0-to-1 novel, AI/ML-enabled mobile app, prioritizing 3 core MVP features aimed at 
                  revolutionizing communication for individuals with atypical speech.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Machine Learning Research Assistant</h3>
                <p className="text-muted-foreground">Northeastern University • Apr 2023 - Jul 2023</p>
                <p className="mt-2">
                  Enhanced a speech recognition algorithm using Python, improving error correction accuracy for atypical speech by 50%, 
                  demonstrating strong analytical and problem-solving skills.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">MS in Computer Science</h3>
                <p className="text-muted-foreground">Northeastern University, Vancouver, BC, Canada • Sep 2020 - Dec 2022</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">MS in Biomedical Science</h3>
                <p className="text-muted-foreground">Rutgers University, Newark, NJ, USA • Sep 2016 - Oct 2018</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">BA in Biochemistry and Molecular Biology</h3>
                <p className="text-muted-foreground">Boston University, MA, USA • Sep 2011 - Jan 2016</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8">Leadership & Awards</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">U.S. Digital Corps Product Fellow</h3>
                <p className="text-muted-foreground">General Services Administration • Aug 2024 - Present</p>
                <p className="mt-2">
                  Selected as one of 70 fellows from over 2,000 applicants (3.3% acceptance rate) for a two-year federal program focused on 
                  deploying early-career technologists to work on high-impact projects across various federal agencies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Vice President, Public Relations</h3>
                <p className="text-muted-foreground">Toastmasters • Jul 2023 - Jul 2024</p>
                <p className="mt-2">
                  Spearheaded digital campaigns across social media platforms, achieving a 40% increase in member recruitment and a 20% 
                  engagement rate on posts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}