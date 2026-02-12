import { TestBed } from '@angular/core/testing';

import { ConsultantApiService } from './consultant-api.service';

describe('ConsultantApiService', () => {
  let service: ConsultantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
