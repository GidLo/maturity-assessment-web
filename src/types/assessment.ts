
export type CompetencyName = 
  | 'Strategic Thinking'
  | 'Leadership'
  | 'Technical Expertise'
  | 'Communication'
  | 'Innovation'
  | 'Operational Excellence';

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
