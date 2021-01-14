import { TestBed } from '@angular/core/testing';

import { HttpWorkerService } from './http-worker.service';

describe('HttpWorkerService', () => {
  let service: HttpWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
