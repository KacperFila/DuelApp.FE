export interface AnswerDto {
  id: string;
  answerText: string;
}

export interface DuelRoundDto {
  number: number;
  totalRounds: number;
  questionId: string;
  questionText: string;
  answers: AnswerDto[];
}

export interface SubmitAnswerPayload {
  answerId: string | null;
}
