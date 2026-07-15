export interface DuelStartedResponse {
  duelId: string;
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
