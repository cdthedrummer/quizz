import { StatType } from '../types';

export interface Archetype {
  name: string;
  icon: string;
  description: string;
  stats: Partial<Record<StatType, number>>;
  activities: string[];
}

export const archetypes: Record<string, Archetype> = {
  paladin: {
    name: 'Paladin',
    icon: '⚔️',
    description: 'Your strength isn\'t just physical - it\'s the power to inspire and protect others. You naturally take the lead in challenging situations.',
    stats: { strength: 2, constitution: 1 },
    activities: [
      'Athletic Training',
      'Team Leadership',
      'Community Service',
      'Competitive Sports'
    ]
  },
  wizard: {
    name: 'Wizard',
    icon: '🔮',
    description: 'Your curiosity is boundless. While others see problems, you see fascinating puzzles waiting to be solved.',
    stats: { intelligence: 2, wisdom: 1 },
    activities: [
      'Problem Solving',
      'Technical Skills',
      'Research Projects',
      'Strategic Planning'
    ]
  },
  bard: {
    name: 'Bard',
    icon: '✨',
    description: 'People are naturally drawn to your creative energy. You have a gift for inspiring others and bringing ideas to life.',
    stats: { dexterity: 2, charisma: 1 },
    activities: [
      'Creative Expression',
      'Public Speaking',
      'Digital Creation',
      'Event Planning'
    ]
  },
  druid: {
    name: 'Druid',
    icon: '🌿',
    description: 'You have a deep understanding of natural patterns and human nature. Your intuition guides you to harmonious solutions.',
    stats: { wisdom: 2, charisma: 1 },
    activities: [
      'Mindfulness Practice',
      'Environmental Projects',
      'Wellness Activities',
      'Community Building'
    ]
  },
  ranger: {
    name: 'Ranger',
    icon: '🏹',
    description: 'Your adaptability is your greatest strength. Whether in nature or life\'s challenges, you find your path forward.',
    stats: { constitution: 2, dexterity: 1 },
    activities: [
      'Outdoor Activities',
      'Endurance Training',
      'Navigation Skills',
      'Nature Photography'
    ]
  }
};