import { TestBed } from '@angular/core/testing';

import { NetworkLogsService } from './network-logs.service';

describe('NetworkLogsService', () => {
  let service: NetworkLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
