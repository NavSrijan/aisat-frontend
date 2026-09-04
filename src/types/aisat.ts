export type InteractionType =
  | 'MCQ_SINGLE'
  | 'MCQ_MULTI'
  | 'FILL_IN_BLANKS'
  | 'NUMERIC'
  | 'MATCH_COLUMNS'
  | 'SHORT_ANSWER'
  | 'CODING_CHALLENGE';

export interface CandidateLead {
  name: string;
  email: string;
  phoneNumber: string;
  college: string;
  branch: string;
  graduationYear: string;
  targetDomain: string;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  codeSnippet?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export interface QuizQuestion {
  id: string;
  sectionId: string;
  type: InteractionType;
  title: string;
  prompt: string;
  codeSnippet?: string;
  language?: string;
  marks: number;
  negativeMarks?: number;
  options?: QuestionOption[];
  matchPairs?: {
    leftItems: { id: string; text: string }[];
    rightItems: { id: string; text: string }[];
  };
  blanksCount?: number;
  numericTolerance?: number;
  numericUnit?: string;
  starterCode?: Record<string, string>;
  testCases?: TestCase[];
  explanationHint?: string;
}

export interface QuizSection {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  questionIds: string[];
}

export interface QuizManifest {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  totalDurationMinutes: number;
  totalMarks: number;
  instructions: string[];
  sections: QuizSection[];
  questions: QuizQuestion[];
}

export interface UserResponse {
  questionId: string;
  type: InteractionType;
  answer: any; // e.g. optionId | optionIds[] | blanks map | numeric value | match map | code
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
  lastSavedAt?: string;
}
