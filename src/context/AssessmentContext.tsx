
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnswerType, QuestionType, AssessmentResults, CompetencyResult, CompetencyName } from '@/types/assessment';

type AssessmentContextType = {
  currentQuestionIndex: number;
  answers: AnswerType[];
  setCurrentQuestionIndex: (index: number) => void;
  saveAnswer: (answer: AnswerType) => void;
  questions: QuestionType[];
  isComplete: boolean;
  calculateResults: () => AssessmentResults;
  results: AssessmentResults | null;
};

const defaultQuestions: QuestionType[] = [
  {
    id: 1,
    text: "Our organization has a clearly defined and documented supply chain strategy aligned with business objectives.",
    competency: "Supply Chain Vision and Strategy",
    description: "Assess the clarity and alignment of your supply chain strategy with overall business goals."
  },
  {
    id: 2,
    text: "We have structured category management processes with defined category strategies.",
    competency: "Category Management",
    description: "Evaluate your approach to organizing and managing procurement categories."
  },
  {
    id: 3,
    text: "Our strategic sourcing process includes comprehensive market analysis and supplier evaluation.",
    competency: "Strategic Sourcing",
    description: "Consider how effectively you identify, evaluate and select suppliers through structured processes."
  },
  {
    id: 4,
    text: "We have standardized contract management processes with clear compliance monitoring.",
    competency: "Contract & Compliance Management",
    description: "Assess your ability to create, manage, and monitor contracts for compliance."
  },
  {
    id: 5,
    text: "Our transaction management processes are efficient with minimal manual intervention.",
    competency: "Transaction Management",
    description: "Evaluate the efficiency of your procurement-to-pay processes."
  },
  {
    id: 6,
    text: "We have formal supplier relationship management programs with performance reviews.",
    competency: "Supplier Management",
    description: "Consider how effectively you manage ongoing relationships with suppliers."
  },
  {
    id: 7,
    text: "Our warehousing operations are optimized with effective inventory management practices.",
    competency: "Warehousing Operations",
    description: "Assess the efficiency and effectiveness of your warehouse management."
  },
  {
    id: 8,
    text: "We have robust supply planning processes that balance demand and inventory levels.",
    competency: "Supply Management",
    description: "Evaluate your ability to plan and manage supply to meet demand."
  },
  {
    id: 9,
    text: "Our organization has formalized risk management processes across the supply chain.",
    competency: "Risk Management",
    description: "Consider how well you identify, assess, and mitigate supply chain risks."
  },
  {
    id: 10,
    text: "Our organizational structure supports effective supply chain management with clear roles.",
    competency: "Organisation",
    description: "Assess how well your organizational design supports supply chain functions."
  },
  {
    id: 11,
    text: "We invest in developing supply chain talent with specialized skills and training.",
    competency: "People",
    description: "Evaluate your approach to developing human capital in supply chain roles."
  },
  {
    id: 12,
    text: "Our technology systems provide end-to-end visibility and support data-driven decisions.",
    competency: "Technology, Data & Information",
    description: "Consider how effectively you leverage technology and data in supply chain operations."
  },
  {
    id: 13,
    text: "We have comprehensive KPIs that measure supply chain performance at multiple levels.",
    competency: "Performance Metrics",
    description: "Assess your approach to measuring and improving supply chain performance."
  },
  {
    id: 14,
    text: "Our supply chain practices incorporate environmental and social responsibility considerations.",
    competency: "Environmental Social and Governance (ESG)",
    description: "Evaluate how well sustainability principles are integrated into your supply chain."
  },
  {
    id: 15,
    text: "We have programs to develop local suppliers and support inclusive procurement practices.",
    competency: "Enterprise & Supplier Development",
    description: "Consider your efforts to develop diverse and local supplier capabilities."
  },
  {
    id: 16,
    text: "We regularly review and update our supply chain strategy based on market changes.",
    competency: "Supply Chain Vision and Strategy",
    description: "Assess how adaptable your supply chain strategy is to changing business conditions."
  },
  {
    id: 17,
    text: "Our category strategies include total cost of ownership analysis and value creation.",
    competency: "Category Management",
    description: "Evaluate how comprehensively you assess category value beyond immediate price."
  },
  {
    id: 18,
    text: "We use digital tools to enhance transparency and efficiency in transaction processing.",
    competency: "Transaction Management",
    description: "Consider your use of technology to streamline procurement transactions."
  },
  {
    id: 19,
    text: "Our risk management includes proactive monitoring of supplier financial health.",
    competency: "Risk Management",
    description: "Assess your ability to identify financial risks in your supply base."
  },
  {
    id: 20,
    text: "We track and report on diversity and inclusion metrics in our procurement activities.",
    competency: "Enterprise & Supplier Development",
    description: "Evaluate how you measure and promote diversity in your supply chain."
  }
];

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [questions] = useState<QuestionType[]>(defaultQuestions);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const isComplete = answers.length === questions.length;

  const saveAnswer = (answer: AnswerType) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === answer.questionId);
      
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = answer;
        return newAnswers;
      } else {
        return [...prev, answer];
      }
    });
  };

  const calculateResults = (): AssessmentResults => {
    // Get unique competencies
    const competencyNames = Array.from(new Set(questions.map(q => q.competency))) as CompetencyName[];
    
    // Calculate scores for each competency
    const competencies: CompetencyResult[] = competencyNames.map(competency => {
      const competencyQuestions = questions.filter(q => q.competency === competency);
      const competencyAnswers = answers.filter(a => 
        competencyQuestions.some(q => q.id === a.questionId)
      );
      
      const score = competencyAnswers.reduce((sum, answer) => sum + answer.rating, 0);
      const maxScore = competencyQuestions.length * 5; // 5 is the max rating
      const percentage = (score / maxScore) * 100;
      
      return {
        name: competency,
        score,
        maxScore,
        percentage
      };
    });
    
    // Calculate overall score
    const overallScore = answers.reduce((sum, answer) => sum + answer.rating, 0);
    const maxPossibleScore = questions.length * 5;
    
    const results: AssessmentResults = {
      competencies,
      overallScore,
      maxPossibleScore,
      completedAt: new Date().toISOString()
    };

    setResults(results);
    return results;
  };

  useEffect(() => {
    if (isComplete) {
      calculateResults();
    }
  }, [answers]);

  return (
    <AssessmentContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        saveAnswer,
        questions,
        isComplete,
        calculateResults,
        results
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
