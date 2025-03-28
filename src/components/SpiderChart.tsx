
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
  maxValue = 5 // Changed from 100 to 5
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Transform the data for the radar chart with display names
  const chartData = data.map((item) => {
    // Create shorter display names for the radar chart
    let displayName = '';
    
    // Match competencies to their display names
    if (item.name === "Supply Chain Vision and Strategy") displayName = "01-Vision & Strategy";
    else if (item.name === "Category Management") displayName = "02-Category Mgmt";
    else if (item.name === "Strategic Sourcing") displayName = "03-Strategic Sourcing";
    else if (item.name === "Contract & Compliance Management") displayName = "04-Contract Mgmt";
    else if (item.name === "Transaction Management") displayName = "05-Transaction Mgmt";
    else if (item.name === "Supplier Management") displayName = "06-Supplier Mgmt";
    else if (item.name === "Warehousing Operations") displayName = "07-Warehousing";
    else if (item.name === "Supply Management") displayName = "08-Supply Mgmt";
    else if (item.name === "Risk Management") displayName = "09-Risk Mgmt";
    else if (item.name === "Organisation") displayName = "10-Organisation";
    else if (item.name === "People") displayName = "11-People";
    else if (item.name === "Technology, Data & Information") displayName = "12-Technology";
    else if (item.name === "Performance Metrics") displayName = "13-Performance";
    else if (item.name === "Environmental Social and Governance (ESG)") displayName = "14-ESG";
    else if (item.name === "Enterprise & Supplier Development") displayName = "15-Supplier Dev";
    else displayName = item.name; // Fallback to the original name if no match
    
    // Calculate average on 5-point scale
    const averageScore = (item.score / item.maxScore) * 5;
    
    return {
      subject: displayName,
      A: averageScore, // Use average out of 5 instead of percentage
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
