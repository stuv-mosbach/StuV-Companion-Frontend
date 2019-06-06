import { TestBed } from '@angular/core/testing';

import { NetworkProviderService } from './network-provider.service';

describe('NetworkProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkProviderService = TestBed.get(NetworkProviderService);
    expect(service).toBeTruthy();
  });
});
