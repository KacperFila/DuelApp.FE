import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatchmakingService } from '../../services/matchmaking.service';
import { TimeFormatPipe } from '../../../../shared/pipes/time-format.pipe';
import { PreduelViewComponent } from '../preduel-view/preduel-view.component';
import { TileComponent } from '../../../../shared/components/tile/tile.component';

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
export class MatchmakingPageComponent implements OnDestroy {
  private matchmakingService = inject(MatchmakingService);

  protected readonly isMatchmaking$ = this.matchmakingService.isMatchmaking$;
  protected readonly elapsedSeconds$ = this.matchmakingService.elapsedSeconds$;
  protected readonly isOpponentFound$ =
    this.matchmakingService.isOpponentFound$;

  public startMatchmaking(): void {
    this.matchmakingService.startMatchmaking();
  }

  public cancelMatchmaking(): void {
    this.matchmakingService.cancelMatchmaking();
  }

  public ngOnDestroy(): void {
    this.matchmakingService.destroy();
  }
}
