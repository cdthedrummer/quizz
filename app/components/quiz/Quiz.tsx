'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/types/quiz.types';

const questions = [
  {
    id: 'learn',
    text: "How do you learn best?",
    type: "single",
    options: [
      { id: "learn-read", text: "📚 Reading", stats: { intelligence: 2 }},
      { id: "learn-watch", text: "👀 Watching", stats: { wisdom: 2 }},
      { id: "learn-do", text: "🛠️ Hands-on", stats: { dexterity: 2 }},
      { id: "learn-group", text: "👥 With others", stats: { charisma: 2 }}
    ]
  },
  {
    id: 'health',
    text: "What's your health focus? (Select all that apply)",
    type: "multiple",
    options: [
      { id: "health-diet", text: "🥗 Diet", stats: { constitution: 1 }},
      { id: "health-exercise", text: "💪 Exercise", stats: { strength: 1 }},
      { id: "health-rest", text: "😴 Rest", stats: { wisdom: 1 }}
    ]
  }
];

export function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const currentQuestion = questions[questionIndex];
  const progress = (questionIndex / questions.length) * 100;
  
  function handleSelect(optionId: string) {
    const currentAnswers = answers[currentQuestion.id] || [];
    let newAnswers: string[];
    
    if (currentQuestion.type === 'multiple') {
      // Toggle selection for multiple choice
      newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
    } else {
      // Replace answer for single choice and auto-advance
      newAnswers = [optionId];
      setTimeout(() => handleContinue(), 300);
    }
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: newAnswers
    }));
  }

  function handleContinue() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    }
  }

  const selectedAnswers = answers[currentQuestion.id] || [];

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {questionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-xl mb-4">{currentQuestion.text}</h2>
        <div className="space-y-2">
          {currentQuestion.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full p-3 text-left rounded border-2 transition
                ${selectedAnswers.includes(option.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'}`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button (only for multiple choice) */}
      {currentQuestion.type === 'multiple' && (
        <button
          onClick={handleContinue}
          disabled={selectedAnswers.length === 0}
          className={`w-full p-3 rounded font-medium transition
            ${selectedAnswers.length > 0
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500'}`}
        >
          Continue
        </button>
      )}
    </div>
  );
}