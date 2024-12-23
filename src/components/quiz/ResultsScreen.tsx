'use client';

import { questions } from '@/lib/data/questions';
import { getArchetype } from '@/lib/data/archetypes';
import type { QuizAnswers, Stats, StatType } from '@/lib/types';
import { Card } from '@/components/ui/card';

type ResultsScreenProps = {
  answers: QuizAnswers;
};

const calculateStats = (answers: QuizAnswers): Stats => {
  const stats: Stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  Object.entries(answers).forEach(([questionId, selectedOptionIds]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    selectedOptionIds.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (!option) return;

      Object.entries(option.stats).forEach(([stat, value]) => {
        stats[stat as StatType] += value;
      });
    });
  });

  return stats;
};

const getStatIcon = (stat: StatType): string => {
  const icons: Record<StatType, string> = {
    strength: '💪',
    dexterity: '🎯',
    constitution: '❤️',
    intelligence: '🧠',
    wisdom: '🔮',
    charisma: '✨',
  };
  return icons[stat];
};

export function ResultsScreen({ answers }: ResultsScreenProps) {
  const stats = calculateStats(answers);
  const archetype = getArchetype(stats);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">{archetype.icon}</div>
        <h1 className="text-3xl font-bold">Your Character Profile</h1>
        <p className="text-xl">You are a {archetype.name}!</p>
      </div>

      <Card className="p-6 bg-blue-50">
        <p className="text-gray-700 mb-4">{archetype.description}</p>
        <h3 className="font-semibold mb-2">Recommended Activities:</h3>
        <div className="grid grid-cols-2 gap-2">
          {archetype.activities.map((activity) => (
            <div key={activity} className="flex items-center gap-2">
              <span>•</span>
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(stats).map(([stat, value]) => (
          <Card
            key={stat}
            className={archetype.primaryStats.includes(stat as StatType) ? 
              'border-2 border-blue-500 bg-blue-50' : 
              'border-2 border-gray-200'
            }
          >
            <div className="p-4 flex items-center gap-2">
              <span className="text-2xl">
                {getStatIcon(stat as StatType)}
              </span>
              <div className="flex-grow">
                <h3 className="font-semibold capitalize">{stat}</h3>
                <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(value / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}