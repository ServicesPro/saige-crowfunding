import { TestBed } from '@angular/core/testing';

import { ChangeUserDataGuardService } from './change-user-data-guard.service';

describe('ChangeUserDataGuardService', () => {
  let service: ChangeUserDataGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeUserDataGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
