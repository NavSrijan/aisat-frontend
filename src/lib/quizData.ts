import { QuizManifest } from '@/types/aisat';
import rawTechQuizManifest from '@/data/quizManifest.json';
import rawMbaQuizManifest from '@/data/preAiSatMbaManifest.json';

export const SAMPLE_AISAT_QUIZ: QuizManifest = rawTechQuizManifest as unknown as QuizManifest;
export const PRE_AI_SAT_MBA_QUIZ: QuizManifest = rawMbaQuizManifest as unknown as QuizManifest;

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

export function getQuizById(quizId?: string | null): QuizManifest {
  if (isMbaQuiz(quizId)) {
    return PRE_AI_SAT_MBA_QUIZ;
  }
  return SAMPLE_AISAT_QUIZ;
}
