
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface RatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({ 
  value = 0, 
  onChange, 
  max = 5 
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  
  const handleMouseEnter = (rating: number) => {
    setHoveredValue(rating);
  };
  
  const handleMouseLeave = () => {
    setHoveredValue(null);
  };
  
  const labels = [
    'Novice',
    'Developing',
    'Competent',
    'Proficient',
    'Expert'
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center w-full">
        {Array.from({ length: max }, (_, i) => i + 1).map(rating => (
          <div 
            key={rating}
            className="flex flex-col items-center"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(rating)}
              onMouseEnter={() => handleMouseEnter(rating)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "relative w-14 h-14 rounded-full flex items-center justify-center",
                "transition-all duration-200 ease-out",
                "border-2",
                value >= rating || hoveredValue === rating || hoveredValue && hoveredValue >= rating
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-secondary border-border text-secondary-foreground hover:border-primary/50"
              )}
              aria-label={`Rating ${rating} of ${max}`}
            >
              <span className="font-medium text-lg">{rating}</span>
              {value === rating && (
                <motion.div
                  layoutId="selected-rating"
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
            <span className="mt-2 text-xs text-muted-foreground font-medium">
              {labels[rating - 1]}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        <span>Needs improvement</span>
        <span>Excellent</span>
      </div>
    </div>
  );
};

export default RatingSelector;
