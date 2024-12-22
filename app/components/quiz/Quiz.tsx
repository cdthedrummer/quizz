'use client';

import { useState } from 'react';
import { questions } from '@/data/questions';
import { QuestionCard } from './QuestionCard';
import { Progress } from './Progress';
import { QuizStats } from '@/types/quiz.types';

interface QuizProps {
  onComplete: (stats: QuizStats) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentQuestion];
  const selectedAnswers = answers[question.id] || [];

  const handleAnswer = (optionId: string) => {
    if (question.type === "single") {
      setAnswers(prev => ({
        ...prev,
        [question.id]: [optionId]
      }));
      setTimeout(() => handleContinue(), 400);
    } else {
      setAnswers(prev => {
        const currentAnswers = prev[question.id] || [];
        return {
          ...prev,
          [question.id]: currentAnswers.includes(optionId)
            ? currentAnswers.filter(id => id !== optionId)
            : [...currentAnswers, optionId]
        };
      });
    }
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else if (currentQuestion === questions.length - 1) {
      // Calculate final stats and complete
      const finalStats = calculateStats(answers);
      onComplete(finalStats);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4">
      <Progress current={currentQuestion} total={questions.length} />
      
      <QuestionCard
        question={question}
        selectedAnswers={selectedAnswers}
        onSelect={handleAnswer}
        isTransitioning={isTransitioning}
      />

      {question.type === "multiple" && (
        <button
          onClick={handleContinue}
          disabled={selectedAnswers.length === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all
            ${selectedAnswers.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          Continue
        </button>
      )}
    </div>
  );
}