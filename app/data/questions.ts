import { QuizQuestion } from '../types/quiz.types';

export const questions: QuizQuestion[] = [
  {
    id: 'learn',
    text: "How do you learn best?",
    type: "single",
    options: [
      { 
        id: "learn-read", 
        text: "📚 Reading",
        subtext: "Books, manuals, forums",
        statGains: [{ stat: 'intelligence', value: 2 }]
      },
      { 
        id: "learn-watch", 
        text: "👀 Watching",
        subtext: "Videos and tutorials",
        statGains: [
          { stat: 'intelligence', value: 1 },
          { stat: 'wisdom', value: 1 }
        ]
      },
      { 
        id: "learn-do", 
        text: "🛠️ Hands-on",
        subtext: "Practice and experimentation",
        statGains: [{ stat: 'dexterity', value: 2 }]
      },
      { 
        id: "learn-group", 
        text: "👥 With others",
        subtext: "Classes and groups",
        statGains: [{ stat: 'charisma', value: 2 }]
      }
    ]
  },
  {
    id: 'health',
    text: "What's your health focus?",
    type: "multiple",
    options: [
      { 
        id: "health-diet", 
        text: "🥗 Diet",
        subtext: "Nutrition planning",
        statGains: [{ stat: 'constitution', value: 1 }]
      },
      { 
        id: "health-exercise", 
        text: "💪 Exercise",
        subtext: "Regular activity",
        statGains: [
          { stat: 'strength', value: 1 },
          { stat: 'dexterity', value: 1 }
        ]
      },
      { 
        id: "health-rest", 
        text: "😴 Rest",
        subtext: "Sleep and recovery",
        statGains: [{ stat: 'wisdom', value: 1 }]
      }
    ]
  }
];