
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
  
  // Transform the data for the radar chart - using shortened names for better display
  const chartData = data.map((item) => {
    // Create shorter display names for the radar chart
    let displayName = item.name;
    if (item.name.length > 20) {
      // Extract key terms or use numbered categories
      if (item.name.includes("Supply Chain Vision")) displayName = "01-Vision & Strategy";
      else if (item.name.includes("Category")) displayName = "02-Category Mgmt";
      else if (item.name.includes("Strategic Sourcing")) displayName = "03-Strategic Sourcing";
      else if (item.name.includes("Contract")) displayName = "04-Contract Mgmt";
      else if (item.name.includes("Transaction")) displayName = "05-Transaction Mgmt";
      else if (item.name.includes("Supplier Management")) displayName = "06-Supplier Mgmt";
      else if (item.name.includes("Warehousing")) displayName = "07-Warehousing";
      else if (item.name.includes("Supply Management")) displayName = "08-Supply Mgmt";
      else if (item.name.includes("Risk")) displayName = "09-Risk Mgmt";
      else if (item.name.includes("Organisation")) displayName = "10-Organisation";
      else if (item.name.includes("People")) displayName = "11-People";
      else if (item.name.includes("Technology")) displayName = "12-Technology";
      else if (item.name.includes("Performance")) displayName = "13-Performance";
      else if (item.name.includes("ESG")) displayName = "14-ESG";
      else if (item.name.includes("Enterprise")) displayName = "15-Supplier Dev";
    }
    
    return {
      subject: displayName,
      A: item.percentage,
      fullMark: maxValue,
      originalName: item.name // Keep original name for tooltips
    };
  });

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
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="70%" 
              data={chartData}
            >
              <PolarGrid stroke="rgba(0,0,0,0.1)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))',
                  fontSize: 10,
                  fontWeight: 500
                }}
              />
              <PolarRadiusAxis 
                angle={45} 
                domain={[0, maxValue]} 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Radar
                name="Your Maturity Level"
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
