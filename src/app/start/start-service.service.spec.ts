import { TestBed } from '@angular/core/testing';

import { StartService } from './start-service.service';

describe('StartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartService = TestBed.get(StartService);
    expect(service).toBeTruthy();
  });
});
