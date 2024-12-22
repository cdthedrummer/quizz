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

  // Ensure we always have a valid question
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const selectedOptions = selections[currentQuestion.id] || [];
  
  // Calculate progress based on current index
  const progress = Math.min((currentQuestionIndex / (questions.length - 1)) * 100, 100);

  function handleOptionClick(optionId: string) {
    const isMultiple = currentQuestion.type === 'multiple';
    const currentSelections = selections[currentQuestion.id] || [];
    
    let newSelections: string[];
    if (isMultiple) {
      // Toggle selection for multiple choice
      newSelections = currentSelections.includes(optionId)
        ? currentSelections.filter(id => id !== optionId)
        : [...currentSelections, optionId];
    } else {
      // Single selection
      newSelections = [optionId];
      // Auto-advance after a brief delay
      setTimeout(() => handleNext(), 300);
    }

    setSelections(prev => ({
      ...prev,
      [currentQuestion.id]: newSelections
    }));
  }

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h2 className="text-xl mb-4">{currentQuestion.text}</h2>
        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`w-full flex items-center p-3 rounded border transition-colors
                ${selectedOptions.includes(option.id) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'}`}
            >
              <div className={`w-5 h-5 mr-3 flex items-center justify-center border transition-colors
                ${currentQuestion.type === 'multiple' ? 'rounded' : 'rounded-full'}
                ${selectedOptions.includes(option.id)
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300'}`}
              >
                {selectedOptions.includes(option.id) && '✓'}
              </div>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {currentQuestion.type === 'multiple' && selectedOptions.length > 0 && (
        <button
          onClick={handleNext}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  );
}