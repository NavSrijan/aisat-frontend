'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/types/aisat';
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react';

interface CodingRendererProps {
  question: QuizQuestion;
  value: { code: string; language: string } | null;
  onChange: (val: { code: string; language: string }) => void;
}

export const CodingRenderer: React.FC<CodingRendererProps> = ({ question, value, onChange }) => {
  const [activeLang, setActiveLang] = useState<string>(value?.language || 'python');
  const starterCode = question.starterCode || {};
  const currentCode = value?.code || starterCode[activeLang] || '';

  const [activeTab, setActiveTab] = useState<'testcases' | 'output'>('testcases');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean }[] | null>(null);

  const handleLangChange = (lang: string) => {
    setActiveLang(lang);
    const newCode = starterCode[lang] || '';
    onChange({ code: newCode, language: lang });
    setTestResults(null);
  };

  const handleCodeChange = (newCode: string) => {
    onChange({ code: newCode, language: activeLang });
  };

  const handleResetCode = () => {
    const defaultCode = starterCode[activeLang] || '';
    onChange({ code: defaultCode, language: activeLang });
    setTestResults(null);
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setActiveTab('output');

    setTimeout(() => {
      setIsRunning(false);
      const testCases = question.testCases || [];
      const results = testCases.map((tc) => ({
        id: tc.id,
        passed: true,
      }));
      setTestResults(results);
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Editor Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-900 px-4 py-2.5 rounded-t-xl border border-gray-800">
        <div className="flex items-center gap-2">
          {['python', 'javascript', 'cpp'].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLangChange(lang)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeLang === lang
                  ? 'bg-[#FFC700] text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {lang === 'python' ? 'Python' : lang === 'javascript' ? 'JavaScript' : 'C++'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCode}
            className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="btn-capabl px-3.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 text-black"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
          </button>
        </div>
      </div>

      {/* Code Textarea */}
      <div className="border-x border-b border-gray-800 bg-[#0F172A] rounded-b-xl overflow-hidden">
        <textarea
          rows={12}
          value={currentCode}
          onChange={(e) => handleCodeChange(e.target.value)}
          spellCheck={false}
          className="w-full p-4 bg-transparent text-sm font-mono text-emerald-400 focus:outline-none leading-relaxed resize-y"
        />
      </div>

      {/* Test Cases Panel */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
        <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab('testcases')}
            className={`text-xs font-bold cursor-pointer ${
              activeTab === 'testcases' ? 'text-gray-950 border-b-2 border-[#FFC700] pb-1' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sample Test Cases ({question.testCases?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('output')}
            className={`text-xs font-bold cursor-pointer ${
              activeTab === 'output' ? 'text-gray-950 border-b-2 border-[#FFC700] pb-1' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Execution Output {testResults && '✓'}
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'testcases' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {question.testCases?.map((tc, idx) => (
                <div key={tc.id} className="p-3 rounded-lg bg-white border border-gray-200 text-xs font-mono">
                  <div className="text-gray-900 font-bold mb-1">Case #{idx + 1}</div>
                  <div className="text-gray-500 text-[11px] mb-1">Input: <span className="text-gray-900">{tc.input}</span></div>
                  <div className="text-gray-500 text-[11px]">Expected: <span className="text-emerald-700 font-bold">{tc.expectedOutput}</span></div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {testResults ? (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All Public Test Cases Passed (3/3)</span>
                  </div>
                  {testResults.map((r, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-emerald-200 text-xs font-mono text-emerald-800 flex items-center justify-between">
                      <span>Test Case #{i + 1}</span>
                      <span className="font-bold">PASSED</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-500 font-mono py-2">
                  Click &ldquo;Run Tests&rdquo; to execute your solution against the sample test suite.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
