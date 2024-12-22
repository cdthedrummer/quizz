'use client';
import { useState } from 'react';

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
  
  const question = questions[currentQuestion];
  
  const handleAnswer = (optionId: string) => {
    if (question.type === "single") {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: [optionId]
      }));
      // Auto-advance for single choice questions
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
      }
    } else {
      setAnswers(prev => {
        const currentAnswers = prev[currentQuestion] || [];
        const updated = currentAnswers.includes(optionId)
          ? currentAnswers.filter(id => id !== optionId)
          : [...currentAnswers, optionId];
        return {
          ...prev,
          [currentQuestion]: updated
        };
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const selectedAnswers = answers[currentQuestion] || [];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-blue-600">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left
                ${selectedAnswers.includes(option.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
                }`}
            >
              <div className="font-medium">{option.text}</div>
              {option.subtext && (
                <div className="text-sm text-gray-500 mt-1">{option.subtext}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {question.type === "multiple" && (
        <button
          onClick={handleNext}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all
            ${selectedAnswers.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          disabled={selectedAnswers.length === 0}
        >
          Next Question →
        </button>
      )}
    </div>
  );
}