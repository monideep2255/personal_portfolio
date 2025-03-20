
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
            At the intersection of AI innovation and healthcare advancement, I transform complex machine learning technologies 
            into impactful solutions at NCBI, NIH. Leading search analytics and biomedical research initiatives, 
            I bridge the gap between cutting-edge technology and meaningful user experiences that make a difference in healthcare.
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
