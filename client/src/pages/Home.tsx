
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary mb-4"
            >
              👋 Hi, I'm
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              Monideep Chakraborti
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-primary font-semibold mb-6"
            >
              Product Manager & AI/ML Specialist
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Welcome! I'm passionate about transforming complex AI/ML technologies into user-friendly solutions 
            at NCBI, NIH. With expertise in product management and artificial intelligence, 
            I focus on innovations that advance biomedical research and enhance user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 items-center"
          >
            <Link href="/projects">
              <Button size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">
            Product Manager & Tech Innovation Leader
          </h1>
          
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              I am a dynamic and results-oriented Product Manager specializing in Agile methodologies 
              and data-driven decision-making. My expertise lies in leading cross-functional teams 
              to deliver innovative solutions, with a current focus on reimagining complex legacy 
              systems and leveraging cutting-edge technologies to enhance biomedical information 
              accessibility and usability.
            </p>

            <p>
              Proficient in technical tools including Jira, Python, SQL, and PowerBI, I employ 
              Agile frameworks such as Scrum and Kanban to effectively manage complex projects 
              in rapidly evolving technological landscapes.
            </p>

            <p>
              My passion centers on harnessing AI/ML technologies to create inclusive and 
              transformative digital experiences. I thrive in fast-paced environments and am 
              dedicated to collaborating with forward-thinking professionals and organizations 
              committed to driving meaningful technological impact.
            </p>
          </div>

          <motion.div 
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="/projects" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              View Projects
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
