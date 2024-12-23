'use client';

import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { ContinueButton } from './ContinueButton';
import { questions } from '@/lib/data/questions';
import type { QuizAnswers } from '@/lib/types/quiz';

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
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: [optionId]
      }));
      
      setIsTransitioning(true);
      setTimeout(() => {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex(prev => prev + 1);
        }
        setIsTransitioning(false);
      }, 300);
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

  function handleNext() {
    if (isTransitioning || questionIndex >= questions.length - 1) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setQuestionIndex(prev => prev + 1);
      setIsTransitioning(false);
    }, 300);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ProgressBar 
        progress={progress}
        showCheckpoint={questionIndex > 0}
      />

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        <QuestionCard
          question={currentQuestion}
          selectedAnswers={selectedAnswers}
          onSelect={handleSelect}
        />

        {currentQuestion.type === 'multiple' && selectedAnswers.length > 0 && (
          <div className="mt-8">
            <ContinueButton 
              onClick={handleNext}
              disabled={isTransitioning}
            />
          </div>
        )}
      </div>
    </div>
  );
}
