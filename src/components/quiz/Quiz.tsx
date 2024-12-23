import React, { useState } from 'react';
import { Question, QuizAnswers } from '@/lib/types';
import { questions } from '@/lib/data/questions';
import { calculateStats, determineArchetype } from '@/lib/archetypes';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const stats = calculateStats(answers, questions);
  const archetype = determineArchetype(stats);

  if (showResults) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Character Class: {archetype.icon} {archetype.name}</h2>
          <p className="mb-4">{archetype.description}</p>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Your Stats:</h3>
            {Object.entries(stats).map(([stat, value]) => (
              <div key={stat} className="space-y-2">
                <div className="flex justify-between">
                  <span className="capitalize">{stat}</span>
                  <span>{value}</span>
                </div>
                <Progress value={value ? (value / 10) * 100 : 0} />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Suggested Activities:</h3>
            <ul className="list-disc list-inside space-y-1">
              {archetype.suggestedActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  return (
    <div className="space-y-6">
      <Progress value={progress} className="w-full" />
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(question.id, [option.id])}
              className="w-full p-4 text-left rounded-lg border hover:bg-gray-100 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}