import { StatType } from '../types';

export interface Archetype {
  name: string;
  icon: string;
  description: string;
  stats: Record<StatType, number>;
  activities: string[];
}

const archetypes = {
  paladin: {
    name: 'Paladin',
    icon: '⚔️',
    description: 'Your strength isn\'t just physical - it\'s the power to inspire and protect others.',
    stats: { strength: 2, constitution: 1, charisma: 1, wisdom: 0, intelligence: 0, dexterity: 0 },
    activities: [
      'Athletic Training',
      'Team Leadership',
      'Community Service',
      'Competitive Sports'
    ]
  },
  // Add other archetypes with same pattern...
} as const;

export type ArchetypeKey = keyof typeof archetypes;

export function determineArchetype(stats: Partial<Record<StatType, number>>): Archetype {
  let maxScore = -1;
  let bestMatch: ArchetypeKey = 'paladin';

  Object.entries(archetypes).forEach(([key, archetype]) => {
    const score = Object.entries(stats).reduce((sum, [stat, value]) => {
      return sum + (value || 0) * (archetype.stats[stat as StatType] || 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = key as ArchetypeKey;
    }
  });

  return archetypes[bestMatch];
}

export { archetypes };