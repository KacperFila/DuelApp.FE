import { Component, inject } from '@angular/core';
import { QuestionPageComponent } from '../question-page/question-page.component';
import { DuelSignalrService } from '../../services/duel-signalr.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { DuelCompletedDto } from '../../models/matchmaking.model';
import { DuelSummaryComponent } from '../duel-summary/duel-summary.component';
import { DuelsService } from '../../services/duels.service';
import { MatDialog } from '@angular/material/dialog';
import { DuelAbandonedDto } from '../../models/duel.model';
import { AccountService } from '../../../../shared/services/account.service';
import { UserInfo } from '../../../../shared/models/auth.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbandonDuelDialogComponent } from '../../../../shared/components/abandon-duel-dialog/abandon-duel-dialog.component';
import { OpponentLeftDialogComponent } from '../../../../shared/components/opponent-left-dialog/opponent-left-dialog.component';

@Component({
  selector: 'app-duel',
  standalone: true,
  imports: [QuestionPageComponent, AsyncPipe, DuelSummaryComponent],
  templateUrl: './duel.component.html',
  styleUrl: './duel.component.scss',
})
export class DuelComponent {
  private readonly accountService = inject(AccountService);
  private readonly duelSignalrService = inject(DuelSignalrService);
  private readonly router = inject(Router);
  private readonly duelsService = inject(DuelsService);
  private readonly dialog = inject(MatDialog);
  private userId: string | null = null;

  constructor() {
    this.getUserInfo();
    this.listenForOpponentLeave();
  }

  protected readonly duelCompleted$: Observable<DuelCompletedDto> =
    this.duelSignalrService.duelCompleted;
  protected readonly isDuelActive$ = this.duelSignalrService.duelActive;

  protected canLeave(): Observable<boolean> {
    return this.isDuelActive$.pipe(
      switchMap((isActive) => {
        if (!isActive) {
          return of(true);
        }

        return this.duelsService.abandonDuel().pipe(map(() => true));
      }),
    );
  }

  protected closeSummary(): void {
    this.router.navigate(['']);
  }

  protected abandonDuel(): void {
    this.dialog
      .open(AbandonDuelDialogComponent, {
        width: '420px',
        panelClass: 'duel-dialog',
        backdropClass: 'duel-backdrop',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.router.navigate(['']);
      });
  }

  private listenForOpponentLeave(): void {
    this.duelSignalrService.duelAbandoned
      .pipe(
        takeUntilDestroyed(),
        switchMap((data: DuelAbandonedDto) => {
          if (data.abandoningPlayerId === this.userId) {
            return of(null);
          }

          return this.dialog
            .open(OpponentLeftDialogComponent, {
              width: '420px',
              panelClass: 'duel-dialog',
              backdropClass: 'duel-backdrop',
              disableClose: true,
            })
            .afterClosed()
            .pipe(switchMap(() => this.router.navigate([''])));
        }),
      )
      .subscribe();
  }

  private getUserInfo(): void {
    this.accountService
      .getUserInfo()
      .pipe(takeUntilDestroyed())
      .subscribe((data: UserInfo) => {
        this.userId = data.userId;
      });
  }
}
