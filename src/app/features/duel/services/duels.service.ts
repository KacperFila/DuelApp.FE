import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DuelRoundDto, SubmitAnswerPayload } from '../models/duel.model';
import { DuelPreview } from '../models/matchmaking.model';

@Injectable({
  providedIn: 'root',
})
export class DuelsService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = `${environment.apiUrl}/api`;

  public abandonDuel(): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/duel`);
  }

  public getCurrentDuelPreview(): Observable<DuelPreview> {
    return this.httpClient.get<DuelPreview>(`${this.apiUrl}/duel/preview`);
  }

  public getCurrentRound(): Observable<DuelRoundDto> {
    return this.httpClient.get<DuelRoundDto>(
      `${this.apiUrl}/duel/round/current`,
    );
  }

  public submitAnswer(
    roundId: string,
    answerId: string | null,
  ): Observable<void> {
    const payload: SubmitAnswerPayload = {
      roundId,
      answerId,
    };

    return this.httpClient.post<void>(`${this.apiUrl}/duel/answer`, payload);
  }

  public checkIfUserInActiveDuel(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/duel/current`);
  }
}
