'use client';

import React, { useState, useEffect, useRef, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { SAMPLE_AISAT_QUIZ } from '@/lib/quizData';
import { CandidateLead, QuizQuestion, UserResponse } from '@/types/aisat';
import { aisatApi } from '@/lib/api';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuestionPalette } from '@/components/quiz/QuestionPalette';
import { SubmitModal } from '@/components/quiz/SubmitModal';
import { TabSwitchWarningModal } from '@/components/quiz/TabSwitchWarningModal';
import { useExamIntegrity } from '@/hooks/useExamIntegrity';

// Question Renderers
import { MCQSingleRenderer } from '@/components/quiz/renderers/MCQSingleRenderer';
import { MCQMultiRenderer } from '@/components/quiz/renderers/MCQMultiRenderer';
import { FillBlankRenderer } from '@/components/quiz/renderers/FillBlankRenderer';
import { NumericRenderer } from '@/components/quiz/renderers/NumericRenderer';
import { MatchColumnsRenderer } from '@/components/quiz/renderers/MatchColumnsRenderer';
import { ShortAnswerRenderer } from '@/components/quiz/renderers/ShortAnswerRenderer';
import { CodingRenderer } from '@/components/quiz/renderers/CodingRenderer';

import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCcw,
} from 'lucide-react';

// Helper to format frontend state to backend AnswerPayload schema
function formatAnswerForBackend(type: string, rawAnswer: any): any {
  if (rawAnswer === null || rawAnswer === undefined || rawAnswer === '') {
    return { unattempted: true };
  }

  switch (type) {
    case 'MCQ_SINGLE':
      return {
        optionIds: typeof rawAnswer === 'string' ? [rawAnswer] : Array.isArray(rawAnswer) ? rawAnswer : [String(rawAnswer)],
      };
    case 'MCQ_MULTI':
      return {
        optionIds: Array.isArray(rawAnswer) ? rawAnswer : [String(rawAnswer)],
      };
    case 'FILL_IN_BLANKS':
      if (typeof rawAnswer === 'object' && !Array.isArray(rawAnswer)) {
        return { blanks: rawAnswer };
      }
      return { blanks: { '0': String(rawAnswer) } };
    case 'NUMERIC':
      const num = typeof rawAnswer === 'number' ? rawAnswer : parseFloat(String(rawAnswer));
      return { value: isNaN(num) ? 0 : num };
    case 'MATCH_COLUMNS':
      if (typeof rawAnswer === 'object' && !Array.isArray(rawAnswer)) {
        const pairs = Object.entries(rawAnswer).map(([leftId, rightId]) => ({
          leftId,
          rightId: String(rightId),
        }));
        return { pairs };
      }
      return { pairs: [] };
    case 'SHORT_ANSWER':
      return { text: String(rawAnswer) };
    case 'CODING_CHALLENGE':
      return { code: String(rawAnswer), language: 'python' };
    default:
      return typeof rawAnswer === 'object' ? rawAnswer : { value: rawAnswer };
  }
}

// Helper to extract frontend state from backend AnswerPayload
function parseAnswerFromBackend(type: string, backendAnswer: any): any {
  if (!backendAnswer || backendAnswer.unattempted) return null;
  switch (type) {
    case 'MCQ_SINGLE':
      return backendAnswer.optionIds?.[0] ?? null;
    case 'MCQ_MULTI':
      return backendAnswer.optionIds ?? [];
    case 'FILL_IN_BLANKS':
      return backendAnswer.blanks ?? null;
    case 'NUMERIC':
      return backendAnswer.value ?? null;
    case 'MATCH_COLUMNS':
      if (Array.isArray(backendAnswer.pairs)) {
        const pairsObj: Record<string, string> = {};
        backendAnswer.pairs.forEach((p: any) => {
          if (p?.leftId && p?.rightId) pairsObj[p.leftId] = p.rightId;
        });
        return pairsObj;
      }
      return backendAnswer.pairs ?? null;
    case 'SHORT_ANSWER':
      return backendAnswer.text ?? null;
    case 'CODING_CHALLENGE':
      return backendAnswer.code ?? null;
    default:
      return backendAnswer;
  }
}

interface PageProps {
  params: Promise<{ quizId: string }>;
}

