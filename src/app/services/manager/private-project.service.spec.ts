import { TestBed } from '@angular/core/testing';

import { PrivateProjectService } from './private-project.service';

describe('PrivateProjectService', () => {
  let service: PrivateProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
