import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { duelLeaveGuard } from './duel-leave.guard';

describe('duelLeaveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => duelLeaveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
