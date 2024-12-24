import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    text: 'How do you prefer to learn?',
    type: 'select-one',
    options: [
      {
        text: 'Reading or Studying',
        stats: [{ type: 'intelligence', value: 3 }]
      },
      {
        text: 'Watching a Video',
        stats: [
          { type: 'intelligence', value: 2 },
          { type: 'wisdom', value: 2 }
        ]
      },
      {
        text: 'Doing it Yourself',
        stats: [{ type: 'dexterity', value: 3 }]
      },
      {
        text: 'Group Setting',
        stats: [{ type: 'charisma', value: 3 }]
      }
    ]
  }
  // More questions will be added here
];