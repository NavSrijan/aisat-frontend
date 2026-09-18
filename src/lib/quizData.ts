import { QuizManifest } from '@/types/aisat';

export const PRE_AISAT_MBA_UUID = 'c35c9000-0000-4000-8000-000000000003';

export const MBA_QUIZ_IDS = [
  'pre-ai-sat-mba',
  'pre-aisat-mba',
  'aisat-mba',
  'aisat-mba-2026',
  'mba',
  PRE_AISAT_MBA_UUID,
];

export function isMbaQuiz(quizId?: string | null): boolean {
  if (!quizId) return false;
  const lower = quizId.toLowerCase();
  return MBA_QUIZ_IDS.includes(lower) || lower.includes('mba') || lower.includes('non-tech');
}

export const DEFAULT_QUIZ_METADATA: QuizManifest = {
  id: PRE_AISAT_MBA_UUID,
  title: 'Pre AI SAT MBA',
  subtitle: 'Management & Applied AI Pre-Assessment',
  code: 'PRE_AISAT_MBA',
  totalDurationMinutes: 45,
  totalMarks: 160,
  instructions: [
    'Answer based on practical business judgment.',
    'There is no negative marking.',
    'Please maintain full-screen focus throughout the assessment.'
  ],
  sections: [
    {
      id: 'sec-perception',
      title: 'Section 1: AI Confidence & Perception',
      description: 'Self-assessment of your AI usage and confidence',
      durationMinutes: 10,
      questionIds: [],
    },
    {
      id: 'sec-assessment',
      title: 'Section 2: Applied AI Competencies',
      description: 'Objective MCQs evaluating practical AI execution and judgment',
      durationMinutes: 35,
      questionIds: [],
    },
  ],
  questions: [],
};

export function getQuizById(quizId?: string | null): QuizManifest {
  return DEFAULT_QUIZ_METADATA;
}
