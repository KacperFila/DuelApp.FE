import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import { DuelCompletedDto } from '../../models/matchmaking.model';
import { AccountService } from '../../../../shared/services/account.service';
import { UserInfo } from '../../../../shared/models/auth.model';

@Component({
  selector: 'app-duel-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './duel-summary.component.html',
  styleUrl: './duel-summary.component.scss',
})
export class DuelSummaryComponent implements OnChanges {
  protected readonly accountService = inject(AccountService);

  @Input() duelCompletedDetails: DuelCompletedDto | null = null;
  @Output() summaryClosed = new EventEmitter<void>();

  protected duelResult = '';
  protected hasCurrentPlayerWon = false;

  protected myPlayer$?: Observable<UserInfo>;
  protected opponentPlayer$?: Observable<UserInfo>;

  protected myScore$?: Observable<number>;
  protected opponentScore$?: Observable<number>;

  protected myAvatarUri$?: Observable<string>;
  protected opponentAvatarUri$?: Observable<string>;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.duelCompletedDetails) {
      return;
    }

    const userInfo$ = this.accountService.getUserInfo();

    this.myPlayer$ = userInfo$.pipe(
      map((userInfo) =>
        userInfo.profileId === this.duelCompletedDetails!.playerOneDetails.profileId
          ? this.duelCompletedDetails!.playerOneDetails
          : this.duelCompletedDetails!.playerTwoDetails,
      ),
    );

    this.opponentPlayer$ = userInfo$.pipe(
      map((userInfo) =>
        userInfo.profileId === this.duelCompletedDetails!.playerOneDetails.profileId
          ? this.duelCompletedDetails!.playerTwoDetails
          : this.duelCompletedDetails!.playerOneDetails,
      ),
    );

    this.myScore$ = userInfo$.pipe(
      map((userInfo) =>
        userInfo.profileId === this.duelCompletedDetails!.playerOneDetails.profileId
          ? this.duelCompletedDetails!.playerOneScore
          : this.duelCompletedDetails!.playerTwoScore,
      ),
    );

    this.opponentScore$ = userInfo$.pipe(
      map((userInfo) =>
        userInfo.profileId === this.duelCompletedDetails!.playerOneDetails.profileId
          ? this.duelCompletedDetails!.playerTwoScore
          : this.duelCompletedDetails!.playerOneScore,
      ),
    );

    this.myAvatarUri$ = this.myPlayer$.pipe(
      switchMap((player) => this.accountService.getPlayerAvatarUri(player.profileId)),
    );

    this.opponentAvatarUri$ = this.opponentPlayer$.pipe(
      switchMap((player) => this.accountService.getPlayerAvatarUri(player.profileId)),
    );

    userInfo$.subscribe((userInfo) => {
      if (this.duelCompletedDetails!.isDraw) {
        this.duelResult = 'Draw!';
        return;
      }

      this.hasCurrentPlayerWon =
        userInfo.userId === this.duelCompletedDetails!.winnerId;

      this.duelResult = this.hasCurrentPlayerWon ? 'You won!' : 'You lost!';
    });
  }
}
