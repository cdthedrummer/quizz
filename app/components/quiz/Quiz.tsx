'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 'learn',
    text: "How do you learn best?",
    type: "single",
    options: [
      { id: "learn-read", text: "📚 Reading", description: "Books, manuals, forums" },
      { id: "learn-watch", text: "👀 Watching", description: "Videos and tutorials" },
      { id: "learn-do", text: "🛠️ Hands-on", description: "Practice and experimentation" },
      { id: "learn-group", text: "👥 With others", description: "Classes and groups" }
    ]
  },
  {
    id: 'health',
    text: "Choose areas you'd like to improve",
    subtext: "Select all that apply - this won't limit your experience",
    type: "multiple",
    options: [
      { id: "health-diet", text: "Nutrition", description: "Diet and meal planning" },
      { id: "health-exercise", text: "Exercise", description: "Physical activity" },
      { id: "health-rest", text: "Recovery", description: "Rest and sleep habits" }
    ]
  }
];

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const currentQuestion = questions[questionIndex];
  const selectedAnswers = answers[currentQuestion.id] || [];
  const progress = (questionIndex / (questions.length - 1)) * 100;

  const handleSelect = (optionId: string) => {
    if (currentQuestion.type === 'single') {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: [optionId]
      }));
      setTimeout(() => handleNext(), 400);
    } else {
      setAnswers(prev => {
        const current = prev[currentQuestion.id] || [];
        const updated = current.includes(optionId) 
          ? current.filter(id => id !== optionId)
          : [...current, optionId];
        return { ...prev, [currentQuestion.id]: updated };
      });
    }
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-100 rounded-full mb-12">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Question */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            {currentQuestion.text}
          </h2>
          {currentQuestion.subtext && (
            <p className="text-gray-500">{currentQuestion.subtext}</p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200
                ${selectedAnswers.includes(option.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
                } text-left group`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start">
                <div className={`mt-1 w-5 h-5 
                  ${currentQuestion.type === 'multiple' ? 'rounded-md' : 'rounded-full'}
                  border-2 flex-shrink-0 mr-3 flex items-center justify-center
                  ${selectedAnswers.includes(option.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 group-hover:border-blue-200'
                  }`}
                >
                  {selectedAnswers.includes(option.id) && (
                    <motion.svg 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M3 6l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </motion.svg>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{option.text}</div>
                  {option.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {option.description}
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Continue Button */}
        {currentQuestion.type === 'multiple' && selectedAnswers.length > 0 && (
          <motion.button
            onClick={handleNext}
            className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium
              hover:bg-blue-600 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}