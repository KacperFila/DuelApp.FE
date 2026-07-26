import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, filter, Observable, merge, combineLatest } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf, AsyncPipe } from '@angular/common';
import { DuelsService } from '../../services/duels.service';
import { DuelRoundDto } from '../../models/duel.model';
import { DuelSignalrService } from '../../services/duel-signalr.service';
import { CountdownTimerComponent } from '../../../../shared/components/countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    AsyncPipe,
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

  private duelId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('duelId')),
    filter((id): id is string => id !== null),
  );

  private currentRound$: Observable<DuelRoundDto> = merge(
    this.duelsService.GetCurrentRound(),
    this.duelSignalrService.roundCompleted,
  );

  protected duelData$ = combineLatest({
    duelId: this.duelId$,
    round: this.currentRound$,
  });

  protected submitAnswer(roundId: string): void {
    const answerId = this.selectedAnswerId.value;

    this.duelsService.SubmitAnswer(roundId, answerId).subscribe();
  }
}
