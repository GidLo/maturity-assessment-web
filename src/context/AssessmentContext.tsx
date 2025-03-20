
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
    text: "I develop and communicate a clear vision for the future.",
    competency: "Strategic Thinking",
    description: "Evaluate your ability to establish and share a compelling long-term direction."
  },
  {
    id: 2,
    text: "I identify market trends and opportunities ahead of competitors.",
    competency: "Strategic Thinking",
    description: "Consider how well you recognize evolving patterns and potential areas for growth."
  },
  {
    id: 3,
    text: "I make decisions based on long-term outcomes rather than short-term gains.",
    competency: "Strategic Thinking",
    description: "Assess your tendency to prioritize sustainable results over immediate benefits."
  },
  {
    id: 4,
    text: "I inspire others to achieve beyond what they thought possible.",
    competency: "Leadership",
    description: "Reflect on your ability to motivate others to exceed their perceived limitations."
  },
  {
    id: 5,
    text: "I provide clear direction and constructive feedback to team members.",
    competency: "Leadership",
    description: "Evaluate how effectively you guide and provide insights to improve team performance."
  },
  {
    id: 6,
    text: "I remain composed and effective when facing challenges or setbacks.",
    competency: "Leadership",
    description: "Consider your resilience and ability to maintain performance under pressure."
  },
  {
    id: 7,
    text: "I am proficient with the technical tools and methodologies required for my role.",
    competency: "Technical Expertise",
    description: "Assess your mastery of the specialized skills needed in your position."
  },
  {
    id: 8,
    text: "I continuously update my technical knowledge to stay current with industry developments.",
    competency: "Technical Expertise",
    description: "Evaluate your commitment to ongoing learning and professional development."
  },
  {
    id: 9,
    text: "I effectively apply technical knowledge to solve complex problems.",
    competency: "Technical Expertise",
    description: "Consider how well you utilize your expertise to address complicated challenges."
  },
  {
    id: 10,
    text: "I express ideas clearly and concisely in both written and verbal communication.",
    competency: "Communication",
    description: "Reflect on your ability to articulate thoughts effectively across different mediums."
  },
  {
    id: 11,
    text: "I listen attentively and ensure I understand others' perspectives before responding.",
    competency: "Communication",
    description: "Assess your receptiveness to others' input and comprehension before formulating responses."
  },
  {
    id: 12,
    text: "I tailor my communication style to suit different audiences and situations.",
    competency: "Communication",
    description: "Evaluate your adaptability in how you communicate based on context and recipients."
  },
  {
    id: 13,
    text: "I generate original ideas that create value for the organization.",
    competency: "Innovation",
    description: "Consider your capacity to develop novel concepts that benefit your company."
  },
  {
    id: 14,
    text: "I encourage and support creative thinking among team members.",
    competency: "Innovation",
    description: "Reflect on how you foster and nurture innovation in others."
  },
  {
    id: 15,
    text: "I am willing to challenge conventional approaches to find better solutions.",
    competency: "Innovation",
    description: "Assess your readiness to question established methods in pursuit of improvements."
  },
  {
    id: 16,
    text: "I establish efficient processes that optimize productivity.",
    competency: "Operational Excellence",
    description: "Evaluate your ability to create streamlined workflows that enhance output."
  },
  {
    id: 17,
    text: "I consistently deliver high-quality work that meets or exceeds standards.",
    competency: "Operational Excellence",
    description: "Consider your track record of producing exceptional results that satisfy requirements."
  },
  {
    id: 18,
    text: "I identify and eliminate inefficiencies in work processes.",
    competency: "Operational Excellence",
    description: "Assess how effectively you recognize and remove obstacles to productivity."
  },
  {
    id: 19,
    text: "I adapt quickly to changing priorities and requirements.",
    competency: "Strategic Thinking",
    description: "Reflect on your flexibility when faced with shifting objectives."
  },
  {
    id: 20,
    text: "I maintain a balanced perspective on both immediate needs and future goals.",
    competency: "Strategic Thinking",
    description: "Evaluate your ability to address current demands while keeping sight of long-term objectives."
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
