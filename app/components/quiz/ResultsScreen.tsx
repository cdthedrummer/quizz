'use client';

import { QuizAnswers } from '@/app/lib/types/quiz';
import { calculateStats } from '@/app/lib/utils/calculations';

interface ResultsScreenProps {
  answers: QuizAnswers;
}

interface StatBarProps {
  label: string;
  value: number;
}

const StatBar = ({ label, value }: StatBarProps) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="font-medium">{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-blue-600 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default function ResultsScreen({ answers }: ResultsScreenProps) {
  const stats = calculateStats(answers);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Your Character Stats</h1>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <StatBar label="Strength" value={stats.strength} />
        <StatBar label="Dexterity" value={stats.dexterity} />
        <StatBar label="Constitution" value={stats.constitution} />
        <StatBar label="Intelligence" value={stats.intelligence} />
        <StatBar label="Wisdom" value={stats.wisdom} />
        <StatBar label="Charisma" value={stats.charisma} />
      </div>
      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}