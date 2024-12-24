export interface Question {
  id: number;
  text: string;
  type: 'select-one' | 'select-all' | 'scale';
  options: Array<{
    text: string;
    stats: Array<{
      type: 'strength' | 'intelligence' | 'wisdom' | 'dexterity' | 'charisma' | 'constitution';
      value: number;
    }>;
  }>;
}

export type QuizAnswers = Record<number, string[]>;

export interface Stats {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
  constitution: number;
}

export interface QuizState {
  started: boolean;
  questionIndex: number;
  answers: QuizAnswers;
  isTransitioning: boolean;
}
