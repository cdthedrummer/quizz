'use client';
import { useState } from 'react';
import Quiz from './components/Quiz';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      {!started ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-blue-900">✨ Build Your Character!</h1>
            <p className="text-lg text-blue-700">
              Discover your strengths and find ways to level up in real life!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center space-y-6">
              <p className="text-xl">Ready to begin your journey? 🚀</p>
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium
                  hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
              >
                Start Quiz!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Quiz />
      )}
    </main>
  );
}