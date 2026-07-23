import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
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
export class CountdownTimerComponent {
  @Input({ required: true }) endsAt!: Date;
  @Input({ required: true }) roundDurationSeconds!: number;

  @Output() finished = new EventEmitter<void>();

  readonly warnPercentage = 40;
  readonly dangerPercentage = 20;

  readonly secondsRemaining = signal(0);

  readonly progress = computed(() => {
    if (!this.roundDurationSeconds) {
      return 0;
    }

    return (this.secondsRemaining() / this.roundDurationSeconds) * 100;
  });

  readonly formattedRemaining = computed(() =>
    this.formatTime(this.secondsRemaining()),
  );

  readonly isWarn = computed(() => {
    const progress = this.progress();

    return progress <= this.warnPercentage && progress > this.dangerPercentage;
  });

  readonly isDanger = computed(() => this.progress() <= this.dangerPercentage);

  private timerId?: number;
  private finishedEmitted = false;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stopTimer());
  }

  ngOnChanges(): void {
    this.startTimer();
  }

  private startTimer(): void {
    this.stopTimer();

    this.finishedEmitted = false;
    this.updateRemaining();

    this.timerId = window.setInterval(() => {
      this.updateRemaining();
    }, 1000);
  }

  private updateRemaining(): void {
    const remaining = Math.max(
      Math.ceil((new Date(this.endsAt).getTime() - Date.now()) / 1000),
      0,
    );

    this.secondsRemaining.set(remaining);

    if (remaining === 0 && !this.finishedEmitted) {
      this.finishedEmitted = true;
      this.finished.emit();
      this.stopTimer();
    }
  }

  private formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }
}
