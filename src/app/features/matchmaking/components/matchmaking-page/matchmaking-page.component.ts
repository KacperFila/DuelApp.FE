import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DuelSignalrService } from '../../../duel/services/duel-signalr.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { DuelStartedResponse } from '../../../duel/models/matchmaking.model';

@Component({
  selector: 'app-matchmaking-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './matchmaking-page.component.html',
  styleUrl: './matchmaking-page.component.scss',
})
export class MatchmakingPageComponent implements OnInit, OnDestroy {
  constructor(
    private signalRService: DuelSignalrService,
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  private destroy$ = new Subject<void>();
  protected isDuelRunning = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.signalRService.duelStarted
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DuelStartedResponse) => {
        if (response.duelId != null) {
          this.isDuelRunning.next(true);
          this.router.navigate(['/duel', response.duelId]);
        }
      });
  }
  //move to service
  protected startMatchmaking(): void {
    this.httpClient
      .post(`${environment.apiUrl}/api/matchmaking`, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => console.log('Matchmaking started'),
        error: (err) => console.error('Failed to start matchmaking', err),
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
