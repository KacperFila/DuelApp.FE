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
import { DuelStartedResponse } from '../../duel/models/matchmaking.model';
import { DuelSignalrService } from '../../duel/services/duel-signalr.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MatchmakingService {
  private readonly OPPONENT_DISPLAY_MS: number = 8000;

  private readonly apiUrl: string = `${environment.apiUrl}/api`;

  private readonly destroy$ = new Subject<void>();

  private readonly isMatchmakingSubject = new BehaviorSubject<boolean>(false);
  public readonly isMatchmaking$ = this.isMatchmakingSubject.asObservable();

  private readonly isOpponentFoundSubject = new BehaviorSubject<boolean>(false);
  public readonly isOpponentFound$ = this.isOpponentFoundSubject.asObservable();

  private readonly elapsedSecondsSubject = new BehaviorSubject<number>(0);
  public readonly elapsedSeconds$ = this.elapsedSecondsSubject.asObservable();

  private readonly stopTimer$ = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly signalR: DuelSignalrService,
    private readonly router: Router,
  ) {
    this.registerSignalR();
  }

  private registerSignalR(): void {
    this.signalR.duelStarted.subscribe((response: DuelStartedResponse) => {
      if (!response?.duelId) {
        return;
      }

      this.isOpponentFoundSubject.next(true);
      this.stopTimer$.next();

      setTimeout(() => {
        this.resetMatchmakingState();
        this.router.navigate(['/duel', response.duelId]);
      }, this.OPPONENT_DISPLAY_MS);
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
    this.isOpponentFoundSubject.next(false);
    this.elapsedSecondsSubject.next(0);
    this.stopTimer$.next();
  }

  public destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
