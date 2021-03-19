import { TestBed } from '@angular/core/testing';

import { PrivateProjectGuardService } from './private-project-guard.service';

describe('PrivateProjectGuardService', () => {
  let service: PrivateProjectGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateProjectGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
