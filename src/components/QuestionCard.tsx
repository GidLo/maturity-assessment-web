
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionType, AnswerType } from '@/types/assessment';
import RatingSelector from './RatingSelector';
import { Info, ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionType;
  answer?: AnswerType;
  onAnswer: (answer: AnswerType) => void;
  isActive: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswer,
  isActive
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showLevelDescriptions, setShowLevelDescriptions] = useState(false);
  
  const levelDescriptions = [
    "No evidence of efforts to assess new procedures, tools and techniques.",
    "Supply Chain sporadically assesses new procedures, tools and techniques but there is limited forward planning.",
    "Supply Chain monitoring of developments in procedures, tools and techniques for potential application is informal.",
    "Supply Chain actively monitors developments in procedures, tools and techniques for potential application.",
    "Supply Chain leaders follow and implement innovations and trends in Procurement and Supply Chain."
  ];
  
  const handleRatingChange = (rating: number) => {
    onAnswer({
      questionId: question.id,
      rating,
    });
  };

  const variants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 }
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={question.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full glass-card rounded-xl p-6 md:p-8"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {question.competency}
                </div>
                
                {question.description && (
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="group p-1 rounded-full hover:bg-secondary"
                    aria-label="Show description"
                  >
                    <Info className="size-4 text-muted-foreground group-hover:text-foreground" />
                  </button>
                )}
              </div>
              
              <h3 className="text-xl font-medium text-foreground">{question.text}</h3>
              
              <AnimatePresence>
                {showDescription && question.description && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground"
                  >
                    {question.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <div className="pt-2">
              <RatingSelector
                value={answer?.rating || 0}
                onChange={handleRatingChange}
              />
              
              <div className="mt-4">
                <button
                  onClick={() => setShowLevelDescriptions(!showLevelDescriptions)}
                  className="flex items-center justify-center w-full gap-2 text-sm px-4 py-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Eye className="size-4" />
                  <span>
                    {showLevelDescriptions 
                      ? "Hide level descriptions" 
                      : "Show description of levels"
                    }
                  </span>
                  {showLevelDescriptions 
                    ? <ChevronUp className="size-4" /> 
                    : <ChevronDown className="size-4" />
                  }
                </button>
                
                <AnimatePresence>
                  {showLevelDescriptions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-2 text-sm bg-secondary/20 rounded-md p-3"
                    >
                      {levelDescriptions.map((desc, index) => (
                        <div key={index} className="flex gap-2">
                          <span className="flex-shrink-0 font-semibold">{index + 1}.</span>
                          <p className="text-muted-foreground">{desc}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionCard;
