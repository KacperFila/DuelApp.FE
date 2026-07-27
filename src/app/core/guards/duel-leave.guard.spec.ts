import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { duelLeaveGuard } from './duel-leave.guard';
import { DuelComponent } from '../../features/duel/components/duel/duel.component';

describe('duelLeaveGuard', () => {
  const executeGuard: CanDeactivateFn<DuelComponent> = (
    component,
    currentRoute,
    currentState,
    nextState,
  ) =>
    TestBed.runInInjectionContext(() =>
      duelLeaveGuard(component, currentRoute, currentState, nextState),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
