'use client';

import { useState } from 'react';
import { questions } from '@/lib/questions';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">✨ Build Your Character!</h1>
          <p className="text-gray-600">Discover your strengths and find ways to level up!</p>
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg 
              hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[questionIndex];
  const selectedAnswers = answers[currentQuestion.id] || [];
  const progress = (questionIndex / (questions.length - 1)) * 100;

  function handleSelect(optionId: string) {
    if (currentQuestion.type === 'single') {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: [optionId]
      }));
      if (questionIndex < questions.length - 1) {
        setTimeout(() => {
          setQuestionIndex(prev => prev + 1);
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

  function handleNext() {
    if (selectedAnswers.length > 0 && questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-12">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-8">
        {/* Question */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all
                ${selectedAnswers.includes(option.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
                } text-left group`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 mr-3
                  ${currentQuestion.type === 'multiple' ? 'rounded' : 'rounded-full'}
                  border-2 flex items-center justify-center
                  ${selectedAnswers.includes(option.id)
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                  }`}
                >
                  {selectedAnswers.includes(option.id) && '✓'}
                </div>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        {currentQuestion.type === 'multiple' && selectedAnswers.length > 0 && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium
              hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}