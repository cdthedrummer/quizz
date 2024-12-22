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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const question = questions[currentQuestionIndex];
  const selectedAnswers = answers[question.id] || [];
  const progress = ((currentQuestionIndex) / (questions.length - 1)) * 100;

  function handleOptionClick(optionId: string) {
    setAnswers(prev => {
      const currentAnswers = prev[question.id] || [];
      let newAnswers: string[];

      if (question.type === 'multiple') {
        // Toggle for multiple choice
        newAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter(id => id !== optionId)
          : [...currentAnswers, optionId];
      } else {
        // Single choice
        newAnswers = [optionId];
        // Auto-advance for single choice questions
        setTimeout(() => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
          }
        }, 300);
      }

      return {
        ...prev,
        [question.id]: newAnswers
      };
    });
  }

  function handleContinue() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
        <h2 className="text-xl font-medium mb-4">{question.text}</h2>
        <div className="space-y-2">
          {question.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className="w-full flex items-center p-3 rounded border-2 transition-all focus:outline-none"
              style={{
                borderColor: selectedAnswers.includes(option.id) ? '#3B82F6' : '#E5E7EB',
                backgroundColor: selectedAnswers.includes(option.id) ? '#EFF6FF' : 'white'
              }}
            >
              {/* Checkbox/Radio circle */}
              <div 
                className={`w-5 h-5 mr-3 rounded-${question.type === 'multiple' ? 'sm' : 'full'} border-2 flex items-center justify-center transition-colors`}
                style={{
                  borderColor: selectedAnswers.includes(option.id) ? '#3B82F6' : '#D1D5DB',
                  backgroundColor: selectedAnswers.includes(option.id) ? '#3B82F6' : 'white'
                }}
              >
                {selectedAnswers.includes(option.id) && (
                  <span className="text-white text-sm">✓</span>
                )}
              </div>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {question.type === 'multiple' && (
        <button
          onClick={handleContinue}
          disabled={selectedAnswers.length === 0}
          className="w-full p-3 rounded font-medium transition-all focus:outline-none"
          style={{
            backgroundColor: selectedAnswers.length > 0 ? '#3B82F6' : '#E5E7EB',
            color: selectedAnswers.length > 0 ? 'white' : '#9CA3AF',
            cursor: selectedAnswers.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
}