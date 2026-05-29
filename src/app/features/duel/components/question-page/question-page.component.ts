import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, filter, Observable, merge } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf, AsyncPipe } from '@angular/common';
import { DuelsService } from '../../services/duels.service';
import { DuelRoundDto } from '../../models/duel.model';
import { DuelSignalrService } from '../../services/duel-signalr.service';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss',
})
export class QuestionPageComponent {
  private route = inject(ActivatedRoute);
  private duelsService = inject(DuelsService);
  private duelSignalrService = inject(DuelSignalrService);

  protected selectedAnswerId = new FormControl<string | null>(null);

  protected duelId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('duelId')),
    filter((id): id is string => id !== null),
  );

  protected currentRound$: Observable<DuelRoundDto> = merge(
    this.duelsService.GetCurrentRound(),
    this.duelSignalrService.roundCompleted,
  );

  protected submitAnswer(): void {
    const answerId = this.selectedAnswerId.value;

    if (!answerId) {
      return;
    }

    this.duelsService.SubmitAnswer(answerId).subscribe();
  }

  protected abandonDuel(): void {
    this.duelsService.AbandonDuel().subscribe();
  }
}
