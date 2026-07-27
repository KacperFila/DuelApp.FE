import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of, switchMap } from 'rxjs';
import { DuelsService } from '../../features/duel/services/duels.service';
import { AbandonDuelDialogComponent } from '../../shared/components/abandon-duel-dialog/abandon-duel-dialog.component';
import { DuelComponent } from '../../features/duel/components/duel/duel.component';

export const duelLeaveGuard: CanDeactivateFn<DuelComponent> = () => {
  const duelsService = inject(DuelsService);
  const dialog = inject(MatDialog);

  return duelsService.checkIfUserInActiveDuel().pipe(
    switchMap((isActive) => {
      if (!isActive) {
        return of(true);
      }

      return dialog
        .open(AbandonDuelDialogComponent, {
          width: '420px',
          panelClass: 'duel-dialog',
          backdropClass: 'duel-backdrop',
          disableClose: true,
        })
        .afterClosed();
    }),
  );
};
