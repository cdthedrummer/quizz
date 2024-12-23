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
  {
    id: 'activity',
    text: 'What types of activities energize you?',
    type: 'multiple',
    options: [
      { id: 'activity-social', text: '🎉 Social gatherings', stats: { charisma: 2 } },
      { id: 'activity-sports', text: '🏃 Sports', stats: { dexterity: 1, strength: 1 } },
      { id: 'activity-creative', text: '🎨 Creative work', stats: { intelligence: 1, wisdom: 1 } },
      { id: 'activity-outdoors', text: '🏞️ Outdoor adventures', stats: { constitution: 1, dexterity: 1 } },
    ],
  },
  {
    id: 'challenge',
    text: 'How do you approach challenges?',
    type: 'single',
    options: [
      { id: 'challenge-plan', text: '📝 Careful planning', stats: { intelligence: 2 } },
      { id: 'challenge-adapt', text: '🌊 Adapt as I go', stats: { wisdom: 2 } },
      { id: 'challenge-team', text: '🤝 Work with others', stats: { charisma: 2 } },
      { id: 'challenge-action', text: '⚡ Take immediate action', stats: { dexterity: 1, strength: 1 } },
    ],
  },
];