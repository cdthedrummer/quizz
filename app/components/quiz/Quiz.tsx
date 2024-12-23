'use client';

import { useState } from 'react';

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
  const [selections, setSelections] = useState<{[key: string]: string[]}>({});

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOptions = selections[currentQuestion.id] || [];
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  function handleOptionClick(optionId: string) {
    setSelections(prev => {
      const currentSelections = prev[currentQuestion.id] || [];
      
      if (currentQuestion.type === 'multiple') {
        // Toggle for multiple choice
        return {
          ...prev,
          [currentQuestion.id]: currentSelections.includes(optionId)
            ? currentSelections.filter(id => id !== optionId)
            : [...currentSelections, optionId]
        };
      } else {
        // Single choice with auto-advance
        setTimeout(() => setCurrentQuestionIndex(i => i + 1), 300);
        return {
          ...prev,
          [currentQuestion.id]: [optionId]
        };
      }
    });
  }

  function handleNext() {
    console.log('Attempting to progress...'); // Debug log
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h2 className="text-xl mb-4">{currentQuestion.text}</h2>
        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className="w-full flex items-start p-3 rounded border border-gray-200 hover:border-blue-300 transition-all"
            >
              <div className="flex items-center min-h-[1.5rem]">
                {currentQuestion.type === 'multiple' ? (
                  <div className={`w-5 h-5 rounded flex items-center justify-center border
                    ${selectedOptions.includes(option.id)
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300'
                    }`}
                  >
                    {selectedOptions.includes(option.id) && '✓'}
                  </div>
                ) : (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border
                    ${selectedOptions.includes(option.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                    }`}
                  />
                )}
              </div>
              <span className="ml-3">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {currentQuestion.type === 'multiple' && selectedOptions.length > 0 && (
        <button
          onClick={handleNext}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded"
        >
          Continue
        </button>
      )}
    </div>
  );
}