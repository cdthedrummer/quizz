import { StatType, Stats } from './types';

export type Archetype = {
  id: string;
  name: string;
  description: string;
  primaryStat: StatType;
  secondaryStat: StatType;
  icon: string;
  suggestedActivities: string[];
};

export const archetypes: Archetype[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'A physical powerhouse focusing on strength and endurance',
    primaryStat: 'strength',
    secondaryStat: 'constitution',
    icon: '⚔️',
    suggestedActivities: [
      'Weightlifting',
      'CrossFit',
      'Rock Climbing',
      'Wrestling',
      'Rugby',
    ],
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'Quick and agile, excelling in precision and coordination',
    primaryStat: 'dexterity',
    secondaryStat: 'charisma',
    icon: '🎯',
    suggestedActivities: [
      'Dance',
      'Gymnastics',
      'Martial Arts',
      'Basketball',
      'Skateboarding',
    ],
  },
  {
    id: 'wizard',
    name: 'Wizard',
    description: 'A scholar who values knowledge and analytical thinking',
    primaryStat: 'intelligence',
    secondaryStat: 'wisdom',
    icon: '🧙‍♂️',
    suggestedActivities: [
      'Programming',
      'Chess',
      'Language Learning',
      'Academic Studies',
      'Scientific Research',
    ],
  },
  {
    id: 'cleric',
    name: 'Cleric',
    description: 'Insightful and perceptive, focused on helping others',
    primaryStat: 'wisdom',
    secondaryStat: 'charisma',
    icon: '✨',
    suggestedActivities: [
      'Meditation',
      'Counseling',
      'Healthcare',
      'Teaching',
      'Nature Studies',
    ],
  },
  {
    id: 'bard',
    name: 'Bard',
    description: 'A natural leader with strong social and creative abilities',
    primaryStat: 'charisma',
    secondaryStat: 'dexterity',
    icon: '🎭',
    suggestedActivities: [
      'Public Speaking',
      'Music',
      'Theater',
      'Social Events',
      'Creative Writing',
    ],
  },
];

export function calculateStats(answers: { [questionId: string]: string[] }, questions: any[]): Stats {
  const stats: Stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

  Object.entries(answers).forEach(([questionId, selectedOptionIds]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    selectedOptionIds.forEach(optionId => {
      const option = question.options.find((opt: any) => opt.id === optionId);
      if (!option) return;

      Object.entries(option.stats).forEach(([stat, value]) => {
        stats[stat as StatType] = (stats[stat as StatType] || 0) + value;
      });
    });
  });

  return stats;
}

export function determineArchetype(stats: Stats): Archetype {
  // Convert stats to array of [stat, value] pairs and sort by value
  const sortedStats = Object.entries(stats)
    .sort(([, a], [, b]) => (b || 0) - (a || 0));

  const primaryStat = sortedStats[0][0] as StatType;
  const primaryValue = sortedStats[0][1] || 0;
  const secondaryStat = sortedStats[1][0] as StatType;

  // Handle ties by looking at secondary stats
  const tiedStats = sortedStats.filter(([, value]) => value === primaryValue);
  if (tiedStats.length > 1) {
    // Find archetype with highest secondary stat among tied primary stats
    const possibleArchetypes = archetypes.filter(
      arch => tiedStats.some(([stat]) => stat === arch.primaryStat)
    );
    
    return possibleArchetypes.reduce((best, current) => {
      const bestSecondaryValue = stats[best.secondaryStat] || 0;
      const currentSecondaryValue = stats[current.secondaryStat] || 0;
      return currentSecondaryValue > bestSecondaryValue ? current : best;
    }, possibleArchetypes[0]);
  }

  // Find archetype matching primary stat
  return archetypes.find(a => a.primaryStat === primaryStat) || archetypes[0];
}