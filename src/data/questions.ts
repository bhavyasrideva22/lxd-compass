import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric - Interest
  {
    id: 'p1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    text: 'I enjoy crafting learning modules that are both engaging and accessible.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    text: 'I find myself excited about making complex topics easier to understand.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    text: 'I am passionate about using technology to enhance learning experiences.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },

  // Psychometric - Personality Fit
  {
    id: 'p4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality_fit',
    text: 'I am naturally empathetic and can easily understand others\' perspectives.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality_fit',
    text: 'I prefer working on creative projects rather than purely analytical tasks.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'p6',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality_fit',
    text: 'I pay close attention to detail and rarely miss important elements.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },

  // Technical - Aptitude
  {
    id: 't1',
    type: 'scenario',
    category: 'technical',
    subcategory: 'aptitude',
    text: 'You receive feedback that learners are struggling with a complex concept in your course. What is your BEST first approach?',
    options: [
      'Add more detailed explanations and examples',
      'Break the concept into smaller, digestible chunks',
      'Create an interactive simulation or hands-on activity',
      'Survey learners to understand their specific difficulties'
    ]
  },
  {
    id: 't2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'prerequisite',
    text: 'Which learning model emphasizes iterative design and continuous feedback?',
    options: ['ADDIE', 'SAM (Successive Approximation Model)', 'Bloom\'s Taxonomy', 'Kirkpatrick Model']
  },
  {
    id: 't3',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'prerequisite',
    text: 'What does WCAG primarily address in learning design?',
    options: ['Content organization', 'Accessibility standards', 'Assessment methods', 'Technology integration']
  },

  // WISCAR Framework
  {
    id: 'w1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    text: 'I persist through challenging design problems even when solutions aren\'t immediately obvious.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    text: 'I actively seek out new learning technologies and design trends to explore.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w3',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    text: 'I have experience creating educational content or training materials.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w4',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive',
    text: 'I can easily balance analytical thinking with creative problem-solving.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w5',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability_to_learn',
    text: 'I welcome feedback and use it to improve my work.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'w6',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'real_world',
    text: 'I enjoy collaborating with subject matter experts and stakeholders.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  }
];

// Correct answers for multiple choice/scenario questions
export const correctAnswers: { [key: string]: number } = {
  't1': 3, // Interactive simulation is best practice
  't2': 1, // SAM model
  't3': 1  // Accessibility standards
};