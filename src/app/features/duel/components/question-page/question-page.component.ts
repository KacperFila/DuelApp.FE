import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, filter, Observable, merge, combineLatest, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DuelsService } from '../../services/duels.service';
import { DuelRoundDto } from '../../models/duel.model';
import { DuelSignalrService } from '../../services/duel-signalr.service';
import { CountdownTimerComponent } from '../../../../shared/components/countdown-timer/countdown-timer.component';

type DuelData = {
  duelId: string;
  round: DuelRoundDto;
};

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CountdownTimerComponent,
  ],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss',
})
export class QuestionPageComponent {
  private route = inject(ActivatedRoute);
  private duelsService = inject(DuelsService);
  private duelSignalrService = inject(DuelSignalrService);

  protected selectedAnswerId = new FormControl<string | null>(null);
  protected isAnswerSelectedByUser: boolean = false;
  private currentRoundId: string | null = null;

  private duelId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('duelId')),
    filter((id): id is string => id !== null),
  );

  private currentRound$: Observable<DuelRoundDto> = merge(
    this.duelsService.getCurrentRound(),
    this.duelSignalrService.roundCompleted,
  );

  protected duelData$: Observable<DuelData> = combineLatest({
    duelId: this.duelId$,
    round: this.currentRound$,
  }).pipe(
    tap((duelData: DuelData) => {
      this.currentRoundId = duelData.round.roundId;
      this.isAnswerSelectedByUser = duelData.round.hasUserSubmittedAnswer;

      this.isAnswerSelectedByUser
        ? this.selectedAnswerId.disable()
        : this.selectedAnswerId.enable();

      this.selectedAnswerId.reset();
    }),
  );

  protected submitAnswer(roundId: string): void {
    const answerId = this.selectedAnswerId.value;

    if (!answerId || this.isAnswerSelectedByUser) {
      return;
    }

    this.isAnswerSelectedByUser = true;
    this.selectedAnswerId.disable();

    this.duelsService.submitAnswer(roundId, answerId).subscribe({
      error: () => {
        if (this.currentRoundId !== roundId) {
          return;
        }

        this.isAnswerSelectedByUser = false;
        this.selectedAnswerId.enable();
      },
    });
  }
}
