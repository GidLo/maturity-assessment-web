
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ChevronRight, BarChart, Award, Target, Brain, Star, Zap } from 'lucide-react';

const Index = () => {
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const competencies = [
    { 
      name: "Strategic Thinking", 
      icon: Brain, 
      description: "Ability to develop and execute long-term plans aligned with organizational goals."
    },
    { 
      name: "Leadership", 
      icon: Star, 
      description: "Capacity to inspire, guide, and develop teams to achieve exceptional results."
    },
    { 
      name: "Technical Expertise", 
      icon: Zap, 
      description: "Mastery of relevant skills, tools, and methodologies required for your role."
    },
    { 
      name: "Communication", 
      icon: ChevronRight, 
      description: "Effectiveness in conveying information clearly and building understanding across diverse audiences."
    },
    { 
      name: "Innovation", 
      icon: Award, 
      description: "Ability to generate and implement creative ideas that add value."
    },
    { 
      name: "Operational Excellence", 
      icon: Target, 
      description: "Skill in optimizing processes and consistently delivering high-quality results."
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-16">
        {/* Hero section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_50%)]" />
          
          <div className="container max-w-5xl px-4 md:px-6">
            <motion.div 
              className="text-center space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground mb-2">
                Professional Development
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
                Maturity Assessment
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Evaluate your professional capabilities across six key competencies and visualize your areas of strength.
              </p>
              <div className="pt-4">
                <Link to="/assessment">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-effect inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle"
                  >
                    <span className="font-medium">Start Assessment</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl px-4 md:px-6">
            <motion.div 
              className="text-center mb-12 md:mb-16 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Measured Competencies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our assessment evaluates your proficiency across six essential professional domains
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
            >
              {competencies.map((competency, index) => (
                <motion.div 
                  key={competency.name}
                  variants={itemVariants}
                  className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-elegant"
                >
                  <div className="flex flex-col h-full space-y-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <competency.icon className="size-5" />
                    </div>
                    <h3 className="text-xl font-medium">{competency.name}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">{competency.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container max-w-5xl px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple three-step process to gain insights into your professional strengths
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  step: "1",
                  title: "Complete Assessment",
                  description: "Answer 20 questions about your professional skills and behaviors.",
                  icon: <div className="text-2xl font-medium">01</div>
                },
                {
                  step: "2",
                  title: "Get Instant Results",
                  description: "View your competency profile in an intuitive spider diagram.",
                  icon: <div className="text-2xl font-medium">02</div>
                },
                {
                  step: "3",
                  title: "Identify Opportunities",
                  description: "Focus your development on areas with the greatest growth potential.",
                  icon: <div className="text-2xl font-medium">03</div>
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="size-14 flex items-center justify-center rounded-full bg-secondary border border-border">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  
                  {/* Connector line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-border -z-10">
                      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/assessment">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span className="font-medium">Begin Your Assessment</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="relative size-6 bg-primary rounded-full overflow-hidden">
                <div className="absolute inset-1 bg-background rounded-full"></div>
              </div>
              <span className="font-medium">Maturity Assessment</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Maturity Assessment. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
