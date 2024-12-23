import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'learn',
    text: 'How do you learn best?',
    type: 'single',
    options: [
      { id: 'learn-read', text: '📚 Reading', stats: { intelligence: 2 } },
      { id: 'learn-watch', text: '👀 Watching', stats: { wisdom: 2 } },
      { id: 'learn-do', text: '🛠️ Hands-on', stats: { dexterity: 2 } },
      { id: 'learn-group', text: '👥 With others', stats: { charisma: 2 } },
    ],
  },
  {
    id: 'health',
    text: 'What\'s your health focus?',
    type: 'multiple',
    options: [
      { id: 'health-diet', text: '🥗 Diet', stats: { constitution: 1 } },
      { id: 'health-exercise', text: '💪 Exercise', stats: { strength: 1 } },
      { id: 'health-rest', text: '😴 Rest', stats: { wisdom: 1 } },
    ],
  },
];
