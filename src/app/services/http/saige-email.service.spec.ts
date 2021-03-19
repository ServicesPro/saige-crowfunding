import { TestBed } from '@angular/core/testing';

import { SaigeEmailService } from './saige-email.service';

describe('SaigeEmailService', () => {
  let service: SaigeEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaigeEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
