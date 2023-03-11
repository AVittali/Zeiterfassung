import { TestBed } from '@angular/core/testing';

import { ArbeitszeitDataService } from './arbeitszeit-data.service';

describe('ArbeitszeitDataService', () => {
  let service: ArbeitszeitDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbeitszeitDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
