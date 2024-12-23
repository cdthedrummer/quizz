'use client';

import { useState } from 'react';
import QuestionCard from './components/quiz/QuestionCard';
import ProgressBar from './components/quiz/ProgressBar';
import { QuestionType } from './types';

const questions: QuestionType[] = [
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

export default function Home() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    if (isTransitioning) return;

    if (currentQuestion.type === 'single') {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: [optionId]
      }));
      
      setIsTransitioning(true);
      setTimeout(() => {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex(prev => prev + 1);
        }
        setIsTransitioning(false);
      }, 300);
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
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(prev => prev + 1);
      }
      setIsTransitioning(false);
    }, 300);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ProgressBar progress={progress} />

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        <QuestionCard
          question={currentQuestion}
          selectedAnswers={selectedAnswers}
          onSelect={handleSelect}
        />

        {currentQuestion.type === 'multiple' && selectedAnswers.length > 0 && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium
              hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.98]
              mt-8"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}