export default function QuizPlayerPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const quiz = SAMPLE_AISAT_QUIZ;

  const [candidate, setCandidate] = useState<CandidateLead | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>(SAMPLE_AISAT_QUIZ.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, UserResponse>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  const [serverDeadlineAt, setServerDeadlineAt] = useState<string | null>(null);
  const [serverRemainingSec, setServerRemainingSec] = useState<number | null>(null);
  const [timerType, setTimerType] = useState<'PER_STUDENT' | 'GLOBAL'>('PER_STUDENT');
  const [maxViolationsConfig, setMaxViolationsConfig] = useState(3);

  const {
    violationCount,
    isWarningOpen,
    lastAwayDurationMs,
    closeWarning,
    maxViolations,
  } = useExamIntegrity({
    attemptId,
    enabled: !!attemptId && !isSubmitting,
    maxViolations: maxViolationsConfig,
    onLimitExceeded: () => {
      handleConfirmSubmit('AUTO_SUBMIT_TAB_SWITCH');
    },
  });

  useEffect(() => {
    let isMounted = true;

    const initAttempt = async () => {
      const rawCandidate = sessionStorage.getItem('aisat_candidate');
      if (rawCandidate) {
        try {
          setCandidate(JSON.parse(rawCandidate));
        } catch (e) {
          console.error('Failed to parse candidate data', e);
        }
      }

      const paramId = resolvedParams.quizId;
      const targetQuizId =
        paramId && paramId.includes('-') && paramId.length === 36
          ? paramId
          : 'a15a7000-0000-4000-8000-000000000001';

      const token = aisatApi.getToken();
      if (!token) {
        // Must register with OTP first
        router.push('/');
        return;
      }

      try {
        const attemptRes = await aisatApi.startAttempt(targetQuizId);
        if (!isMounted) return;

        if (attemptRes?.data?.attempt) {
          setAttemptId(attemptRes.data.attempt.attemptId);
          setServerDeadlineAt(attemptRes.data.attempt.deadlineAt);
          setServerRemainingSec(attemptRes.data.attempt.remainingSec);
          if (attemptRes.data.quiz?.timerType) {
            setTimerType(attemptRes.data.quiz.timerType as 'PER_STUDENT' | 'GLOBAL');
          }
          if (attemptRes.data.quiz?.maxViolations) {
            setMaxViolationsConfig(attemptRes.data.quiz.maxViolations);
          }

          if (attemptRes.data.items && attemptRes.data.items.length > 0) {
            const backendItems = attemptRes.data.items;
            const mergedQuestions = backendItems.map((bItem: any, idx: number) => {
              const template =
                SAMPLE_AISAT_QUIZ.questions.find((q) => q.itemVersionId === bItem.itemVersionId) ||
                SAMPLE_AISAT_QUIZ.questions.find((q) => q.prompt === bItem.stem) ||
                SAMPLE_AISAT_QUIZ.questions[idx] || {
                  id: bItem.itemVersionId || `q_${idx + 1}`,
                  sectionId: 'sec-a',
                  type: bItem.interactionType || 'MCQ_SINGLE',
                  title: `Question ${idx + 1}`,
                  prompt: bItem.stem,
                  options: bItem.options,
                  marks: bItem.points || 4,
                };
              return {
                ...template,
                id: template.id || bItem.itemVersionId || `q_${idx + 1}`,
                itemVersionId: bItem.itemVersionId,
                prompt: bItem.stem || template.prompt,
                options: bItem.options && bItem.options.length > 0 ? bItem.options : template.options,
              };
            });
            setQuestions(mergedQuestions);

            // Restore drafts if resuming attempt
            const restored: Record<string, UserResponse> = {};
            backendItems.forEach((bItem: any, idx: number) => {
              const q = mergedQuestions[idx];
              if (bItem.savedAnswer !== undefined && bItem.savedAnswer !== null) {
                const parsed = parseAnswerFromBackend(q.type, bItem.savedAnswer);
                if (parsed !== null) {
                  restored[q.id] = {
                    questionId: q.id,
                    type: q.type,
                    answer: parsed,
                    isMarkedForReview: false,
                    timeSpentSeconds: 15,
                  };
                }
              }
            });
            if (Object.keys(restored).length > 0) {
              setResponses((prev) => ({ ...restored, ...prev }));
            }
          }
        }
      } catch (err) {
        console.error('Backend startAttempt error:', err);
      }
    };

    initAttempt();
    return () => {
      isMounted = false;
    };
  }, [resolvedParams.quizId]);

  const currentQuestion: QuizQuestion = questions[currentIndex] || questions[0];
  const activeSectionId = currentQuestion.sectionId;

  const currentResponse = responses[currentQuestion.id] || {
    questionId: currentQuestion.id,
    type: currentQuestion.type,
    answer: null,
    isMarkedForReview: false,
    timeSpentSeconds: 0,
  };

  const handleAnswerChange = async (answer: any) => {
    setIsSaving(true);
    const updated: UserResponse = {
      ...currentResponse,
      answer,
      lastSavedAt: new Date().toISOString(),
    };

    const newResponses = {
      ...responses,
      [currentQuestion.id]: updated,
    };
    setResponses(newResponses);
    sessionStorage.setItem('aisat_responses', JSON.stringify(newResponses));

    if (attemptId && currentQuestion.itemVersionId) {
      try {
        const formatted = formatAnswerForBackend(currentQuestion.type, answer);
        await aisatApi.saveResponse(attemptId, currentQuestion.itemVersionId, formatted, updated.timeSpentSeconds || 15);
      } catch (e) {
        console.warn('Background response save error:', e);
      }
    }

    setTimeout(() => {
      setIsSaving(false);
    }, 300);
  };

  const handleToggleMarkForReview = () => {
    const updated: UserResponse = {
      ...currentResponse,
      isMarkedForReview: !currentResponse.isMarkedForReview,
    };
    setResponses({
      ...responses,
      [currentQuestion.id]: updated,
    });
  };

  const handleClearResponse = () => {
    const updated: UserResponse = {
      ...currentResponse,
      answer: null,
    };
    setResponses({
      ...responses,
      [currentQuestion.id]: updated,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectSection = (sectionId: string) => {
    const targetIdx = questions.findIndex((q) => q.sectionId === sectionId);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
    }
  };

  const handleConfirmSubmit = useCallback(async (submitReason?: string) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    const paramId = resolvedParams.quizId;
    const targetQuizId =
      paramId && paramId.includes('-') && paramId.length === 36
        ? paramId
        : 'a15a7000-0000-4000-8000-000000000001';

    let backendResult: any = null;

    try {
      if (attemptId) {
        const answersPayload = questions
          .filter((q) => !!q.itemVersionId)
          .map((q) => {
            const r = responses[q.id];
            const formatted = formatAnswerForBackend(q.type, r?.answer);
            return {
              itemVersionId: q.itemVersionId!,
              answer: formatted,
              timeSpentSec: r?.timeSpentSeconds || 15,
            };
          });

        const submitRes = await aisatApi.submitAttempt(attemptId, answersPayload, submitReason || 'USER_SUBMIT');
        backendResult = submitRes.data;
      }

      const submissionPayload = {
        quizId: targetQuizId,
        attemptId,
        candidate,
        result: backendResult,
        responses,
        submitReason: submitReason || 'USER_SUBMIT',
        submittedAt: new Date().toISOString(),
      };
      sessionStorage.setItem('aisat_final_submission', JSON.stringify(submissionPayload));

      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setIsSubmitModalOpen(false);
      router.push('/test/completed');
    } catch (err: any) {
      console.error('Failed to submit attempt to backend:', err);
      setSubmitError(err?.message || 'Submission failed');
      const fallbackPayload = {
        quizId: targetQuizId,
        attemptId,
        candidate,
        responses,
        submitReason: submitReason || 'USER_SUBMIT',
        submittedAt: new Date().toISOString(),
        error: err?.message,
      };
      sessionStorage.setItem('aisat_final_submission', JSON.stringify(fallbackPayload));
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setIsSubmitModalOpen(false);
      router.push('/test/completed');
    }
  }, [attemptId, candidate, questions, responses, resolvedParams.quizId, router]);

  const renderInteractionWidget = () => {
    switch (currentQuestion.type) {
      case 'MCQ_SINGLE':
        return (
          <MCQSingleRenderer
            question={currentQuestion}
            value={currentResponse.answer}
            onChange={handleAnswerChange}
          />
        );
      case 'MCQ_MULTI':
        return (
          <MCQMultiRenderer
            question={currentQuestion}
            value={currentResponse.answer}
            onChange={handleAnswerChange}
          />
        );
      case 'FILL_IN_BLANKS':
        return (
          <FillBlankRenderer
            question={currentQuestion}
            value={currentResponse.answer}
            onChange={handleAnswerChange}
          />
        );
      case 'NUMERIC':
        return (
          <NumericRenderer
            question={currentQuestion}
            value={currentResponse.answer}
            onChange={handleAnswerChange}
          />
        );
      case 'MATCH_COLUMNS':
        return (
          <MatchColumnsRenderer
            question={currentQuestion}
            value={currentResponse.answer}
            onChange={handleAnswerChange}
          />
        );
      case 'SHORT_ANSWER':
        return (
          <ShortAnswerRenderer
            question={currentQuestion}
            value={currentResponse.answer}
            onChange={handleAnswerChange}
          />
        );
      case 'CODING_CHALLENGE':
        return (
          <CodingRenderer
            question={currentQuestion}
            value={currentResponse.answer}
            onChange={handleAnswerChange}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  const answeredCount = Object.values(responses).filter(
    (r) => r.answer !== null && r.answer !== '' && (!Array.isArray(r.answer) || r.answer.length > 0)
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] text-gray-900">
      {/* Quiz Sticky Header */}
      <QuizHeader
        title={quiz.title}
        sections={quiz.sections}
        activeSectionId={activeSectionId}
        onSelectSection={handleSelectSection}
        durationMinutes={quiz.totalDurationMinutes}
        serverDeadlineAt={serverDeadlineAt}
        serverRemainingSec={serverRemainingSec}
        timerType={timerType}
        onTimeExpired={() => handleConfirmSubmit('TIME_EXPIRED')}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
        isSaving={isSaving}
        candidate={candidate}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
      />

      {/* Main Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Question Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#FFC700] text-gray-950 font-bold text-xs">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  {currentQuestion.comp && (
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-semibold text-xs border border-gray-200">
                      {currentQuestion.comp}
                    </span>
                  )}
                  {currentQuestion.tier && (
                    <span className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 font-medium text-xs border border-gray-200">
                      {currentQuestion.tier}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 font-medium">
                    {currentQuestion.type.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    +{currentQuestion.marks} Marks
                  </span>
                  {currentQuestion.negativeMarks && (
                    <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                      -{currentQuestion.negativeMarks} Negative
                    </span>
                  )}
                </div>
              </div>

              {/* Shared Section Transcript (e.g. Section D) */}
              {currentQuestion.transcript && (
                <div className="mb-6 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    Execution Log Transcript
                  </div>
                  <pre className="p-4 rounded-xl bg-gray-900 text-amber-100 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap overflow-x-auto border border-gray-800">
                    {currentQuestion.transcript}
                  </pre>
                  <div className="text-[11px] text-gray-400 italic">
                    Note: Transcript stays the same across questions in this section.
                  </div>
                </div>
              )}

              {/* Question Context (e.g. Section C) */}
              {currentQuestion.context && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <span className="font-bold block mb-1">Scenario Context:</span>
                  {currentQuestion.context}
                </div>
              )}

              {/* Question Prompt */}
              <div className="space-y-3 mb-6">
                <h3 className="font-bold text-base text-gray-900 leading-snug">
                  {currentQuestion.title}
                </h3>
                <div className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line font-medium">
                  {currentQuestion.prompt}
                </div>
              </div>

              {/* Dynamic Interaction Renderer */}
              <div className="pt-2 pb-6">
                {renderInteractionWidget()}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkForReview}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      currentResponse.isMarkedForReview
                        ? 'bg-purple-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{currentResponse.isMarkedForReview ? 'Marked' : 'Mark for Review'}</span>
                  </button>

                  <button
                    onClick={handleClearResponse}
                    className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-xs"
                    title="Clear response"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === questions.length - 1}
                    className="btn-capabl px-5 py-2 rounded-lg text-xs font-bold text-black flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {candidate && (
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Candidate
                </div>
                <div className="font-extrabold text-base text-gray-950">{candidate.name}</div>
                <div className="text-xs text-gray-500 truncate mt-0.5">
                  {candidate.college}{candidate.rollNumber ? ` • Roll: ${candidate.rollNumber}` : ''}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {candidate.branch} • Class of {candidate.graduationYear}
                </div>
              </div>
            )}

            <QuestionPalette
              questions={questions}
              currentIndex={currentIndex}
              onSelectIndex={(idx) => setCurrentIndex(idx)}
              responses={responses}
            />
          </div>

        </div>
      </main>

      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        questions={questions}
        responses={responses}
        isSubmitting={isSubmitting}
      />

      <TabSwitchWarningModal
        isOpen={isWarningOpen}
        onClose={closeWarning}
        violationCount={violationCount}
        maxViolations={maxViolations}
        awayDurationMs={lastAwayDurationMs}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onRetrySubmit={() => handleConfirmSubmit('AUTO_SUBMIT_TAB_SWITCH')}
      />
    </div>
  );
}
