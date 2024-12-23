'use client';

import { questions } from '@/lib/data/questions';
import { archetypes, determineArchetype } from '@/lib/data/archetypes';
import type { QuizAnswers, Stats, StatType } from '@/lib/types';

type ResultsScreenProps = {
  answers: QuizAnswers;
};

function calculateStats(answers: QuizAnswers): Stats {
  const stats: Stats = {};

  Object.entries(answers).forEach(([questionId, selectedOptionIds]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    selectedOptionIds.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (!option) return;

      Object.entries(option.stats).forEach(([stat, value]) => {
        const statKey = stat as StatType;
        stats[statKey] = (stats[statKey] || 0) + value;
      });
    });
  });

  return stats;
}

function getStatEmoji(stat: StatType): string {
  const emojiMap: Record<StatType, string> = {
    strength: '💪',
    dexterity: '🎯',
    constitution: '❤️',
    intelligence: '🧠',
    wisdom: '🔮',
    charisma: '✨',
  };
  return emojiMap[stat];
}

export function ResultsScreen({ answers }: ResultsScreenProps) {
  const stats = calculateStats(answers);
  const archetype = determineArchetype(stats);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Your Character Profile</h1>
        <p className="text-gray-600">
          You are a {archetype.name}!
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl">
        <p className="text-gray-700 mb-4">{archetype.description}</p>
        <div className="space-y-2">
          <h3 className="font-semibold">Recommended Activities:</h3>
          <div className="grid grid-cols-2 gap-2">
            {archetype.activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>•</span>
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(stats).map(([stat, value]) => (
          <div
            key={stat}
            className={`p-4 rounded-xl border-2 ${
              archetype.stats[stat as StatType] 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getStatEmoji(stat as StatType)}</span>
              <div>
                <h3 className="font-semibold capitalize">{stat}</h3>
                <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(value / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}