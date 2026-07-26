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
  templateUrl: './surrender-dialog.component.html',
})
export class AbandonDuelDialogComponent {
  constructor(private dialogRef: MatDialogRef<AbandonDuelDialogComponent>) {}

  private duelsService = inject(DuelsService);

  cancel(): void {
    this.dialogRef.close(false);
  }

  abandonDuel(): void {
    this.duelsService.AbandonDuel().subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
