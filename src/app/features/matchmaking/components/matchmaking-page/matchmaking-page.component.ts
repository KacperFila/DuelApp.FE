import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatchmakingService } from '../../services/matchmaking.service';
import { TimeFormatPipe } from '../../../../shared/pipes/time-format.pipe';
import { PreduelViewComponent } from '../preduel-view/preduel-view.component';
import { TileComponent } from '../../../../shared/components/tile/tile.component';
import { DuelSignalrService } from '../../../duel/services/duel-signalr.service';

@Component({
  selector: 'app-matchmaking-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TimeFormatPipe,
    PreduelViewComponent,
    TileComponent,
  ],
  templateUrl: './matchmaking-page.component.html',
  styleUrl: './matchmaking-page.component.scss',
})
export class MatchmakingPageComponent {
  private readonly matchmakingService = inject(MatchmakingService);
  private readonly duelSignalRService = inject(DuelSignalrService);
  private readonly router = inject(Router);

  protected readonly duelStarted$ = this.duelSignalRService.duelStarted;
  protected readonly isMatchmaking$ = this.matchmakingService.isMatchmaking$;
  protected readonly elapsedSeconds$ = this.matchmakingService.elapsedSeconds$;
  protected readonly isOpponentFound$ = this.matchmakingService.opponentFound$;

  constructor() {
    this.duelStarted$.subscribe((data) => {
      if (!data) return;

      this.router.navigate(['/duel', data.duelId]);
    });
  }

  public startMatchmaking(): void {
    this.matchmakingService.startMatchmaking();
  }

  public cancelMatchmaking(): void {
    this.matchmakingService.cancelMatchmaking();
  }
}
