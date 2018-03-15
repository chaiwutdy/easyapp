import { TestBed, inject } from '@angular/core/testing';

import { NdcserviceService } from './ndcservice.service';

describe('NdcserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NdcserviceService]
    });
  });

  it('should be created', inject([NdcserviceService], (service: NdcserviceService) => {
    expect(service).toBeTruthy();
  }));
});
