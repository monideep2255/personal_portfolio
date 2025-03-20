import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Projects() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          A curated collection of my professional projects and contributions is coming soon. 
          Stay tuned for detailed case studies and technical demonstrations.
        </p>

        <motion.div 
          className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">
            I'm currently preparing an engaging showcase of my work. Check back soon to explore my projects 
            in AI/ML, search analytics, and product development.
          </p>
        </motion.div>
      </div>
    </section>
  );
}