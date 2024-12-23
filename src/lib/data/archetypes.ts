import type { StatType, Stats } from '../types';

export type Archetype = {
  name: string;
  icon: string;
  description: string;
  primaryStats: StatType[];
  activities: string[];
};

export const archetypes = {
  paladin: {
    name: 'Paladin',
    icon: '⚔️',
    description: 'Your strength isn\'t just physical - it\'s the power to inspire and protect others.',
    primaryStats: ['strength', 'constitution'],
    activities: [
      'Athletic Training',
      'Team Leadership',
      'Community Service',
      'Competitive Sports'
    ]
  }
} as const;

export type ArchetypeId = keyof typeof archetypes;

export const getArchetype = (stats: Stats): Archetype => {
  const archetypeScores = Object.entries(archetypes).map(([id, type]) => ({
    id,
    score: type.primaryStats.reduce((sum, stat) => sum + (stats[stat] || 0), 0)
  }));

  const highest = archetypeScores.reduce((max, curr) => 
    curr.score > max.score ? curr : max
  );

  return archetypes[highest.id as ArchetypeId];
};