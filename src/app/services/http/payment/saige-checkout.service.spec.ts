import { TestBed } from '@angular/core/testing';

import { SaigeCheckoutService } from './saige-checkout.service';

describe('SaigeCheckoutService', () => {
  let service: SaigeCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaigeCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
