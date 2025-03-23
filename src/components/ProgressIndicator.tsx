
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  currentCategory?: string;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  currentCategory,
  className
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Question {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium">{Math.round(percentage)}% Complete</span>
      </div>
      
      <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      
      {currentCategory && (
        <div className="text-xs text-muted-foreground pt-1">
          Current Category: {currentCategory}
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
