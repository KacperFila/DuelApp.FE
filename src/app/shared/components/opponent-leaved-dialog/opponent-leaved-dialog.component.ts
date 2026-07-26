import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { DuelsService } from '../../../features/duel/services/duels.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-opponent-leaved-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './opponent-leaved-dialog.component.html',
  styleUrl: './opponent-leaved-dialog.component.scss',
})
export class OpponentLeavedDialog {
  constructor(private dialogRef: MatDialogRef<OpponentLeavedDialog>) {}

  private router = inject(Router);
  private duelsService = inject(DuelsService);

  protected closeDialog(): void {
    this.duelsService.AbandonDuel().subscribe(() => {
      this.dialogRef.close(true);
      this.router.navigate(['']);
    });
  }
}
