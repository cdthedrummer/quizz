export interface Stats {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  stats: Stats;
}

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 'learn',
    text: "How do you learn best?",
    type: "single",
    options: [
      { id: "learn-read", text: "📚 Reading", stats: { intelligence: 2 }},
      { id: "learn-watch", text: "👀 Watching", stats: { wisdom: 2 }},
      { id: "learn-do", text: "🛠️ Hands-on", stats: { dexterity: 2 }},
      { id: "learn-group", text: "👥 With others", stats: { charisma: 2 }}
    ]
  },
  {
    id: 'health',
    text: "What's your health focus? (Select all that apply)",
    type: "multiple",
    options: [
      { id: "health-diet", text: "🥗 Diet", stats: { constitution: 1 }},
      { id: "health-exercise", text: "💪 Exercise", stats: { strength: 1 }},
      { id: "health-rest", text: "😴 Rest", stats: { wisdom: 1 }}
    ]
  }
];