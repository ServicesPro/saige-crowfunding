import { TestBed } from '@angular/core/testing';

import { EncrytStorageService } from './encryt-storage.service';

describe('EncrytStorageService', () => {
  let service: EncrytStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrytStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
