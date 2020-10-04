import { TestBed } from '@angular/core/testing';

import { URLProviderService } from './urlprovider.service';

describe('URLProviderService', () => {
  let service: URLProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(URLProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
