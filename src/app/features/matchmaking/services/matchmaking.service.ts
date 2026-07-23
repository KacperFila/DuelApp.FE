import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  interval,
  Subject,
  takeUntil,
  catchError,
  of,
  tap,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DuelSignalrService } from '../../duel/services/duel-signalr.service';

@Injectable({
  providedIn: 'root',
})
export class MatchmakingService {
  private readonly apiUrl: string = `${environment.apiUrl}/api`;
  private readonly destroy$ = new Subject<void>();

  private readonly isMatchmakingSubject = new BehaviorSubject<boolean>(false);
  public readonly isMatchmaking$ = this.isMatchmakingSubject.asObservable();

  private readonly opponentFoundSubject = new BehaviorSubject<boolean>(false);
  public readonly opponentFound$ = this.opponentFoundSubject.asObservable();

  private readonly elapsedSecondsSubject = new BehaviorSubject<number>(0);
  public readonly elapsedSeconds$ = this.elapsedSecondsSubject.asObservable();

  private readonly stopTimer$ = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly duelSignalRService: DuelSignalrService,
  ) {
    this.registerSignalR();
  }

  private registerSignalR(): void {
    this.duelSignalRService.opponentFound.subscribe(() => {
      this.opponentFoundSubject.next(true);
    });

    this.duelSignalRService.duelStarted.subscribe(() => {
      this.resetMatchmakingState();
    });
  }

  public startMatchmaking(): void {
    this.isMatchmakingSubject.next(true);
    this.elapsedSecondsSubject.next(0);

    interval(1000)
      .pipe(takeUntil(this.stopTimer$), takeUntil(this.destroy$))
      .subscribe((sec: number) => {
        this.elapsedSecondsSubject.next(sec);
      });

    this.http
      .post(`${this.apiUrl}/matchmaking`, {})
      .pipe(
        catchError((err) => {
          this.isMatchmakingSubject.next(false);
          return of(err);
        }),
      )
      .subscribe();
  }

  public cancelMatchmaking(): void {
    this.http
      .delete(`${this.apiUrl}/matchmaking`)
      .pipe(
        tap(() => {
          this.resetMatchmakingState();
        }),
        catchError((err) => of(err)),
      )
      .subscribe();
  }

  public resetMatchmakingState(): void {
    this.isMatchmakingSubject.next(false);
    this.opponentFoundSubject.next(false);
    this.elapsedSecondsSubject.next(0);
    this.stopTimer$.next();
  }

  public destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
