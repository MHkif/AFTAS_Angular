import { TestBed } from '@angular/core/testing';

import { IsActiveAccountGuard } from './is-active-account.guard';

describe('IsActiveAccountGuard', () => {
  let guard: IsActiveAccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsActiveAccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
