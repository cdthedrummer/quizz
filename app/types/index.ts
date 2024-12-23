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

export interface QuizState {
  started: boolean;
  questionIndex: number;
  answers: Record<string, string[]>;
}