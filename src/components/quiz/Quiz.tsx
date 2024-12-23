'use client';

import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from '@/components/ui/progress';
import { questions } from '@/lib/data/questions';
import type { QuizAnswers } from '@/lib/types';

export function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[questionIndex];
  const selectedAnswers = answers[currentQuestion.id] || [];
  const progress = (questionIndex / (questions.length - 1)) * 100;

  function handleSelect(optionId: string) {
    if (isTransitioning) return;

    if (currentQuestion.type === 'single') {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: [optionId] }));
      if (questionIndex < questions.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setQuestionIndex(prev => prev + 1);
          setIsTransitioning(false);
        }, 300);
      }
    } else {
      setAnswers(prev => {
        const current = prev[currentQuestion.id] || [];
        return {
          ...prev,
          [currentQuestion.id]: current.includes(optionId)
            ? current.filter(id => id !== optionId)
            : [...current, optionId]
        };
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <ProgressBar value={progress} showLabel />
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        <QuestionCard
          question={currentQuestion}
          selectedAnswers={selectedAnswers}
          onSelect={handleSelect}
        />

        {currentQuestion.type === 'multiple' && selectedAnswers.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => {
                if (questionIndex < questions.length - 1) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setQuestionIndex(prev => prev + 1);
                    setIsTransitioning(false);
                  }, 300);
                }
              }}
              disabled={isTransitioning}
              className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium
                hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
