import { TestBed } from '@angular/core/testing';

import { TranslocoLoaderService } from './transloco-loader.service';

describe('TranslocoLoaderService', () => {
  let service: TranslocoLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslocoLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
