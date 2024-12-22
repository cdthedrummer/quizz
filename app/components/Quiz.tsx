'use client';
import { useState, useEffect } from 'react';

const questions = [
  {
    id: 1,
    text: "How do you learn best?",
    type: "single",
    options: [
      { 
        id: "1a", 
        text: "📚 Reading", 
        subtext: "Books, manuals, forums",
        stats: { intelligence: 2 } 
      },
      { 
        id: "1b", 
        text: "👀 Watching", 
        subtext: "Videos and tutorials",
        stats: { intelligence: 1, wisdom: 1 } 
      },
      { 
        id: "1c", 
        text: "🛠️ Hands-on", 
        subtext: "Practice and experimentation",
        stats: { dexterity: 2 } 
      },
      { 
        id: "1d", 
        text: "👥 With others", 
        subtext: "Classes and groups",
        stats: { charisma: 2 } 
      }
    ]
  },
  {
    id: 2,
    text: "What's your health focus?",
    type: "multiple",
    options: [
      { 
        id: "2a", 
        text: "🥗 Diet", 
        subtext: "Nutrition planning",
        stats: { constitution: 1 } 
      },
      { 
        id: "2b", 
        text: "💪 Exercise", 
        subtext: "Regular activity",
        stats: { strength: 1, dexterity: 1 } 
      },
      { 
        id: "2c", 
        text: "😴 Rest", 
        subtext: "Sleep and recovery",
        stats: { wisdom: 1 } 
      }
    ]
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const question = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;
  const selectedAnswers = answers[currentQuestion] || [];
  
  const handleAnswer = (optionId: string) => {
    if (question.type === "single") {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: [optionId]
      }));
      // Auto-advance for single choice questions after a short delay
      setTimeout(() => handleContinue(), 400);
    } else {
      setAnswers(prev => {
        const currentAnswers = prev[currentQuestion] || [];
        return {
          ...prev,
          [currentQuestion]: currentAnswers.includes(optionId)
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
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-blue-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div 
        className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 transition-opacity duration-300
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">{question.text}</h2>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left
                ${selectedAnswers.includes(option.id)
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-blue-300'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 flex-shrink-0 rounded-${question.type === 'multiple' ? 'md' : 'full'}
                  border-2 transition-all ${selectedAnswers.includes(option.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                  }`}
                >
                  {selectedAnswers.includes(option.id) && (
                    <svg className="w-full h-full text-white p-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium">{option.text}</div>
                  {option.subtext && (
                    <div className="text-sm text-gray-500 mt-1">{option.subtext}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button for Multiple Choice */}
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