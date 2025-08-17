import { AssessmentResponse, AssessmentScores, AssessmentResult } from '@/types/assessment';
import { correctAnswers } from '@/data/questions';

export const calculateScores = (responses: AssessmentResponse[]): AssessmentScores => {
  const getAverageScore = (category: string, subcategory?: string): number => {
    const relevantResponses = responses.filter(r => 
      r.category === category && (!subcategory || r.subcategory === subcategory)
    );
    
    if (relevantResponses.length === 0) return 0;
    
    const sum = relevantResponses.reduce((acc, response) => {
      // For technical questions, check against correct answers
      if (category === 'technical' && correctAnswers[response.questionId]) {
        return acc + (response.value === correctAnswers[response.questionId] ? 100 : 0);
      }
      // For likert scale questions, convert 1-5 to 0-100
      return acc + ((response.value - 1) / 4) * 100;
    }, 0);
    
    return Math.round(sum / relevantResponses.length);
  };

  const psychometric = {
    interest: getAverageScore('psychometric', 'interest'),
    personality_fit: getAverageScore('psychometric', 'personality_fit'),
    motivation: getAverageScore('psychometric', 'motivation') || 75, // Default if no specific motivation questions
    cognitive_style: getAverageScore('psychometric', 'cognitive_style') || 70, // Default
  };

  const technical = {
    aptitude: getAverageScore('technical', 'aptitude'),
    prerequisite: getAverageScore('technical', 'prerequisite'),
    domain_knowledge: getAverageScore('technical', 'domain_knowledge') || 
                     getAverageScore('technical', 'prerequisite'), // Use prerequisite as fallback
  };

  const wiscar = {
    will: getAverageScore('wiscar', 'will'),
    interest: getAverageScore('wiscar', 'interest'),
    skill: getAverageScore('wiscar', 'skill'),
    cognitive: getAverageScore('wiscar', 'cognitive'),
    ability_to_learn: getAverageScore('wiscar', 'ability_to_learn'),
    real_world: getAverageScore('wiscar', 'real_world'),
  };

  // Calculate overall confidence score
  const allScores = [
    ...Object.values(psychometric),
    ...Object.values(technical),
    ...Object.values(wiscar)
  ];
  const overall_confidence = Math.round(
    allScores.reduce((sum, score) => sum + score, 0) / allScores.length
  );

  return {
    psychometric,
    technical,
    wiscar,
    overall_confidence
  };
};

export const generateRecommendation = (scores: AssessmentScores): AssessmentResult => {
  const { overall_confidence } = scores;
  
  let recommendation: 'Yes' | 'Maybe' | 'No';
  let next_steps: string[];
  let career_paths: string[];

  if (overall_confidence >= 80) {
    recommendation = 'Yes';
    next_steps = [
      'Learn advanced ADDIE model applications',
      'Master Articulate Storyline or similar tools',
      'Study accessibility design principles (WCAG)',
      'Build a portfolio with diverse learning modules'
    ];
    career_paths = [
      'Learning Experience Designer',
      'Senior Instructional Designer',
      'Learning Engineer'
    ];
  } else if (overall_confidence >= 60) {
    recommendation = 'Maybe';
    next_steps = [
      'Strengthen foundational instructional design knowledge',
      'Practice with entry-level authoring tools',
      'Complete projects to build experience',
      'Consider starting as Instructional Design Assistant'
    ];
    career_paths = [
      'Instructional Designer',
      'Multimedia Learning Specialist',
      'Learning Support Coordinator'
    ];
  } else {
    recommendation = 'No';
    next_steps = [
      'Explore related fields that match your strengths',
      'Consider roles in educational content writing',
      'Look into learning operations or support roles',
      'Develop skills in your areas of interest'
    ];
    career_paths = [
      'Educational Content Writer',
      'Learning Support Analyst',
      'Curriculum Coordinator',
      'Training Administrator'
    ];
  }

  return {
    user_id: crypto.randomUUID(),
    assessment_type: 'learning_experience_designer',
    scores,
    recommendation,
    next_steps,
    career_paths,
    generated_on: new Date().toISOString()
  };
};