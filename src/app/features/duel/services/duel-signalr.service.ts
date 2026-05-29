import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { DuelStartedResponse } from '../models/matchmaking.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { DuelRoundDto } from '../models/duel.model';
import { KeycloakAuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DuelSignalrService {
  constructor(
    private router: Router,
    private authService: KeycloakAuthService,
  ) {}

  private hubConnection!: HubConnection;
  private duelStartedSubject = new Subject<DuelStartedResponse>();

  public duelStarted: Observable<DuelStartedResponse> =
    this.duelStartedSubject.asObservable();

  private roundCompletedSubject = new Subject<DuelRoundDto>();
  public roundCompleted: Observable<DuelRoundDto> =
    this.roundCompletedSubject.asObservable();

  public async startConnection(): Promise<void> {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/gamehub`, {
        accessTokenFactory: () => this.authService.getToken() || '',
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

    this.hubConnection.on('MatchmakingStarted', () => {});

    this.hubConnection.on('DuelAbandoned', () => {
      this.router.navigate(['']);
    });

    this.hubConnection.on('RoundCompleted', (round: DuelRoundDto) => {
      this.roundCompletedSubject.next(round);
    });

    this.hubConnection.on('DuelCompleted', () => {
      alert('DUEL COMPLETED');
      this.router.navigate(['']);
    });
  }
}
