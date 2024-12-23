import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'learn',
    text: 'How do you prefer to learn new things?',
    type: 'single',
    options: [
      { id: 'learn-read', text: '📚 Through reading and research', stats: { intelligence: 2, wisdom: 1 } },
      { id: 'learn-watch', text: '👀 By observing and reflecting', stats: { wisdom: 2, intelligence: 1 } },
      { id: 'learn-do', text: '🛠️ Through hands-on practice', stats: { dexterity: 2, strength: 1 } },
      { id: 'learn-teach', text: '🗣️ By teaching others', stats: { charisma: 2, wisdom: 1 } },
    ],
  },
  {
    id: 'challenge',
    text: 'When facing a challenge, you usually...',
    type: 'single',
    options: [
      { id: 'challenge-analyze', text: '🔍 Analyze all possibilities', stats: { intelligence: 2, wisdom: 1 } },
      { id: 'challenge-quick', text: '⚡ React quickly and adapt', stats: { dexterity: 2, constitution: 1 } },
      { id: 'challenge-power', text: '💪 Power through it', stats: { strength: 2, constitution: 1 } },
      { id: 'challenge-team', text: '👥 Rally a team', stats: { charisma: 2, wisdom: 1 } },
    ],
  },
  {
    id: 'weekend',
    text: 'Your ideal weekend involves...',
    type: 'multiple',
    options: [
      { id: 'weekend-social', text: '🎉 Social gatherings', stats: { charisma: 2 } },
      { id: 'weekend-adventure', text: '🏃‍♂️ Physical adventures', stats: { strength: 1, constitution: 1 } },
      { id: 'weekend-learn', text: '📖 Learning something new', stats: { intelligence: 2 } },
      { id: 'weekend-create', text: '🎨 Creating or crafting', stats: { dexterity: 1, intelligence: 1 } },
    ],
  },
  {
    id: 'problem',
    text: 'When solving a problem, you prefer to...',
    type: 'single',
    options: [
      { id: 'problem-logic', text: '🧮 Use logic and analysis', stats: { intelligence: 2 } },
      { id: 'problem-intuition', text: '🔮 Trust your intuition', stats: { wisdom: 2 } },
      { id: 'problem-action', text: '🎯 Take direct action', stats: { strength: 1, dexterity: 1 } },
      { id: 'problem-discuss', text: '💭 Discuss with others', stats: { charisma: 2 } },
    ],
  },
  {
    id: 'goals',
    text: 'Which personal goals interest you most?',
    type: 'multiple',
    options: [
      { id: 'goals-strength', text: '💪 Physical strength', stats: { strength: 2, constitution: 1 } },
      { id: 'goals-knowledge', text: '🧠 Knowledge and skills', stats: { intelligence: 2, wisdom: 1 } },
      { id: 'goals-social', text: '🤝 Leadership and influence', stats: { charisma: 2 } },
      { id: 'goals-health', text: '❤️ Health and wellness', stats: { constitution: 2, wisdom: 1 } },
    ],
  },
];