import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-opponent-left-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './opponent-left-dialog.component.html',
  styleUrl: './opponent-left-dialog.component.scss',
})
export class OpponentLeftDialogComponent {
  constructor(private dialogRef: MatDialogRef<OpponentLeftDialogComponent>) {}

  protected closeDialog(): void {
    this.dialogRef.close(true);
  }
}
