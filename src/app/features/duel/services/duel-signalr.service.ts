import { Injectable, DestroyRef, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  DuelCompletedDto,
  DuelStartedResponse,
} from '../models/matchmaking.model';
import { environment } from '../../../../environments/environment';
import {
  DuelAbandonedDto,
  DuelRoundDto,
  OpponentFoundDto,
} from '../models/duel.model';
import { KeycloakAuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DuelSignalrService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(KeycloakAuthService);

  constructor() {
    this.destroyRef.onDestroy(() => this.stopConnection());
  }

  private hubConnection: HubConnection | null = null;
  private readonly duelCompletedSubject = new Subject<DuelCompletedDto>();
  private readonly duelAbandonedSubject = new Subject<DuelAbandonedDto>();
  private readonly roundCompletedSubject = new Subject<DuelRoundDto>();
  private readonly opponentFoundSubject = new Subject<OpponentFoundDto>();
  private readonly duelActiveSubject = new BehaviorSubject<boolean>(false);
  private readonly duelStartedSubject = new Subject<DuelStartedResponse>();

  public readonly duelStarted: Observable<DuelStartedResponse | null> =
    this.duelStartedSubject.asObservable();

  public readonly duelCompleted: Observable<DuelCompletedDto> =
    this.duelCompletedSubject.asObservable();

  public readonly duelActive: Observable<boolean> =
    this.duelActiveSubject.asObservable();

  public readonly roundCompleted: Observable<DuelRoundDto> =
    this.roundCompletedSubject.asObservable();

  public readonly duelAbandoned: Observable<DuelAbandonedDto> =
    this.duelAbandonedSubject.asObservable();

  public readonly opponentFound: Observable<OpponentFoundDto> =
    this.opponentFoundSubject.asObservable();

  public async startConnection(): Promise<void> {
    if (this.hubConnection?.state === 'Connected') {
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/gamehub`, {
        accessTokenFactory: () => this.authService.getToken() || '',
      })
      .withAutomaticReconnect()
      .build();

    this.registerHandlers();
    this.setupReconnectionHandling();

    await this.hubConnection.start();
  }

  public async stopConnection(): Promise<void> {
    if (!this.hubConnection) return;

    this.hubConnection.off('DuelStarted');
    this.hubConnection.off('MatchmakingStarted');
    this.hubConnection.off('OpponentFound');
    this.hubConnection.off('DuelAbandoned');
    this.hubConnection.off('RoundCompleted');
    this.hubConnection.off('DuelCompleted');

    await this.hubConnection.stop();
    this.hubConnection = null;
    this.duelActiveSubject.next(false);
  }

  private setupReconnectionHandling(): void {
    if (!this.hubConnection) return;

    this.hubConnection.onreconnected(() => {
      this.registerHandlers();
    });
  }

  private registerHandlers(): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('DuelStarted', (data: DuelStartedResponse) => {
      this.duelStartedSubject.next(data);
      this.duelActiveSubject.next(true);
    });

    this.hubConnection.on('MatchmakingStarted', () => {});

    this.hubConnection.on('OpponentFound', (data: OpponentFoundDto) => {
      this.opponentFoundSubject.next(data);
    });

    this.hubConnection.on('DuelAbandoned', (data: DuelAbandonedDto) => {
      this.duelAbandonedSubject.next(data);
      this.duelActiveSubject.next(false);
    });

    this.hubConnection.on('RoundCompleted', (data: DuelRoundDto) => {
      this.roundCompletedSubject.next(data);
    });

    this.hubConnection.on('DuelCompleted', (data: DuelCompletedDto) => {
      this.duelCompletedSubject.next(data);
      this.duelActiveSubject.next(false);
    });
  }
}
