
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ChevronRight, BarChart, Award, Target, Brain, Star, Zap } from 'lucide-react';

const Index = () => {
  const staggerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  const competencies = [{
    name: "Supply Chain Vision and Strategy",
    icon: Brain,
    description: "Development and implementation of Supply Chain improvement initiatives aligned with business strategy."
  }, {
    name: "Category Management",
    icon: Target,
    description: "Effective management of spend categories and coordination of procurement across the organisation."
  }, {
    name: "Strategic Sourcing",
    icon: Award,
    description: "Rigorous decision-making and consistent application of sourcing processes throughout the organisation."
  }, {
    name: "Contract & Compliance Management",
    icon: Star,
    description: "Sophisticated contract models and formalised management to ensure compliance with preferred suppliers."
  }, {
    name: "Transaction Management",
    icon: Zap,
    description: "Effective controls and automation in the Procure-to-Pay process to maximise compliant purchasing."
  }, {
    name: "Supplier Management",
    icon: ChevronRight,
    description: "Active management of supplier numbers with defined strategies for performance management."
  }];

  return <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-16">
        {/* Hero section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_50%)]" />
          
          <div className="container max-w-5xl px-4 md:px-6">
            <motion.div className="text-center space-y-6 md:space-y-8" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground mb-2">Digital Accelerator demo</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">Procurement Maturity Assessment</h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">Evaluate your Procurement organisational maturity across 15 key competencies.</p>
              <div className="pt-4 bg-slate-50">
                <Link to="/assessment">
                  <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className="inline-flex items-center px-6 py-3 rounded-full shadow-subtle bg-[#db536a] hover:bg-[#db536a]/90 font-normal text-center text-slate-50">
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
            <motion.div className="text-center mb-12 md:mb-16 space-y-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Measured Competencies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our assessment evaluates your proficiency across fifteen competencies, amongst these the below six</p>
            </motion.div>
            
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" variants={staggerVariants} initial="hidden" animate="visible">
              {competencies.map((competency, index) => <motion.div key={competency.name} variants={itemVariants} className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-elegant">
                  <div className="flex flex-col h-full space-y-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-[#dc6900]">
                      <competency.icon className="size-5" />
                    </div>
                    <h3 className="text-xl font-medium">{competency.name}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">{competency.description}</p>
                  </div>
                </motion.div>)}
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
              {[{
              step: "1",
              title: "Complete Assessment",
              description: "Answer questions about your procurement maturity.",
              icon: <div className="text-2xl font-medium text-[#dc6900]">01</div>
            }, {
              step: "2",
              title: "Get Instant Results",
              description: "View your competency profile in an intuitive spider diagram.",
              icon: <div className="text-2xl font-medium text-[#dc6900]">02</div>
            }, {
              step: "3",
              title: "Identify Opportunities",
              description: "Focus your development on areas with the greatest growth potential.",
              icon: <div className="text-2xl font-medium text-[#dc6900]">03</div>
            }].map((item, index) => <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="size-14 flex items-center justify-center rounded-full bg-secondary border border-border">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  
                  {/* Connector line */}
                  {index < 2 && <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-border -z-10">
                      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#dc6900]"></div>
                    </div>}
                </div>)}
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/assessment">
                <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="inline-flex items-center px-6 py-3 rounded-full bg-[#db536a] text-primary-foreground hover:bg-[#db536a]/90">
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
              <div className="relative size-6 bg-[#dc6900] rounded-full overflow-hidden">
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
    </>;
};

export default Index;
