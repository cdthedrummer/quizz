export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: {
    id: string;
    text: string;
    stats: {
      [key: string]: number;
    };
  }[];
}

export type QuizAnswers = {
  [key: string]: string[];
}