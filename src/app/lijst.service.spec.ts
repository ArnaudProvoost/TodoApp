import { TestBed } from '@angular/core/testing';

import { LijstService } from './lijst.service';

describe('LijstService', () => {
  let service: LijstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LijstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
