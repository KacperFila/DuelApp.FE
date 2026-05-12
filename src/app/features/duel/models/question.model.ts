export interface QuestionWithAnswers {
  title: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}
