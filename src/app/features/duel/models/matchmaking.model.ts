import { UserInfo } from '../../../shared/models/auth.model';

export interface DuelStartedResponse {
  duelId: string;
}

export interface DuelCompletedDto {
  playerOneDetails: UserInfo;
  playerOneScore: number;
  playerTwoDetails: UserInfo;
  playerTwoScore: number;
  isDraw: boolean;
  winnerId: string | null;
}

export const StartMatchmakingHubMethod: string = 'StartMatchmaking';

export interface DuelPreview {
  player: DuelPlayer;
  opponent: DuelPlayer;
}

export interface DuelPlayer {
  email: string;
  totalPoints: number | string;
  avatarUri: string;
}
