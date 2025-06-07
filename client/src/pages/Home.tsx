import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

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
          <motion.p 
            className="text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            👋 Hi, I'm
          </motion.p>

          <h1 className="text-5xl font-bold mb-4">
            Monideep Chakraborti
          </h1>

          <motion.h2
            className="text-3xl text-primary font-semibold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Product Manager & AI/ML Specialist
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Welcome! I'm passionate about transforming complex AI/ML technologies into user-friendly solutions at NCBI, NIH. With expertise in product management and artificial intelligence, I focus on innovations that advance biomedical research and enhance user experiences.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button asChild>
              <a href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Chat with Me Section */}
        <motion.div
          className="max-w-4xl mx-auto mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Chat with Me</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Have questions about my career journey, projects, or AI/ML expertise? 
              Start a conversation with my interactive chatbot!
            </p>
          </div>
          
          <div className="chat-container bg-card border rounded-lg shadow-lg overflow-hidden">
            <iframe 
              src="https://huggingface.co/spaces/monideep2255/career_conversation" 
              width="100%" 
              height="600" 
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Career Conversation Chatbot"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}