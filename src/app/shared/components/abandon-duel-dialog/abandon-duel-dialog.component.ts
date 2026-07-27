import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DuelsService } from '../../../features/duel/services/duels.service';

@Component({
  selector: 'app-surrender-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './abandon-duel-dialog.component.html',
})
export class AbandonDuelDialogComponent {
  constructor(private dialogRef: MatDialogRef<AbandonDuelDialogComponent>) {}

  private readonly duelsService = inject(DuelsService);

  protected cancel(): void {
    this.dialogRef.close(false);
  }

  protected abandonDuel(): void {
    this.duelsService.abandonDuel().subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
