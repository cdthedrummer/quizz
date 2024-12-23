import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 'learn',
    text: 'How do you learn best?',
    type: 'single',
    options: [
      { id: 'learn-read', text: '📚 Reading', stats: { intelligence: 2 }},
      { id: 'learn-watch', text: '👀 Watching', stats: { wisdom: 2 }},
      { id: 'learn-do', text: '🛠️ Hands-on', stats: { dexterity: 2 }},
      { id: 'learn-group', text: '👥 With others', stats: { charisma: 2 }}
    ]
  },
  {
    id: 'health',
    text: "What's your health focus?",
    type: 'multiple',
    options: [
      { id: 'health-diet', text: '🥗 Diet', stats: { constitution: 1 }},
      { id: 'health-exercise', text: '💪 Exercise', stats: { strength: 1 }},
      { id: 'health-rest', text: '😴 Rest', stats: { wisdom: 1 }}
    ]
  },
  {
    id: 'activity',
    text: 'What physical activities do you enjoy most?',
    type: 'multiple',
    options: [
      { id: 'activity-sports', text: '🏃 Sports', stats: { dexterity: 1, strength: 1 }},
      { id: 'activity-gym', text: '🏋️ Gym', stats: { strength: 2 }},
      { id: 'activity-yoga', text: '🧘 Yoga', stats: { wisdom: 1, dexterity: 1 }},
      { id: 'activity-dance', text: '💃 Dance', stats: { charisma: 1, dexterity: 1 }}
    ]
  }
];