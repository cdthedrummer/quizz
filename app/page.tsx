'use client';
import { useState } from 'react';
import { Quiz } from '@/components/quiz/Quiz';

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">✨ Build Your Character!</h1>
          <p className="mb-8">Discover your strengths and find ways to level up!</p>
          <button
            onClick={() => setStarted(true)}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return <Quiz />;
}