'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { SAMPLE_AISAT_QUIZ } from '@/lib/quizData';
import { CandidateLead, QuizQuestion, UserResponse } from '@/types/aisat';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuestionPalette } from '@/components/quiz/QuestionPalette';
import { SubmitModal } from '@/components/quiz/SubmitModal';

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

interface PageProps {
  params: Promise<{ quizId: string }>;
}

export default function QuizPlayerPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const quiz = SAMPLE_AISAT_QUIZ;

  const [candidate, setCandidate] = useState<CandidateLead | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, UserResponse>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('aisat_candidate');
    if (raw) {
      try {
        setCandidate(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse candidate data', e);
      }
    }
  }, []);

  const currentQuestion: QuizQuestion = quiz.questions[currentIndex] || quiz.questions[0];
  const activeSectionId = currentQuestion.sectionId;

  const currentResponse = responses[currentQuestion.id] || {
    questionId: currentQuestion.id,
    type: currentQuestion.type,
    answer: null,
    isMarkedForReview: false,
    timeSpentSeconds: 0,
  };

  const handleAnswerChange = (answer: any) => {
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

    setTimeout(() => {
      setIsSaving(false);
    }, 400);
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
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectSection = (sectionId: string) => {
    const targetIdx = quiz.questions.findIndex((q) => q.sectionId === sectionId);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
    }
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    const submissionPayload = {
      quizId: quiz.id,
      candidate,
      responses,
      submittedAt: new Date().toISOString(),
    };
    sessionStorage.setItem('aisat_final_submission', JSON.stringify(submissionPayload));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
      router.push('/test/completed');
    }, 800);
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-gray-900">
      {/* Quiz Sticky Header */}
      <QuizHeader
        title={quiz.title}
        sections={quiz.sections}
        activeSectionId={activeSectionId}
        onSelectSection={handleSelectSection}
        durationMinutes={quiz.totalDurationMinutes}
        onTimeExpired={() => setIsSubmitModalOpen(true)}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
        isSaving={isSaving}
      />

      {/* Main Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Question Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#FFC700] text-gray-950 font-bold text-xs">
                    Question {currentIndex + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">
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

              {/* Question Prompt */}
              <div className="space-y-3 mb-6">
                <h3 className="font-bold text-base text-gray-900 leading-snug">
                  {currentQuestion.title}
                </h3>
                <div className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line">
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
                    disabled={currentIndex === quiz.questions.length - 1}
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
                <div className="text-xs text-gray-500 truncate mt-0.5">{candidate.college}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {candidate.branch} • Class of {candidate.graduationYear}
                </div>
              </div>
            )}

            <QuestionPalette
              questions={quiz.questions}
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
        questions={quiz.questions}
        responses={responses}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
