import { TestBed } from '@angular/core/testing';

import { CrudsService } from './cruds.service';

describe('CrudsService', () => {
  let service: CrudsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
