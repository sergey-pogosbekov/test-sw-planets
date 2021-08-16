import { TestBed } from '@angular/core/testing';

import { PlanetsApiService } from './planets-api.service';

describe('PlanetsApiService', () => {
  let service: PlanetsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
