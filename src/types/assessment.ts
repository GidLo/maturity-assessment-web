
export type CompetencyName = 
  | 'Supply Chain Vision and Strategy'
  | 'Category Management'
  | 'Strategic Sourcing'
  | 'Contract & Compliance Management'
  | 'Transaction Management'
  | 'Supplier Management'
  | 'Warehousing Operations'
  | 'Supply Management'
  | 'Risk Management'
  | 'Organisation'
  | 'People'
  | 'Technology, Data & Information'
  | 'Performance Metrics'
  | 'Environmental Social and Governance (ESG)'
  | 'Enterprise & Supplier Development';

export type QuestionType = {
  id: number;
  text: string;
  competency: CompetencyName;
  description?: string;
};

export type AnswerType = {
  questionId: number;
  rating: number;
};

export type CompetencyResult = {
  name: CompetencyName;
  score: number;
  maxScore: number;
  percentage: number;
};

export type AssessmentResults = {
  competencies: CompetencyResult[];
  overallScore: number;
  maxPossibleScore: number;
  completedAt: string;
};
