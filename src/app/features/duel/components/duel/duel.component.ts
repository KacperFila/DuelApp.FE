import { Component, inject } from '@angular/core';
import { QuestionPageComponent } from '../question-page/question-page.component';
import { DuelSignalrService } from '../../services/duel-signalr.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DuelCompletedDto } from '../../models/matchmaking.model';
import { DuelSummaryComponent } from '../duel-summary/duel-summary.component';

@Component({
  selector: 'app-duel',
  standalone: true,
  imports: [QuestionPageComponent, AsyncPipe, DuelSummaryComponent],
  templateUrl: './duel.component.html',
  styleUrl: './duel.component.scss',
})
export class DuelComponent {
  private duelSignalrService = inject(DuelSignalrService);
  private router = inject(Router);

  protected readonly isDuelCompleted$: Observable<DuelCompletedDto> =
    this.duelSignalrService.duelCompleted;

  protected closeSummary(): void {
    this.router.navigate(['']);
  }
}
