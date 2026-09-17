'use client';

import React, { useState, useEffect, useRef, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { SAMPLE_AISAT_QUIZ, getQuizById, isMbaQuiz, PRE_AISAT_MBA_UUID } from '@/lib/quizData';
import { CandidateLead, QuizQuestion, UserResponse, InteractionType } from '@/types/aisat';
import { aisatApi, AttemptViewItem } from '@/lib/api';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuestionPalette } from '@/components/quiz/QuestionPalette';
import { SubmitModal } from '@/components/quiz/SubmitModal';
import { TabSwitchWarningModal } from '@/components/quiz/TabSwitchWarningModal';
import { RegistrationModal } from '@/components/landing/RegistrationModal';
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
  Maximize2,
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
  const paramId = resolvedParams.quizId;
  const isMba = isMbaQuiz(paramId);
  const quiz = getQuizById(paramId);

  const targetQuizId =
    paramId && paramId.includes('-') && paramId.length === 36
      ? paramId
      : isMba
      ? PRE_AISAT_MBA_UUID
      : '03afd2a8-2294-4e37-b81b-722300f66d81';

  const [mounted, setMounted] = useState(false);
  const [candidate, setCandidate] = useState<CandidateLead | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>(quiz.questions || []);
  const [quizTitle, setQuizTitle] = useState<string>(quiz.title);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [authVersion, setAuthVersion] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, UserResponse>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  const [serverDeadlineAt, setServerDeadlineAt] = useState<string | null>(null);
  const [serverRemainingSec, setServerRemainingSec] = useState<number | null>(quiz.totalDurationMinutes * 60);
  const [timerType, setTimerType] = useState<'PER_STUDENT' | 'GLOBAL'>('PER_STUDENT');
  const [maxViolationsConfig, setMaxViolationsConfig] = useState(3);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    violationCount,
    isWarningOpen,
    lastAwayDurationMs,
    lastViolationType,
    isFullscreen,
    enterFullscreen,
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

      const token = aisatApi.getToken();
      if (!token) {
        setIsLoading(false);
        setIsAuthModalOpen(true);
        return;
      }

      try {
        setIsLoading(true);
        const attemptRes = await aisatApi.startAttempt(targetQuizId);
        if (!isMounted) return;

        if (attemptRes?.data?.quiz?.title) {
          setQuizTitle(attemptRes.data.quiz.title);
        }

        if (attemptRes?.data?.attempt) {
          const loadedAttemptId = attemptRes.data.attempt.attemptId;
          setAttemptId(loadedAttemptId);
          setServerDeadlineAt(attemptRes.data.attempt.deadlineAt);
          setServerRemainingSec(attemptRes.data.attempt.remainingSec);
          if (attemptRes.data.attempt.status === 'IN_PROGRESS') {
            try {
              sessionStorage.removeItem(`aisat_submitted_${loadedAttemptId}`);
            } catch (_) {}
          }
          if (attemptRes.data.quiz?.timerType) {
            setTimerType(attemptRes.data.quiz.timerType as 'PER_STUDENT' | 'GLOBAL');
          }
          if (attemptRes.data.quiz?.maxViolations) {
            setMaxViolationsConfig(attemptRes.data.quiz.maxViolations);
          }

          if (attemptRes.data.items && attemptRes.data.items.length > 0) {
            const backendItems = attemptRes.data.items;
            const mergedQuestions = backendItems.map((bItem: AttemptViewItem, idx: number) => {
              const stemObj = typeof bItem.stem === 'object' && bItem.stem !== null ? bItem.stem : null;
              const promptText = stemObj ? (stemObj.text || (stemObj as Record<string, any>).prompt || '') : (typeof bItem.stem === 'string' ? bItem.stem : '');

              const template =
                quiz.questions.find((q) => q.itemVersionId === bItem.itemVersionId) ||
                quiz.questions.find((q) => q.prompt === promptText) ||
                quiz.questions[idx] || {
                  id: bItem.itemVersionId || `q_${idx + 1}`,
                  sectionId: stemObj?.sectionId || 'sec-a',
                  type: bItem.interactionType || 'MCQ_SINGLE',
                  title: `Question ${idx + 1}`,
                  prompt: promptText,
                  options: bItem.options,
                  marks: bItem.points || 4,
                };
              return {
                ...template,
                id: template.id || bItem.itemVersionId || `q_${idx + 1}`,
                itemVersionId: bItem.itemVersionId,
                type: (bItem.interactionType || template.type || 'MCQ_SINGLE') as InteractionType,
                title: template.title || `Question ${idx + 1}`,
                prompt: promptText || template.prompt || '',
                options: Array.isArray(bItem.options) && bItem.options.length > 0 ? bItem.options : template.options,
                matchPairs: bItem.options?.matchPairs || (bItem.options?.leftItems ? bItem.options : template.matchPairs),
                marks: bItem.points ?? template.marks ?? 4,
                context: (stemObj?.context && typeof stemObj.context === 'string') ? stemObj.context : template.context,
                tier: (stemObj?.tier && typeof stemObj.tier === 'string') ? stemObj.tier : template.tier,
                comp: (stemObj?.comp && typeof stemObj.comp === 'string') ? stemObj.comp : template.comp,
                transcript: (stemObj?.transcript && typeof stemObj.transcript === 'string') ? stemObj.transcript : template.transcript,
                codeSnippet: stemObj?.code || template.codeSnippet,
                language: stemObj?.language || template.language,
              };
            });
            setQuestions(mergedQuestions);

            const restored: Record<string, UserResponse> = {};
            let firstUnansweredIdx = 0;
            let foundUnanswered = false;

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
                } else if (!foundUnanswered) {
                  firstUnansweredIdx = idx;
                  foundUnanswered = true;
                }
              } else if (!foundUnanswered) {
                firstUnansweredIdx = idx;
                foundUnanswered = true;
              }
            });

            if (Object.keys(restored).length > 0) {
              setResponses((prev) => ({ ...restored, ...prev }));
              setCurrentIndex(foundUnanswered ? firstUnansweredIdx : Math.max(0, mergedQuestions.length - 1));
            }
          }
        }
      } catch (err: any) {
        console.error('Backend startAttempt error:', err);
        if (isMounted) {
          const errMsg = err?.message || err?.response?.data?.message || err?.response?.data?.error || 'Failed to start assessment';
          if (
            errMsg.includes('401') ||
            errMsg.toLowerCase().includes('unauthorized') ||
            errMsg.toLowerCase().includes('token')
          ) {
            sessionStorage.removeItem('aisat_token');
            setIsAuthModalOpen(true);
          } else {
            setLoadError(errMsg);
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initAttempt();
    return () => {
      isMounted = false;
    };
  }, [resolvedParams.quizId, authVersion]);

  const currentQuestion: QuizQuestion | undefined = questions[currentIndex] || questions[0];
  const activeSectionId = currentQuestion?.sectionId || 'sec-perception';

  const currentResponse = (currentQuestion ? responses[currentQuestion.id] : undefined) || {
    questionId: currentQuestion?.id || '',
    type: currentQuestion?.type || 'MCQ_SINGLE',
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

    if (attemptId && currentQuestion.itemVersionId && !attemptId.startsWith('offline_')) {
      try {
        const formatted = formatAnswerForBackend(currentQuestion.type, answer);
        await aisatApi.saveResponse(attemptId, currentQuestion.itemVersionId, formatted, updated.timeSpentSeconds || 15);
      } catch (e) {
        console.warn('Background response save error:', e);
      }
    }

    setTimeout(() => {
      setIsSaving(false);
    }, 200);
  };

  const handleToggleMarkForReview = () => {
    const updated: UserResponse = {
      ...currentResponse,
      isMarkedForReview: !currentResponse.isMarkedForReview,
    };
    const nextResponses = {
      ...responses,
      [currentQuestion.id]: updated,
    };
    setResponses(nextResponses);
    sessionStorage.setItem('aisat_responses', JSON.stringify(nextResponses));
  };

  const handleClearResponse = () => {
    const updated: UserResponse = {
      ...currentResponse,
      answer: null,
    };
    const nextResponses = {
      ...responses,
      [currentQuestion.id]: updated,
    };
    setResponses(nextResponses);
    sessionStorage.setItem('aisat_responses', JSON.stringify(nextResponses));
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

  const handleConfirmSubmit = useCallback(async (submitReason?: any) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    const safeReason = typeof submitReason === 'string' ? submitReason : 'USER_SUBMIT';
    let backendResult: any = null;

    try {
      if (attemptId && !attemptId.startsWith('offline_')) {
        const answersPayload = questions
          .filter((q) => {
            const r = responses[q.id];
            return (
              !!q.itemVersionId &&
              r?.answer !== null &&
              r?.answer !== undefined &&
              r?.answer !== '' &&
              (!Array.isArray(r.answer) || r.answer.length > 0)
            );
          })
          .map((q) => {
            const r = responses[q.id];
            const formatted = formatAnswerForBackend(q.type, r?.answer);
            return {
              itemVersionId: q.itemVersionId!,
              answer: formatted,
              timeSpentSec: r?.timeSpentSeconds || 15,
            };
          });

        const submitRes = await aisatApi.submitAttempt(attemptId, answersPayload, safeReason);
        backendResult = submitRes.data;
      }

      const submissionPayload = {
        quizId: targetQuizId,
        attemptId: attemptId || `attempt_${Date.now()}`,
        candidate,
        result: backendResult,
        responses,
        submitReason: safeReason,
        submittedAt: new Date().toISOString(),
      };
      sessionStorage.setItem('aisat_final_submission', JSON.stringify(submissionPayload));

      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setIsSubmitModalOpen(false);
      router.push('/test/completed');
    } catch (err: any) {
      console.error('Failed to submit attempt:', err);
      const submissionPayload = {
        quizId: targetQuizId,
        attemptId: attemptId || `attempt_${Date.now()}`,
        candidate,
        result: backendResult,
        responses,
        submitReason: safeReason,
        submittedAt: new Date().toISOString(),
      };
      sessionStorage.setItem('aisat_final_submission', JSON.stringify(submissionPayload));
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setIsSubmitModalOpen(false);
      router.push('/test/completed');
    }
  }, [attemptId, candidate, questions, responses, isMba, targetQuizId, router]);

  const renderInteractionWidget = () => {
    if (!currentQuestion) return null;
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

  const activeSections = React.useMemo(() => {
    const presentSectionIds = new Set(questions.map((q) => q.sectionId || 'sec-perception'));
    const matched = quiz.sections.filter((s) => presentSectionIds.has(s.id));
    if (matched.length > 0) return matched;
    return [
      {
        id: 'sec-perception',
        title: 'Section A · Knowledge & Interaction',
        description: 'Quiz Questions',
        durationMinutes: quiz.totalDurationMinutes || 45,
        questionIds: questions.map((q) => q.id),
      },
    ];
  }, [questions, quiz.sections, quiz.totalDurationMinutes]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F9] text-gray-700">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-base font-medium">Preparing your assessment session...</p>
        <p className="text-xs text-gray-500 mt-1">Connecting to assessment engine</p>
      </div>
    );
  }

  if (isAuthModalOpen || !aisatApi.getToken()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F9] px-4">
        <div className="max-w-md w-full text-center space-y-3 mb-6">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl mx-auto flex items-center justify-center font-bold text-gray-950 text-xl shadow-sm">
            A
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {isMba ? 'Pre AI SAT MBA Platform' : 'AISAT Assessment Platform'}
          </h1>
          <p className="text-sm text-gray-600">
            {isMba
              ? 'Please enter your email to enter the Pre AI SAT MBA test.'
              : 'Please verify your details to launch your assessment session.'}
          </p>
        </div>
        <RegistrationModal
          isOpen={true}
          onClose={() => router.push('/')}
          quizId={targetQuizId}
          onSuccess={(newToken, newCandidate) => {
            setCandidate(newCandidate);
            setIsAuthModalOpen(false);
            setLoadError(null);
            setAuthVersion((v) => v + 1);
          }}
        />
      </div>
    );
  }

  if (loadError) {
    const isMaxAttempts = loadError.toLowerCase().includes('maximum attempts reached') || loadError.toLowerCase().includes('max attempts');

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F9] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full text-center space-y-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold ${
            isMaxAttempts ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
          }`}>
            {isMaxAttempts ? '✓' : '!'}
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            {isMaxAttempts ? 'Assessment Completed' : 'Unable to Start Assessment'}
          </h2>
          <p className="text-sm text-gray-600">
            {isMaxAttempts
              ? 'You have already completed the maximum allowed attempts for this assessment.'
              : loadError}
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                sessionStorage.removeItem('aisat_token');
                sessionStorage.removeItem('aisat_candidate');
                sessionStorage.removeItem('aisat_responses');
                router.push('/');
              }}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm transition-colors cursor-pointer"
            >
              Go to Home
            </button>
            {isMaxAttempts ? (
              <button
                onClick={() => {
                  sessionStorage.removeItem('aisat_token');
                  sessionStorage.removeItem('aisat_candidate');
                  sessionStorage.removeItem('aisat_responses');
                  setIsAuthModalOpen(true);
                }}
                className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Switch Account
              </button>
            ) : (
              <button
                onClick={() => setAuthVersion((v) => v + 1)}
                className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F9] text-gray-700">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-base font-medium">Loading assessment questions...</p>
        <p className="text-xs text-gray-500 mt-1">Initializing anti-cheat & question stream</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F9] text-gray-700">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-base font-medium">Preparing test items...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-900 flex flex-col select-none">
      {/* Header */}
      <QuizHeader
        title={quizTitle}
        sections={activeSections}
        activeSectionId={activeSectionId}
        durationMinutes={quiz.totalDurationMinutes || 45}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        serverDeadlineAt={serverDeadlineAt}
        serverRemainingSec={serverRemainingSec}
        timerType={timerType}
        isSaving={isSaving}
        candidate={candidate}
        onTimeExpired={() => handleConfirmSubmit('TIME_EXPIRED')}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Question Area */}
        <main className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Question Card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8 relative">
            
            {/* Top Bar inside question card */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 bg-yellow-400/20 text-gray-950 font-bold text-xs rounded-full border border-yellow-400/40">
                  Q {currentIndex + 1} of {questions.length}
                </span>
                {currentQuestion.comp && (
                  <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
                    {currentQuestion.comp}
                  </span>
                )}
                {currentQuestion.tier && (
                  <span className="text-[11px] font-medium text-gray-500">
                    · {currentQuestion.tier}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMarkForReview}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    currentResponse.isMarkedForReview
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{currentResponse.isMarkedForReview ? 'Marked' : 'Mark for Review'}</span>
                </button>

                <button
                  onClick={handleClearResponse}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Clear Selection"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </div>
            </div>

            {/* Question Stem / Prompt */}
            <div className="mb-6 space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                {currentQuestion.prompt}
              </h2>
            </div>

            {/* Interaction Widget (Options / Inputs) */}
            <div className="mt-4">
              {renderInteractionWidget()}
            </div>

            {/* Save status toast */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>{isSaving ? 'Saving answer...' : 'Answer saved automatically'}</span>
              <span>Marks: +{currentQuestion.marks}</span>
            </div>
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200/80 p-4 shadow-2xs">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="text-xs text-gray-500 font-medium">
              Question {currentIndex + 1} / {questions.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-black text-white font-semibold text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>

        {/* Right 4 Cols: Question Palette & Candidate Info */}
        <aside className="lg:col-span-4 space-y-4">
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            responses={responses}
          />

          {!isFullscreen && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-center justify-between">
              <div>
                <p className="font-bold">Fullscreen Recommended</p>
                <p className="text-[11px] text-amber-800">Maximize view for proctored mode.</p>
              </div>
              <button
                onClick={enterFullscreen}
                className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 rounded-lg text-amber-950 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>
            </div>
          )}
        </aside>

      </div>

      {/* Modals */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={() => handleConfirmSubmit('USER_SUBMIT')}
        questions={questions}
        responses={responses}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />

      <TabSwitchWarningModal
        isOpen={isWarningOpen}
        onClose={closeWarning}
        violationCount={violationCount}
        maxViolations={maxViolations}
        awayDurationMs={lastAwayDurationMs}
        violationType={lastViolationType}
      />
    </div>
  );
}
