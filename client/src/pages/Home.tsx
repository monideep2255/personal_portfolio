import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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
            Product Manager & AI/ML Technology Leader
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Product Manager specializing in AI/ML technologies with expertise in Agile methodologies
            and data-driven decision making. Skilled in leading cross-functional teams and
            delivering innovative solutions through effective product strategy and execution.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div 
              className="p-6 rounded-lg border bg-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4">Technical Expertise</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI/ML Technologies & LLMs</li>
                <li>• Python, SQL, Data Analytics</li>
                <li>• Search Analytics & Optimization</li>
                <li>• Product Analytics (GA4, PowerBI)</li>
              </ul>
            </motion.div>

            <motion.div 
              className="p-6 rounded-lg border bg-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Product Management</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Agile/Scrum Methodologies</li>
                <li>• Product Strategy & Roadmapping</li>
                <li>• Cross-functional Team Leadership</li>
                <li>• User Research & Analytics</li>
              </ul>
            </motion.div>
          </div>

          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/projects">
              <Button size="lg" className="font-medium">
                View Projects
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="font-medium">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}