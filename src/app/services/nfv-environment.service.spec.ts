import { TestBed } from '@angular/core/testing';

import { NfvEnvironmentService } from './nfv-environment.service';

describe('NfvEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NfvEnvironmentService = TestBed.get(NfvEnvironmentService);
    expect(service).toBeTruthy();
  });
});
