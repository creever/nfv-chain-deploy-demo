import { TestBed } from '@angular/core/testing';

import { DemonstrationService } from './demonstration.service';

describe('DemonstrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemonstrationService = TestBed.get(DemonstrationService);
    expect(service).toBeTruthy();
  });
});
