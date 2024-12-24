'use client';

import { useState } from 'react';
import { QuizState, QuizAnswers } from '@/app/lib/types/quiz';
import QuestionCard from './QuestionCard';
import ResultsScreen from './ResultsScreen';

export default function QuizContainer() {
  const [quizState, setQuizState] = useState<QuizState>({
    started: false,
    questionIndex: 0,
    answers: {},
    isTransitioning: false
  });

  const handleAnswer = (questionId: number, answer: string[]) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      isTransitioning: true
    }));

    setTimeout(() => {
      setQuizState(prev => ({
        ...prev,
        questionIndex: prev.questionIndex + 1,
        isTransitioning: false
      }));
    }, 500);
  };

  if (!quizState.started) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center">Discover Your Character</h1>
        <p className="text-lg text-center max-w-md">
          Find out your strengths and get personalized recommendations for growth
        </p>
        <button
          onClick={() => setQuizState(prev => ({ ...prev, started: true }))}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${((quizState.questionIndex + 1) / 12) * 100}%` }}
          />
        </div>
      </div>
      {quizState.questionIndex < 12 ? (
        <QuestionCard
          questionIndex={quizState.questionIndex}
          onAnswer={handleAnswer}
          isTransitioning={quizState.isTransitioning}
        />
      ) : (
        <ResultsScreen answers={quizState.answers} />
      )}
    </div>
  );
}