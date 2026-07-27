import { Component, OnInit } from '@angular/core';
import { MatchmakingService } from '../../services/matchmaking.service';
import { AccountService } from '../../../../shared/services/account.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { DuelsService } from '../../../duel/services/duels.service';
import { DuelPreview } from '../../../duel/models/matchmaking.model';

@Component({
  selector: 'app-preduel-view',
  standalone: true,
  templateUrl: './preduel-view.component.html',
  styleUrl: './preduel-view.component.scss',
  imports: [AsyncPipe, CommonModule],
})
export class PreduelViewComponent implements OnInit {
  constructor(
    private matchmakingService: MatchmakingService,
    private duelsService: DuelsService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.matchmakingService.opponentFound$
      .pipe(
        filter(Boolean),
        switchMap(() => this.duelsService.getCurrentDuelPreview()),
      )
      .subscribe((response) => {
        this.duelInfo$.next(response);
      });

    this.accountService.getUserInfo().subscribe((userInfo) => {
      const current = this.duelInfo$.value;

      this.accountService.getMyAvatarUri().subscribe((avatarUri) => {
        this.duelInfo$.next({
          ...current,
          player: {
            ...current.player,
            email: userInfo.email,
            avatarUri: avatarUri,
          },
          opponent: {
            ...current.opponent,
            email: '-',
            avatarUri: avatarUri,
          },
        });
      });
    });
  }

  protected duelInfo$ = new BehaviorSubject<DuelPreview>({
    player: {
      email: '',
      totalPoints: '',
      avatarUri: '',
    },
    opponent: {
      email: '',
      totalPoints: '',
      avatarUri: '',
    },
  });
}
