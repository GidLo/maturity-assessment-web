
import React, { useEffect, useState } from 'react';
import { Radar } from 'recharts';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { CompetencyResult } from '@/types/assessment';
import { AnimatePresence, motion } from 'framer-motion';

interface SpiderChartProps {
  data: CompetencyResult[];
  maxValue?: number;
}

const SpiderChart: React.FC<SpiderChartProps> = ({ 
  data,
  maxValue = 100
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Transform the data for the radar chart
  const chartData = data.map((item) => ({
    subject: item.name,
    A: item.percentage,
    fullMark: maxValue,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-[400px] md:h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="rgba(0,0,0,0.1)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))',
                  fontSize: 12,
                  fontWeight: 500
                }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, maxValue]} 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Radar
                name="Your Profile"
                dataKey="A"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <Legend align="center" />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpiderChart;
