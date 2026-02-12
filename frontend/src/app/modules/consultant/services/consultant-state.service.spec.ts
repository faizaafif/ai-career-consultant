import { TestBed } from '@angular/core/testing';

import { ConsultantStateService } from './consultant-state.service';

describe('ConsultantStateService', () => {
  let service: ConsultantStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultantStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
