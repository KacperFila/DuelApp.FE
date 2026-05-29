import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DuelRoundDto, SubmitAnswerPayload } from '../models/duel.model';

@Injectable({
  providedIn: 'root',
})
export class DuelsService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = `${environment.apiUrl}/api`;

  public AbandonDuel(): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/duel`);
  }

  public GetCurrentRound(): Observable<DuelRoundDto> {
    return this.httpClient.get<DuelRoundDto>(
      `${this.apiUrl}/duel/round/current`,
    );
  }

  public SubmitAnswer(answerId: string): Observable<void> {
    const payload: SubmitAnswerPayload = {
      answerId: answerId,
    };

    return this.httpClient.post<void>(`${this.apiUrl}/duel/answer`, payload);
  }
}
