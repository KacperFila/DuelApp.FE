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

  public AbandonDuel(): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/duel`);
  }

  public GetCurrentDuelPreview(): Observable<DuelPreview> {
    return this.httpClient.get<DuelPreview>(`${this.apiUrl}/duel/preview`);
  }

  public GetCurrentRound(): Observable<DuelRoundDto> {
    return this.httpClient.get<DuelRoundDto>(
      `${this.apiUrl}/duel/round/current`,
    );
  }

  public SubmitAnswer(
    roundId: string,
    answerId: string | null,
  ): Observable<void> {
    const payload: SubmitAnswerPayload = {
      roundId,
      answerId,
    };

    return this.httpClient.post<void>(`${this.apiUrl}/duel/answer`, payload);
  }

  public CheckIfUserInActiveDuel(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/duel/current`);
  }
}
