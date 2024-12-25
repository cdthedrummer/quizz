'use client';

import { useState } from 'react';
import { questions } from './data/questions';

type Answer = {
  questionId: number;
  answers: string[];
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (answer: string[]) => {
    setAnswers([...answers, { questionId: currentQuestion, answers: answer }]);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (!started) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Build Your Character!</h1>
          <p className="text-xl mb-8">Discover your strengths and find ways to level up!</p>
          <button
            onClick={() => setStarted(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];
  if (!question) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">{question.text}</h2>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer([option.text])}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center text-lg"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}