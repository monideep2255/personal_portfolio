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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-primary">Monideep Chakraborti</span>
            <br />
            Product Manager
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Experienced in AI/ML, search analytics, and product development with a focus on creating innovative solutions.
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
