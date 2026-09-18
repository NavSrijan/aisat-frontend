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
  totalDurationMinutes: 40,
  totalMarks: 48,
  instructions: [
    'Answer based on practical business judgment.',
    'There is no negative marking.',
    'Please maintain full-screen focus throughout the assessment.'
  ],
  sections: [
    {
      id: 'sec-perception',
      title: 'Section 1: Perception',
      description: 'Self-perceived capability (12 Questions)',
      durationMinutes: 8,
      questionIds: [],
    },
    {
      id: 'sec-core',
      title: 'Section 2: Core Competencies',
      description: 'Demonstrated AI capability across 9 competencies (36 Questions)',
      durationMinutes: 24,
      questionIds: [],
    },
    {
      id: 'sec-tools',
      title: 'Section 3: Tool-Specific Tests',
      description: 'Demonstrated depth in ChatGPT, Claude, NotebookLM, n8n (12 Questions)',
      durationMinutes: 8,
      questionIds: [],
    },
  ],
  questions: [],
};

export function getQuizById(quizId?: string | null): QuizManifest {
  return DEFAULT_QUIZ_METADATA;
}
