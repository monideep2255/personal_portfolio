import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Monideep Chakraborti
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-6">
              Product Manager & AI/ML Specialist
            </h2>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            Experienced product manager specializing in AI/ML technologies and search analytics at NCBI, NIH. 
            Focused on developing innovative solutions that transform biomedical research and improve user experiences.
          </p>

          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}