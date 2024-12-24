'use client';

import { useState } from 'react';
import { QuizState, QuizAnswers } from '@/lib/types';

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  if (!started) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Discover Your Character</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Find out your strengths and get personalized recommendations for growth
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* Question content will go here */}
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${((questionIndex + 1) / 12) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}