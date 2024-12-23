export interface Stats {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

export interface OptionType {
  id: string;
  text: string;
  stats: Stats;
}

export interface QuestionType {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: OptionType[];
}

export interface QuizState {
  started: boolean;
  questionIndex: number;
  answers: Record<string, string[]>;
}

export interface CharacterStats extends Stats {
  primaryStat: keyof Stats;
  secondaryStat: keyof Stats;
}