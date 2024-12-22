export const STATS = {
  strength: { icon: '💪', label: 'Strength' },
  dexterity: { icon: '🎾', label: 'Dexterity' },
  constitution: { icon: '🛡️', label: 'Constitution' },
  intelligence: { icon: '🧠', label: 'Intelligence' },
  wisdom: { icon: '🔮', label: 'Wisdom' },
  charisma: { icon: '🌟', label: 'Charisma' },
} as const;

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: {
    id: string;
    text: string;
    stats: {
      stat: keyof typeof STATS;
      value: number;
    }[];
  }[];
}

export const questions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'How do you prefer to learn new things?',
    type: 'single',
    options: [
      {
        id: '1a',
        text: '📚 Reading and studying',
        stats: [{ stat: 'intelligence', value: 2 }]
      },
      {
        id: '1b',
        text: '👥 Learning from others',
        stats: [{ stat: 'charisma', value: 2 }]
      },
      {
        id: '1c',
        text: '🔨 Hands-on practice',
        stats: [{ stat: 'dexterity', value: 2 }]
      },
      {
        id: '1d',
        text: '🤔 Observing and reflecting',
        stats: [{ stat: 'wisdom', value: 2 }]
      }
    ]
  },
  // We'll add more questions later...
];