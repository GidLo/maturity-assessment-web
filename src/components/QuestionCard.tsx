
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionType, AnswerType } from '@/types/assessment';
import RatingSelector from './RatingSelector';
import { Info } from 'lucide-react';

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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionCard;
