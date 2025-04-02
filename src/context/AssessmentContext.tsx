
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnswerType, QuestionType, AssessmentResults, CompetencyResult, CompetencyName, UserFormData } from '@/types/assessment';

type AssessmentContextType = {
  currentQuestionIndex: number;
  answers: AnswerType[];
  userFormData: UserFormData | null;
  setUserFormData: (data: UserFormData) => void;
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
    text: "How does Supply Chain implement improvement initiatives to its function?",
    competency: "Supply Chain Vision and Strategy",
    description: "Assess the organizational approach to continuous improvement initiatives."
  },
  {
    id: 2,
    text: "How effectively is Supply Chain strategy being actioned?",
    competency: "Supply Chain Vision and Strategy",
    description: "Evaluate how well strategy is translated into action."
  },
  {
    id: 3,
    text: "How is Supply Chain perceived across the organisation?",
    competency: "Supply Chain Vision and Strategy",
    description: "Consider the reputation and perception of supply chain across departments."
  },
  {
    id: 4,
    text: "Is the Supply Chain strategy aligned with the business strategy?",
    competency: "Supply Chain Vision and Strategy",
    description: "Assess alignment between supply chain objectives and overall business goals."
  },
  {
    id: 5,
    text: "How effective are efforts to leverage spend for major spend categories?",
    competency: "Category Management",
    description: "Evaluate the effectiveness of spending optimization for key categories."
  },
  {
    id: 6,
    text: "To what extent are comprehensive category strategies in place for major spend categories?",
    competency: "Category Management",
    description: "Assess the completeness of strategies for managing spend categories."
  },
  {
    id: 7,
    text: "To what extent is capital procurement co-ordinated and managed across the organisation?",
    competency: "Category Management",
    description: "Evaluate how well capital purchases are coordinated organization-wide."
  },
  {
    id: 8,
    text: "How rigorous is decision-making within the sourcing process?",
    competency: "Strategic Sourcing",
    description: "Assess the thoroughness of the decision-making process for sourcing."
  },
  {
    id: 9,
    text: "How well understood is strategic sourcing within the organisation and to what extent are processes consistently applied?",
    competency: "Strategic Sourcing",
    description: "Evaluate awareness and consistent application of sourcing processes."
  },
  {
    id: 10,
    text: "To what extent during the procurement process are specific business sustainability risks and opportunities considered?",
    competency: "Strategic Sourcing",
    description: "Assess how sustainability factors into procurement decisions."
  },
  {
    id: 11,
    text: "How sophisticated are contract models applied by Supply Chain?",
    competency: "Contract & Compliance Management",
    description: "Evaluate the complexity and effectiveness of contract models in use."
  },
  {
    id: 12,
    text: "To what extent is contract management formalised within the organisation?",
    competency: "Contract & Compliance Management",
    description: "Assess the level of formalization in contract management processes."
  },
  {
    id: 13,
    text: "What is the level of compliance with preferred suppliers (i.e. is maverick buying a problem)?",
    competency: "Contract & Compliance Management",
    description: "Evaluate adherence to approved supplier agreements."
  },
  {
    id: 14,
    text: "How effective are support mechanisms to maximise compliant purchasing?",
    competency: "Transaction Management",
    description: "Assess tools and processes that encourage compliant purchasing."
  },
  {
    id: 15,
    text: "To what extent are effective controls in place in the P2P (Procure-to-Pay) process?",
    competency: "Transaction Management",
    description: "Evaluate the controls governing the procure-to-pay cycle."
  },
  {
    id: 16,
    text: "To what extent have order and invoicing processing tasks been automated?",
    competency: "Transaction Management",
    description: "Assess the level of automation in order and invoice processing."
  },
  {
    id: 17,
    text: "To what extent do Supply Chain actively manage supplier numbers?",
    competency: "Supplier Management",
    description: "Evaluate how proactively the organization manages its supplier base."
  },
  {
    id: 18,
    text: "To what extent does the organisation have a defined strategy and approach for managing strategic suppliers?",
    competency: "Supplier Management",
    description: "Assess the formality of approaches to strategic supplier management."
  },
  {
    id: 19,
    text: "To what extent is a formal approach to supplier performance management pursued?",
    competency: "Supplier Management",
    description: "Evaluate how systematically supplier performance is monitored and managed."
  },
  {
    id: 20,
    text: "How effective are the rules around order quantities?",
    competency: "Warehousing Operations",
    description: "Assess the effectiveness of order quantity guidelines and policies."
  },
  {
    id: 21,
    text: "How effective are the warehousing processes?",
    competency: "Warehousing Operations",
    description: "Evaluate the efficiency and effectiveness of warehouse operations."
  },
  {
    id: 22,
    text: "What is the main input to inventory management?",
    competency: "Warehousing Operations",
    description: "Identify the primary drivers of inventory management decisions."
  },
  {
    id: 23,
    text: "How effective is Supply Chain at supporting the inventory supply/replenishment needs of the organisation?",
    competency: "Supply Management",
    description: "Assess how well replenishment processes meet organizational needs."
  },
  {
    id: 24,
    text: "How effective is Supply Chain in translating demand plans for indirect spend into opportunities for sourcing, and supplier management?",
    competency: "Supply Management",
    description: "Evaluate how well demand signals convert to sourcing activities."
  },
  {
    id: 25,
    text: "How effective is Supply Management and its processes on product specification and selection?",
    competency: "Supply Management",
    description: "Assess the effectiveness of product specification processes."
  },
  {
    id: 26,
    text: "How effective is Supply Management towards Operations demand fulfillment while maintaining compliance with procedures?",
    competency: "Supply Management",
    description: "Evaluate the balance between meeting demands and maintaining compliance."
  },
  {
    id: 27,
    text: "How effective are controls in place on procurement activities?",
    competency: "Risk Management",
    description: "Assess the effectiveness of procurement control mechanisms."
  },
  {
    id: 28,
    text: "How established is Quality Assurance in the Supply Chain process?",
    competency: "Risk Management",
    description: "Evaluate the maturity of quality assurance within supply chain processes."
  },
  {
    id: 29,
    text: "To what extent do policies and procedures exist covering procurement activity?",
    competency: "Risk Management",
    description: "Assess the comprehensiveness of procurement policies and procedures."
  },
  {
    id: 30,
    text: "To what extent is supply risk actively assessed and monitored?",
    competency: "Risk Management",
    description: "Evaluate approaches to supply risk identification and management."
  },
  {
    id: 31,
    text: "How well does the Supply Chain function support Procurement across the organisation?",
    competency: "Organisation",
    description: "Assess how effectively supply chain supports broader procurement needs."
  },
  {
    id: 32,
    text: "Is Supply Chain seen as a shared service across the organisation?",
    competency: "Organisation",
    description: "Evaluate the perception of supply chain as a shared service function."
  },
  {
    id: 33,
    text: "Does Supply Chain have the right skills to add value to the organisation?",
    competency: "People",
    description: "Assess the skill alignment with organizational value creation."
  },
  {
    id: 34,
    text: "How much business knowledge and strategic awareness is demonstrated by Supply Chain people in general?",
    competency: "People",
    description: "Evaluate the business acumen of supply chain personnel."
  },
  {
    id: 35,
    text: "To what extent are the Supply Chain resources available aligned with the role Procurement & Supply Chain is expected to play?",
    competency: "People",
    description: "Assess resource allocation relative to procurement's expected role."
  },
  {
    id: 36,
    text: "To what extent is staff development promoted within Supply Chain function?",
    competency: "People",
    description: "Evaluate the focus on professional development for supply chain staff."
  },
  {
    id: 37,
    text: "For your current role, do you use any technology/systems that requires integration to the Supply Chain system?",
    competency: "Technology, Data & Information",
    description: "Assess system integration requirements in your role."
  },
  {
    id: 38,
    text: "How is information managed and governed across the company?",
    competency: "Technology, Data & Information",
    description: "Evaluate information governance practices company-wide."
  },
  {
    id: 39,
    text: "To what extent are Supply Chain systems integrated across the enterprise?",
    competency: "Technology, Data & Information",
    description: "Assess the level of integration between supply chain and other enterprise systems."
  },
  {
    id: 40,
    text: "To what extent is detailed and accurate spend data easily accessible to the Supply Chain organisation?",
    competency: "Technology, Data & Information",
    description: "Evaluate data accessibility for spend analysis."
  },
  {
    id: 41,
    text: "To what extent is there common coding of spend across the organisation?",
    competency: "Technology, Data & Information",
    description: "Assess standardization of spend classification across the organization."
  },
  {
    id: 42,
    text: "What procurement systems are currently in place to support core capabilities (sourcing, contracting, P2P, category management, supplier relationship management etc.)?",
    competency: "Technology, Data & Information",
    description: "Identify the procurement technology ecosystem currently in use."
  },
  {
    id: 43,
    text: "How comprehensive is Supply Chain performance measurement?",
    competency: "Performance Metrics",
    description: "Assess the breadth and depth of supply chain performance metrics."
  },
  {
    id: 44,
    text: "How effective are the performance management mechanisms in place?",
    competency: "Performance Metrics",
    description: "Evaluate the effectiveness of performance management systems."
  },
  {
    id: 45,
    text: "What is the key objective used to drive Supply Chain decisions?",
    competency: "Performance Metrics",
    description: "Identify the primary decision-making criteria for supply chain choices."
  },
  {
    id: 46,
    text: "In your current role and business unit, how do you track ESG priorities?",
    competency: "Environmental Social and Governance (ESG)",
    description: "Assess methods used to monitor environmental, social and governance goals."
  },
  {
    id: 47,
    text: "What are the ESG (Environmental, Social, Governance) priorities that are considered important in your current role?",
    competency: "Environmental Social and Governance (ESG)",
    description: "Identify key ESG priorities relevant to your function."
  },
  {
    id: 48,
    text: "Does your current business unit track ESD performance?",
    competency: "Enterprise & Supplier Development",
    description: "Assess if enterprise and supplier development metrics are monitored."
  },
  {
    id: 49,
    text: "What key challenges do you face when interacting with ESD suppliers?",
    competency: "Enterprise & Supplier Development",
    description: "Identify obstacles in working with enterprise and supplier development vendors."
  },
];

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [questions] = useState<QuestionType[]>(defaultQuestions);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [userFormData, setUserFormData] = useState<UserFormData | null>(null);

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
        results,
        userFormData,
        setUserFormData
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
