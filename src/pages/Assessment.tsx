
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import QuestionCard from '@/components/QuestionCard';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useAssessment } from '@/context/AssessmentContext';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Assessment = () => {
  const navigate = useNavigate();
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    questions, 
    answers, 
    saveAnswer,
    isComplete
  } = useAssessment();

  // Redirect to results page if all questions are answered
  useEffect(() => {
    if (isComplete) {
      toast({
        title: "Assessment Complete!",
        description: "Redirecting to your results.",
      });
      
      const timer = setTimeout(() => {
        navigate('/results');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete, navigate]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  
  const canGoNext = currentAnswer !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleAnswerSave = (answer: any) => {
    saveAnswer(answer);
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      toast({
        variant: "default",
        description: "Question skipped. You can come back to it later.",
      });
    }
  };

  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;
  const progress = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-16 flex flex-col">
        <div className="flex-grow flex items-center">
          <div className="container max-w-3xl px-4 py-8 md:py-12">
            <div className="mb-8 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-2"
              >
                <h1 className="text-2xl md:text-3xl font-medium">Supply Chain Maturity Assessment</h1>
                <p className="text-muted-foreground">
                  Rate each statement based on how accurately it describes your organization
                </p>
              </motion.div>
              
              <ProgressIndicator 
                currentStep={questionNumber} 
                totalSteps={totalQuestions}
                currentCategory={currentQuestion?.competency}
              />
            </div>
            
            <div className="relative min-h-[300px] md:min-h-[350px]">
              {currentQuestion && (
                <QuestionCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  answer={currentAnswer}
                  onAnswer={handleAnswerSave}
                  isActive={true}
                />
              )}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/70 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </motion.button>
              
              <button
                onClick={handleSkip}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now
              </button>
              
              <AnimatePresence mode="wait">
                {isLastQuestion && canGoNext ? (
                  <motion.button
                    key="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/results')}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Complete</span>
                    <CheckCircle className="h-4 w-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    key="next"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Assessment;
