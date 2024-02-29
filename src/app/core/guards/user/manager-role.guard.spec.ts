import { TestBed } from '@angular/core/testing';

import { ManagerRoleGuard } from './manager-role.guard';

describe('ManagerRoleGuard', () => {
  let guard: ManagerRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
