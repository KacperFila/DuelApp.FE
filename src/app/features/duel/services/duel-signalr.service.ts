import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { DuelStartedResponse } from '../models/matchmaking.model';
import { environment } from '../../../../environments/environment';
import { getToken } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DuelSignalrService {
  private hubConnection!: HubConnection;

  private duelStartedSubject = new Subject<DuelStartedResponse>();

  public duelStarted: Observable<DuelStartedResponse> =
    this.duelStartedSubject.asObservable();

  public async startConnection(): Promise<void> {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/gamehub`, {
        accessTokenFactory: () => getToken() || '',
      })
      .withAutomaticReconnect()
      .build();

    this.registerHandlers();

    await this.hubConnection.start();
  }

  private registerHandlers(): void {
    this.hubConnection.on('DuelStarted', (data: DuelStartedResponse) => {
      this.duelStartedSubject.next(data);
    });

    this.hubConnection.on('MatchmakingStarted', () => {
      console.log(`Matchmaking started`);
    });
  }
}
