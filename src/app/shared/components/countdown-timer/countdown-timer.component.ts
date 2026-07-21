import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnChanges {
  @Input() resetKey!: number;
  @Output() finished = new EventEmitter<void>();

  readonly total = 10;
  readonly warnAt = 5;
  readonly dangerAt = 3;
  readonly secondsRemaining = signal(this.total);
  readonly formattedRemaining = computed(() =>
    this.formatTime(this.secondsRemaining()),
  );

  private timerId?: number;
  private finishedEmitted = false;

  constructor() {
    this.startTimer();

    inject(DestroyRef).onDestroy(() => this.stopTimer());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resetKey'] && !changes['resetKey'].firstChange) {
      this.reset();
    }
  }

  private formatTime(totalSeconds: number): string {
    return new Date(totalSeconds * 1000).toISOString().slice(14, 19);
  }

  private reset() {
    this.finishedEmitted = false;
    this.secondsRemaining.set(this.total);
    this.startTimer();
  }

  private startTimer() {
    this.stopTimer();

    this.timerId = window.setInterval(() => {
      this.secondsRemaining.update((v) => {
        const next = Math.max(v - 1, 0);

        if (next === 0 && !this.finishedEmitted) {
          this.finishedEmitted = true;
          this.finished.emit();
        }

        return next;
      });
    }, 1000);
  }

  private stopTimer() {
    clearInterval(this.timerId);
  }
}
