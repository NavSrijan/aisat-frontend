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
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Award,
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

  // Load candidate info from session storage
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

  // Active user response for current question
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

    // Save in session storage
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
    // Package submission payload
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

  // Render question component based on type
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
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100">
      {/* Test Sticky Header */}
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

      {/* Main Test Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Question Main Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] relative">
              
              {/* Question Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
                    Question {currentIndex + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentQuestion.type.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    +{currentQuestion.marks} Marks
                  </span>
                  {currentQuestion.negativeMarks && (
                    <span className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                      -{currentQuestion.negativeMarks} Negative
                    </span>
                  )}
                </div>
              </div>

              {/* Question Title & Prompt */}
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                  {currentQuestion.title}
                </h3>
                <div className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                  {currentQuestion.prompt}
                </div>
              </div>

              {/* Dynamic Interaction Renderer Component */}
              <div className="pt-2 pb-6">
                {renderInteractionWidget()}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
                {/* Left actions: Mark for Review & Clear */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkForReview}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      currentResponse.isMarkedForReview
                        ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                        : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.08]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{currentResponse.isMarkedForReview ? 'Marked' : 'Mark for Review'}</span>
                  </button>

                  <button
                    onClick={handleClearResponse}
                    className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer text-xs"
                    title="Clear response"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right actions: Previous & Next */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-slate-300 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === quiz.questions.length - 1}
                    className="btn-primary-gradient px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Sidebar: Candidate Snapshot & Palette (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Candidate Card */}
            {candidate && (
              <div className="glass-card rounded-2xl p-5 border border-white/[0.08]">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Candidate Session
                </div>
                <div className="font-extrabold text-base text-white">{candidate.name}</div>
                <div className="text-xs text-slate-400 truncate mt-0.5">{candidate.college}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {candidate.branch} • Class of {candidate.graduationYear}
                </div>
              </div>
            )}

            {/* Question Palette */}
            <QuestionPalette
              questions={quiz.questions}
              currentIndex={currentIndex}
              onSelectIndex={(idx) => setCurrentIndex(idx)}
              responses={responses}
            />
          </div>

        </div>
      </main>

      {/* Submission Confirmation Modal */}
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
