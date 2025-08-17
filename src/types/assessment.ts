export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  text: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
}

export interface AssessmentResponse {
  questionId: string;
  value: number;
  category: string;
  subcategory?: string;
}

export interface AssessmentScores {
  psychometric: {
    interest: number;
    personality_fit: number;
    motivation: number;
    cognitive_style: number;
  };
  technical: {
    aptitude: number;
    prerequisite: number;
    domain_knowledge: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability_to_learn: number;
    real_world: number;
  };
  overall_confidence: number;
}

export interface AssessmentResult {
  user_id: string;
  assessment_type: string;
  scores: AssessmentScores;
  recommendation: 'Yes' | 'Maybe' | 'No';
  next_steps: string[];
  career_paths: string[];
  generated_on: string;
}