import { Component, inject, OnInit } from '@angular/core';
import { QuestionPageComponent } from '../question-page/question-page.component';
import { DuelSignalrService } from '../../services/duel-signalr.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { DuelCompletedDto } from '../../models/matchmaking.model';
import { DuelSummaryComponent } from '../duel-summary/duel-summary.component';
import { DuelsService } from '../../services/duels.service';
import { MatDialog } from '@angular/material/dialog';
import { OpponentLeavedDialog } from '../../../../shared/components/opponent-leaved-dialog/opponent-leaved-dialog.component';
import { DuelAbandonedDto } from '../../models/duel.model';
import { AccountService } from '../../../../shared/services/account.service';
import { UserInfo } from '../../../../shared/models/auth.model';

@Component({
  selector: 'app-duel',
  standalone: true,
  imports: [QuestionPageComponent, AsyncPipe, DuelSummaryComponent],
  templateUrl: './duel.component.html',
  styleUrl: './duel.component.scss',
})
export class DuelComponent implements OnInit {
  private accountService = inject(AccountService);

  private duelSignalrService = inject(DuelSignalrService);
  private router = inject(Router);
  private duelsService = inject(DuelsService);
  private dialog = inject(MatDialog);
  private userId: string | null = null;

  ngOnInit(): void {
    this.listenForOpponentLeave();
    this.getUserInfo();
  }

  protected readonly isDuelCompleted$: Observable<DuelCompletedDto> =
    this.duelSignalrService.duelCompleted;

  protected isDuelActive = true;

  protected canLeave(): Observable<boolean> {
    if (!this.isDuelActive) {
      return of(true);
    }

    return this.duelsService.AbandonDuel().pipe(map(() => true));
  }

  protected closeSummary(): void {
    this.router.navigate(['']);
  }

  protected abandonDuel(): void {
    this.duelsService.AbandonDuel().subscribe(() => {
      this.isDuelActive = false;
    });
  }

  private listenForOpponentLeave(): void {
    this.duelSignalrService.duelAbandoned.subscribe(
      (data: DuelAbandonedDto) => {
        if (data.abandoningPlayerId === this.userId) {
          return;
        }
        this.router.navigate(['']);
        this.dialog
          .open(OpponentLeavedDialog, {
            width: '420px',
            panelClass: 'duel-dialog',
            backdropClass: 'duel-backdrop',
            disableClose: true,
          })
          .afterClosed();
      },
    );
  }

  private getUserInfo(): void {
    this.accountService.getUserInfo().subscribe((data: UserInfo) => {
      this.userId = data.keycloakId;
    });
  }
}
