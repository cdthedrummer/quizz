import { StatType } from '../types';

export interface Archetype {
  name: string;
  description: string;
  stats: Partial<Record<StatType, number>>;
  activities: string[];
}

export const archetypes: Record<string, Archetype> = {
  warrior: {
    name: 'Warrior',
    description: 'You excel at physical challenges and leadership through action.',
    stats: { strength: 2, constitution: 1 },
    activities: [
      'Strength Training',
      'Martial Arts',
      'Team Sports',
      'Outdoor Adventure'
    ]
  },
  scholar: {
    name: 'Scholar',
    description: 'Your pursuit of knowledge and analytical mind set you apart.',
    stats: { intelligence: 2, wisdom: 1 },
    activities: [
      'Research',
      'Programming',
      'Strategy Games',
      'Creative Writing'
    ]
  },
  artist: {
    name: 'Artist',
    description: 'Your creativity and precision help you master skilled activities.',
    stats: { dexterity: 2, charisma: 1 },
    activities: [
      'Visual Arts',
      'Music',
      'Dance',
      'Crafts'
    ]
  },
  mentor: {
    name: 'Mentor',
    description: 'You understand people deeply and guide others naturally.',
    stats: { wisdom: 2, charisma: 1 },
    activities: [
      'Teaching',
      'Counseling',
      'Meditation',
      'Nature Activities'
    ]
  },
  explorer: {
    name: 'Explorer',
    description: 'Your adaptability and endurance help you thrive in any situation.',
    stats: { constitution: 2, dexterity: 1 },
    activities: [
      'Hiking',
      'Rock Climbing',
      'Travel',
      'Photography'
    ]
  }
};

export function determineArchetype(stats: Partial<Record<StatType, number>>): Archetype {
  const scores = Object.entries(archetypes).map(([id, archetype]) => {
    const score = Object.entries(archetype.stats).reduce((sum, [stat, weight]) => {
      return sum + (stats[stat as StatType] || 0) * weight;
    }, 0);
    return { id, score };
  });

  const winner = scores.reduce((max, curr) => 
    curr.score > max.score ? curr : max
  );

  return archetypes[winner.id];
}