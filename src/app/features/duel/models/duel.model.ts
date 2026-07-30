export interface AnswerDto {
  id: string;
  answerText: string;
}

export interface DuelRoundDto {
  roundId: string;
  number: number;
  totalRounds: number;
  questionId: string;
  questionText: string;
  answers: AnswerDto[];
  endsAt: Date;
  roundDurationSeconds: number;
  hasUserSubmittedAnswer: boolean;
}

export interface SubmitAnswerPayload {
  roundId: string;
  answerId: string | null;
}

export interface OpponentFoundDto {}

export interface DuelAbandonedDto {
  abandoningPlayerId: string;
}
